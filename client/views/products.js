Template.products.products = function(){
	var items = [], row = [];

	Items.find().forEach(function(item, idx){
		row.push(item);

		if( !(++idx % 3) ){
			items.push(row);
			row = [];
		}
	});

	return items;
};