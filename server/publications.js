Meteor.publish('userData', function(){
  return Meteor.users.find({}, {fields: {
    avatar: 1,
  }});
});