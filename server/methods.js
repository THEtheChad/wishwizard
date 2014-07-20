var util = Npm.require("util");
var amazon = new apac.OperationHelper({
    awsId:     'AKIAJGLQRO6ZUUBDS6GA',
    awsSecret: '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',
    assocId:   '349984393105'
});

var amazonUrlRegex = /^http\:\/\/www\.amazon\.com\/[^\/]+\/dp\/(\d+)\/.*$/;

Meteor.methods({
  addAmazonItem: function (collectionId, amazonUrl) {
    var regexResult = amazonUrlRegex.exec(amazonUrl);
    if (!regexResult || regexResult.length !== 2) throw new Meteor.Error(500, 'Invalid Amazon URL');
    console.log('ASIN: ' + regexResult[1]);
    amazon.execute('ItemLookup',
      {
        'Condition': 'All',
        'IdType': 'ASIN',
        'ItemId': regexResult[1],
        'ResponseGroup': 'Small,Offers,Images'
      },
      function(results, xml)
      {
        console.log(util.inspect(results, false, null, true));
      });
    return { itemId: 'itemId' };
  }
});