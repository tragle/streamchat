AgentController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('messages', Session.get('currentGroup'));
    Meteor.subscribe('previews', Session.get('currentGroup'));
    Meteor.subscribe('groups', Session.get('currentGroup'));
    Meteor.subscribe('shortcuts');
  },

  data: {
    currentGroup: function() {
      return Session.get('currentGroup');
    },
    sendTo: function() {
      var id = Session.get('sendTo');
      return Groups.getDisplayName(id);
    },
    groupVisitors: function() {
      var group = Groups.findOne(Session.get('currentGroup'));
      if (group && group.connections) {
        visitors = _.filter(group.connections, function(user) {
          return user.isVisitor;
        });
        return _.map(visitors, function(visitor) {
          if (Filters.isMute(visitor._id)) {
            visitor.isMute = true;
          }
          if (Filters.isSolo(visitor._id)) {
            visitor.isSolo = true;
          }
          if (visitor._id == Session.get('sendTo')) {
            visitor.activated = true;
          }
          return visitor;
        });
      }
    },
    groupAgents: function() {
      var group = Groups.findOne(Session.get('currentGroup'));
      if (group && group.connections) {
        return _.filter(group.connections, function(user) {
          return !user.isVisitor;
        });
      }
    },
    isDraft: function() {
      return !!Session.get('isDraft');
    }
    /*
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
       */
    /*
       return Connections.find({
       'currentGroup': Session.get('currentGroup'),
       'isVisitor': false
       });
       },
       */
  },

  action: function () {
    this.render();
  },

  onRun: function() {
  },
  /*if (!Session.get('currentGroup')) {
    if (Meteor.user() && Meteor.user().profile.fixedGroup) {
    Meteor.call('joinGroup', Meteor.user().profile.fixedGroup);
    } else {
    Meteor.call('findAutoGroup', function(error, groupId) {
    Meteor.call('joinGroup', groupId);
    });
    }
    }*/

  onStop: function() {
    if (Session.get('currentGroup')) {
      Meteor.call('leaveGroup', Session.get('currentGroup'));
    }
    Session.set('currentGroup', '');
  }

});
/*
   Deps.autorun(function() {
   var id = Session.get('sendTo');
   if (!Connections.findOne({'_id': id, 'online':true})) {
   Session.set('sendTo', '');
   }
   });
   */

