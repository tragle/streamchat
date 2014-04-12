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
      solos = Filters.solos().map(function(user){return user._id;});
    }
    var mutes = Filters.mutes().map(function(user){return user._id;});
    if (solos.length) {
      messageData = Messages.find({
        $or: [
          {to: {$in: solos}}, 
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
    var previewData = [];
    var solos;
    var focusId = Session.get('chatFocus');
    if (focusId) {
      solos = [focusId];
    } else {
      solos = Filters.solos().map(function(user){return user._id;});
    }
    var mutes = Filters.mutes().map(function(user){return user._id;});
    if (solos.length) {
      previewData = Previews.find({
        'group': Session.get('currentGroup'),
        'body': {$ne: ''},
        'toId': {$in: solos}
      });
    } else {
      previewData = Previews.find({
        'group': Session.get('currentGroup'),
        'body': {$ne: ''},
        'toId': {$nin: mutes}
      });
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
