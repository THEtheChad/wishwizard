Template.product.likes = function(){
	return Meteor.users.find({_id: {$in: this.likes}}, {limit: 5}).map(function(doc){
		return '<img src="' + doc.profile.avatar + '">';
	}).join('');
};

Template.product.likeCount = function(){
	return this.likes.length;
};

Template.product.price = function(){
	return this.price.toFixed(2);
};

Template.product.liked = function(){
	return this.liked ? 'active' : '';
};

Template.product.events({
	'click .cardAdds_like': function(evt, tmpl){
		if(!Meteor.user()) alert('Thou Shall Not Pass... Lest You Identify Yourself. Please Log In.');

		if(this.liked){
			console.log('unlike', this._id);
			Meteor.call('unlikeItem', this._id);
		}
		else{
			console.log('like', this._id);
			Meteor.call('likeItem', this._id);
		}
	}
});