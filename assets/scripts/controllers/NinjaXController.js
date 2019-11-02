var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor() {
    this.node = arguments[0];
    this.runSpeed = arguments[1];
    this.glideSpeed = arguments[2];
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
