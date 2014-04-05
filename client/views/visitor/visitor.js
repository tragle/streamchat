/*****************************************************************************/
/* Visitor: Event Handlers and Helpers */
/*****************************************************************************/
Template.Visitor.events({
  'submit #visitor-entry-survey': function(e) {
    e.preventDefault();
    var visitor = new App.User();
    visitor.username = $('#visitor-email').val();
    visitor.email = $('#visitor-email').val();
    visitor.profile.displayName = $('#visitor-name').val();
    var issue = $('#visitor-issue').val();
    if (issue) {
      Session.set('issue', issue);
    }
    Meteor.loginWithPassword(visitor.username, 'password', function(error) {
      if (error) {
        Meteor.call('addVisitor', visitor, function(error) {
          if (!error) {
            Meteor.loginWithPassword(visitor.username, 'password');
          }
        });
      } 
    });
  },
  'click #visitor-logout': function(e) {
    e.preventDefault();
    Meteor.call('leaveGroup', Session.get('currentGroup'), Meteor.userId());
    Meteor.logout();
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
    messageData = Messages.find({group: groupId, $or: [{to: userId}, {from: userId}]});
    messageData.observeChanges({
      added: function() {
        App.scrollToBottom('#visitor-chatlog');
      }
    });
    return messageData;
  }
});

Deps.autorun(function() {
  var issue = Session.get('issue');
  if (Meteor.user() && issue) {
    Meteor.call('getGroups', issue, function(error, groups) {
      if (groups && groups.length) {
        Meteor.call('joinGroup', groups[0]);
      }
    });
  }
});

Deps.autorun(function() {
  var currentGroup = Session.get('currentGroup');
  if (currentGroup) {
    Meteor.subscribe('messages', currentGroup); 
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
