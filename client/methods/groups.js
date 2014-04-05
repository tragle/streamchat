/*****************************************************************************/
/* Groups Methods */
/*****************************************************************************/

Meteor.methods({
  joinGroup: function(groupId) {
    Session.set('currentGroup', groupId);
  },
  leaveGroup: function() {
      Session.set('currentGroup', null);
      Session.set('chatFocus', null);
  }
});
