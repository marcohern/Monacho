
var Input = require('../controllers/Input');
var Status = require('../controllers/Status');
var NinjaAnimationController = require('../controllers/NinjaAnimationController');
var NinjaScaleXController = require('../controllers/NinjaScaleXController');
var NinjaXController = require('../controllers/NinjaXController');


cc.Class({
    extends: cc.Component,

    properties: {
      runSpeed: 300
    },
    
    onLoad () {
      this.input = new Input();
      this.status = new Status();
      this.status.stand();

      this.animCtrl = new NinjaAnimationController(this.getComponent(cc.Animation));
      this.scaleXCtrl = new NinjaScaleXController(this.node);
      this.xCtrl = new NinjaXController(this.node, this.runSpeed);
      
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

    start () {

    },

    update (dt) {
      this.animCtrl.update(dt, this.input, this.status);
      this.xCtrl.update(dt, this.input, this.status);
      this.scaleXCtrl.update(dt, this.input, this.status);
      this.input.reset();
    },
});
