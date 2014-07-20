Template.navbar.events({
   "click li": function(e,tmpl) {
       console.log(arguments);
       tmpl.$(".active").removeClass("active");
       $(e.currentTarget).addClass("active");
   }
});

