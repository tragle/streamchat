/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

Router.map(function () {
  this.route('streams.index', {path: '/streams'});
  this.route('users.index', {path: '/users'});
  this.route('home', {path: '/'});
  this.route('messages.index', {path: '/messages'});
  this.route('agent', {path: '/agent'});
});
