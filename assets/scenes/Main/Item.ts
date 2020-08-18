import NameHelper from "./NameHelper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component{
    
    @property(cc.Label)
    label: cc.Label = null;
    
    tmplID: number = 0;
    itemID: number = 0;
    ctrl: any = null;

    onLoad () {
        this.node.on('touchend', function () {
            console.log("Item " + this.itemID + ' clicked');
            this.ctrl && this.ctrl.clickItem(this.itemID);
        }, this);
    }

    initItem(ctrl: any, tmplID: number, itemID: number) {
        this.ctrl = ctrl;
        this.tmplID = tmplID;
        this.itemID = itemID;
        this.label.string = NameHelper.getTitle(itemID);
    }

    updateItem(ctrl: any, itemID: number) {
        this.ctrl = ctrl;
        this.itemID = itemID;
        this.label.string = NameHelper.getTitle(itemID);
    }
}
