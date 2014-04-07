/*****************************************************************************/
/* VisitorEntry: Event Handlers and Helpers */
/*****************************************************************************/
Template.VisitorEntry.events({
  'submit #visitor-entry-survey': function(e) {
    e.preventDefault();
    var visitor = new App.User();
    visitor.username = $('#visitor-email').val();
    visitor.email = $('#visitor-email').val();
    visitor.profile.displayName = $('#visitor-name').val();
    var issue = $('#visitor-issue').val();
    if (issue) {
      Session.set('issue', issue);
    }
    Meteor.loginWithPassword(visitor.username, 'password', function(error) {
      if (error) {
        Meteor.call('addVisitor', visitor, function(error) {
          if (!error) {
            Meteor.loginWithPassword(visitor.username, 'password');
            Router.go('visitor');
          }
        });
      } else {
        Router.go('visitor');
      }
    });
  }
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.VisitorEntry.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* VisitorEntry: Lifecycle Hooks */
/*****************************************************************************/
Template.VisitorEntry.created = function () {
};

Template.VisitorEntry.rendered = function () {
};

Template.VisitorEntry.destroyed = function () {
};
