UsersController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('users');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
