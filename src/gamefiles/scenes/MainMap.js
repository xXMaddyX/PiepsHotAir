import Phaser from "phaser";
import World1 from "../worlds/World1";
import Player from "../player/Player";

export default class SceneLvL1 extends Phaser.Scene {
    constructor() {
        super("SceneLvL1")
    };

    initScene() {
        this.worldBounds = {
            worldHeight: 2048,
            worldWidth: 5760,
        };
    };
    
    preload() {
        //Load WorldSprites
        World1.loadSprites(this);

        //Load PlayerSprites
        Player.loadSprites(this);

    };

    createWorldWindOverlaps() {
        this.world.windAreaPool.forEach(wind => {
            this.physics.add.overlap(this.player.pieps, wind, () => {
                this.player.setWindData(wind.direction, wind.speed)
                if (wind.speed > 0) {
                    if (this.player.pieps.body.velocity.x < this.player.WIND_DATA.SPEED) {
                        this.player.windHandler()
                    } else {
                        this.player.pieps.setAccelerationX(0)
                    };
                }
                if (wind.speed < 0) {
                    if (this.player.pieps.body.velocity.x > this.player.WIND_DATA.SPEED) {
                        this.player.windHandler()
                    } else {
                        this.player.pieps.setAccelerationX(0)
                    };
                }
            });
        });
    };

    create() {
        //Init Scene
        this.initScene();
        
        //Set WorldBunds
        this.physics.world.setBounds(0, -2048, this.worldBounds.worldWidth, this.worldBounds.worldHeight)

        //Create World
        this.world = new World1(this);
        this.world.create();

        //Create Player
        Player.initAnimations(this);
        this.player = new Player(this);
        this.player.initKeybord();
        this.player.create(600, -175);
        this.createWorldWindOverlaps();
        this.physics.add.collider(this.player.pieps, this.world.plattforms)
        this.player.setFollowCamera(this.worldBounds.worldWidth, this.worldBounds.worldHeight)
    };

    update(time, delta) {
        //Update Onjects
        this.world.update();
        this.player.update();

        //Check Player & Wind Overlap
        let isOverlapping = false;
        this.world.windAreaPool.forEach(wind => {
            if (this.physics.world.overlap(this.player.pieps, wind)) {
                isOverlapping = true;
            }
        });
        if (!isOverlapping) {
            this.player.moveSlowdownFunc();
        };
    };
};