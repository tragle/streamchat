/*****************************************************************************/
/* Messages Methods */
/*****************************************************************************/

Meteor.methods({
  sendMessage: function(message) {
    return Messages.insert(message);
  },
  removeDraft: function(messageId) {
    return Messages.update({'_id': messageId}, {$set: {isDraft: false}});
  },
  sendSystemMessage: function(groupId, body, type, to) {
    var message = new Models.Message();
    message.senderName = 'System';
    message.group = groupId;
    message.body = body;
    message.to = to || '';
    message.type = type || '';
    Meteor.call('sendMessage', message);
  },
  notifyGone: function(groupId, name, to) {
    var body = name + ' is gone.';
    Meteor.call('sendSystemMessage', groupId, body, 'gone', to);
  },
  notifyHere: function(groupId, name, to) {
    var body = name + ' is here.';
    Meteor.call('sendSystemMessage', groupId, body, 'here', to);
  },
  notifyWelcome: function(groupId, name, to) {
    var body = 'Welcome, ' + name + '!';
    Meteor.call('sendSystemMessage', groupId, body, 'welcome', to);
  },
  expireMessages: function(userId) {
    if (userId) {
      console.log('expiring messages for user ' + userId);
      return  Messages.update(
        // assign expiration date to this user's messages which are not already expired
        {$or: [{from: userId}, {to: userId}], expired: {$not: {$type: 9}}},
        {$set: {expired: new Date}},
        {multi: true}
      );
    }
  }
});
