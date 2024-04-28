import Phaser from "phaser";
import World1 from "../worlds/World1";

export default class SceneLvL1 extends Phaser.Scene {
    constructor() {
        super("SceneLvL1")
    };

    initScene() {
    };
    
    preload() {
        //LoadWorld Sprites
        World1.loadSprites(this);

    };

    create() {
        this.world = new World1(this);
        this.world.create();
    };

    update(time, delta) {

    };
};