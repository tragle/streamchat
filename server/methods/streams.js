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
    Meteor.users.update({'_id': {$in: userIds}}, {$set: {'profile.fixedStream': null}});
    return Streams.remove({'_id':id});
  },
  updateStream: function(id, options) {
    App.checkIsAdmin(this.userId);
    Streams.update({'_id':id},{$set: options});
    return id;
  },
  addFixedUsers: function(streamId, userIds) {
    App.checkIsAdmin(this.userId);
    return Meteor.users.update({'_id': {$in: userIds}}, {$set: {'profile.fixedStream': streamId}});
  }
});
