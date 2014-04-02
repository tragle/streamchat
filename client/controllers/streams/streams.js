StreamsController = RouteController.extend({
  waitOn: function () {
    return [Meteor.subscribe('streams'), Meteor.subscribe('agents')];
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
