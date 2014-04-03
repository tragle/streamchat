/*****************************************************************************/
/* Users Publish Functions
/*****************************************************************************/

Meteor.publish('users', function () {
  return Meteor.users.find();
});


Meteor.publish('usersBySkill', function(skill) {
  if (skill) {
    return Meteor.users.find({'roles.skills' : {$in: [skill]}});
  }
  return;
});

