/*****************************************************************************/
/* Messages Publish Functions
/*****************************************************************************/

Meteor.publish('messages', function (streamId) {
  if (streamId) {
    return Messages.find({'stream': streamId});
  }
});
