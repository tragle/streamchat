/*****************************************************************************/
/* AgentSidebar: Event Handlers and Helpers */
/*****************************************************************************/
Template.AgentSidebar.events({
});

Template.AgentSidebar.helpers({
  connection: function() { return Meteor.status().status; }
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
