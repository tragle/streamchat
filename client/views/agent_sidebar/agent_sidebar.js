/*****************************************************************************/
/* AgentSidebar: Event Handlers and Helpers */
/*****************************************************************************/
Template.AgentSidebar.events({
  'click .visitor-mute': function(e) {
    e.stopPropagation();
    var userId = this._id;
    if (Filters.isMute(userId)) {
      Filters.unMute(userId);
    } else {
      Filters.setMute(userId);
    }
  },
  'click .visitor-solo': function(e) {
    e.stopPropagation();
    var userId = this._id;
    if (Filters.isSolo(userId)) {
      Filters.unSolo(userId);
    } else {
      Filters.setSolo(userId);
    }
  },
  'click .visitor-channel': function(e) {
    e.preventDefault();
    Session.set('sendTo', this._id);
  }
});

Template.AgentSidebar.helpers({
  connection: function() { return Meteor.status().status; },
  filters: function() {return Filters.find();},
  groupName: function() {
    group = Groups.findOne({'_id': Session.get('currentGroup')});
    if (group) {
      return group.name;
    }
  }
});

/*****************************************************************************/
/* AgentSidebar: Lifecycle Hooks */
/*****************************************************************************/
Template.AgentSidebar.created = function () {
};

Template.AgentSidebar.rendered = function () {
  $('#agent-sidebar .nav a:first').tab('show');
};

Template.AgentSidebar.destroyed = function () {
};
