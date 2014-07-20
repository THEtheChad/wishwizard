var util = Npm.require("util");
var amazon = new apac.OperationHelper({
    awsId:     'AKIAJGLQRO6ZUUBDS6GA',
    awsSecret: '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',
    assocId:   '349984393105'
});

var amazonUrlRegex = /^http\:\/\/www\.amazon\.com\/[^\/]+\/dp\/([0-9A-Z]+)\/.*$/;

Meteor.methods({
  addAmazonItem: function (collectionId, amazonUrl) {
    var regexResult = amazonUrlRegex.exec(amazonUrl);
    if (!regexResult || regexResult.length !== 2) throw new Meteor.Error(500, 'Invalid Amazon URL');
    console.log('ASIN: ' + regexResult[1]);
    var fut = new Future();
    amazon.execute('ItemLookup',
      {
        'Condition': 'New',
        'IdType': 'ASIN',
        'ItemId': regexResult[1],
        //'MerchantId': 'Amazon', //Use this to limit only to items sold directly by Amazon (not just fulfilled by them)
        'ResponseGroup': 'Small,OfferFull,Images'
      },
      Meteor.bindEnvironment(function(results, xml)
      {
        var item = results.ItemLookupResponse.Items[0].Item[0];
        var itemAttributes = item.ItemAttributes[0];
        var offers = item.Offers[0].Offer;
        var offer = null;
          console.log(util.inspect(item, false, null, true));
        for (var i = 0; i < offers.length; ++i)
        {
          if (offers[i].OfferAttributes[0].Condition[0] === 'New')
          {
            offer = offers[i];
            break;
          }
        }
        if (offer !== null)
        {
          var itemToInsert = { name: itemAttributes.Title[0], url: item.DetailPageURL[0], price: parseInt(offer.OfferListing[0].Price[0].Amount[0]) / 100.0, thumb: item.LargeImage[0].URL[0], likes: [] };
          console.log(util.inspect(itemToInsert, false, null, true));
          itemId = Items.insert(itemToInsert);
          fut['return']({ itemId: itemId });
        }
        else
        {
          throw new Meteor.Error(500, 'Unable to insert Amazon Item');
        }
      }));
    return fut.wait();
  }
});

