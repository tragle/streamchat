/*****************************************************************************/
/* StreamsIndex Publish Functions
/*****************************************************************************/

Meteor.publish('streams_index', function () {
  return Streams.find();
});

