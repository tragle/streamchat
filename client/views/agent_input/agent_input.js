/*****************************************************************************/
/* AgentInput: Event Handlers and Helpers */
/*****************************************************************************/

Template.AgentInput.events({
  'submit #agent-input-form': function(e) {
    e.preventDefault();
    var message = new Models.Message();
    var agent = Meteor.user();
    message.body = $('#agent-input-message').val();
    message.body = message.body.trim();
    if (Session.get('isDraft')) message.isDraft = true;
    if (message.body) {
      message.group = Session.get('currentGroup');
      message.from =  Meteor.userId();
      message.senderName = agent.profile.displayName;
      if (Session.get('sendTo')) {
        message.to = Session.get('sendTo');
        message.recipientName = Groups.getDisplayName(Session.get('sendTo'));
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
    if (e.which == 27) {
      Session.set('sendTo', '');
      Session.set('chatFocus', '');
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
  },
  'click #agent-input': function(e) {
    //    e.stopPropagation();
    //    Session.set('sendTo', '');
  },
  'click button#agent-shortcuts': function(e) {
    e.preventDefault();
  },
  'click a.agent-shortcuts-add': function(e) {
    e.preventDefault();
    $('a.agent-shortcuts-add').popover();
    $('form.agent-shortcuts-new').on('submit', function(evt) {
      evt.preventDefault();
      var text = $('#agent-input-message').val();
      if (text) {
        var shortcut = new Models.Shortcut();
        shortcut.body = text.trim();
        shortcut.owner = Meteor.userId();
        shortcut.isPublic = $('#agent-shortcuts-add-public').is(':checked');
        if ($('#agent-shortcuts-add-tags').val()) {
          shortcut.tags = $('#agent-shortcuts-add-tags').val().split(' ');
          Shortcuts.insert(shortcut);
          $('a.agent-shortcuts-add').popover('hide');
          $('#agent-input-message').val('');
          $('#agent-input-message').trigger('keyup');
        }
      }
      $('form.agent-shortcuts-new').off('submit');
    });
  },
  'click .agent-input-draft': function(e) {
    e.preventDefault();
    if (Session.get('isDraft')) {
      Session.set('isDraft', null)
    } else {
      Session.set('isDraft', true);
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
    name = Groups.getDisplayName(id);
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
  var options = {};
  options.container = 'body';
  options.placement = 'top';
  options.html = true;
  options.content = '\
  <form class="form-inline agent-shortcuts-new"> \
  <div class="form-group"> \
  <input type="text" class="form-control input-sm" id="agent-shortcuts-add-tags" required placeholder="tags"></div> \
  <div class="form-group"> \
  <input type="checkbox" class="checkbox" checked id="agent-shortcuts-add-public">\
  <label for="agent-shortcuts-add-public"><small>Public?</small></label></div> \
  <button type="submit" class="btn btn-default btn-sm" id="agent-shortcuts-submit">add shortcut</button> \
  </form>';
  $('.agent-shortcuts-add').popover(options);
};

Template.AgentInput.destroyed = function () {
};

