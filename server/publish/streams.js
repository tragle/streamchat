/*****************************************************************************/
/* Streams Publish Functions
/*****************************************************************************/

Meteor.publish('streams', function () {
  return Streams.find();
});

