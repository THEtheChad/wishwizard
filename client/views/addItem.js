if (Meteor.isClient){
    Template.addItem.events({'submit form' : function(event, template) {
        event.preventDefault();

        itemName = $('#itemName');
        itemDesc = $('#itemDesc');
        amazonUrl = $('#amazonUrl');

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

        alert(data);

        Items.insert(data, function(err, _id) {
            if (err){
                alert(err.details);
            }else{
                console.log('success - ' + _id);
            }
        });

    }});
}