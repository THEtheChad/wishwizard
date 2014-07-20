Package.describe({
    summary: "Accesses Amazon's Product Advertising API"
});
Npm.depends({apac: "0.0.14"});

Package.on_use(function(api){
    api.add_files('apac.js', 'server');
    if(api.export)
        api.export('apac');
});
