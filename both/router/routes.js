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
  this.route('groups', {path: '/groups'});
  this.route('users', {path: '/users'});
  this.route('home', {path: '/'});
  this.route('messages', {path: '/messages'});
  this.route('agent', {path: '/agent'});
  this.route('visitor', {path: '/visitor'});
});
