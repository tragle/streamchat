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
//        scrollToBottom('.agent-chatlog');
      }
    });
    return messageData;
  },
  previews : function() {
    var previewData;
    previewData = Meteor.users.find({$and: [{'profile.currentStream': Meteor.user().profile.currentStream}, {'profile.typing': {$ne: ''}}]});
    previewData.observeChanges({
      added: function() {
 //       scrollToBottom('.agent-chatlog');
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
