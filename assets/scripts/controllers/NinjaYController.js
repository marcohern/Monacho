var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor: function(node, fallSpeed=0, glideDescentSpeed=0, minFloorLevel=0) {
    this.node = node;
    this.fallSpeed = fallSpeed;
    this.glideDescentSpeed = glideDescentSpeed;
    this.minFloorLevel = minFloorLevel;
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
