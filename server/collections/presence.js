Meteor.presences.find().observe({
  removed: function(oldUser) {
    if (oldUser.userId && oldUser.state && oldUser.state.currentStream) {
      if (!Meteor.presences.findOne({'userId':oldUser.userId})) {
        console.log(oldUser.userId + ' timed out.');
        Meteor.call('leaveStream', oldUser.state.currentStream, oldUser.userId);
      }
    }
  }
});

