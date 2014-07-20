Template.wishlist.products = function(){
	var self = this;

	return Items.find({_id: {$in: self.items}}).map(function(item){
		item.parent = self._id;
		return item;
	});
};

Template.wishlist.events({
	'click .product-remove': function(e, tmpl){
		Wishlists.update({_id: this.parent}, {$pull: {items: this._id}});
	}
});