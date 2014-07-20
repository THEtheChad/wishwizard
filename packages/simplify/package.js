Package.describe({
    summary: "Process credit cards and all that"
});
Npm.depends({"simplify-commerce": "1.1.2"});

Package.on_use(function(api){
    api.add_files('simplify.js', 'server');
    if(api.export)
        api.export('Simplify');
});