Template.addItem.events({
  'submit form' : function(event, template) {
  	event.preventDefault();

    itemName = template.$('#itemName');
    itemDesc = template.$('#itemDesc');
    amazonUrl = template.$('#amazonUrl');

  	// TODO do validation here

  	alert(itemName.val());

  	var data = {
  		name: itemName.val(),
  		desc: itemDesc.val(),
  		url: amazonUrl.val()
  	};

  	amazonUrl.val("");
  	itemName.val("");
  	itemDesc.val("");

  	Items.insert(data, function(err, _id) {
  		if (err){
  			alert(err.details);
  		}else{
  			console.log('success - ' + _id);
  		}
  	});
  }
});