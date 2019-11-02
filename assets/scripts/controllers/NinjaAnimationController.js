var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor() {
    this.animation = arguments[0];
  },

  update (dt, input, status) {
    if (status.updated())
    {
      if (status.isStanding())
      {
        if (input.leftOrRight()) this.animation.play('run');
        else this.animation.play('idle');
      }
      else if (status.isGliding()) this.animation.play('glide');
      else if (status.isFalling()) this.animation.play('fall');
    }

    if (input.updated())
    {
      if (status.isStanding())
      {
        if (input.leftOrRight()) this.animation.play('run');
        else this.animation.play('idle');
      }
    }
  },
});
