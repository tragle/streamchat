Filters = new Meteor.Collection(null);

Filters.mutes = function() {
  return Filters.find({'isMute':true});
};

Filters.solos = function() {
  return Filters.find({'isSolo':true});
};

Filters.isMute = function(userId) {
  return !!Filters.findOne({'userId':userId, 'isMute':true});
};

Filters.isSolo = function(userId) {
  return !!Filters.findOne({'userId':userId, 'isSolo':true});
};

Filters.setMute = function(userId) {
  return Filters.upsert({'userId':userId}, {$set: {'isMute':true, 'isSolo':false}});
};

Filters.setSolo = function(userId) {
  return Filters.upsert({'userId':userId}, {$set: {'isMute':false, 'isSolo':true}});
};

Filters.unMute = function(userId) {
  return Filters.upsert({'userId':userId}, {$set: {'isMute':false}});
};

Filters.unSolo = function(userId) {
  return Filters.upsert({'userId':userId}, {$set: {'isSolo':false}});
};

