MessagesController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('messages');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
