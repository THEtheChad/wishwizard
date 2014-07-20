Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('listItems', {path: '/'});
  this.route('addItem');
  this.route('products');
  this.route('donate');
});