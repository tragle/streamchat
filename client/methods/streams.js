/*****************************************************************************/
/* Streams Methods */
/*****************************************************************************/

Meteor.methods({
  joinStream: function(streamId) {
    Session.set('currentStream', streamId);
  },
  leaveStream: function() {
      Session.set('currentStream', null);
      Session.set('chatFocus', null);
  }
});
