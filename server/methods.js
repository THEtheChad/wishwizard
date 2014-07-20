var util = Npm.require("util");
var amazonAssocId = '349984393105';
var amazon = new apac.OperationHelper({
	awsId: 'AKIAJGLQRO6ZUUBDS6GA',
	awsSecret: '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',
	assocId: amazonAssocId
});

var amazonUrlRegex = /(dp|product)\/([^/]+)/;

// var amazonUrlRegex = /^http\:\/\/www\.amazon\.com\/[^\/]+\/dp\/([0-9A-Z]+)\/.*$/;

Meteor.methods({
	likeItem: function(itemId) {
		if (!this.userId) return;
		console.log('like');
		Meteor.users.update({
			_id: this.userId
		}, {
			$push: {
				likes: itemId
			}
		});
		Items.update({
			_id: itemId
		}, {
			$push: {
				likes: this.userId
			},
			$set: {
				liked: true
			}
		});
	},

	unlikeItem: function(itemId) {
		if (!this.userId) return;
		console.log('unlike');
		Meteor.users.update({
			_id: this.userId
		}, {
			$pull: {
				likes: itemId
			}
		});
		Items.update({
			_id: itemId
		}, {
			$pull: {
				likes: this.userId
			},
			$set: {
				liked: false
			}
		});
	},

	donate: function(payload) {
		client = Simplify.getClient({
			publicKey: 'sbpb_NGQwM2RiZDctNTY3MC00MzY4LThjYjUtNDgwZDZkNDdkZjQ5',
			privateKey: 'x6q0Q+vSpXFZn71HQE9+4keU1LTp10NcI8avXxv29El5YFFQL0ODSXAOkNtXTToq'
		});

		(function(arr) {
			payload.month = arr[0];
			payload.year = arr[1];
		})(payload.date.split("/"));

		payload.amount *= 100;
		payload.number = payload.number.replace(/\s+/g, '');

		payment_obj = {
			amount: payload.amount,
			description: "Donation to Wish Wizard",
			card: {
				expMonth: payload.month,
				expYear: payload.year,
				cvc: payload.cvc,
				number: payload.number
			},
			currency: "USD"
		};

		console.log(payment_obj);

		client.payment.create(payment_obj, function(errData, data) {
			if (errData) {
				console.error("Error Message: " + errData.data.error.message);
				// handle the error
				return;
			}
			console.log("Payment Status: " + data.paymentStatus);
		});
	},

	addAmazonItem: function(collectionId, amazonUrl) {
		var regexResult = amazonUrlRegex.exec(amazonUrl);
		if (!regexResult || regexResult.length !== 3) throw new Meteor.Error(500, 'Invalid Amazon URL');

		var ASIN = regexResult[2];
		console.log('ASIN: ' + ASIN);

		var fut = new Future();
		amazon.execute('ItemLookup', {
				'Condition': 'New',
				'IdType': 'ASIN',
				'ItemId': ASIN,
				//'MerchantId': 'Amazon', //Use this to limit only to items sold directly by Amazon (not just fulfilled by them)
				'ResponseGroup': 'Small,OfferFull,Images'
			},
			Meteor.bindEnvironment(function(results, xml) {
				var item = results.ItemLookupResponse.Items[0].Item[0];
				var itemAttributes = item.ItemAttributes[0];
				var offers = item.Offers[0].Offer;
				var offer = null;
				// console.log(util.inspect(item, false, null, true));
				for (var i = 0; i < offers.length; ++i) {
					if (offers[i].OfferAttributes[0].Condition[0] === 'New') {
						offer = offers[i];
						break;
					}
				}
				if (offer !== null) {
					var itemToInsert = {
						_id: ASIN,
						name: itemAttributes.Title[0],
						url: ' http://www.amazon.com/dp/' + ASIN + '/?tag=' + amazonAssocId,
						price: parseInt(offer.OfferListing[0].Price[0].Amount[0]) / 100.0,
						thumb: item.LargeImage[0].URL[0],
						likes: []
					};
					// console.log(util.inspect(itemToInsert, false, null, true));

					itemId = Items.upsert({_id: ASIN}, itemToInsert);

					fut['return']({
						itemId: itemId
					});
				} else {
					throw new Meteor.Error(500, 'Unable to insert Amazon Item');
				}
			}));
		return fut.wait();
	}
});