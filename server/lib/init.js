Meteor.startup(function() {
  if (!Meteor.users.findOne({'username':'admin'})) {
    var admin = new App.User();
    admin.username = 'admin';
    admin.email = 'email'; 
    admin.password = 'password';
    admin.profile.displayName = 'Admin';
    var id = Accounts.createUser(admin);
    Roles.setUserRoles(id, ['admin','agent'], 'permissions');
  }
  Meteor.settings.presenceTimeout = 10000;
  if (!AutoGroupSettings.findOne()) {
    AutoGroupSettings.insert({'maxAgents': 1, 'maxQueue': 0, 'groupSkills': false});
  }
});

