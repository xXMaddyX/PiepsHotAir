import Phaser from "phaser";
import World1 from "../worlds/World1";
import Player from "../player/Player";
import PlaneClass from "../Plane/Plane";
import World1Config from "../worlds/World1Config";
import ThunderCloudeClass from "../thundercloude/ThunderCloude";

export default class SceneLvL1 extends Phaser.Scene {
    constructor() {
        super("SceneLvL1")
    };

    initScene() {
        this.planePool = [];
        this.worldBounds = {
            worldHeight: 2048,
            worldWidth: 5760,
        };
    };
    
    preload() {
        //Load WorldSprites
        World1.loadSprites(this);

        //Load PlayerSprites
        Player.loadSprites(this);

        //Load PlaneSprites
        PlaneClass.loadSprites(this);

        //Load ThunderCloude Sprites
        ThunderCloudeClass.loadSprites(this);
    };

    createWorldWindOverlaps() {
        this.world.windAreaPool.forEach(wind => {
            this.physics.add.overlap(this.player.pieps, wind, () => {
                this.player.setWindData(wind.direction, wind.speed)
                if (wind.speed > 0) {
                    if (this.player.pieps.body.velocity.x < this.player.WIND_DATA.SPEED) {
                        this.player.windHandler()
                    } else {
                        this.player.pieps.setAccelerationX(0)
                    };
                }
                if (wind.speed < 0) {
                    if (this.player.pieps.body.velocity.x > this.player.WIND_DATA.SPEED) {
                        this.player.windHandler()
                    } else {
                        this.player.pieps.setAccelerationX(0)
                    };
                }
            });
        });
    };

    spawnPlanes() {
        World1Config.PlanePositions.forEach(({x, y}) => {
            this.plane = new PlaneClass(this, this.player);
            this.plane.create(x, y);
            this.planePool.push(this.plane);
        });
    };

    spawnThunderClouds() {
        this.thunderCloude = new ThunderCloudeClass(this, this.player);
        this.thunderCloude.create(1500, -500);
    };

    create() {
        //Init Scene
        this.initScene();
        
        //Set WorldBunds
        this.physics.world.setBounds(0, -2048, this.worldBounds.worldWidth, this.worldBounds.worldHeight)

        //Create World
        this.world = new World1(this);
        this.world.create();

        //Create Player
        Player.initAnimations(this);
        this.player = new Player(this);
        this.player.initKeybord();
        this.player.create(200, -230);
        this.createWorldWindOverlaps();
        this.physics.add.collider(this.player.pieps, this.world.plattforms);
        this.player.setFollowCamera(this.worldBounds.worldWidth, this.worldBounds.worldHeight);

        //Create Planes
        PlaneClass.intitAnimations(this);
        this.spawnPlanes();

        //Create ThunderClouds
        ThunderCloudeClass.initAnimations(this);
        this.spawnThunderClouds();
    };

    update(time, delta) {
        //Update Onjects
        this.world.update();
        this.player.update();
        this.thunderCloude.update();

        if (this.thunderCloude.ThunderCloude.x < this.physics.world.bounds.x -100) {
            this.thunderCloude.ThunderCloude.x = 2500
        }

        //Planes Update
        this.planePool.forEach(plane => {
            plane.update();
            if (plane.plane.x < this.physics.world.bounds.x - 100) {
                let RandomHeight = Phaser.Math.Between(-700, -900)
                plane.plane.x = 6000;
                plane.plane.y = RandomHeight;
            };
        });

        //Check Player & Wind Overlap
        let isOverlapping = false;
        this.world.windAreaPool.forEach(wind => {
            if (this.physics.world.overlap(this.player.pieps, wind)) {
                isOverlapping = true;
            }
        });
        if (!isOverlapping) {
            this.player.moveSlowdownFunc();
        };
    };
};