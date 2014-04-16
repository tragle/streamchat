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

Meteor.publish('allGroups', function() {
  App.checkIsAdmin(this.userId);
  return Groups.find();
});

Meteor.publish('skillGroups', function() {
  return Groups.find({'connections': {$ne: []}});
});

