Models = {};

Models.Group = function() {
  this.name = '';
  this.isFixed = false;
  this.maxAgentVisitors = 0;
  this.maxAgents = 0;
  this.maxQueue = 0;
  this.connections = [];
  this.queue = [];
};

Models.Message = function() {
  this.group = '';
  this.from = '';
  this.to = '';
  this.body = '';
  this.senderName = '';
  this.recipientName = '';
  this.isVisitor = false;
  this.isDraft = false;
  this.date = '';
  this.expired = null;
};

Models.User = function() {
  this.username = '';
  this.profile = {
    displayName: '',
    fixedGroup: '',
    shortcuts: []
  };
  this.roles = {
    skills: [],
    permissions: []
  };
};

Models.Shortcut = function() {
  this.owner = '';
  this.body = '';
  this.tags = [];
  this.isPublic = true;
};
