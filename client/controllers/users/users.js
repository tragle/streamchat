UsersController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('users');
    Meteor.subscribe('presence');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
