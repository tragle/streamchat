VisitorEntryController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('connections');
  },

  layoutTemplate: 'VisitorEntry',

  data: function () {
  },

  action: function () {
    Meteor.logout();
    this.render();
  }
});

