VisitorController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('groups', Session.get('currentGroup'));
  },

  layoutTemplate: 'Visitor',

  data: {
    inputState: function() {
      if (Groups.findOne({'_id':Session.get('currentGroup'), 'queue._id': Meteor.userId()})) {
        return 'disabled';
      }
    },
    inQueue: function() {
      return !!Groups.findOne({'_id':Session.get('currentGroup'), 'queue._id': Meteor.userId()});
    }
  },

  action: function () {
    this.render();
  },

  onStop: function() {
    /*    if (Session.get('currentGroup')) {
          Meteor.call('leaveGroup', Session.get('currentGroup'));
          }
          */
          }
});

