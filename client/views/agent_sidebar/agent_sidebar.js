/*****************************************************************************/
/* AgentSidebar: Event Handlers and Helpers */
/*****************************************************************************/
Template.AgentSidebar.events({
  'click .visitor-mute': function(e) {
    e.stopPropagation();
    var userId = this.userId;
    if (Filters.isMute(userId)) {
      Filters.unMute(userId);
    } else {
      Filters.setMute(userId);
    }
  },
  'click .visitor-solo': function(e) {
    e.stopPropagation();
    var userId = this.userId;
    if (Filters.isSolo(userId)) {
      Filters.unSolo(userId);
    } else {
      Filters.setSolo(userId);
    }
  },
  'click .visitor-channel': function(e) {
    e.preventDefault();
    Session.set('sendTo', this.userId);
  }
});

Template.AgentSidebar.helpers({
  connection: function() { return Meteor.status().status; },
  filters: function() {return Filters.find();}
});

/*****************************************************************************/
/* AgentSidebar: Lifecycle Hooks */
/*****************************************************************************/
Template.AgentSidebar.created = function () {
};

Template.AgentSidebar.rendered = function () {
};

Template.AgentSidebar.destroyed = function () {
};
