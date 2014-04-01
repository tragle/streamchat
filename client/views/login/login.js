/*****************************************************************************/
/* Login: Event Handlers and Helpers */
/*****************************************************************************/
Template.Login.events({
  'submit': function(e) {
    e.preventDefault();
    var user = $('#login-user').val();
    var password = $('#login-password').val();
    $('#login-form input').val('');
    Meteor.loginWithPassword(user, password);
  }
/*
 * Example: 
 *  'click .selector': function (e, tmpl) {
 *
 *  }
 */
});

Template.Login.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Login: Lifecycle Hooks */
/*****************************************************************************/
Template.Login.created = function () {
};

Template.Login.rendered = function () {
};

Template.Login.destroyed = function () {
};
