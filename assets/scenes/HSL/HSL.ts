
const {ccclass, property} = cc._decorator;

@ccclass
export default class HSL extends cc.Component {

    @property(cc.Sprite)
    spDest: cc.Sprite = null;
    @property(cc.Label)
    numLabelH: cc.Label = null;
    @property(cc.Label)
    numLabelS: cc.Label = null;
    @property(cc.Label)
    numLabelL: cc.Label = null;

    numH: number = 0; // 色相(0, 360)
    numS: number = 0; // 饱和度(-1, 1)
    numL: number = 0.5;// 亮度(-1, 1)
    material: cc.Material = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    }

    start () {
        this.material = this.spDest.getMaterial(0);
        // this.setHue(this.numH);
        // this.setSaturation(this.numS);
        // this.setLightness(this.numL);
    }

    onSliderHEvent(slider: cc.Slider) {
        this.setHue(Number(slider.progress * 360));
    }

    onSliderSEvent(slider: cc.Slider) {
        this.setSaturation(Number(slider.progress)*2-1);
    }

    onSliderLEvent(slider: cc.Slider) {
        this.setLightness(Number(slider.progress)*2-1);
    }

    setHue(value: number) {
        this.numLabelH.string = this._formatNum(value).toString();
        this.material.setProperty('u_dH', value);
    }

    setSaturation(value: number) {
        this.numLabelS.string = this._formatNum(value).toString();
        this.material.setProperty('u_dS', value);
    }

    setLightness(value: number) {
        this.numLabelL.string = this._formatNum(value).toString();
        this.material.setProperty('u_dL', value);
    }

    private _formatNum(value: number): number {
        let num = Math.round(value * 100) / 100;
        return num;
    }
}
