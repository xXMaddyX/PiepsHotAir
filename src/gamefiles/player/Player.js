import Phaser from "phaser";
import Config from "./playerConfig";
import { PlayerBaloon } from "../assetLoader/AssetLoader";

export default class Player {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.config = Config;
        this.timer = 5000;
        this.isBlowing = false;
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
        this.pieps = this.scene.physics.add.sprite(x, y, null).setScale(2);
        this.pieps.setCollideWorldBounds(true);
    };

    update(time, delta) {
        if (this.pieps && this.pieps.body) {
            if (!this.isBlowing) {
                this.isBlowing = true;
                this.pieps.setVelocityY(-25)
                this.pieps.anims.play("Player-Burn");
                this.scene.time.delayedCall(this.timer, () => {
                    this.pieps.anims.play("Player-Idle");
                    this.isBlowing = false;
                }); 
            };
        };
    };
}