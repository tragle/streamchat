Meteor.startup(function() {
  if (!Meteor.users.findOne({'username':'admin'})) {
    var admin = new Models.User();
    admin.username = 'admin';
    admin.email = 'email'; 
    admin.password = 'password';
    admin.profile.displayName = 'Admin';
    var id = Accounts.createUser(admin);
    Roles.setUserRoles(id, ['admin','agent'], 'permissions');
  }
  if (!AutoGroupSettings.findOne()) {
    AutoGroupSettings.insert({'maxAgents': 1, 'maxAgentVisitors':0, 'maxQueue': 0, 'groupSkills': false});
  }
});

