/*****************************************************************************/
/* Visitor: Event Handlers and Helpers */
/*****************************************************************************/
Template.Visitor.events({
  'click #visitor-logout': function(e) {
    e.preventDefault();
    Meteor.call('leaveGroup', Session.get('currentGroup'), Meteor.userId());
    Meteor.logout();
    Router.go('visitor.entry');
  },
  'submit #visitor-chat-controls': function(e) {
    e.preventDefault();
    var message = new Models.Message();
    var visitor = Meteor.user();
    message.body = $('#visitor-chat-input').val();
    message.body = message.body.trim();
    if (message.body) {
      message.group = Session.get('currentGroup'); 
      message.from = Meteor.userId();
      message.senderName = visitor.profile.displayName;
      message.isVisitor = true; 
      Meteor.call('sendMessage', message);
      Session.set('waitingSince', new Date);
      $('#visitor-chat-input').val('');
      Session.set('typingMessage', '');
    }
  },
  'keyup #visitor-chat-input': function(e) {
    if ($('#visitor-chat-input').val()) {
      Session.set('typingMessage', $('#visitor-chat-input').val());
    } else { 
      Session.set('typingMessage', '');
    }
  }
});

Template.visitorChatlog.helpers({
  messages: function() {
    var messageData;
    var userId = Meteor.userId();
    var groupId = Session.get('currentGroup');
    messageData = Messages.find();
    messageData.observeChanges({
      added: function(id, message) {
        App.scrollToBottom('#visitor-chatlog');
        if (message.to == Meteor.userId() && message.senderName != 'System') {
          Session.set('waitingSince','');
          Session.set('lastResponseFrom', message.senderName);
        }
      }
    });
    return messageData;
  }
});

Deps.autorun(function() {
  var issue = Session.get('issue');
  if (Meteor.userId() && issue) {
    Meteor.call('routeVisitor', issue, function(error, groupId) {
      if (groupId) {
        Session.set('currentGroup', groupId);
        Session.set('waitingSince', new Date);
      } else {
        Router.go('visitor.entry', {'reason':'nogroup'});
      }
    });
  }
});



/*****************************************************************************/
/* Visitor: Lifecycle Hooks */
/*****************************************************************************/
Template.Visitor.created = function () {
};

Template.Visitor.rendered = function () {
};

Template.Visitor.destroyed = function () {
};

Template.visitorChatlog.destroyed = function () {
};;
