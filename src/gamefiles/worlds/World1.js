import Phaser from "phaser";
import World1Config from "./World1Config";
import { 
    BackGroundLvL1,
} from "../assetLoader/AssetLoader";

export default class World1 {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
    };

    static loadSprites(scene) {
        if (!scene.textures.exists("lvl1Background")) {
            scene.load.image("lvl1Background", BackGroundLvL1);
        };
    };

    initAnimations () {};

    create() {
        World1Config.backgroundPossitions.forEach(({x, y}) => {
            this.scene.add.image(x, y, "lvl1Background").setScale(1);
        });
    };

    update(time, delta) {};
};