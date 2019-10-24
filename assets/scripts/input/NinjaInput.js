// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    hasInputChanged()
    {
      return (this.input.left != this.prevInput.left ||
        this.input.right != this.prevInput.right ||
        this.input.up != this.prevInput.up ||
        this.input.down != this.prevInput.down ||
        this.input.attack != this.prevInput.attack ||
        this.input.fire != this.prevInput.fire);
    },

    setInputValue(attr, value)
    {
      if (this.input[attr] == value) return;
      this.inputUpdated = true
      this.prevInput[attr] = this.input[attr];
      this.input[attr] = value;
    },

    setInput(event, value) {
      switch(event.keyCode) {
        case cc.macro.KEY.a:
          this.setInputValue('left',value);
          break;
        case cc.macro.KEY.d:
          this.setInputValue('right',value);
          break;
        case cc.macro.KEY.w:
          this.setInputValue('up',value);
          break;
        case cc.macro.KEY.s:
          this.setInputValue('down',value);
          break;
        case cc.macro.KEY.space:
          this.setInputValue('attack',value);
          break;
        case cc.macro.KEY.f:
          this.setInputValue('fire',value);
          break;
      }
    },

    onKeyDown(event) {
      this.setInput(event, true);
    },

    onKeyUp(event) {
      this.setInput(event, false);
    },

    onTouchStart(event) {
      console.log("onTouchStart", event);
    },

    onTouchMove(event) {
      console.log("onTouchMove", event);
    },

    onTouchEnd(event) {
      console.log("onTouchEnd", event);
    },

    onTouchCancel(event) {
      console.log("onTouchCancel", event);
    },

    onLoad () {

      this.input = {
        left  : false,
        right : false,
        up    : false,
        down  : false,
        attack: false,
        fire  : false
      };

      this.prevInput = {
        left  : false,
        right : false,
        up    : false,
        down  : false,
        attack: false,
        fire  : false
      };

      this.inputUpdated = false;
      
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

      cc.systemEvent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
      cc.systemEvent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      cc.systemEvent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      cc.systemEvent.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
      console.log("Input.onLoad");
    },

    onDestroy() {
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      
      cc.systemEvent.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
      cc.systemEvent.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      cc.systemEvent.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      cc.systemEvent.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    update(dt)
    {
      this.inputUpdated = false;
    }
});
