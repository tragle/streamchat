Meteor.startup(function() {
  if (!Meteor.users.findOne({'username':'admin'})) {
    var admin = new App.User();
    admin.username = 'admin';
    admin.email = 'email'; 
    admin.password = 'password';
    admin.profile.displayname = 'Admin';
    var id = Accounts.createUser(admin);
    Roles.setUserRoles(id, ['admin','agent'], 'permissions');
  }
});

