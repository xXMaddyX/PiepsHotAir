import Phaser from "phaser";
import Player from "../player/Player";
import { Plane } from "../assetLoader/AssetLoader";

export default class PlaneClass {
    constructor(scene, player) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        /**@type {Player} */
        this.player = player;
    };

    static loadSprites(scene) {
        if (!scene.textures.exists("PlaneLvL1")) {
            scene.load.spritesheet("PlaneLvL1", Plane, {
                frameWidth: 115, frameHeight: 66
            });
        };
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
        this.plane = this.scene.physics.add.sprite(x, y, "PlaneLvL1").setDepth(3).setScale(1.5);
        this.plane.setGravityY(-10)
        this.plane.anims.play("PlaneLvL1");
    };

    update(time, delta) {
        if (this.plane && this.plane.body) {
            this.plane.setVelocityX(-200)
        }
    };
};