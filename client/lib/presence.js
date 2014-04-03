Presence.state = function() {
  return {
    online: true,
    foo: 'bar',
    currentStream: Session.get('currentStream'),
    currentTyping: Session.get('currentTyping'),
  };
};
