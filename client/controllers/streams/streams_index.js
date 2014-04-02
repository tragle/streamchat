StreamsIndexController = RouteController.extend({
  waitOn: function () {
    return [Meteor.subscribe('streams_index'), Meteor.subscribe('agents')];
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
