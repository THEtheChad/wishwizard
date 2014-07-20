Meteor.methods({
	likeItem: function(itemId){
		if(!this.userId) return;

		Meteor.users.update({_id: this.userId}, {$push: {likes: itemId}});
		Items.update({_id: itemId}, {$push: {likes: this.userId}});
	},

	unlikeItem: function(itemId){

	}
});