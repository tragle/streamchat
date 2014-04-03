AgentController = RouteController.extend({
  waitOn: function () {
    var streamId;
    if (Meteor.user()) {
      streamId = Meteor.user().profile.currentStream;
    }
    Meteor.subscribe('messages', streamId);
    Meteor.subscribe('agents');
    Meteor.subscribe('visitors');
    Meteor.subscribe('streams');
  },

  data: {
    currentStream: function() {
      return Meteor.user().profile.currentStream;
    }
  },

  action: function () {
    this.render();
  }
});
