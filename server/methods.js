Meteor.methods({
	likeItem: function(itemId){
		if(!this.userId) return;
		console.log('like');
		Meteor.users.update({_id: this.userId}, {$push: {likes: itemId}});
		Items.update({_id: itemId}, {$push: {likes: this.userId}, $set: {liked: true}});
	},

	unlikeItem: function(itemId){
		if(!this.userId) return;
		console.log('unlike');
		Meteor.users.update({_id: this.userId}, {$pull: {likes: itemId}});
		Items.update({_id: itemId}, {$pull: {likes: this.userId}, $set: {liked: false}});
	}
});