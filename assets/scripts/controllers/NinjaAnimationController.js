var Controller = require('Controller');

cc.Class({
  extends: Controller,

  ctor: function(animation) {
    console.log("NinjaAnimationController.ctor", animation);
    this.animation = animation;
  },

  update (dt, input, status) {
    if (status.isStanding() && input.hasBeenUpdated) {
      if (input.left || input.right)
      {
        this.animation.play('run');
      }
      else
      {
        this.animation.play('idle');
      }
    }
  },
});
