/*****************************************************************************/
/* Header: Event Handlers and Helpers */
/*****************************************************************************/
Template.Header.events({
  'click #logout': function() {
    Meteor.logout(function() {
      Session.set('currentStream', null);
      Session.set('chatFocus', null);
    });
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
