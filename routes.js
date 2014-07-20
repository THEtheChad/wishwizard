Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('listItems');
  this.route('addItem');
  this.route('products', {path: '/'});
});