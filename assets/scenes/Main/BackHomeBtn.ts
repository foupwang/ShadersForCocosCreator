const { ccclass, property } = cc._decorator;

@ccclass
export default class BackHomeBtn extends cc.Component {
    static instance: BackHomeBtn = null;

    onLoad() {
        cc.game.addPersistRootNode(this.node);
        BackHomeBtn.instance = this;
        this.setActive(false);
    }

    setActive(flag: boolean) {
        this.node.active = flag;
    }

    backToHome() {
        this.setActive(false);
        cc.director.loadScene('Main');
    }
}
