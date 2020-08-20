interface nameDesc {
    name: string;
    desc: string;
};

let nameArray: nameDesc[] = [
    { name:'HSL', desc:'HSL转RGB' }, // 0
    { name:'WaterWave', desc:'水波纹' }, // 1
];

export default class NameHelper {
    static version: string = 'Test Shaders For CocosCreator 2.3.4';
    
    static getTitle(index: number): string {
        let str = '';
        if (index >= 0 && index < nameArray.length) {
            str = index + '.    ' + nameArray[index].name + ' - ' + nameArray[index].desc;
        } else {
            str = NameHelper.version;
        }
        return str;
    }

    static getName(index: number): string {
        let name = '';
        if (index >= 0 && index < nameArray.length) {
            name = nameArray[index].name;
        }
        return name;
    }

    static getCount(): number {
        return nameArray.length;
    }

}
