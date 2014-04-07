/*****************************************************************************/
/* Messages Publish Functions
/*****************************************************************************/

Meteor.publish('messages', function (groupId) {
  if (App.isVisitor(this.userId)) {
    return Messages.find({group: groupId, $or: [{to: this.userId}, {from: this.userId}]});
  }
  return Messages.find({group: groupId});
});

