var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor() {
    this.node = arguments[0];
    this.sourceScaleX = this.node.scaleX;
  },

  update (dt, input, status) {
    if (status.isStanding()) {
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
