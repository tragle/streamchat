Meteor.setInterval(function() {
  var now = (new Date()).getTime();
  Connections.find({'updated': {$lt: (now - 60 * 1000) }}).forEach(function(user) {
    Connections.remove({_id: user._id});
  });
}, 5000);

