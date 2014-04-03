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
    console.log('getting stream');
    var streams = Meteor.users.find({'roles.skills': {$in: [issue]}}).map(function(doc) {
      console.log('got user:');
      console.log(doc);
      return doc.profile.currentStream;
    }); 
    console.log('got streams:');
    console.log(streams);
    if (streams.length) {
      return streams[0]._id;
    }
  } 
});
