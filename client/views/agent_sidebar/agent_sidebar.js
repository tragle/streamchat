/*****************************************************************************/
/* AgentSidebar: Event Handlers and Helpers */
/*****************************************************************************/
Template.AgentSidebar.events({
  'click #get-agent-stream': function(e) {
    e.preventDefault();
    if (Meteor.user().profile.fixedStream) {
      Session.set('currentStream', Meteor.user().profile.fixedStream);
    }
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
