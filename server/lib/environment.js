Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        console.log("setting up hash for " + user.email);
        var md5 = CryptoJS.MD5(user.email).toString();
        console.log("md5 = " + md5);
        options.profile.picture = "http://www.gravatar.com/avatar/" + md5 + ".jpg";
        console.log("avatar url = " + options.profile.picture);
        user.profile = options.profile;
    }else{
        console.warn("no options exits for " + user.email);
    }
    return user;
});