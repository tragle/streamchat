/*****************************************************************************/
/* StreamsIndex Publish Functions
/*****************************************************************************/

Meteor.publish('streams_index', function () {
  return Streams.find();
});

Meteor.publish('agents', function() {
  return Meteor.users.find({'roles.permissions': {$in: ['agent']}});
});
