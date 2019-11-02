var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor: function(node, runSpeed=0) {
    console.log("NinjaXController.ctor", node);
    this.node = node;
    this.runSpeed = runSpeed;
  },

  update (dt, input, status) {
    if (status.isStanding() || status.isJumping()) {
      if (input.left)
      {
        this.node.x -= dt * this.runSpeed;
      }
      else if (input.right)
      {
        this.node.x += dt * this.runSpeed;
      }
    }
  },
});
