if (Meteor.isClient){
    Template.listItems.events({
        'click a.remove': function(e){
            Items.remove(this._id);
        }
    });
}