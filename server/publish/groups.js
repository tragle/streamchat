/*****************************************************************************/
/* Groups Publish Functions
/*****************************************************************************/

Meteor.publish('groups', function () {
  return Groups.find();
});

Meteor.publish('autoGroupSettings', function() {
  return AutoGroupSettings.find();
});
