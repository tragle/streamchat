/*****************************************************************************/
/* AgentInput: Event Handlers and Helpers */
/*****************************************************************************/

Template.AgentInput.events({
  'submit #agent-input-form': function(e) {
    e.preventDefault();
    var message = new App.Message();
    var agent = Meteor.user();
    message.body = $('#agent-input-message').val();
    if (message.body) {
      message.body = message.body.trim();
      message.stream = Session.get('currentStream'); 
      message.from = agent._id;
      message.senderName = agent.profile.displayname;
      if (Session.get('sendTo')) {
        message.to = Session.get('sendTo');
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
      Session.set('typingMessage', '');
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

/*****************************************************************************/
/* AgentInput: Lifecycle Hooks */
/*****************************************************************************/
Template.AgentInput.created = function () {
};

Template.AgentInput.rendered = function () {
};

Template.AgentInput.destroyed = function () {
};

