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
      Connections.update({'_id': userId}, {$set: {currentGroup: groupId}});
      var user = Meteor.users.findOne(userId);
      var name = user.profile ? user.profile.displayName : 'Somebody';
      Meteor.call('notifyHere', groupId, name);
      if (App.isVisitor(userId)) {
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
      Connections.update({'_id': userId}, {$set: {currentGroup: null}});
      var user = Meteor.users.findOne(userId);
      var name = user.profile ? user.profile.displayName : 'Somebody';
      Meteor.call('notifyGone', groupId, name);
      if (App.isVisitor(userId)) {
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
        var groups = Connections.find({'online': true, 'skills': {$in: [skill]}}).map(function(doc) {
          console.log(doc);
          return doc.currentGroup;
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
    // get autogroups
    var groups = Groups.find({
      'isFixed': false
    }).map(function(group) {
      group.score = 0;
      var agents = Connections.find({'isVisitor': false, 'currentGroup': group._id});
      if (settings.groupSkills) {
        agents.forEach(function(agent) {
          // give 1 point for each matching skill
          var sameSkills = _.intersection(agent.skills, user.skills);
          group.score += sameSkills.length;
        });
      }
      // give 1 point for each available slot
      var headroom = maxAgents - agents.count();
      if (headroom <= 0) {
        group.isFull = true;
      }
      group.score += headroom;
      // give 1 point for each visitor in queue
      var queue = Connections.find({'isVisitor': true, 'currentGroup': group._id, 'queued': true});
      group.score += queue.count();
      return group;
    });
    // remove groups already full of agents
    var availableGroups = _.reject(groups, function(group) { return group.isFull == true;});
    console.log(availableGroups);
    if (availableGroups.length) {
      return availableGroups[0]._id;
    } else {
      return Meteor.call('addAutoGroup');
    }
  },
  addAutoGroup: function() {
    var group = new App.Group();
    var autoGroupCount = Groups.find({'isFixed': false}).count();
    group.name = 'autogroup ' + ++autoGroupCount;
    return Groups.insert(group);
  }
});
