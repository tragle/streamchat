UsersController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('users');
    Meteor.subscribe('connections');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
