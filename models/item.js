Items = new Meteor.Collection("Items");

//addItem("testName","testDescription","http://www.amazon.com");

if (Meteor.isClient){
    // get all Items from the database
    Template.listItems.item = function(){
        return Items.find();
    };
}


/**
 * Insert Item into the database
 *
 * @param itemName
 *          Name of the item on Amazon
 * @param itemDesc
 *          Description of the item on Amazon
 * @param amazonUrl
 *          Amazon's URL for the item
 */
function addItem(itemName, itemDesc, amazonUrl){
    console.log("inserting " + itemName + " into the database");
    Items.insert({name:itemName,desc:itemDesc,url:amazonUrl});
}

/**
 * Remove item from the database
 *
 * @param itemId
 *      Record ID of the item to remove from the database
 */
function removeItem(itemId){
    console.log("removing item with id " + itemId);
    Items.remove({_id:itemId});
}