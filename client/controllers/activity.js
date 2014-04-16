ActivityController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('allGroups');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
