/*****************************************************************************/
/* Messages Methods */
/*****************************************************************************/

Meteor.methods({
  sendMessage: function(message) {
    return Messages.insert(message);
  },
  sendSystemMessage: function(streamId, body, type, to) {
    var message = new App.Message();
    message.senderName = 'System';
    message.stream = streamId;
    message.body = body;
    message.to = to || '';
    message.type = type || '';
    Meteor.call('sendMessage', message);
  },
  notifyGone: function(streamId, name, to) {
    var body = name + ' is gone.';
    Meteor.call('sendSystemMessage', streamId, body, 'gone', to);
  },
  notifyHere: function(streamId, name, to) {
    var body = name + ' is here.';
    Meteor.call('sendSystemMessage', streamId, body, 'here', to);
  },
  notifyWelcome: function(streamId, name, to) {
    var body = 'Welcome, ' + name + '!';
    Meteor.call('sendSystemMessage', streamId, body, 'welcome', to);
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
