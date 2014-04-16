/*****************************************************************************/
/* VisitorEntry: Event Handlers and Helpers */
/*****************************************************************************/
Template.VisitorEntry.events({
  'submit #visitor-entry-survey': function(e) {
    e.preventDefault();
    var visitor = new Models.User();
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
  issues: function() {
    var allIssues = [];
    Groups.find({'connections': {$ne: []}}).forEach(function(group) {
      if (group.connections) {
        _.each(group.connections, function(user) {
          allIssues.push(user.skills);
        });
      }
    });
    return _.uniq(_.flatten(allIssues))
  }


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
