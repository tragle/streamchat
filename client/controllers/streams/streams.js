GroupsController = RouteController.extend({
  waitOn: function () {
    return [Meteor.subscribe('groups'), Meteor.subscribe('agents')];
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
