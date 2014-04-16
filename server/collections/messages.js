// Remove old messaages
Meteor.setInterval(function() {
  var d = new Date;
  var before = new Date;
  before.setMinutes(d.getMinutes() - 5);
  result = Messages.remove({
    $or : [
      {'expired': {$lt: before}},
      {'date': {$lt: before}, 'type':{ $in: ['here','gone']}},
      {'group': {$exists: false}}
    ]
  });
  if (result) {
    console.log('removed ' + result + ' messages.');
  }
}, 60000);

Meteor.setInterval(function() {
  Previews.find().forEach(function(preview) {
    if (!Groups.findOne({'connections._id': preview._id})) {
      Previews.remove(preview._id);
    }
  });
}, 60000);



