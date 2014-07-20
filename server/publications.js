Meteor.publish('userData', function(){
  return Meteor.users.find({}, {fields: {profile: 1}});
});

Meteor.publish('allUserData', function(){
  return Meteor.users.find({}, {fields: {profile: 1}});
});

Meteor.publish('Items', function(){
	return Items.find();
});