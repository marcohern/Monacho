var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor: function(node) {
    this.node = node;
    this.sourceScaleX = this.node.scaleX;
  },

  update (dt, input, status) {
    if (status.isStanding() && input.hasBeenUpdated) {
      if (input.left)
      {
        this.node.scaleX = -this.sourceScaleX;
      }
      else if (input.right)
      {
        this.node.scaleX = this.sourceScaleX;
      }
    }
  },
});
