if (Meteor.isClient){
    Template.addItem.events({'submit form' : function(event, template) {
        event.preventDefault();

        itemName = $('#itemName');
        itemDesc = $('#itemDesc');
        amazonUrl = $('#amazonUrl');

        // TODO do validation here

        var data = {
            name: itemName.value,
            desc: itemDesc.value,
            url: amazonUrl.value
        };

        amazonUrl.value="";
        itemName.value="";
        itemDesc.value="";

        Items.insert(data, function(err, _id) {
            if (err){
                alert(err.details);
            }else{
                console.log('success - ' + _id);
            }
        });

    }});
}