/*****************************************************************************/
/* Agents Publish Functions
/*****************************************************************************/

Meteor.publish('agents', function () {
  return Meteor.users.find({'roles.permissions': {$in: ['agent']}});
});
