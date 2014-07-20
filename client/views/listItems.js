// get all Items from the database
Template.listItems.item = function(){
    return Items.find();
};

Template.listItems.events({
    'click a.remove': function(e){
        Items.remove(this._id);
    }
});