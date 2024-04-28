import Phaser from "phaser";
import SceneLvL1 from "./scenes/MainMap";

export default new Phaser.Game({
    type: Phaser.WEBGL,
    pixelArt: true,
    scale: {
        mode: Phaser.DOM.RESIZE,
        width: 1920,
        height: 1024,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: -200,
            //debug: true,
        }
    },
    scene: [
        new SceneLvL1(this)
    ]
});