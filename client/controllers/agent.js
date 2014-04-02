AgentController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('agents');
    Meteor.subscribe('visitors');
    Meteor.subscribe('messages');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
