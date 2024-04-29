import Phaser from "phaser";
import World1 from "../worlds/World1";
import Player from "../player/Player";

export default class SceneLvL1 extends Phaser.Scene {
    constructor() {
        super("SceneLvL1")
    };

    initScene() {
        this.worldBounds = {
            worldHeight: 3072,
            worldWidth: 1920,
        }
    };
    
    preload() {
        //LoadWorld Sprites
        World1.loadSprites(this);

        //
        Player.loadSprites(this);

    };

    create() {
        this.initScene();
        this.physics.world.setBounds(0, -2048, this.worldBounds.worldWidth, this.worldBounds.worldHeight)

        this.world = new World1(this);
        this.world.create();

        Player.initAnimations(this);
        this.player = new Player(this, this.world);
        this.player.initKeybord();
        this.player.create(600, 850);
        this.physics.add.collider(this.player.pieps, this.world.plattforms)
        this.player.setFollowCamera(this.worldBounds.worldWidth, this.worldBounds.worldHeight)
    };

    update(time, delta) {
        this.world.update();
        this.player.update();
    };
};