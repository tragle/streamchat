VisitorEntryController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('connections');
  },

  layoutTemplate: 'VisitorEntry',

  data: function() {
    var params = this.params;
    if (params.reason && params.reason =='nogroup') {
      return {noGroup: true};
    }
  },

  action: function () {
    Meteor.logout();
    this.render();
  }
});

