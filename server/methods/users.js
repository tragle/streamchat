/*****************************************************************************/
/* Users Methods */
/*****************************************************************************/

Meteor.methods({
  addUser: function(user, permissions, skills) {
    user.password = 'password';
    var id = Accounts.createUser(user);
    if (permissions) {
      Roles.setUserRoles(id, permissions, 'permissions');
    }
    if (skills) {
      Roles.setUserRoles(id, skills, 'skills');
    }
  },
  delUser: function(id) {
    Meteor.users.remove({'_id':id});
  },
  updateUser: function(id, options, permissions, skills) {
    Meteor.users.update({'_id':id},{$set: options});
    if (permissions) {
      Roles.setUserRoles(id, permissions, 'permissions');
    }
    if (skills) {
      Roles.setUserRoles(id, skills, 'skills');
    }
  }
});
