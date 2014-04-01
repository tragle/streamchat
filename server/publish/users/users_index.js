/*****************************************************************************/
/* UsersIndex Publish Functions
/*****************************************************************************/

Meteor.publish('users_index', function () {
  return Meteor.users.find();
});
