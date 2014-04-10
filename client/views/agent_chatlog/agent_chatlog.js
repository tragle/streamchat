/*****************************************************************************/
/* AgentChatlog: Event Handlers and Helpers */
/*****************************************************************************/
Template.AgentChatlog.events({
  'click .message': function(e) {
    if (this.isVisitor) {
      Session.set('sendTo', this.from);
    } else if (this.to) {
      Session.set('sendTo', this.to);
    } else {
      Session.set('sendTo', '');
    }
  }
});

Template.AgentChatlog.helpers({
  messages : function() {
    var messageData;
    var focusId = Session.get('chatFocus');
    var solos;
    if (focusId) {
      solos = [focusId];
    } else {
      solos = Filters.solos().map(function(doc){return doc.userId;});
    }
    var mutes = Filters.mutes().map(function(doc){return doc.userId;});
    if (solos.length) {
      messageData = Messages.find({
        $or: [
          {to: {$in: _.flatten([solos,''])}}, 
          {from: {$in: solos}}
        ]});
    } else {
      messageData = Messages.find({
        $and: [
          {to: {$nin: mutes}}, 
          {from: {$nin: mutes}}
        ]});
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
    var solos;
    var focusId = Session.get('chatFocus');
    if (focusId) {
      solos = [focusId];
    } else {
      solos = Filters.solos().map(function(doc){return doc.userId;});
    }
    var mutes = Filters.mutes().map(function(doc){return doc.userId;});
    if (solos.length) {
      previewData = Connections.find({
          $or: [
            {'chatFocus': {$in: solos}}, 
            {'_id': {$in: solos}}
          ], 
          'typingMessage': {$ne: ''}},
        {$fields: {'displayName': 1, 'typingMessage': 1, 'chatFocusName':1}}
      );
    } else {
      previewData = Connections.find(
        {'currentGroup': Session.get('currentGroup'), 
          'typingMessage': {$ne: ''}},
        {$fields: {'displayName': 1, 'typingMessage': 1, 'chatFocusName':1}}
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
