import Phaser from "phaser";
import World1 from "../worlds/World1";
import Config from "./playerConfig";
import { PlayerBaloon } from "../assetLoader/AssetLoader";

const MOVING_STATS = {
    MOVING_UP: "MOVING_UP"
}

export default class Player {
    constructor(scene, world) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        /**@type {World1} */
        this.world = world;
        this.config = Config;
        this.timer = 2000;
        this.isBlowing = false;
        this.isWind = false;
        this.WIND_DATA = {
            SPEED: 0,
        }
    };

    static loadSprites(scene) {
        if (!scene.textures.exists("PlayerBallon")) {scene.load.spritesheet("PlayerBallon", PlayerBaloon, {
            frameHeight: 127, frameWidth: 74
        })};
    };

    static initAnimations(scene) {
        scene.anims.create({
            key: "Player-Burn",
            frames: scene.anims.generateFrameNumbers("PlayerBallon", {
                start: 0,
                end: 5
            }),
            frameRate: 5,
            repeat: 0,
        });

        scene.anims.create({
            key: "Player-Idle",
            frames: scene.anims.generateFrameNumbers("PlayerBallon", {
                start: 0,
                end: 0,
            }),
            frameRate: 0,
            repeat: -1
        })
    };

    create(x, y) {
        this.pieps = this.scene.physics.add.sprite(x, y, "PlayerBallon").setScale(2);
        this.pieps.setCollideWorldBounds(true);
        this.pieps.setBodySize(60, 127, true);
        this.createWorldWindOverlaps();
    };

    createWorldWindOverlaps() {
        this.scene.physics.add.overlap(this.pieps, this.world.windArea1, () => {
            this.setWindData("RIGHT", 20)
            if (this.pieps.body.velocity.x < this.WIND_DATA.SPEED) {
                this.windHandler()
            } else {
                this.pieps.setAccelerationX(0)
            }
        });

        this.scene.physics.add.overlap(this.pieps, this.world.windArea2, () => {
            this.setWindData("LEFT", -20)
            if (this.pieps.body.velocity.x > this.WIND_DATA.SPEED) {
                this.windHandler()
            } else {
                this.pieps.setAccelerationX(0)
            }
        });

    };

    setWindData(direction, speed) {
        this.WIND_DATA.DIRECTION = direction;
        this.WIND_DATA.SPEED = speed
    };

    initKeybord() {
        this.controls = {
            movingKeys: this.scene.input.keyboard.createCursorKeys(),
        };
    };

    //Camera Settings
    setFollowCamera(width, height) {
        this.scene.cameras.main.setBounds(0, -2048, width, height);
        this.scene.cameras.main.setDeadzone(50, 50);
        this.scene.cameras.main.startFollow(this.pieps, false, 0.1, 0.1);
    };

    blowFire() {
        this.isBlowing = true;
        this.pieps.setVelocityY(-35)
        this.pieps.anims.play("Player-Burn");
        this.scene.time.delayedCall(this.timer, () => {
            this.pieps.anims.play("Player-Idle");
            this.isBlowing = false;
        });
    }

    windHandler() {
        this.pieps.setAccelerationX(this.WIND_DATA.SPEED)
    }

    moveSlowdownFunc() {
        if (this.pieps.body.velocity.x > 5) {
            this.pieps.setAccelerationX(-5)
        }
        if (this.pieps.body.velocity.x < -5) {
            this.pieps.setAccelerationX(5)
        }
        if (this.pieps.body.velocity.x < 5 && this.pieps.body.velocity.x > -5) {
            this.pieps.body.velocity.x = 0
        }
    };

    update(time, delta) {
        if (this.pieps && this.pieps.body) {
            console.log(this.pieps.body.velocity.x)
            if (this.controls.movingKeys.up.isDown && !this.isBlowing) {
                this.blowFire();
            };

            if (!this.scene.physics.world.overlap(this.pieps, this.world.windArea1) && !this.scene.physics.world.overlap(this.pieps, this.world.windArea2)) {
                this.moveSlowdownFunc();
            };
        };
    };
}