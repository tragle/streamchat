Presences.find().observeChanges(
  {
  changed: function(id, user) {
    console.log('changed!');
    if (!user.currentStream) {
      Messages.update(
        // assign expiration date to this user's messages which are not already expired
        {$or: [{from: user.userId}, {to: user.userId}], expired: {$not: {$type: 9}}},
        {$set: {expired: new Date}}
      );
    }
  }
});

