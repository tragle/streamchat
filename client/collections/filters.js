Filters = new Meteor.Collection(null);

Filters.mutes = function() {
  return Filters.find({'isMute':true});
};

Filters.solos = function() {
  return Filters.find({'isSolo':true});
};

Filters.isMute = function(userId) {
  return !!Filters.findOne({'_id':userId, 'isMute':true});
};

Filters.isSolo = function(userId) {
  return !!Filters.findOne({'_id':userId, 'isSolo':true});
};

Filters.setMute = function(userId) {
  return Filters.upsert({'_id':userId}, {$set: {'isMute':true, 'isSolo':false}});
};

Filters.setSolo = function(userId) {
  return Filters.upsert({'_id':userId}, {$set: {'isMute':false, 'isSolo':true}});
};

Filters.unMute = function(userId) {
  return Filters.upsert({'_id':userId}, {$set: {'isMute':false}});
};

Filters.unSolo = function(userId) {
  return Filters.upsert({'_id':userId}, {$set: {'isSolo':false}});
};

