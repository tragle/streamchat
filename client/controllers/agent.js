AgentController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('messages', Session.get('currentGroup'));
    Meteor.subscribe('visitors');
    Meteor.subscribe('presence');
  },

  data: {
    currentGroup: function() {
      return Session.get('currentGroup'); 
    },
    sendTo: function() {
      var id = Session.get('sendTo');
      var user = Meteor.presences.findOne({'userId': id});
      if (user && user.state) {
        return user.state.displayName;
      } 
    },
    groupVisitors: function() {
      return Meteor.presences.find({
        'state.currentGroup': Session.get('currentGroup'),
        'state.isVisitor': true  
      }, { transform:function(doc) {
        if (Filters.isMute(doc.userId)) {
          doc.isMute = true;
        }
        if (Filters.isSolo(doc.userId)) {
          doc.isSolo = true;
        }
        if (Session.get('sendTo') == doc.userId) {
          doc.activated = true;
        }
        return doc;
      }
      });
    },
    groupAgents: function() {
      return Meteor.presences.find({
        'state.currentGroup': Session.get('currentGroup'),
        'state.isVisitor': {$not: true} 
      });
    },
  },  
  action: function () {
    this.render();
  },

  onRun: function() {
    if (Meteor.user() && Meteor.user().profile.fixedGroup) {
      Meteor.call('joinGroup', Meteor.user().profile.fixedGroup);
    }
  },

  onStop: function() {
    if (Session.get('currentGroup')) {
      Meteor.call('leaveGroup', Session.get('currentGroup'));
    }
  }

});

Deps.autorun(function() {
  var id = Session.get('sendTo');
  if (!Meteor.presences.findOne({'userId': id})) {
    Session.set('sendTo', '');
  }
});

