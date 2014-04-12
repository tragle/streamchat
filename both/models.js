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
  this.date = new Date;
  this.expired = null;
};

Models.User = function() {
  this.username = '';
  this.profile = {
    displayName: '',
    fixedGroup: ''
  };
  this.roles = {
    skills: [],
    permissions: []
  };
};

