VisitorController = RouteController.extend({
  waitOn: function () {
    Meteor.logout();
    Meteor.subscribe('presence');
  },

  layoutTemplate: 'Visitor',

  data: {
  },

  action: function () {
    this.render();
  }
});

