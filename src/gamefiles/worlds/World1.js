import Phaser from "phaser";
import World1Config from "./World1Config";
import { 
    BackGroundLvL1,
    Clouds,
    GroundLvL1,
    Plants,
    StartPlattform,
    HochausVer1,
    Berge,
    AmbienteSound,
    SmallHouse,
} from "../assetLoader/AssetLoader";

export default class World1 {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.cloudsPool = [];
        this.windAreaPool = [];
        this.bergePool = [];
        this.BuildingPool = [];
        this.changeDirection = false;
    };

    static loadSprites(scene) {
        //Load Textures
        if (!scene.textures.exists("lvl1Background")) {scene.load.image("lvl1Background", BackGroundLvL1)};
        if (!scene.textures.exists("lvl1Ground")) {scene.load.image("lvl1Ground", GroundLvL1)};
        if (!scene.textures.exists("lvl1Plants")) {scene.load.image("lvl1Plants", Plants)};
        if (!scene.textures.exists("lvl1Clouds")) {scene.load.image("lvl1Clouds", Clouds)};
        if (!scene.textures.exists("lvl1StartPlattform")) {scene.load.image('lvl1StartPlattform', StartPlattform)};
        if (!scene.textures.exists("lvl1HochausVer1")) {scene.load.image('lvl1HochausVer1', HochausVer1)};
        if (!scene.textures.exists("lvl1Berge")) {scene.load.image('lvl1Berge', Berge)};
        if (!scene.textures.exists("lvl1SmallHouse")) {scene.load.image('lvl1SmallHouse', SmallHouse)};

        //Load Sounds
        scene.load.audio("lvl1AmbienteSound", AmbienteSound);
    };

    initAnimations () {};

    create() {
        //Add Sound
        this.sound = this.scene.sound.add("lvl1AmbienteSound", {loop: true});

        //Add Background Layers
        World1Config.backgroundPositions.forEach(({x, y}) => {
            this.scene.add.image(x, y, "lvl1Background").setDepth(1);
        });
        
        //Static Collider Plattforms
        this.plattforms = this.scene.physics.add.staticGroup()
        World1Config.GroundPositions.forEach(({x, y}) => {
            let plattform = this.scene.add.sprite(x, y, "lvl1Ground").setDepth(3);
            this.plattforms.add(plattform);
        });

        //Static Start Plattform
        let StartPlattform = this.scene.add.sprite(200, -70, "lvl1StartPlattform").setDepth(3);
        this.plattforms.add(StartPlattform)

        //Ground Plant Assets
        World1Config.PlantsPositions.forEach(({x, y}) => {
            this.scene.add.image(x, y, "lvl1Plants").setDepth(3);
        });

        //Cloude Assets
        World1Config.CloudsPosistions.forEach(({x, y}) => {
            let cloudTile = this.scene.add.image(x, y, "lvl1Clouds").setDepth(4);
            this.cloudsPool.push(cloudTile);
        });

        //Hill Assets
        World1Config.Berge.forEach(({x, y}) => {
            let Berg = this.scene.add.image(x, y, "lvl1Berge").setDepth(1);
            Berg.origX = Berg.x;
            this.bergePool.push(Berg);
        });

        //SkyScraper Assets
        World1Config.HochausPosition.forEach(({x, y}) => {
            let Hochaus = this.scene.physics.add.sprite(x, y, "lvl1HochausVer1").setDepth(1).setScale(1);
            Hochaus.setGravityY(-10);
            this.BuildingPool.push(Hochaus);
        });

        //Wind Field Collider Locations
        World1Config.WindFields.forEach(field => {
            let windArea = this.scene.physics.add.sprite(field.posx, field.posY, null);
            windArea.setGravityY(-10);
            windArea.setVisible(false);
            windArea.setBodySize(field.width, field.height);
            windArea.direction = field.direction;
            windArea.speed = field.speed;
            this.windAreaPool.push(windArea);
        });
    };

    update(time, delta) {
        if (!this.sound.isPlaying) {
            this.sound.play();
        };

        //Calculate Parallax Effects and Reset Clouds out of Screen
        this.cloudsPool.forEach(clouds => {
            clouds.x -= 0.3
            if (clouds.x <= -960) {
                clouds.x = World1Config.calcTilePosX(World1Config.tileWidth * 3);
            };

            this.bergePool.forEach(Berg => {
                const parallaxFactor = 0.5;
                Berg.x = Berg.origX + (this.scene.cameras.main.scrollX * parallaxFactor);
            });
        });
    };
};