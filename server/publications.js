Meteor.publish('userData', function(){
  return Meteor.users.find({}, {fields: {avatar: 1}});
});

Meteor.publish('allUserData', function(){
	console.log(Meteor.users.find({}, {fields: {avatar: 1}}).map(function(doc){return doc}));
  return Meteor.users.find({}, {fields: {avatar: 1}});
});

Meteor.publish('Items', function(){
	return Items.find();
});