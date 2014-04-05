/*****************************************************************************/
/* Streams Methods */
/*****************************************************************************/

Meteor.methods({
  addStream: function(stream) {
    App.checkIsAdmin(this.userId);
    console.log('adding stream ' + stream);
    return Streams.insert(stream);
  },
  delStream: function(id) {
    App.checkIsAdmin(this.userId);
    console.log('deleting stream ' + id);
    Meteor.users.update({'profile.fixedStream':id}, {$set: {'profile.fixedStream': null}}, {multi:true});
    return Streams.remove({'_id':id});
  },
  updateStream: function(id, options) {
    App.checkIsAdmin(this.userId);
    console.log('updating stream ' + id);
    console.log(options);
    Streams.update({'_id':id},{$set: options});
    return id;
  },
  addFixedUsers: function(streamId, userIds) {
    App.checkIsAdmin(this.userId);
    console.log('adding fixed users to stream ' + streamId);
    console.log(userIds);
    var result = Meteor.users.update({'_id': {$in: userIds}}, {$set: {'profile.fixedStream': streamId}}, {multi:true});
    return result;
  },
  joinStream: function(streamId, userId) {
    if (!userId) {
      userId = this.userId;
    }
    console.log(userId + 'joining stream ' + streamId);
    var user = Meteor.users.findOne({'_id': userId});
    var name = user.profile ? user.profile.displayName : 'Somebody';
    Meteor.call('notifyHere', streamId, name);
    if (user.roles && 'visitor' in user.roles.permissions) {
      Meteor.call('notifyWelcome', streamId, name, userId);
    }
  },
  leaveStream: function(streamId, userId) {
    if (!userId) {
      userId = this.userId;
    }
    if (userId && streamId) {
      console.log(userId + ' leaving stream ' + streamId);
      var user = Meteor.users.findOne({'_id': userId});
      var name = user.profile ? user.profile.displayName : 'Somebody';
      Meteor.call('notifyGone', streamId, name);
      Meteor.call('expireMessages', userId);
    }
  },
  getStreams: function(skill) {
    console.log('getting streams for ' + skill);
    var points;
    function skillPoints(skill) {
      if (skill) {
        // get array of streams where online user has this skill
        var streams = Meteor.presences.find({'state.online': true, 'state.skills': {$in: [skill]}}).map(function(doc) {
          return doc.state.currentStream;
        });
        // get the number of users with that skill in each 
        var counts = _.countBy(streams);
        return counts; 
      }
    };
    points = skillPoints(skill);
    // sort by points
    var sortedStreams= {};
    if (points) {
      for (id in points) {
        sortedStreams[points[id]] = id;
      }
      sortedStreams= _.toArray(sortedStreams).reverse();
      console.log(sortedStreams);
      return sortedStreams;
    }
  }
});
