
var Input = require('../controllers/Input');
var Status = require('../controllers/Status');
var NinjaAnimationController = require('../controllers/NinjaAnimationController');
var NinjaScaleXController = require('../controllers/NinjaScaleXController');
var NinjaXController = require('../controllers/NinjaXController');
var NinjaYController = require('../controllers/NinjaYController');


cc.Class({
    extends: cc.Component,

    properties: {
      runSpeed: 300,
      glideSpeed: 100,
      fallSpeed: 400,
      glideDescentSpeed: 200,
      minFloorLevel: 0,
    },
    
    onLoad () {
      this.input = new Input();
      this.status = new Status();
      this.status.glide();

      this.frontSensor = false;


      this.animCtrl = new NinjaAnimationController(this.getComponent(cc.Animation));
      this.scaleXCtrl = new NinjaScaleXController(this.node);
      this.xCtrl = new NinjaXController(this.node, this.runSpeed, this.glideSpeed);
      this.yCtrl = new NinjaYController(this.node, this.fallSpeed, this.glideDescentSpeed, this.minFloorLevel);
      this.ctrls = [this.scaleXCtrl, this.xCtrl, this.yCtrl];
      
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

      console.log("Ninja.onLoad");
    },

    onDestroy() {
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      console.log("Ninja.onDestroy");
    },

    onKeyDown(event) {
      this.input.setInput(event, true);
    },

    onKeyUp(event) {
      this.input.setInput(event, false);
    },

    onCollisionEnter(other, self)
    {
      console.log("Ninja.onCollisionEnter");
    },

    onFrontContact(other, self, x) {
      this.xCtrl.frontContact();
    },

    onFrontClear(other, self, x) {
      this.xCtrl.frontClear();
    },

    onBottomContact(other, self, y) {
      this.yCtrl.bottomContact();
    },

    onBottomClear(other, self, y) {
      this.yCtrl.bottomClear();
    },

    start () {

    },

    update (dt) {
      for(var ctrl of this.ctrls) {
        var r = ctrl.update(dt, this.input, this.status);
        //if (r) return;
      }
      this.animCtrl.update(dt, this.input, this.status);
      this.input.reset();
      this.status.resetUpdate();
    },
});
