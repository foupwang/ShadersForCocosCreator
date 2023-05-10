import { _decorator, Component, Sprite, Label, Slider, Vec2, Material, UITransform, v2 } from 'cc';

const {ccclass, property} = _decorator;

@ccclass('WaterWave')
export class WaterWave extends Component {

    @property(Sprite)
    spDest: Sprite = null;
    @property(Label)
    rateLabel: Label = null;

    material: Material = null;
    startTime: number = 0;
    
    start () {
        this.material = this.spDest.getMaterial(0);
        let uiTrans = this.spDest.node.getComponent(UITransform);
        let csize = uiTrans.contentSize;
        this.material.setProperty('u_size', new Vec2(csize.width, csize.height));
        this._setRate(0.25);
        this.startTime = Date.now();
    }

    update (dt: number) {
        const time = (Date.now() - this.startTime) / 1000;
        this.material.setProperty('u_time', time);
    }

    onSliderEvent(slider: Slider) {
        this._setRate(slider.progress);
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
