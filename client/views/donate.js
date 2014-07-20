Template.donate.events({
	'submit' : function(event, template) {
    submitDonate();
    event.preventDefault(); //prevent page refresh
	}
});

function submitDonate() {
	form = {};

	$.each($('#donateForm').serializeArray(), function() {
		form[this.name] = this.value;
	});

	//do validation on form={firstname:'first name', lastname: 'last name', email: 'email@email.com'}

	Meteor.call('donate', form);

	$('#donate-modal').modal('hide')
}

Template.donate.rendered = function(){
	var $donate = this.$('#donate-modal');

	$donate.on('hidden.bs.modal', function (e) {
		if(Session.equals('modal', 'donate')){
		  Session.set('modal', false);
		}
	});

	Deps.autorun(function () {
		if(Session.equals('modal', 'donate')){
			console.log('show donate', $donate.length);
			$donate.modal('show');
		}
		else{
			$donate.modal('hide');	
		}
	});
};