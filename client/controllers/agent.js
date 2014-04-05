AgentController = RouteController.extend({
  waitOn: function () {
    if (Meteor.user() && Meteor.user().profile.fixedGroup) {
    //  Session.set('currentGroup', Meteor.user().profile.fixedGroup);
      Meteor.call('joinGroup', Meteor.user().profile.fixedGroup);
    }
    Meteor.subscribe('messages', Session.get('currentGroup'));
    Meteor.subscribe('presence');
  },

  data: {
    currentGroup: function() {
      return Session.get('currentGroup'); 
    }
  },

  action: function () {
    this.render();
  }
});

