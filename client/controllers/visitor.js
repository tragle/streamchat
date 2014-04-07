VisitorController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('presence');
    Session.set('isVisitor', true);
  },

  layoutTemplate: 'Visitor',

  data: {
  },

  action: function () {
    this.render();
  },

  onStop: function() {
    if (Session.get('currentGroup')) {
      Meteor.call('leaveGroup', Session.get('currentGroup'));
    }
  }
});

