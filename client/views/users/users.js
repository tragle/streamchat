/*****************************************************************************/
/* Users: Event Handlers and Helpers */
/*****************************************************************************/
Template.Users.events({
  'click #add-user': function(e) {
    e.preventDefault();
    var user = new App.User();
    user.profile.displayname = $('#add-user-name').val();
    user.username = $('#add-user-username').val();
    var permissions = $('#add-user-permissions').val().split(' ');
    var skills = $('#add-user-skills').val().split(' ');
    Meteor.call('addUser', user, permissions, skills, App.flashResult);
    $('input[id^="add-user"]').val('');
  },
  'click .delete-user': function(e) {
    e.preventDefault();
    Meteor.call('delUser', this._id);
  },
  'click .update-user': function(e) {
    e.preventDefault();
    var button = e.currentTarget;
    var displayname = $(button).parents('tr').find('input.user-displayname').val();
    var username = $(button).parents('tr').find('input.user-user-username').val();
    var permissions = $(button).parents('tr').find('input.user-permissions').val().split(' ');
    var skills = $(button).parents('tr').find('input.user-skills').val().split(' ');
    Meteor.call('updateUser', this._id, {'profile.displayname': displayname, username: username}, permissions, skills, App.flashResult);
  }
});

Template.Users.helpers({
  users: function() {
    return Meteor.users.find({'roles.permissions': {$nin: ['visitor']}});
  }
});

/*****************************************************************************/
/* Users: Lifecycle Hooks */
/*****************************************************************************/
Template.Users.created = function () {
};

Template.Users.rendered = function () {
};

Template.Users.destroyed = function () {
};
