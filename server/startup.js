Meteor.startup(function() {
	Items.remove({});

	ITEMS.forEach(function(item){
		Items.insert(item);
	});
});