/*****************************************************************************/
/* Visitor: Event Handlers and Helpers */
/*****************************************************************************/
Template.Visitor.events({
  'submit #visitor-entry-survey': function(e) {
    e.preventDefault();
    var visitor = new App.User();
    visitor.username = $('#visitor-email').val();
    visitor.email = $('#visitor-email').val();
    visitor.profile.displayname = $('#visitor-name').val();
    var issue = $('#visitor-issue').val();
    if (issue) {
      Session.set('issue', issue);
    }
    Meteor.loginWithPassword(visitor.username, 'password', function(err) {
      if (err) {
        Meteor.call('addVisitor', visitor, function(err) {
          if (!err) {
            Meteor.loginWithPassword(visitor.username, 'password');
          }
        });
      } 
    });
  },
  'click #visitor-logout': function(e) {
    e.preventDefault();
    Meteor.logout();
  },
  'submit .visitor-chat-controls': function(e) {
    e.preventDefault();
    var message = new App.Message();
    var visitor = Meteor.user();
    message.body = $('#visitor-chat-input').val();
    if (message.body) {
      message.stream = visitor.profile.currentStream;
      message.from = visitor._id;
      message.senderName = visitor.profile.displayname;
      message.isVisitor = true; 
      Meteor.call('sendMessage', message);
      $('#visitor-chat-input').val('');
      Meteor.call('setTyping', '');
    }
  },
  'keyup #visitor-chat-input': function(e) {
    if ($('#visitor-chat-input').val()) {
      Meteor.call('setTyping', $('#visitor-chat-input').val());
    } else { 
      Meteor.call('setTyping', '');
    }
  }
});

Template.Visitor.helpers({
  messages: function() {
    var userId = Meteor.userId();
    var streamId = Session.get('currentStream');
    return Messages.find({$or: [{to: userId}, {from: userId}]});
  }
});

Deps.autorun(function() {
  var issue = Session.get('issue');
  if (issue) {
    Meteor.call('getStream', issue, function(error, streamId) {
      if (streamId) {
        Session.set('currentStream', streamId);
      }
    });
  }
});

Deps.autorun(function() {
  var currentStream = Session.get('currentStream');
  if (currentStream) {
    Meteor.call('joinStream', currentStream); 
    Meteor.subscribe('messages', currentStream); 
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
