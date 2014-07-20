Template.donate.events({'submit' : function(event, template) {
    submitDonate();
    event.preventDefault(); //prevent page refresh
}});

Template.donate.visible = function () {
	return Session.get('donateModalVisible');
}

function submitDonate() {
    form={};
 
    $.each($('#donateForm').serializeArray(), function() {
        form[this.name] = this.value;
    });
 
    //do validation on form={firstname:'first name', lastname: 'last name', email: 'email@email.com'}
 
    Meteor.call('donate', form);
 	Session.set('donateModalVisible', false);
}