import Phaser from "phaser";
import Player from "../player/Player";
import { ThunderCloude, ThunderSound } from "../assetLoader/AssetLoader";

export default class ThunderCloudeClass {
    constructor(scene, player) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        /**@type {Player} */
        this.player = player;
        this.isThunder = true;
        this.delayTime = 15000;
    };

    static loadSprites(scene) {
        if (!scene.textures.exists("lvl1ThunderCloude")) {
            scene.load.spritesheet("lvl1ThunderCloude", ThunderCloude, {
                frameWidth: 148, frameHeight: 128
            });
        };
        scene.load.audio("lvl1ThunderSound", ThunderSound);
    };

    static initAnimations(scene) {
        if (!scene.anims.exists("lvl1ThunderCloude")) {
            scene.anims.create({
                key: "lvl1ThunderCloude",
                frames: scene.anims.generateFrameNumbers("lvl1ThunderCloude", {
                    start: 0,
                    end: 14
                }),
                frameRate: 10,
                repeat: 0
            });
        };
    };

    create(x, y) {
        this.sound = this.scene.sound.add("lvl1ThunderSound");

        this.ThunderCloude = this.scene.physics.add.sprite(x, y, "lvl1ThunderCloude").setDepth(3);
        this.ThunderCloude.setGravityY(-10);
    };

    thunderAnimPlay() {
        this.ThunderCloude.anims.play("lvl1ThunderCloude");
    }

    thunderHandler(distanceToPlayer) {
        this.isThunder = false;
        if (distanceToPlayer < 1500) {
            this.thunderAnimPlay();
            this.sound.volume = 0.1;
            this.sound.play();
        }
        if (distanceToPlayer < 800) {
            this.thunderAnimPlay();
            this.sound.volume = 1;
            this.sound.play();
        };
        this.scene.time.delayedCall(this.delayTime, () => {
            this.isThunder = true;
        });
    };
    
    update(time, delta) {
        let distanceToPlayer = Phaser.Math.Distance.Between(this.ThunderCloude.x, 0, this.player.pieps.x, 0);
        if (this.ThunderCloude && this.ThunderCloude.body) {
            this.ThunderCloude.setVelocityX(-10)
        }
        if (this.isThunder && distanceToPlayer < 1500) {
            this.thunderHandler(distanceToPlayer);
        };
    };
};