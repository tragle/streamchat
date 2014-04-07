/*****************************************************************************/
/* Visitor: Event Handlers and Helpers */
/*****************************************************************************/
Template.Visitor.events({
  'click #visitor-logout': function(e) {
    e.preventDefault();
    Meteor.call('leaveGroup', Session.get('currentGroup'), Meteor.userId());
    Session.set('waitingSince', '');
    Session.set('lastResponseFrom', '');
    Meteor.logout();
    Router.go('visitor.entry');
  },
  'submit #visitor-chat-controls': function(e) {
    e.preventDefault();
    var message = new App.Message();
    var visitor = Meteor.user();
    message.body = $('#visitor-chat-input').val();
    if (message.body) {
      message.group = Session.get('currentGroup'); 
      message.from = visitor._id;
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
  var currentGroup = Session.get('currentGroup');
  if (currentGroup) {
    Meteor.subscribe('messages', currentGroup); 
  }
});

Deps.autorun(function() {
  var issue = Session.get('issue');
  if (Meteor.user() && issue) {
    Meteor.call('getGroups', issue, function(error, groups) {
      if (groups && groups.length) {
        Meteor.call('joinGroup', groups[0]);
        Session.set('waitingSince', new Date);
      } else {
        Router.go('visitor.entry');
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
