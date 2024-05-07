import Phaser from "phaser";
import Player from "./Player";
import { SmalFlag, SmalFlagMoving } from "../assetLoader/AssetLoader";

export default class PlayerDirectionFlag {
    constructor(scene, player) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        /**@type {Player} */
        this.player = player;
    };

    static loadSprites(scene) {
        if (!scene.textures.exists("SmalFlagIdle")) scene.load.spritesheet("SmalFlagIdle", SmalFlag, {
            frameHeight: 15, frameWidth: 28
        });
        if (!scene.textures.exists("SmalFlagMoving")) scene.load.spritesheet("SmalFlagMoving", SmalFlagMoving, {
            frameHeight: 15, frameWidth: 28
        });
    };

    static initAnimations(scene) {
        if (!scene.anims.exists("SmalFlagIdle")) {
            scene.anims.create({
                key: "SmalFlagIdle",
                frames: scene.anims.generateFrameNumbers("SmalFlagIdle", {
                    start: 0,
                    end: 0
                }),
                frameRate: 0,
                repeat: -1,
            });
        };
        if (!scene.anims.exists("SmalFlagMoving")) {
            scene.anims.create({
                key: "SmalFlagMoving",
                frames: scene.anims.generateFrameNumbers("SmalFlagMoving", {
                    start: 0,
                    end: 2
                }),
                frameRate: 5,
                repeat: -1
            });
        };
    };

    create(x, y) {
        this.smalFlag = this.scene.physics.add.sprite(x, y, "SmalFlagIdle").setScale(2).setDepth(2);
        this.smalFlag.body.allowGravity = false;
        this.smalFlag.anims.play("SmalFlagIdle");
        this.actualState = "IDLE";
    };

    flagHandler(newState) {
        if (this.actualState === newState) return;
        switch (newState) {
            case "LEFT":
                this.smalFlag.anims.play("SmalFlagMoving");
                this.smalFlag.flipX = false;
                break;
            case "IDLE":
                this.smalFlag.anims.play("SmalFlagIdle");
                break;
            case "RIGHT":
                this.smalFlag.anims.play("SmalFlagMoving");
                this.smalFlag.flipX = true;
                break;
        }
        this.actualState = newState;
    }

    update(time, delta) {
        if (this.smalFlag && this.smalFlag.body) {
            this.smalFlag.x = this.player.pieps.x;
            this.smalFlag.y = this.player.pieps.y - 140;
        }
        this.flagHandler(this.player.WIND_DATA.DIRECTION);
    };
};