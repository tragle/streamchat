/*****************************************************************************/
/* Agent: Event Handlers and Helpers */
/*****************************************************************************/
Template.Agent.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Agent.helpers({
});

/*****************************************************************************/
/* Agent: Lifecycle Hooks */
/*****************************************************************************/
Template.Agent.created = function () {
};

Template.Agent.rendered = function () {
  if (!Session.get('currentGroup')) {
    Meteor.call('routeAgent', function(error, result) {
      Session.set('currentGroup', result);
    });
  }
};

Template.Agent.destroyed = function () {
};

Deps.autorun(function() {
  if (!Session.get('currentGroup')) {
    Meteor.call('routeAgent', function(error, result) {
      Session.set('currentGroup', result);
    });
  }
});

