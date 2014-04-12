/*****************************************************************************/
/* Groups: Event Handlers and Helpers */
/*****************************************************************************/
Template.Groups.events({
  'click #add-group-button': function(e) {
    e.preventDefault();
    var group = new Models.Group();
    var agentIds = [];
    group.name = $('#add-group-name').val();
    group.maxAgentVisitors = $('#add-group-max-per-agent').val() || 0;
    group.maxQueue = $('#add-group-max-queue').val() || 0;
    $('.add-group-agent-picker input:checked').each(function() { agentIds.push($(this).val()); });
    group.isFixed = true;
    $('input[id^="add-group"]').val('');
    Meteor.call('addGroup', group, function(error, groupId) {
      if (groupId && agentIds.length) {
        Meteor.call('addFixedUsers', groupId, agentIds);
      }
      App.flashResult(error, groupId);
    }); 
  },
  'click .delete-group':function(e) {
    e.preventDefault();
    Meteor.call('delGroup', this._id);
  },
  'click .update-group':function(e) {
    e.preventDefault();
    var agentIds = [];
    var button = e.currentTarget;
    var name = $(button).parents('tr').find('input.group-name').val();
    var maxAgentVisitors = $(button).parents('tr').find('input.group-max-per-agent').val();
    var maxQueue = $(button).parents('tr').find('input.group-max-agents').val();
    $('.group-agent-picker input:checked').each(function() { agentIds.push($(this).val()); });
    Meteor.call('updateGroup',this._id, {name: name, maxAgentVisitors: maxAgentVisitors, maxQueue: maxQueue}, App.flashResult);
    if (agentIds.length) {
      Meteor.call('addFixedUsers', this._id, agentIds);
    }
  },
  'click .group-agent-picker li, click .add-group-agent-picker li': function(e) {
    e.stopPropagation();
  }
});

Template.Groups.helpers({
  groups: function() {
    return Groups.find();
  }
});

Template.agentList.helpers({
  agents: function() {   // not reactive!
    var groupId = this.groupId;
    var users = Meteor.users.find({'roles.permissions': {$in: ['agent']}}).map(function(doc){
      if (doc.profile.fixedGroup == groupId) {
        doc.assigned = true;
      }
      return doc;
    });
    return users;
  }
});

/*****************************************************************************/
/* Groups: Lifecycle Hooks */
/*****************************************************************************/
Template.Groups.created = function () {
};

Template.Groups.rendered = function () {
};

Template.Groups.destroyed = function () {
};
