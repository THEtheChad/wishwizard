Template.addItem.wishlists = function() {
	return Wishlists.find();
};

Template.addItem.rendered = function() {
	var $addItem = this.$('#modal_addToCollection');

	$addItem.on('hidden.bs.modal', function(e) {
		if (Session.equals('modal', 'addItem')) {
			Session.set('modal', false);
		}
	});

	Deps.autorun(function() {
		if (Session.equals('modal', 'addItem')) {
			$addItem.modal('show');
		} else {
			$addItem.modal('hide');
		}
	});
};

Template.addItem.isChecked = function(){
	var itemId = Session.get('activeItem');

	return (this.items.indexOf(itemId) + 1) ? 'checked' : '';
};

Template.addItem.events({
	'click #addCollection': function(e, tmpl) {
		var $input = tmpl.$('#collectionName');
		var itemId = Session.get('activeItem');

		Wishlists.insert({
			name: $input.val(),
			items: [itemId],
			userId: Meteor.userId()
		});

		$input.val('');
	},
	'click .collection': function(e, tmpl){
		var $input = $(e.currentTarget).find('input');
		var wishlistId = $input.val();
		var itemId = Session.get('activeItem');

		if($input.is(':checked')){
			console.log('Add item ' + itemId + ' to collection ' + wishlistId);
			Wishlists.update({_id: wishlistId}, {$addToSet: {items: itemId}});
		}
		else{
			console.log('Remove item ' + itemId + ' from collection ' + wishlistId);
			Wishlists.update({_id: wishlistId}, {$pull: {items: itemId}});
		}
	}
});