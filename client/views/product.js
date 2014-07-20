Template.product.likes = function(){
	return Meteor.users.find({_id: {$in: this.likes}}).map(function(doc){
		return '<img src="' + doc.avatar + '">';
	}).join('');
};

Template.product.likeCount = function(){
	return this.likes.length;
};

Template.product.price = function(){
	return this.price.toFixed(2);
};