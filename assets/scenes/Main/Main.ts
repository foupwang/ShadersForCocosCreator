import BackHomeBtn from "./BackHomeBtn";
import NameHelper from "./NameHelper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component{
    
    @property(cc.Label)
    titleLabel: cc.Label = null;
    @property(cc.Node)
    itemTemplate: cc.Node = null;
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;
    @property
    spacing: number = 10;
    @property
    bufferZone: number = 600;

    items: cc.Node[] = [];
    updateTimer: number = 0;
    updateInterval: number = 0.2;
    lastContentPosY: number = 0;

    // use this for initialization
    onLoad() {
        this.items = [];
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0;
        this.titleLabel.string = NameHelper.version;
        
        this.init();
    }

    start() {
        // 测试用，直接展示指定Shader
        // this.scheduleOnce(() => {
        //     this.showShader(25);
        // }, 0);
    }

    init() {
        let totalCount = NameHelper.getCount();
        let spawnCount = totalCount;
        if (spawnCount > 20) {
            spawnCount = 20;
        }
        this.scrollView.content.height = totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
    	for (let i = 0; i < spawnCount; ++i) { // spawn items, we only need to do this once
    		let node = cc.instantiate(this.itemTemplate);
    		this.scrollView.content.addChild(node);
    		node.setPosition(0, -node.height * (0.5 + i) - this.spacing * (i + 1));
    		node.getComponent('Item').initItem(this, i, i);
            this.items.push(node);
    	}
    }

    getPositionInView(node: cc.Node): cc.Vec3 { // get item position in scrollview's node space
        let worldPos = node.parent.convertToWorldSpaceAR(node.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    update(dt: number) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
        }
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemTemplate.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID - items.length; // update item id
                    item.updateItem(this, itemId);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.scrollView.content.height) {
                    items[i].y = items[i].y - offset;
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID + items.length;
                    item.updateItem(this, itemId);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    }

    scrollToFixedPosition() {
        this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
    }

    clickItem(index: number) {
        let name = NameHelper.getName(index);
        cc.director.loadScene(name, () => {
            BackHomeBtn.instance.setActive(true);    
        });
    }
   
}
