Meteor.autosubscribe(function(){
	//Meteor.subscribe('list');
	Meteor.subscribe('Items');
	Meteor.subscribe('userData');
	Meteor.subscribe('Wishlists');
});