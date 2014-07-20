Template.products.products = function(){
	var items = [], row = [];

	Items.find().forEach(function(obj, idx){
		row.push(obj);

		if( !(++idx % 3) ){
			items.push(row);
			row = [];
		}
	});

	console.log(items);

	return items;
};