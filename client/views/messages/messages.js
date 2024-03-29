/*****************************************************************************/
/* Messages: Event Handlers and Helpers */
/*****************************************************************************/
Template.Messages.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Messages.helpers({
  messages: function() {
    return Messages.find();
  }
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* MessagesIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.Messages.created = function () {
};

Template.Messages.rendered = function () {
};

Template.Messages.destroyed = function () {
};
