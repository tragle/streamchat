MessagesController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('allMessages');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
