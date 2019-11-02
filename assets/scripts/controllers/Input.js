cc.Class({
  ctor: function () {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.attack = false;
    this.fire = false;
    this.die = false;
    this.hasBeenUpdated = true;
  },

  reset() {
    this.hasBeenUpdated = false;
  },

  updated() {
    return this.hasBeenUpdated;
  },

  setValue(attr, value)
  {
    if (this[attr] === value) return;
    this.hasBeenUpdated = true;
    this[attr] = value;
  },

  setInput(event, value) {
    switch(event.keyCode) {
      case cc.macro.KEY.a:
        this.setValue('left',value);
        break;
      case cc.macro.KEY.d:
        this.setValue('right',value);
        break;
      case cc.macro.KEY.w:
        this.setValue('up',value);
        break;
      case cc.macro.KEY.s:
        this.setValue('down',value);
        break;
      case cc.macro.KEY.space:
        this.setValue('attack',value);
        break;
      case cc.macro.KEY.f:
        this.setValue('fire',value);
        break;
      case cc.macro.KEY.q:
        this.setValue('die',value);
        break;
    }
  },
});
