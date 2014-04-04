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
  getStreams: function(skill) {
    console.log('getting streams for ' + skill);
    var points;
    function skillPoints(skill) {
      if (skill) {
        // get array of streams where online user has this skill
        var streams = Presences.find({'state.online': true, 'state.skills': {$in: [skill]}}).map(function(doc) {
          return doc.state.currentStream;
        });
        // consolidate by number of users with skill 
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
