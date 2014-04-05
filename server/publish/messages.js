/*****************************************************************************/
/* Messages Publish Functions
/*****************************************************************************/

Meteor.publish('messages', function (groupId) {
  return Messages.find({group: groupId});
});

