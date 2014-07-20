Template.addItem.rendered = function(){
	var $addItem = this.$('#modal_addToCollection');

	$addItem.on('hidden.bs.modal', function (e) {
		if(Session.equals('modal', 'addItem')){
		  Session.set('modal', false);
		}
	});

	Deps.autorun(function () {
		if(Session.equals('modal', 'addItem')){
			$addItem.modal('show');
		}
		else{
			$addItem.modal('hide');	
		}
	});
};