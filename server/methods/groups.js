/*****************************************************************************/
/* Groups Methods */
/*****************************************************************************/

Meteor.methods({
  addGroup: function(group) {
    App.checkIsAdmin(this.userId);
    console.log('adding group');
    return Groups.insert(group);
  },
  delGroup: function(id) {
    App.checkIsAdmin(this.userId);
    console.log('deleting group ' + id);
    Meteor.users.update({'profile.fixedGroup':id}, {$set: {'profile.fixedGroup': null}}, {multi:true});
    return Groups.remove({'_id':id});
  },
  updateGroup: function(id, options) {
    App.checkIsAdmin(this.userId);
    console.log('updating group ' + id);
    console.log(options);
    Groups.update({'_id':id},{$set: options});
    return id;
  },
  addFixedUsers: function(groupId, userIds) {
    App.checkIsAdmin(this.userId);
    console.log('adding fixed users to group ' + groupId);
    console.log(userIds);
    var result = Meteor.users.update({'_id': {$in: userIds}}, {$set: {'profile.fixedGroup': groupId}}, {multi:true});
    return result;
  },
  joinGroup: function(groupId, connection) {
    var userId = this.userId;
    if (userId && groupId) {
      console.log(userId + ' joining group ' + groupId);
      Groups.update({'connections._id': userId}, {$pull: {'connections': {'_id': userId}}});
      Groups.update({'queue._id': userId}, {$pull: {'queue': {'_id': userId}}});
      var group = Groups.findOne(groupId);
      var visitorHeadroom = Meteor.call('getVisitorHeadroom', groupId);
      if (!group) return;
      if (App.isVisitor(userId)) {
        if (visitorHeadroom <= 0 || group.queue.length) {
          return Groups.update(
            {'_id': groupId},
            {$push: {'queue': connection}}
          );
        }
      }
      return Groups.update(
        {'_id': groupId},
        {$push: {'connections': connection}}
      );
    }
  },
  leaveGroup: function(groupId, userId) {
    if (!userId) {
      userId = this.userId;
    }
    console.log(userId + ' leaving group ' + groupId);
    Groups.update(
      {'_id': groupId},
      {$pull: {'connections': {'_id': userId}}}
    );
    Groups.update(
      {'_id': groupId},
      {$pull: {'queue': {'_id': userId}}}
    );
    if (userId && groupId) {
      Meteor.call('expireMessages', userId);
    }
  },
  getVisitorHeadroom: function(groupId) {
    var group = Groups.findOne(groupId);
    var settings = AutoGroupSettings.findOne();
    var headroom;
    var maxAgentVisitors;
    if (group.isFixed) {
      maxAgentVisitors = group.maxAgentVisitors || 0;
    } else {
      maxAgentVisitors = settings.maxAgentVisitors || 0;
    }
    var visitors = _.filter(group.connections, function(user) {
      return !!user.isVisitor;
    });
    var numVisitors = visitors.length;
    var numAgents = group.connections.length - visitors.length;
    headroom = (maxAgentVisitors * numAgents) - numVisitors; 
    return headroom;
  },
  getQueueHeadroom: function(groupId) {
    var group = Groups.findOne(groupId);
    var settings = AutoGroupSettings.findOne();
    var headroom;
    if (group.isFixed) {
      maxQueue = group.maxQueue || 0;
    } else {
      maxQueue = settings.maxQueue || 0;
    }
    var queueDepth = group.queue.length || 0;
    headroom = maxQueue - queueDepth;
    return headroom;
  },
  routeVisitor: function(skill) {
    console.log('Routing ' + this.userId + ' to skill ' + skill);
    var foundId = '';
    var groups = Groups.find({ 'connections.skills': {$in: [skill]}}).map(function(group) {
      var skilledAgents = _.filter(group.connections, function(user) {
        return _.contains(user.skills, skill);
      });
      var headroom = Meteor.call('getVisitorHeadroom', group._id);
      group.points = 0;
      group.ponts += skilledAgents.length || 0;
      group.points += headroom || 0;
      group.queueSlots = Meteor.call('getQueueHeadroom', group._id);
      group.fullGroup = !!((headroom + group.queueSlots <= 0) || skilledAgents.length <= 0);
      return group;
    });
    groups = _.reject(groups, function(group) {return !!group.fullGroup;});
    if (groups) {
      var pointsTable = _.groupBy(groups, function(group) {return group.points;});
      var topScore = _.max(_.keys(pointsTable));
      var topGroups = [];
      if (topScore) {
        topGroups = pointsTable[topScore];
      } 
      if (topGroups && topGroups.length) {
        if (topGroups.length > 1) {
          var queueSlotsTable = _.groupBy(topGroups, function(group) {return group.queueSlots;});
          var bestQueue = _.max(_keys(queueSlotsTable));
          if (queueSlotsTable[bestQueue]) {
            foundId = queueSlotsTable[bestQueue]._id;
          }
        } else {
          foundId = topGroups[0]._id;
        }
      }
    }
    if (foundId) console.log('Found group: ' + foundId);
    if (!foundId) console.log('No group found.');
    return foundId;
  },  
  saveAutoGroupSettings: function(maxAgents, maxQueue, maxAgentVisitors, groupSkills) { 
    App.checkIsAdmin(this.userId);
    return AutoGroupSettings.upsert({}, {$set: {'maxAgents': maxAgents, 'maxAgentVisitors': maxAgentVisitors, 'maxQueue': maxQueue, 'groupSkills': groupSkills}});
  },
  routeAgent: function() {
    App.checkIsAgent(this.userId);
    console.log('Routing agent ' + this.userId + ' to group.');
    var foundGroup = '';
    var user = Meteor.users.findOne({'_id': this.userId});
    if (user.profile && user.profile.fixedGroup) {
      console.log('Agent belongs to a fixed group.');
      foundGroup = user.profile.fixedGroup; 
    } else {
      var settings = AutoGroupSettings.findOne();
      var maxAgents = settings.maxAgents;
      var groups = Groups.find({
        'isFixed': false
      }).map(function(group) {
        group.score = 0;
        var agents = _.filter(group.connections, function(user) {return user.isVisitor == false;});
        if (settings.groupSkills) {
          agents.forEach(function(agent) {
            var sameSkills = _.intersection(agent.skills, user.skills);
            group.score += sameSkills.length;
          });
        }
        var headroom = maxAgents - agents.length;
        if (headroom <= 0) {
          group.isFull = true;
        }
        group.score += headroom;
        group.score += group.queue.length;
        return group;
      });
      var availableGroups = _.reject(groups, function(group) { return group.isFull == true;});
      if (availableGroups.length) {
        foundGroup = availableGroups[0]._id;
      } else {
        foundGroup = Meteor.call('addAutoGroup');
      }
    }
    if (foundGroup) {
      console.log('Found group ' + foundGroup);
    } else {
      console.log('No group found.');
    }
    return foundGroup;
  },
  addAutoGroup: function() {
    console.log('Adding autogroup');
    var group = new Models.Group();
    var autoGroupCount = Groups.find({'isFixed': false}).count();
    group.name = 'autogroup ' + ++autoGroupCount;
    return Groups.insert(group);
  }
});
