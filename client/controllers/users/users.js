UsersIndexController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('users_index');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
