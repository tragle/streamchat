GroupsController = RouteController.extend({
  waitOn: function () {
    return [Meteor.subscribe('fixedGroups'), Meteor.subscribe('agents'), Meteor.subscribe('autoGroupSettings')];
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
