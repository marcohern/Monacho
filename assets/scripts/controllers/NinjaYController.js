var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor() {
    this.node = arguments[0];
    this.fallSpeed = arguments[1];
    this.glideDescentSpeed = arguments[2];
    this.minFloorLevel = arguments[3];
  },

  update (dt, input, status) {
    if (status.isGliding())
    {
      this.node.y -= dt * this.glideDescentSpeed;
      if (this.node.y <= this.minFloorLevel)
      {
        this.node.y = this.minFloorLevel;
        status.stand();
      }
    }
  },
});
