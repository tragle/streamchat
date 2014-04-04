/*****************************************************************************/
/* Streams Methods */
/*****************************************************************************/

Meteor.methods({
  addStream: function(stream) {
    App.checkIsAdmin(this.userId);
    return Streams.insert(stream);
  },
  delStream: function(id) {
    App.checkIsAdmin(this.userId);
    Meteor.users.update({'profile.fixedStream':id}, {$set: {'profile.fixedStream': null}}, {multi:true});
    return Streams.remove({'_id':id});
  },
  updateStream: function(id, options) {
    App.checkIsAdmin(this.userId);
    Streams.update({'_id':id},{$set: options});
    return id;
  },
  addFixedUsers: function(streamId, userIds) {
    App.checkIsAdmin(this.userId);
    var result = Meteor.users.update({'_id': {$in: userIds}}, {$set: {'profile.fixedStream': streamId}}, {multi:true});
    return result;
  },
  getStream: function(issue) {
    // get array of streams where online user has this skill
    var streams = Presences.find({'state.online': true, 'state.skills': {$in: [issue]}}).map(function(doc) {
      return doc.state.currentStream;
    });
    // sort by the highest occurences of skill 
    var counts = _.countBy(streams);
    var sorted = {};
    if (counts) {
      for (id in counts) {
        sorted[counts[id]] = id;
      }
      sorted = _.toArray(sorted).reverse();
      return sorted[0];
    }
    return ;
  } 
});
