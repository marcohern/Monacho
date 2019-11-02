var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor() {
    this.node = arguments[0];
    this.fallSpeed = arguments[1];
    this.glideDescentSpeed = arguments[2];
    this.minFloorLevel = arguments[3];
    this.bottomSensor = false;
  },

  bottomContact() {
    this.bottomSensor = true;
  },

  bottomClear() {
    this.bottomSensor = false;
  },

  update (dt, input, status) {
    if (status.isFalling())
    {
      var dy = dt * this.fallSpeed;
      if (this.node.y - dy <= this.minFloorLevel)
      {
        this.node.y = this.minFloorLevel;
        status.stand();
      }
      else if (!this.bottomSensor)
      {
        this.node.y -= dy;
      }
      else
      {
        status.stand();
      }
      return;
    }
    if (status.isStanding())
    {
      if (!this.bottomSensor)
      {
        status.fall();
      }
      return;
    }
    if (status.isGliding())
    {
      var dy = dt * this.glideDescentSpeed;
      if (this.node.y - dy <= this.minFloorLevel)
      {
        this.node.y = this.minFloorLevel;
        status.stand();
      }
      else if (!this.bottomSensor)
      {
        this.node.y -= dy;
      }
      else
      {
        status.stand();
      }
      return;
    }
  },
});
