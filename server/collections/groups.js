Meteor.setInterval(function() {
  var allGroups = Groups.find({'isFixed': false}).map(function(group) {
    return group._id;
  });
  var usedGroups = Connections.find().map(function(user) {
    return user.currentGroup;
  });
  var deadGroups = _.difference(allGroups, usedGroups);
  Groups.remove({'_id': {$in: deadGroups}});
}, 1000 * 60 * 10);


