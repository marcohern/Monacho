var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor: function(node, runSpeed=0, glideSpeed=0) {
    console.log("NinjaXController.ctor", node);
    this.node = node;
    this.runSpeed = runSpeed;
    this.glideSpeed = glideSpeed;
  },

  update (dt, input, status) {
    var xSpeed = 0;
    if (status.isGliding()) {
      xSpeed = this.glideSpeed;
    }
    if (status.isStanding() || status.isJumping()) {
      xSpeed = this.runSpeed;
    }

    if (status.isStanding() || status.isJumping() || status.isGliding()) {
      if (input.left)
      {
        this.node.x -= dt * xSpeed;
      }
      else if (input.right)
      {
        this.node.x += dt * xSpeed;
      }
    }
  },
});
