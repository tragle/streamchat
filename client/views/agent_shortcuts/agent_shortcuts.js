/*****************************************************************************/
/* AgentShortcuts: Event Handlers and Helpers */
/*****************************************************************************/
Template.AgentShortcuts.events({
  
  'click .agent-shortcut-body': function(e) {
    e.preventDefault();
    var shortcut = this.body;
    if (shortcut) {
      var input = $('#agent-input-message').val();
      $('#agent-input-message').focus().val(input + shortcut + ' ')
      $('#agent-input-message').trigger('keyup');
    }
  },
  'mouseenter .agent-shortcut': function(e) {
    $(e.currentTarget).children('.agent-shortcut-controls').fadeTo(1,1);
  },
  'mouseleave .agent-shortcut': function(e) {
    $(e.currentTarget).children('.agent-shortcut-controls').fadeTo(1,0);
  },
  'click .agent-shortcut-delete': function(e) {
    e.preventDefault();
    var shortcut = this;
    if (shortcut) {
      Shortcuts.remove(shortcut._id);
    }
  },
  'keyup input.agent-shortcuts-search': function(e) {
    var text = $('input.agent-shortcuts-search').val();
    Session.set('shortcutsSearch', text);
  }
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.AgentShortcuts.helpers({
  shortcuts: function() {
    if (Session.get('shortcutsSearch')) {
      return Shortcuts.find({$or: [
        {'body': {$regex: Session.get('shortcutsSearch'), $options: 'i'}},
        {'tags': {$in: [Session.get('shortcutsSearch')]}}
      ]
      });
    } else {
      return Shortcuts.find();
    }
  }
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* AgentShortcuts: Lifecycle Hooks */
/*****************************************************************************/
Template.AgentShortcuts.created = function () {
};

Template.AgentShortcuts.rendered = function () {
};

Template.AgentShortcuts.destroyed = function () {
};
