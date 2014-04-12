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

