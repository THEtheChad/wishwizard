Wishlist = new Meteor.Collection("Wishlist");

Template.content.wishlist = function(){
	return Wishlist.find();
};

Template.content.events({
	'click a': function(e){
		Wishlist.remove(this._id);
	}
});