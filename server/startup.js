Meteor.startup(function(){
	var users = [];
	var items = [];

	Meteor.users.remove({});

	USERS.forEach(function(user){
		var _id = Meteor.users.insert(user);

		users.push(_id);
	});

	Items.remove({});

	ITEMS.forEach(function(item){
		item.likes = users;

		var _id = Items.insert(item);
	});
});