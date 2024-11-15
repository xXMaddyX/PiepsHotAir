import Phaser from "phaser";
import SceneLvL1 from "./scenes/MainMap";
import Pause from "./scenes/pauseUI";

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
            gravity: { y: 10 },
            //debug: true,
        }
    },
    scene: [
        SceneLvL1,
        Pause,
    ]
});