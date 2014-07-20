Accounts.onCreateUser(function(options, user){
	user.profile = options.profile;

	user.profile.avatar = 'http://api.randomuser.me/portraits/men/6.jpg';

	return user;
});

function likeItem(userId, itemId){
	Meteor.users.update({_id: userId}, {$push: {likes: itemId}});
	Items.update({_id: itemId}, {$push: {likes: userId}});
}

function unlikeItem(userId, itemId){
	Meteor.users.update({_id: userId}, {$pull: {likes: itemId}});
	Items.update({_id: itemId}, {$pull: {likes: userId}});
}

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
		var _id = Items.insert(item);

		items.push(_id);
	});

	items.forEach(function(itemId){
		users.forEach(function(userId){
			likeItem(userId, itemId);
		});
	});
});