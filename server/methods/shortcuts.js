/*****************************************************************************/
/* Shortcuts Methods */
/*****************************************************************************/

Meteor.methods({
  addAgentShortcut: function(shortcut) {
    return Shortcuts.insert(shortcut);
  }  
 /*
  * Example:
  *  '/app/shortcuts/update/email': function (email) {
  *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
  *  }
  *
  */
});
