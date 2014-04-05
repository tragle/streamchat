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
    var previewData;
    if (Session.get('chatFocus')) {
      previewData = Meteor.presences.find(
        {'state.online': true, 'state.chatFocus': Session.get('chatFocus'), 'state.typingMessage': {$ne: ''}},
        {$fields: {'state.displayName': 1, 'state.typingMessage': 1}}
      );
    } else {
      previewData = Meteor.presences.find(
        {'state.online': true, 'state.currentGroup': Session.get('currentGroup'), 'state.typingMessage': {$ne: ''}},
        {$fields: {'state.displayName': 1, 'state.typingMessage': 1}}
      );
    }
    previewData.observeChanges({
      added: function() {
        App.scrollToBottom('#agent-chatlog');
      }
    });
    return previewData;
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
