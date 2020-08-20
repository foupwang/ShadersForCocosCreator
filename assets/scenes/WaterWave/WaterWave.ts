
const {ccclass, property} = cc._decorator;

@ccclass
export default class extends cc.Component {

    @property(cc.Sprite)
    spDest: cc.Sprite = null;

    material: cc.Material = null;
    startTime: number = 0;
    time: number = 0;

    start () {
        this.material = this.spDest.getMaterial(0);
        let csize = this.spDest.node.getContentSize();
        this.material.setProperty('u_size', [csize.width, csize.height]);
        this.startTime = Date.now();
    }

    update (dt: number) {
        this.time = (Date.now() - this.startTime) / 1000;
        this.material.setProperty('u_time', this.time);
    }
}
