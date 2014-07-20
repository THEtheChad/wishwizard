Template.navbar.events({
   "click .navbar-item": function(e,tmpl) {
       tmpl.$(".active").removeClass("active");
       $(e.currentTarget).addClass("active");
   },
   "click .navbar-brand": function(e,tmpl){
       tmpl.$(".active").removeClass("active");
       $(".default-active").addClass("active");
   },
   // "click #donateToggle": function(e,tmpl) {
   // 	Session.set('donateModalVisible', true);
   // }
});

