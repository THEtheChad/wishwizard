Template.products.products = function(){
	var items = [], row = [];

	var ITEMS = Items.find();
	var last  = ITEMS.count();

	ITEMS.forEach(function(item, idx){
		row.push(item);

		++idx;

		if( !(idx % 3) && (idx != last) ){
			items.push(row);
			row = [];
		}
	});

	items.push(row);

	return items;
};