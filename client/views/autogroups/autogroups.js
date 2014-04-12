/*****************************************************************************/
/* Autogroups: Event Handlers and Helpers */
/*****************************************************************************/
Template.Autogroups.events({
  'submit #autogroup-controls form': function(e) {
    e.preventDefault();
    var maxAgents = $('#auto-max-agents').val();   
    var maxQueue = $('#auto-max-queue').val();   
    var maxAgentVisitors = $('#auto-max-visitors').val();   
    var groupSkills = $('#auto-group-skills').is(':checked') ? true : false;   
    Meteor.call('saveAutoGroupSettings', maxAgents, maxQueue, maxAgentVisitors, groupSkills, function(error, result) {
      App.flashResult(error, 'autogroup-form');
    });
  }
});

Template.Autogroups.helpers({
  settings: function() {
    return AutoGroupSettings.findOne();
  }
});

/*****************************************************************************/
/* Autogroups: Lifecycle Hooks */
/*****************************************************************************/
Template.Autogroups.created = function () {
};

Template.Autogroups.rendered = function () {
};

Template.Autogroups.destroyed = function () {
};
