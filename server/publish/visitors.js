/*****************************************************************************/
/* Visitors Publish Functions
/*****************************************************************************/

Meteor.publish('visitors', function () {
  return Meteor.users.find({'roles.permissions': {$in: ['visitor']}});
});
