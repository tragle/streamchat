AgentController = RouteController.extend({
  waitOn: function () {
    if (Meteor.user() && Meteor.user().profile.fixedStream) {
      Session.set('currentStream', Meteor.user().profile.fixedStream);
    }
    Meteor.subscribe('messages', Session.get('currentStream'));
    Meteor.subscribe('presence');
  },

  data: {
    currentStream: function() {
      return Session.get('currentStream'); 
    }
  },

  action: function () {
    Presence.state.online = true;
    this.render();
  }
});

