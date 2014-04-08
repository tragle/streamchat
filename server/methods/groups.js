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
  joinGroup: function(groupId, userId) {
    if (!userId) {
      userId = this.userId;
    }
    if (userId && groupId) {
      console.log(userId + ' joining group ' + groupId);
      if (App.isVisitor(userId)) {
        Groups.update({'_id': groupId}, {$push: {visitors: userId}, $inc: {visitorCount: 1}});
      } else {
        Groups.update({'_id': groupId}, {$push: {agents: userId}, $inc: {agentCount: 1}});
      }
      var user = Meteor.users.findOne({'_id': userId});
      var name = user.profile ? user.profile.displayName : 'Somebody';
      Meteor.call('notifyHere', groupId, name);
      if (user.roles && _.contains(user.roles.permissions, 'visitor')) {
        Meteor.call('notifyWelcome', groupId, name, userId);
      }
    }
  },
  leaveGroup: function(groupId, userId) {
    if (!userId) {
      userId = this.userId;
    }
    if (userId && groupId) {
      console.log(userId + ' leaving group ' + groupId);
      if (App.isVisitor(userId)) {
        Groups.update({'_id': groupId}, {$pull: {visitors: userId}, $inc: {visitorCount: -1}});
      } else {
        Groups.update({'_id': groupId}, {$pull: {agents: userId}, $inc: {agentCount: -1}});
      }
      var user = Meteor.users.findOne({'_id': userId});
      var name = user.profile ? user.profile.displayName : 'Somebody';
      Meteor.call('notifyGone', groupId, name);
      if (App.isVisitor(this.userId)) {
        Meteor.call('expireMessages', userId);
      }
    }
  },
  getGroups: function(skill) {
    console.log('getting groups for ' + skill);
    var points;
    function skillPoints(skill) {
      if (skill) {
        // get array of groups where online user has this skill
        var groups = Meteor.presences.find({'state.online': true, 'state.skills': {$in: [skill]}}).map(function(doc) {
          return doc.state.currentGroup;
        });
        // get the number of users with that skill in each 
        var counts = _.countBy(groups);
        return counts; 
      }
    };
    points = skillPoints(skill);
    // sort by points
    var sortedGroups= {};
    if (points) {
      for (id in points) {
        sortedGroups[points[id]] = id;
      }
      sortedGroups= _.toArray(sortedGroups).reverse();
      console.log(sortedGroups);
      return sortedGroups;
    }
  },
  saveAutoGroupSettings: function(maxAgents, maxQueue, groupSkills) { 
    App.checkIsAdmin(this.userId);
    return AutoGroupSettings.upsert({}, {$set: {'maxAgents': maxAgents, 'maxQueue': maxQueue, 'groupSkills': groupSkills}});
  },
  findAutoGroup: function() {
    App.checkIsAgent(this.userId);
    var user = Meteor.users.findOne({'_id': this.userId});
    var settings = AutoGroupSettings.findOne();
    var maxAgents = settings.maxAgents;
    // get autogroups that are not already full


    var groups = Groups.find({
      'isFixed': false
    }).map(function(group) {
      group.score = 0;
      var agents = group.agents;
      if (settings.joinSkill) {
        Meteor.users.find({
          '_id': {$in: agents},
        }).map(function(agent) {
          // give 1 point for each matching skill
          var sameSkills = _.intersection(agent.skills, user.skills);
          group.score += sameSkills.length;
        });
      }
      // give 1 point for each available slot
      var headroom = maxAgents - group.agentCount;
      group.score += headroom;
      // give 1 point for each visitor in queue
      group.score += group.queueCount;
      return group;
    });
    if (groups.length) {
      return groups[0];
    } else {
      return Meteor.call('addAutoGroup');
    }
  },
  addAutoGroup: function() {
    var group = new App.Group();
    return Groups.insert(group);
  }
});
