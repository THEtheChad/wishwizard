Meteor.startup(function(){

	Meteor.users.remove({});
	Items.remove({});
	Wishlists.remove({});

	USERS.forEach(function(user){
		Meteor.users.insert(user);
	});

	ITEMS.forEach(function(url){
		try{
			Meteor.call('addAmazonItem', null, url);
		} catch (ex) { console.log(ex.reason); }
	});
});