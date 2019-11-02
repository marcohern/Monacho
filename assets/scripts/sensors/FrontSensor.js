cc.Class({
    extends: cc.Component,

    properties: {

    },

    onCollisionEnter(other, self)
    {
      this.node.parent.getComponent("Ninja").onFrontContact(other, self, this.node.x);
    },

    onCollisionExit(other, self)
    {
      this.node.parent.getComponent("Ninja").onFrontClear(other, self, this.node.x);
    }
});
