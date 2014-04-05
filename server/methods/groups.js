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
      var user = Meteor.users.findOne({'_id': userId});
      var name = user.profile ? user.profile.displayName : 'Somebody';
      Meteor.call('notifyGone', groupId, name);
      Meteor.call('expireMessages', userId);
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
  }
});
