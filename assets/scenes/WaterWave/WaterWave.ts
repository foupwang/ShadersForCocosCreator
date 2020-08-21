
const {ccclass, property} = cc._decorator;

@ccclass
export default class extends cc.Component {

    @property(cc.Sprite)
    spDest: cc.Sprite = null;
    @property(cc.Label)
    rateLabel: cc.Label = null;

    material: cc.Material = null;
    startTime: number = 0;
    time: number = 0;

    start () {
        this.material = this.spDest.getMaterial(0);
        let csize = this.spDest.node.getContentSize();
        this.material.setProperty('u_size', [csize.width, csize.height]);
        this._setRate(0.25);
        this.startTime = Date.now();
    }

    update (dt: number) {
        this.time = (Date.now() - this.startTime) / 1000;
        this.material.setProperty('u_time', this.time);
    }

    onSliderEvent(slider: cc.Slider) {
        this._setRate(Number(slider.progress));
    }

    private _setRate(value: number) {
        this.rateLabel.string = this._formatNum(value).toString();
        this.material.setProperty('u_rate', value);
    }

    private _formatNum(value: number): number {
        let num = Math.round(value * 100) / 100;
        return num;
    }
}
