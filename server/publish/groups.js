/*****************************************************************************/
/* Groups Publish Functions
/*****************************************************************************/

Meteor.publish('groups', function () {
  return Groups.find();
});

