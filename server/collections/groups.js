// Remove empty autogroups
Meteor.setInterval(function() {
  Groups.remove({'isFixed': false, connections: {$size: 0}});
}, 1000 * 60 * 10);


Groups.find({'queue': {$ne: []}}).observe({
  changed: function(group, old) {
    if (group.connections) {
      var headroom = Meteor.call('getVisitorHeadroom', group._id);
      if (headroom > 0) {
        var queue = group.queue;
        var dequeuedUser = queue.shift();
        console.log('dequeuing ' + dequeuedUser._id);
        Groups.update({'_id': group._id}, {$push: {'connections': dequeuedUser}});
        Groups.update({'_id': group._id}, {$set: {'queue': queue}});
      } else {
        _.each(group.queue, function(user) {
          Meteor.call('leaveGroup', user._id);
        });
      }
    }
  }
});

Groups.find({'connections.isVisitor': true}).observe({
  changed: function(group, old) {
    var agents = _.filter(group.connections, function(user) {
      return user.isVisitor == false;
    });
    if (!agents.length) {
      _.each(group.connections, function(user) {
        console.log('No agents for ' + user._id);
        Meteor.call('leaveGroup', group._id, user._id);
      });
    }
  }
});

Groups.find().observe({
  removed: function(old) {
    /*
       _.each(old.connections, function(user) {
       Meteor.call('leaveGroup', user._id);
       });
       _.each(old.queue, function(user) {
       Meteor.call('leaveGroup', user._id);
       });
       */
  }
});
