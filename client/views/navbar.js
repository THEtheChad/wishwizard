Template.navbar.events({
  'click .navbar-item': function(e,tmpl) {
     tmpl.$(".active").removeClass("active");
     $(e.currentTarget).addClass("active");
  },
  'click .navbar-brand': function(e,tmpl){
     tmpl.$(".active").removeClass("active");
     $(".default-active").addClass("active");
  },
  'click #amazon-url button': function(e,tmpl){
    var $input = tmpl.$('#amazon-url input');
    var url = $input.val();

    Meteor.call('addAmazonItem', null, url);

    $input.val('');
  },
  'click #donate': function(){
    Session.set('modal', 'donate');
  }
  // "click #donateToggle": function(e,tmpl) {
  // 	Session.set('donateModalVisible', true);
  // }
});

Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        Router.go('profile');
    }
});