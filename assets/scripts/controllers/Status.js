cc.Class({
  ctor: function () {
    this.NOTHING = 0x0000;
    this.STANDING = 0x0001;
    this.JUMPING = 0x0002;
    this.GLIDING = 0x0004;
    this.ATTACKING = 0x0008;
    this.FIRING = 0x0010;
    this.CLIMBING = 0x0020;
    this.SLIDING = 0x0040;
    this.FALLING = 0x0080;
    this.DYING = 0x0100;

    this.status = this.NOTHING;
    this.statusUpdated = false;
  },

  add(status)
  {
    if (this.status|status === this.status) return;
    this.statusUpdated = true;
    this.status |= status;
    console.log(status);
  },

  set(status)
  {
    if (this.status === status) return;
    this.statusUpdated = true;
    this.status = status;
    console.log(status);
  },

  updated() { return this.statusUpdated; },
  resetUpdate() { this.statusUpdated = false; },

  reset() { this.set(this.NOTHING); },
  stand() { this.set(this.STANDING); },
  jump() { this.set(this.JUMPING); },
  glide() { this.set(this.GLIDING); },
  attack() { this.set(this.ATTACKING); },
  fire() { this.set(this.FIRING); },
  climb() { this.set(this.CLIMBING); },
  slide() { this.set(this.SLIDING); },
  fall() { this.set(this.FALLING); },
  die() { this.set(this.DYING); },

  isStanding() { return this.status & this.STANDING; },
  isJumping() { return this.status & this.JUMPING; },
  isGliding() { return this.status & this.GLIDING; },
  isAttacking() { return this.status & this.ATTACKING; },
  isFiring() { return this.status & this.FIRING; },
  isClimbing() { return this.status & this.CLIMBING; },
  isSliding() { return this.status & this.SLIDING; },
  isFalling() { return this.status & this.FALLING; },
  isDying() { return this.status & this.DYING; },

});
