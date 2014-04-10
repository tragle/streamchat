/*****************************************************************************/
/* AgentInput: Event Handlers and Helpers */
/*****************************************************************************/

Template.AgentInput.events({
  'submit #agent-input-form': function(e) {
    e.preventDefault();
    var message = new App.Message();
    var agent = Meteor.user();
    message.body = $('#agent-input-message').val();
    message.body = message.body.trim();
    if (message.body) {
      message.group = Session.get('currentGroup');
      message.from =  Meteor.userId();
      message.senderName = agent.profile.displayName;
      if (Session.get('sendTo')) {
        message.to = Session.get('sendTo');
        var visitor = Meteor.users.findOne({'_id': message.to});
        if (visitor && visitor.profile) {
          message.recipientName = visitor.profile.displayName;
        }
      }
      Meteor.call('sendMessage', message);
      Session.set('typingMessage', '');
      $('#agent-input-message').val('');
    }
  },
  'keyup #agent-input-message': function(e) {
    if (e.which == 13) {
      $('#agent-input-form').submit();
    }
    if ($('#agent-input-message').val() && Session.get('sendTo')) {
      Session.set('chatFocus', Session.get('sendTo'));
    }
    if ($('#agent-input-message').val()) {
      Session.set('typingMessage', $('#agent-input-message').val());
    } else { 
      Session.set('chatFocus', null);
      Session.set('typingMessage', '')
    }
  }
});

Template.AgentInput.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

Deps.autorun(function() {
  var id = Session.get('chatFocus');
  var name = '';
  if (id) {
    var user = Meteor.users.findOne(id);
    name = user.profile.displayName;
  }
  Session.set('chatFocusName', name);
});

Deps.autorun(function() {
  var currentGroup = Session.get('currentGroup');
  if (currentGroup) {
    Meteor.subscribe('messages', currentGroup); 
  }
});

/*****************************************************************************/
/* AgentInput: Lifecycle Hooks */
/*****************************************************************************/
Template.AgentInput.created = function () {
};

Template.AgentInput.rendered = function () {
};

Template.AgentInput.destroyed = function () {
};

