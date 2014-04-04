/*****************************************************************************/
/* AgentChatlog: Event Handlers and Helpers */
/*****************************************************************************/
Template.AgentChatlog.events({
  'click .message': function(e) {
    if (this.isVisitor) {
      Session.set('sendTo', this.from);
    }
  }
});

Template.AgentChatlog.helpers({
  messages : function() {
    var messageData;
    var visitorId = Session.get('chatFocus');
    if (visitorId) {
      messageData = Messages.find({$or: [{to: visitorId}, {from: visitorId}]}); 
    } else {
      messageData = Messages.find();
    }
    messageData.observeChanges({
      added: function() {
        App.scrollToBottom('#agent-chatlog');
      }
    });
    return messageData;
  },
  previews : function() {
    if (Session.get('chatFocus')) {
      return Presences.find(
        {'state.online': true, 'state.chatFocus': Session.get('chatFocus'), 'state.typingMessage': {$ne: ''}},
        {$fields: {'state.displayName': 1, 'state.typingMessage': 1}}
      );
    } else {
      return Presences.find(
        {'state.online': true, 'state.currentStream': Session.get('currentStream'), 'state.typingMessage': {$ne: ''}},
        {$fields: {'state.displayName': 1, 'state.typingMessage': 1}}
      );
    }
  }
});

/*****************************************************************************/
/* AgentChatlog: Lifecycle Hooks */
/*****************************************************************************/
Template.AgentChatlog.created = function () {
};

Template.AgentChatlog.rendered = function () {
};

Template.AgentChatlog.destroyed = function () {
};
