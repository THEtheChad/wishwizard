Accounts.onCreateUser(function(options, user){
    user.profile = options.profile;

    user.profile.avatar = 'http://us.cdn2.123rf.com/168nwm/cyberbeastie/cyberbeastie0802/cyberbeastie080200007/2548520-witch-hat.jpg';

    WISHLISTS.forEach(function(wishlist){
    	wishlist.userId = user._id;

    	wishlist.items = Items.find().map(function(item){
    		return item._id;
    	});

    	Wishlists.insert(wishlist);
    });

    return user;
});

Future = Npm.require('fibers/future');