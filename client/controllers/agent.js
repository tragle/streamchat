AgentController = RouteController.extend({
  waitOn: function () {
    if (Meteor.user() && Meteor.user().profile.fixedGroup) {
      Meteor.call('joinGroup', Meteor.user().profile.fixedGroup);
    }
    Meteor.subscribe('messages', Session.get('currentGroup'));
    Meteor.subscribe('presence');
    Meteor.subscribe('visitors', Session.get('currentGroup'));
  },

  data: {
    currentGroup: function() {
      return Session.get('currentGroup'); 
    },
    sendTo: function() {
      var id = Session.get('sendTo');
      var user = Meteor.presences.findOne({'userId': id});
      if (user && user.state) {
        return user.state.displayName;
      } 
    }
  },

  action: function () {
    this.render();
  },

  onstop: function() {
    if (Session.get('currentGroup')) {
      Meteor.call('leaveGroup', Session.get('currentGroup'));
    }
  }

});

Deps.autorun(function() {
  var id = Session.get('sendTo');
  if (!Meteor.presences.findOne({'userId': id})) {
    Session.set('sendTo', '');
  }
});

