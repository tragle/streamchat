/*****************************************************************************/
/* Groups Publish Functions
/*****************************************************************************/

Meteor.publish('groups', function (groupId) {
  return Groups.find({'_id': groupId}, {fields: {'connections.updated': 0, 'queue.updated':0}});
});

Meteor.publish('fixedGroups', function() {
  return Groups.find({'isFixed': true});
});

Meteor.publish('autoGroupSettings', function() {
  return AutoGroupSettings.find();
});

