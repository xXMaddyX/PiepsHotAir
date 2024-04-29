import Phaser from "phaser";
import World1Config from "./World1Config";
import { 
    BackGroundLvL1,
    Clouds,
    GroundLvL1,
    Plants,
} from "../assetLoader/AssetLoader";

export default class World1 {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.cloudsPool = [];
        this.changeDirection = false;
    };

    static loadSprites(scene) {
        if (!scene.textures.exists("lvl1Background")) {scene.load.image("lvl1Background", BackGroundLvL1)};
        if (!scene.textures.exists("lvl1Ground")) {scene.load.image("lvl1Ground", GroundLvL1)};
        if (!scene.textures.exists("lvl1Plants")) {scene.load.image("lvl1Plants", Plants)};
        if (!scene.textures.exists("lvl1Clouds")) {scene.load.image("lvl1Clouds", Clouds)};
    };

    initAnimations () {};

    create() {
        World1Config.backgroundPositions.forEach(({x, y}) => {
            this.scene.add.image(x, y, "lvl1Background");
        });
        
        this.plattforms = this.scene.physics.add.staticGroup()
        World1Config.GroundPositions.forEach(({x, y}) => {
            let plattform = this.scene.add.sprite(x, y, "lvl1Ground");
            this.plattforms.add(plattform);
        });

        World1Config.PlantsPositions.forEach(({x, y}) => {
            this.scene.add.image(x, y, "lvl1Plants")
        });

        World1Config.CloudsPosistions.forEach(({x, y}) => {
            let cloudTile = this.scene.add.image(x, y, "lvl1Clouds");
            this.cloudsPool.push(cloudTile);
        });

        this.windArea1 = this.scene.physics.add.sprite(960, 500, null);
        this.windArea1.setGravityY(-10);
        this.windArea1.setVisible(false);
        this.windArea1.setBodySize(1920, 200);

        this.windArea2 = this.scene.physics.add.sprite(960, 0, null);
        this.windArea2.setGravityY(-10);
        this.windArea2.setVisible(false);
        this.windArea2.setBodySize(1920, 200);
    };

    update(time, delta) {
        this.cloudsPool.forEach(clouds => {
            clouds.x -= 0.3
            if (clouds.x <= -960) {
                clouds.x = 2880
            }
        });
    };
};