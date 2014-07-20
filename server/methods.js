var util = Npm.require("util");
var amazon = new apac.OperationHelper({
    awsId:     'AKIAJGLQRO6ZUUBDS6GA',
    awsSecret: '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',
    assocId:   '349984393105'
});

Meteor.methods({
  addAmazonItem: function (collectionId, amazonUrl) {
    amazon.execute('ItemLookup',
      {
        'Condition': 'All',
        'IdType': 'ASIN',
        'ItemId': '1482217163',
        'ResponseGroup': 'Small,Offers,Images'
      },
      function(results, xml)
      {
        console.log(util.inspect(results, false, null, true));
      });
    return { itemId: 'itemId' };
  }
});