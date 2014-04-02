/*****************************************************************************/
/* Messages Publish Functions
/*****************************************************************************/

Meteor.publish('messages', function () {
  // you can remove this if you return a cursor
  this.ready();
});
