/*
 * Add query methods like this:
 *  Groups.findPublic = function () {
 *    return Groups.find({is_public: true});
 *  }
 */

Groups.getDisplayName = function(userId) {
  var group = Groups.findOne({'connections._id': userId});
  if (group) {
    var user = _.find(group.connections, function(connection) {return connection._id == userId;});
    if (user) {
      return user.displayName;
    }
  }
};
