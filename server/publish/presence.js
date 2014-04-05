/*****************************************************************************/
/* Presence Publish Functions
/*****************************************************************************/

Meteor.publish('presence', function () {
  return Meteor.presences.find();
});

Meteor.publish('usersInGroup', function(groupId) {
  return Meteor.presences.find({online: true, currentGroup: groupId});
});

Meteor.publish('usersBySkill', function(skill) {
  return Meteor.presences.find({online: true, skills: {$in: [skill]}});
});
