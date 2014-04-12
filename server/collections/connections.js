// Remove disconnected users from groups
Meteor.setInterval(function() {
  var now = (new Date()).getTime();
  var before = now - 60 * 1000;
  Groups.find({'connections.updated': {$lt: before}}).forEach(function(group) {
    _.each(group.connections, function(user) {
      console.log(user);
      if (user.updated < before) {
        if (user.currentGroup) {
          Meteor.call('leaveGroup', user.currentGroup, user._id);
        }
      }
    });
  });
}, 5000);



