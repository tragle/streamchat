/*****************************************************************************/
/* Messages Methods */
/*****************************************************************************/

Meteor.methods({
  sendMessage: function(message) {
    return Messages.insert(message);
  }
});
