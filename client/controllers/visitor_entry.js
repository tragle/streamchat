VisitorEntryController = RouteController.extend({
  waitOn: function () {
  },

  layoutTemplate: 'VisitorEntry',

  data: function () {
  },

  action: function () {
    Meteor.logout();
    this.render();
  }
});

