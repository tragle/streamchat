/*****************************************************************************/
/* Users Methods */
/*****************************************************************************/

Meteor.methods({
  addUser: function(user, permissions, skills) {
    App.checkIsAdmin(this.userId);
    user.password = 'password';
    var id = Accounts.createUser(user);
    if (permissions) {
      Roles.setUserRoles(id, permissions, 'permissions');
    }
    if (skills) {
      Roles.setUserRoles(id, skills, 'skills');
    }
    return id;
  },
  delUser: function(id) {
    App.checkIsAdmin(this.userId);
    Meteor.users.remove({'_id':id});
  },
  updateUser: function(id, options, permissions, skills) {
    App.checkIsAdmin(this.userId);
    Meteor.users.update({'_id':id},{$set: options});
    if (permissions) {
      Roles.setUserRoles(id, permissions, 'permissions');
    }
    if (skills) {
      Roles.setUserRoles(id, skills, 'skills');
    }
    return id;
  }
});
