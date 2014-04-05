Meteor.setInterval(function() {
  var d = new Date;
  var before = new Date;
  before.setMinutes(d.getMinutes() - 1);
  result = Messages.remove({
    $or : [
      {'expired': {$lt: before}},
      {'date': {$lt: before}, 'type':{ $in: ['here','gone']}}
    ]
      });
  console.log('removed ' + result + ' messages.');
}, 60000);

