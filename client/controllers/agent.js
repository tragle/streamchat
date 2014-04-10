AgentController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('connections')
    Meteor.subscribe('messages', Session.get('currentGroup'));
    Meteor.subscribe('visitors');
    Meteor.subscribe('groups');
  },

  data: {
    currentGroup: function() {
      return Session.get('currentGroup');
    },
    sendTo: function() {
      var id = Session.get('sendTo');
      var user = Meteor.users.findOne(id);
      if (user && user.profile) {
        return user.profile.displayName;
      } 
    },
    groupVisitors: function() {
      return Connections.find({
        'currentGroup': Session.get('currentGroup'),
        'isVisitor': true  
      }, { transform: function(user) {
        if (Filters.isMute(user._id)) {
          user.isMute = true;
        }
        if (Filters.isSolo(user._id)) {
          user.isSolo = true;
        }
        if (Session.get('sendTo') == user._id) {
          user.activated = true;
        }
        return user;
      }
      });
    },
    groupAgents: function() {
      return Connections.find({
        'currentGroup': Session.get('currentGroup'),
        'isVisitor': false
      });
    },
  },  
  action: function () {
    this.render();
  },

  onRun: function() {
    if (!Session.get('currentGroup')) {
      if (Meteor.user() && Meteor.user().profile.fixedGroup) {
        Meteor.call('joinGroup', Meteor.user().profile.fixedGroup);
      } else {
        Meteor.call('findAutoGroup', function(error, groupId) {
          Meteor.call('joinGroup', groupId);
        });
      }
    }
  },

  onStop: function() {
  }

});

Deps.autorun(function() {
  var id = Session.get('sendTo');
  if (!Connections.findOne({'_id': id, 'online':true})) {
    Session.set('sendTo', '');
  }
});

