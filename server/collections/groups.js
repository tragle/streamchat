// Remove empty autogroups
Meteor.setInterval(function() {
  Groups.remove({'isFixed': false, connections: {$size: 0}});
}, 1000 * 60 * 10);


Groups.find({'queue': {$ne: []}}).observe({
  changed: function(group, old) {
    var headroom = Meteor.call('getVisitorHeadroom', group._id);
    console.log(headroom);
    if (headroom > 0) {
      var queue = group.queue;
      var dequeuedUser = queue.shift();
      Groups.update({'_id': group._id}, {$push: {'connections': dequeuedUser}});
      Groups.update({'_id': group._id}, {$set: {'queue': queue}});
    }
  }
});


    
