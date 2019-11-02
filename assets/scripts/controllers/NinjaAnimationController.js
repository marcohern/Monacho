var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor: function(animation) {
    this.animation = animation;
  },

  update (dt, input, status) {
    if (input.updated())
    {
      if (status.isStanding())
      {
        if (input.left || input.right)
        {
          this.animation.play('run');
        }
        else
        {
          this.animation.play('idle');
        }
      }
      if (status.isGliding())
      {
        this.animation.play('glide');
      }
    }
  },
});
