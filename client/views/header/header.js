/*****************************************************************************/
/* Header: Event Handlers and Helpers */
/*****************************************************************************/
Template.Header.events({
  'click #logout': function() {
    Meteor.call('leaveStream', Session.get('currentStream'), Meteor.userId());
    Meteor.logout();
  }
});

Template.Header.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Header: Lifecycle Hooks */
/*****************************************************************************/
Template.Header.created = function () {
};

Template.Header.rendered = function () {
};

Template.Header.destroyed = function () {
};
