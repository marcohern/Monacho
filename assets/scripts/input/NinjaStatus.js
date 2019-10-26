// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var NinjaInput = require('NinjaInput');

cc.Class({
    extends: NinjaInput,

    properties: {
      runSpeed: 300,
      slideSpeed: 500,
      glideSpeedY: 100,
      jumpSpeedX: 100,
      jumpDuration: 1,
      jumpHeight: 400,
      attackDuration: 0.17,
      slideDuration: 1
    },

    addStatus(status)
    {
      this.prevStatus = this.status;
      this.status |= status;
      console.log(status);
    },

    setStatus(status)
    {
      this.prevStatus = this.status;
      this.status = status;
      console.log(status);
    },

    statusHasBeenUpdated()
    {
      if (this.prevStatus != this.status) return true;
      return false;
    },

    stand() { this.setStatus(this.STATUS.onFoot); },
    jump() { this.setStatus(this.STATUS.jumping); },
    glide() { this.setStatus(this.STATUS.gliding); },
    attack() { this.setStatus(this.STATUS.attacking); },
    fire() { this.setStatus(this.STATUS.firing); },
    climb() { this.setStatus(this.STATUS.climbing); },
    slide() { this.setStatus(this.STATUS.sliding); },
    fall() { this.setStatus(this.STATUS.falling); },
    die() { this.setStatus(this.STATUS.dying); },

    isStanding() { return this.status&this.STATUS.onFoot; },
    isJumping() { return this.status&this.STATUS.jumping; },
    isGliding() { return this.status&this.STATUS.gliding; },
    isAttacking() { return this.status&this.STATUS.attacking; },
    isFiring() { return this.status&this.STATUS.firing; },
    isClimbing() { return this.status&this.STATUS.climbing; },
    isSliding() { return this.status&this.STATUS.sliding; },
    isFalling() { return this.status&this.STATUS.falling; },
    isDying() { return this.status&this.STATUS.dying; },

    onCollisionEnter: function (other, self) {
  
      // Collider Manager will calculate the value in world coordinate system, and put them into the world property
      var world = self.world;
  
      // Collider Component aabb bounding box
      var aabb = world.aabb;
  
      // The position of the aabb collision frame before the node collision
      var preAabb = world.preAabb;
  
      // world transform
      var t = world.transform;
  
      // Circle Collider Component world properties
      var r = world.radius;
      var p = world.position;
  
      // Rect and Polygon Collider Component world properties
      var ps = world.points;
      if (this.node.scaleX > 0) // -->
      {
        this.node.x -= 10;
      }
      else if (this.node.scaleX < 0) // <--
      {
        this.node.x += 10;
      }
      console.log('on collision enter', world);
  },

  
    onLoad () {
      this._super();

      this.STATUS = {
        none: 0x0000,
        onFoot: 0x0001,
        gliding: 0x0002,
        attacking: 0x0004,
        firing: 0x0008,
        climbing: 0x0010,
        sliding: 0x0020,
        falling: 0x0040,
        jumping: 0x0080,
        dying: 0x0100
      };

      this.setStatus(this.STATUS.none);
      this.setStatus(this.STATUS.gliding);
      this.animation = this.getComponent(cc.Animation);
      this.specifiedScaleX = this.node.scaleX;
      this.minFloorLevel = 0;
      this.jumpTimer = 0;
      this.attackTimer = 0;
      this.slideTimer = 0;
      this.slideDirection = 1;

      var goUp = cc.moveBy(this.jumpDuration/2, cc.v2(0, this.jumpHeight)).easing(cc.easeOut(2.0));
      var goDown = cc.moveBy(this.jumpDuration/2, cc.v2(0, -this.jumpHeight)).easing(cc.easeIn(2.0));
      this.jumpSequence = cc.sequence(goUp, goDown);
      
      var manager = cc.director.getCollisionManager();
      manager.enabled = true;
      manager.enabledDebugDraw = true;
      manager.enabledDrawBoundingBox = true;
      console.log("Status.onLoad",manager);
    },

    start () {

    },

    updateOnFootAnimation()
    {
      if (this.input.left)
      {
        this.node.scaleX = -this.specifiedScaleX;
        this.animation.play('run');
      }
      else if (this.input.right)
      {
        this.node.scaleX = this.specifiedScaleX;
        this.animation.play('run');
      }
      else
      {
        this.animation.play('idle');
      }
    },

    updateOnFootProperties(dt)
    {
      if (this.input.left)
      {
        this.node.x -= this.runSpeed * dt;
      }
      if (this.input.right)
      {
        this.node.x += this.runSpeed * dt;
      }
    },

    updateOnFootState()
    {
      if (this.input.die)
      {
        this.die();
      }
      if (this.input.up)
      {
        this.jump();
      }
      if (this.input.attack)
      {
        this.attack();
      }
      if ((this.input.left || this.input.right) && this.input.down)
      {
        this.slide();
      }
    },

    updateOnFoot(dt)
    {
      if (this.inputUpdated) this.updateOnFootAnimation();
      this.updateOnFootProperties(dt);
      this.updateOnFootState();
    },

    updateJumpingAnimation()
    {
      if (this.statusHasBeenUpdated())
      {
        this.jumpTimer = 0;
        this.node.runAction(this.jumpSequence);
        this.animation.play('jump');
      }
    },

    updateJumpingProperties(dt)
    {
      if (this.input.left)
      {
        this.node.x -= this.jumpSpeedX * dt;
      }
      else if (this.input.right)
      {
        this.node.x += this.jumpSpeedX * dt;
      }
    },

    updateJumpingState(dt)
    {
      if (this.jumpTimer > this.jumpDuration)
      {
        this.stand();
        this.updateOnFootAnimation();
      }
      this.jumpTimer+=dt;
    },

    updateJumping(dt)
    {
      this.updateJumpingAnimation();
      this.updateJumpingProperties(dt);
      this.updateJumpingState(dt);
    },

    updateAttackAnimation()
    {
      if (this.statusHasBeenUpdated()) 
      {
        this.attackTimer = 0;
        this.animation.play('attack');
      }
    },

    updateAttackState(dt)
    {
      if (this.attackTimer > this.attackDuration)
      {
        this.stand();
        this.updateOnFootAnimation();
      }
      this.attackTimer += dt;
    },

    updateAttacking(dt)
    {
      this.updateAttackAnimation();
      //this.updateAttackProperties(dt);
      this.updateAttackState(dt);
    },

    updateGlideAnimation() {
      if (this.statusHasBeenUpdated()) {
        this.animation.play('glide');
      }
    },

    updateGlideProperties(dt) {
      this.node.y -= this.glideSpeedY * dt;
      if (this.input.left)
      {
        this.node.x -= this.jumpSpeedX * dt;
      }
      else if (this.input.right)
      {
        this.node.x += this.jumpSpeedX * dt;
      }
    },

    updateGlideState(dt) {
      if (this.node.y < this.minFloorLevel) {
        this.node.y = this.minFloorLevel;
        this.stand();
        this.updateOnFootAnimation();
      }
    },

    updateGliding(dt) {
      this.updateGlideAnimation();
      this.updateGlideProperties(dt);
      this.updateGlideState(dt);
    },

    updateSlideAnimation()
    {
      if (this.statusHasBeenUpdated())
      {
        if (this.input.left || this.input.right) 
        {
          this.slideTimer = 0;
          this.animation.play('slide');
          this.slideDirection = (this.input.left) ? -1 : 1;
        }
      }
    },
    
    updateSlideProperties(dt)
    {
      this.node.x += this.slideSpeed * this.slideDirection * dt;
    },
      
    updateSlideState(dt)
    {
      if (this.slideTimer > this.slideDuration)
      {
        this.stand();
        this.updateOnFootAnimation();
      }
      this.slideTimer+=dt;
    },

    updateSliding(dt)
    {
      this.updateSlideAnimation();
      this.updateSlideProperties(dt);
      this.updateSlideState(dt);
    },

    updateDieAnimation()
    {
      if (this.statusHasBeenUpdated())
      {
        this.animation.play('dead');
      }
    },

    updateDieProperties(dt)
    {

    },

    updateDieState(dt)
    {

    },

    updateDying(dt)
    {
      this.updateDieAnimation();
      this.updateDieProperties(dt);
      this.updateDieState(dt);
    },

    update (dt) {
      if (this.isGliding  ()) this.updateGliding(dt);
      if (this.isStanding ()) this.updateOnFoot(dt);
      if (this.isAttacking()) this.updateAttacking(dt);
      if (this.isJumping  ()) this.updateJumping(dt);
      if (this.isSliding  ()) this.updateSliding(dt);
      if (this.isDying    ()) this.updateDying(dt);
      
      this._super(dt);
      this.prevStatus = this.status;
    },
});
