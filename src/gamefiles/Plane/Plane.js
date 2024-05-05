import Phaser from "phaser";
import Player from "../player/Player";
import { Plane, Airplane } from "../assetLoader/AssetLoader";

export default class PlaneClass {
    constructor(scene, player) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        /**@type {Player} */
        this.player = player;
        this.delay = 65000;
        this.soundIsReady = true;
    };

    static loadSprites(scene) {
        if (!scene.textures.exists("PlaneLvL1")) {
            scene.load.spritesheet("PlaneLvL1", Plane, {
                frameWidth: 115, frameHeight: 66
            });
        };
        scene.load.audio("PlaneSound", Airplane);
    };

    static intitAnimations(scene) {
        scene.anims.create({
            key: "PlaneLvL1",
            frames: scene.anims.generateFrameNumbers("PlaneLvL1", {
                start: 0,
                end: 2,
            }),
            frameRate: 10,
            repeat: -1
        });
    };

    create(x, y) {
        this.PlaneSound = this.scene.sound.add("PlaneSound");
        this.PlaneSound.volume = 0.5;
        this.plane = this.scene.physics.add.sprite(x, y, "PlaneLvL1").setDepth(3).setScale(1.5);
        this.plane.setGravityY(-10)
        this.plane.anims.play("PlaneLvL1");
    };

    airplaneSoundHandler(distanceToPlayer) {
        this.soundIsReady = false;
        if (distanceToPlayer < 2500) {
            this.PlaneSound.play();
        };
        this.scene.time.delayedCall(this.delay, () => {
            this.soundIsReady = true;
        });
    }

    update(time, delta) {
        let distanceToPlayer = Phaser.Math.Distance.Between(this.plane.x, 0, this.player.pieps.x, 0);
        if (this.plane && this.plane.body) {
            this.plane.setVelocityX(-90)
        }
        if (this.soundIsReady && distanceToPlayer < 2500) {
            this.airplaneSoundHandler(distanceToPlayer);
        };
    };
};