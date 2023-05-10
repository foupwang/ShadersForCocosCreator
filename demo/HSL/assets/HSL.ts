import { _decorator, Component, Label, Material, Node, Slider, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HSL')
export class HSL extends Component {
    @property(Sprite)
    spDest: Sprite = null!;
    @property(Label)
    numLabelH: Label = null!;
    @property(Label)
    numLabelS: Label = null!;
    @property(Label)
    numLabelL: Label = null!;

    numH: number = 0; // 色调(0, 360)
    numS: number = 0.5; // 饱和度(-1, 1)
    numL: number = 0.5; // 亮度(-1, 1)
    material: Material = null;

    start() {
        this.material = this.spDest.getMaterial(0);
        this.setHue(this.numH);
        this.setSaturation(this.numS);
        this.setLightness(this.numL);
    }

    onSliderHEvent(slider: Slider) {
        this.setHue(slider.progress);
    }

    onSliderSEvent(slider: Slider) {
        this.setSaturation(slider.progress);
    }

    onSliderLEvent(slider: Slider) {
        this.setLightness(slider.progress);
    }

    setHue(value: number) {
        const dh = this._formatNum(value * 360);
        this.numLabelH.string = dh + '';
        this.material.setProperty('u_dH', dh);
    }

    setSaturation(value: number) {
        const ds = this._formatNum(value * 2 - 1);
        this.numLabelS.string = ds + '';
        this.material.setProperty('u_dS', ds);
    }

    setLightness(value: number) {
        const dl = this._formatNum(value * 2 - 1);
        this.numLabelL.string = dl + '';
        this.material.setProperty('u_dL', dl);
    }

    private _formatNum(value: number): number {
        let num = Math.round(value * 100) / 100;
        return num;
    }
}

