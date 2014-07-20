Template.navbar.events({
   "click li": function(e,tmpl) {
       tmpl.$(".active").removeClass("active");
       $(e.currentTarget).addClass("active");
   },
   "click #donateToggle": function(e,tmpl) {
   	Session.set('donateModalVisible', true);
   }
});

