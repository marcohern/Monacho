
var Input = require('../controllers/Input');
var Status = require('../controllers/Status');
var NinjaXController = require('../controllers/NinjaXController');
var NinjaAnimationController = require('../controllers/NinjaAnimationController');
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
      this.input.reset();
    },
});
