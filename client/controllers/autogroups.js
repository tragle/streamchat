AutogroupsController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('autoGroupSettings');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
