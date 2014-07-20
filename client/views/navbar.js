Template.navbar.events({
   "click li": function(e) {
       $('.active').removeClass("active");
       $(e.currentTarget).addClass("active");
   }
});

