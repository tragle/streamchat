Meteor.presences.find().observe({
  removed: function(oldUser) {
    if (oldUser.userId && oldUser.state && oldUser.state.currentGroup) {
      Meteor.setTimeout(function() {
        if (!Meteor.presences.findOne({'userId':oldUser.userId})) {
          console.log(oldUser.userId + ' timed out.');
          Meteor.call('leaveGroup', oldUser.state.currentGroup, oldUser.userId);
        }
      }, 5000);
    }
  }
});

