/*****************************************************************************/
/* Presence Publish Functions
/*****************************************************************************/

Meteor.publish('presence', function () {
  return Presences.find();
});

Meteor.publish('usersInStream', function(streamId) {
  return Presences.find({online: true, currentStream: streamId});
});

Meteor.publish('usersBySkill', function(skill) {
  return Presences.find({online: true, skills: {$in: [skill]}});
});
