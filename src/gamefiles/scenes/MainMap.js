import Phaser from "phaser";
import World1 from "../worlds/World1";
import Player from "../player/Player";

export default class SceneLvL1 extends Phaser.Scene {
    constructor() {
        super("SceneLvL1")
    };

    initScene() {
    };
    
    preload() {
        //LoadWorld Sprites
        World1.loadSprites(this);

        //
        Player.loadSprites(this);

    };

    create() {
        this.world = new World1(this);
        this.world.create();

        Player.initAnimations(this);
        this.player = new Player(this);
        this.player.create(600, 400);
    };

    update(time, delta) {
        this.world.update();
        this.player.update();
    };
};