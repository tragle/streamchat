GroupsController = RouteController.extend({
  waitOn: function () {
    return [Meteor.subscribe('groups'), Meteor.subscribe('agents'), Meteor.subscribe('autoGroupSettings')];
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
