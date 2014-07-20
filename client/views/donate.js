Template.donate.events({'submit .ajax-submit' : function(event, template) {
    submitDonate();
    event.preventDefault(); //prevent page refresh
}});

Template.donate.visible = function () {
	return Session.get('donateModalVisible');
}