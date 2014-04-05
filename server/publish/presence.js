/*****************************************************************************/
/* Presence Publish Functions
/*****************************************************************************/

Meteor.publish('presence', function () {
  return Meteor.presences.find();
});

Meteor.publish('usersInStream', function(streamId) {
  return Meteor.presences.find({online: true, currentStream: streamId});
});

Meteor.publish('usersBySkill', function(skill) {
  return Meteor.presences.find({online: true, skills: {$in: [skill]}});
});
