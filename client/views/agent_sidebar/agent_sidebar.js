/*****************************************************************************/
/* AgentSidebar: Event Handlers and Helpers */
/*****************************************************************************/
Template.AgentSidebar.events({
  'click #get-agent-stream': function(e) {
    e.preventDefault();
    var streamId;
    if (Meteor.user().profile.fixedStream) {
      streamId = Meteor.user().profile.fixedStream;
    }
    Meteor.call('joinStream', streamId);
  }
});

Template.AgentSidebar.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
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
