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
  },
  'mouseover .message': function(e) {
    var el = e.currentTarget;
    $(el).children('.message-shortcut-add').fadeTo(1,1);
  },
  'mouseleave .message': function(e) {
    var el = e.currentTarget;
    $(el).children('.message-shortcut-add').fadeTo(1,0);
  },
  'click a.send-draft': function(e) {
    e.preventDefault();
    e.stopPropagation();
    Meteor.call('removeDraft', this._id);
  },
  'mouseover a.message-shortcut-add': function(e) {
    var el = e.currentTarget;
    var options = {};
    options.container = 'body';
    options.placement = 'right';
    options.html = true;
    options.content = '\
    <form class="form-inline message-shortcut-new"> \
    <div class="form-group"> \
    <input type="text" class="form-control input-sm" id="message-shortcut-add-tags" required placeholder="tags"></div> \
    <div class="form-group"> \
    <input type="checkbox" class="checkbox" checked id="message-shortcut-add-public">\
    <label for="message-shortcut-add-public"><small>Public?</small></label></div> \
    <button type="submit" class="btn btn-default btn-sm" id="message-shortcut-submit">add shortcut</button> \
    </form>';
    $(el).popover(options);
  },
  'click a.message-shortcut-add': function(e) {
    e.preventDefault();
    e.stopPropagation();
    var el = e.currentTarget;
    var self = this;
    $('form.message-shortcut-new').on('submit', function(evt) {
      evt.preventDefault();
      var text = self.body ;
      if (text) {
        var shortcut = new Models.Shortcut();
        shortcut.body = text.trim();
        shortcut.owner = Meteor.userId();
        shortcut.isPublic = $('#message-shortcut-add-public').is(':checked');
        if ($('#message-shortcut-add-tags').val()) {
          shortcut.tags = $('#message-shortcut-add-tags').val().split(' ');
          Shortcuts.insert(shortcut);
          $(el).popover('hide');
        }
      }
      $('form.message-shortcuts-new').off('submit');
    });
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
