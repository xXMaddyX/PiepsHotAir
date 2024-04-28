import Phaser from "phaser";
import World1Config from "./World1Config";
import { 
    BackGroundLvL1,
    GroundLvL1,
    Plants,
} from "../assetLoader/AssetLoader";

export default class World1 {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
    };

    static loadSprites(scene) {
        if (!scene.textures.exists("lvl1Background")) {scene.load.image("lvl1Background", BackGroundLvL1)};
        if (!scene.textures.exists("lvl1Ground")) {scene.load.image("lvl1Ground", GroundLvL1)};
        if (!scene.textures.exists("lvl1Plants")) {scene.load.image("lvl1Plants", Plants)};
    };

    initAnimations () {};

    create() {
        World1Config.backgroundPossitions.forEach(({x, y}) => {
            this.scene.add.image(x, y, "lvl1Background");
        });
        
        this.plattforms = this.scene.physics.add.staticGroup()
        World1Config.GroundPossistions.forEach(({x, y}) => {
            let plattform = this.scene.add.sprite(x, y, "lvl1Ground");
            this.plattforms.add(plattform);
        });

        World1Config.Plants.forEach(({x, y}) => {
            this.scene.add.image(x, y, "lvl1Plants")
        });
    };

    update(time, delta) {};
};