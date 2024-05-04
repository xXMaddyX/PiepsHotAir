import Phaser from "phaser";
import Player from "../player/Player";
import { ThunderCloude } from "../assetLoader/AssetLoader";

export default class ThunderCloudeClass {
    constructor(scene, player) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        /**@type {Player} */
        this.player = player;
    };

    static loadSprites(scene) {
        if (!scene.textures.exists("lvl1ThunderCloude")) {
            scene.load.spritesheet("lvl1ThunderCloude", ThunderCloude, {
                frameWidth: 148, frameHeight: 128
            });
        };
    };

    static initAnimations(scene) {
        if (!scene.anims.exists("lvl1ThunderCloude")) {
            scene.anims.create({
                key: "lvl1ThunderCloude",
                frames: scene.anims.generateFrameNumbers("lvl1ThunderCloude", {
                    start: 0,
                    end: 13
                }),
                frameRate: 10,
                repeat: -1
            });
        };
    };

    create(x, y) {
        this.ThunderCloude = this.scene.physics.add.sprite(x, y, "lvl1ThunderCloude").setDepth(3);
        this.ThunderCloude.setGravityY(-10);
        this.ThunderCloude.anims.play("lvl1ThunderCloude");
    };

    update(time, delta) {
        if (this.ThunderCloude && this.ThunderCloude.body) {
            this.ThunderCloude.setVelocityX(-10)
        }
    };
};