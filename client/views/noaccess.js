Template.noaccess.events({
	'click': function(){
		Session.set('modal', false);
	}
});

Template.noaccess.rendered = function(){
	var $noaccess = this.$('#noaccess-modal');

	$noaccess.on('hidden.bs.modal', function (e) {
		if(Session.equals('modal', 'noaccess')){
		  Session.set('modal', false);
		}
	});

	Deps.autorun(function () {
		if(Session.equals('modal', 'noaccess')){
			$noaccess.modal('show');
		}
		else{
			$noaccess.modal('hide');	
		}
	});
};