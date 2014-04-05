/*****************************************************************************/
/* Messages Publish Functions
/*****************************************************************************/

Meteor.publish('messages', function (streamId) {
  return Messages.find({stream: streamId});
});

