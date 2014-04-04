VisitorController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('presence');
  },

  layoutTemplate: 'Visitor',

  data: {
  },

  action: function () {
    this.render();
  }
});

