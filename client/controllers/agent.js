AgentController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('messages', Session.get('currentStream'));
    Meteor.subscribe('presence');
  },

  data: {
    currentStream: function() {
      return Session.get('currentStream'); 
    }
  },

  action: function () {
    this.render();
  }
});

