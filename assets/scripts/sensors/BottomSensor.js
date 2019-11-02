cc.Class({
  extends: cc.Component,

  properties: {

  },

  onCollisionEnter(other, self)
  {
    console.log("BottomSensor.onCollisionEnter");
    this.node.parent.getComponent("Ninja").onBottomContact(other, self, this.node.y);
  },

  onCollisionExit(other, self)
  {
    console.log("BottomSensor.onCollisionExit");
    this.node.parent.getComponent("Ninja").onBottomClear(other, self, this.node.y);
  }
});
