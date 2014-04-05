Meteor.presences.find().observe({
  removed: function(oldUser) {
    if (oldUser.state && oldUser.state.currentStream) {
      console.log(oldUser.userId + ' timed out.');
      Meteor.call('leaveStream', oldUser.state.currentStream, oldUser.userId);
    }
  }
});

