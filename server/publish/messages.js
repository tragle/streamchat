/*****************************************************************************/
/* Messages Publish Functions
/*****************************************************************************/

Meteor.publish('messages', function (groupId) {
  if (App.isVisitor(this.userId)) {
    return Messages.find({group: groupId, 'isDraft': false, $or: [{to: this.userId}, {from: this.userId}]});
  }
  return Messages.find({group: groupId});
});

Meteor.publish('previews', function(groupId) {
  return Previews.find({'group': groupId});
});
