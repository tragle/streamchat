/*****************************************************************************/
/* Streams: Event Handlers and Helpers */
/*****************************************************************************/
Template.Streams.events({
  'click #add-stream-button': function(e) {
    e.preventDefault();
    var stream = new App.Stream();
    var agentIds = [];
    stream.name = $('#add-stream-name').val();
    stream.maxPerAgent = $('#add-stream-max-per-agent').val() || null;
    stream.maxQueue = $('#add-stream-max-queue').val() || null;
    $('.add-stream-agent-picker input:checked').each(function() { agentIds.push($(this).val()); });
    stream.isFixed = true;
    $('input[id^="add-stream"]').val('');
    Meteor.call('addStream', stream, function(error, streamId) {
      if (streamId && agentIds.length) {
        Meteor.call('addFixedUsers', streamId, agentIds);
      }
      App.flashResult(error, streamId);
    }); 
  },
  'click .delete-stream':function(e) {
    e.preventDefault();
    Meteor.call('delStream', this._id);
  },
  'click .update-stream':function(e) {
    e.preventDefault();
    var agentIds = [];
    var button = e.currentTarget;
    var name = $(button).parents('tr').find('input.stream-name').val();
    var maxPerAgent = $(button).parents('tr').find('input.stream-max-per-agent').val();
    var maxQueue = $(button).parents('tr').find('input.stream-max-agents').val();
    $('.stream-agent-picker input:checked').each(function() { agentIds.push($(this).val()); });
    Meteor.call('updateStream',this._id, {name: name, maxPerAgent: maxPerAgent, maxQueue: maxQueue}, App.flashResult);
    if (agentIds.length) {
      Meteor.call('addFixedUsers', this._id, agentIds);
    }
  },
  'click .stream-agent-picker li, click .add-stream-agent-picker li': function(e) {
    e.stopPropagation();
  }
});

Template.Streams.helpers({
  streams: function() {
    return Streams.find();
  }
});

Template.agentList.helpers({
  agents: function() {
    var streamId = this.streamId;
    var users = Meteor.users.find({'roles.permissions': {$in: ['agent']}}).map(function(doc){
      if (doc.profile.fixedStream == streamId) {
        doc.assigned = true;
      }
      return doc;
    });
    return users;
  }
});

/*****************************************************************************/
/* Streams: Lifecycle Hooks */
/*****************************************************************************/
Template.Streams.created = function () {
};

Template.Streams.rendered = function () {
};

Template.Streams.destroyed = function () {
};
