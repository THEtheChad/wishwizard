Meteor.publish('userData', function(){
  return Meteor.users.find({}, {fields: {profile: 1}});
});

Meteor.publish('allUserData', function(){
  return Meteor.users.find({}, {fields: {profile: 1}});
});

Meteor.publish('Items', function(){
	return Items.find();
});

Meteor.publish('Wishlists', function(){
	return Wishlists.find({userId: this.userId});
});

// Meteor.publish('Items', function () {
//   var self = this;
//   Items.find().forEach(function(item) {
//   	if(item.likes.indexOf(self.id) + 1){
//   		item.liked = true;
//   	}
//   	else{
//   		item.liked = false;
//   	}
//     self.added('Items', item._id, item);
//   });
//   self.ready();
// });