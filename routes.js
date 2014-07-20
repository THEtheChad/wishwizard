Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('products', {path: '/'});
  this.route('profile');
});