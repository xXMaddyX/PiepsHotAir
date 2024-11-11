export default class Pause extends Phaser.Scene {
    constructor() {
        super("Pause")
        this.pause = false;
        this.escPressed = false;
    };

    preload() {
        this.load.image('button', 'src/gamefiles/scenes/Button1.png');
    };

    create() {
        const button = this.add.image(200, 100, 'button').setInteractive();
        const buttonText = this.add.text(180, 95, 'Set Pause', { font: '20px Arial', fill: '#ffffff' }).setInteractive();
        this.escButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //LISTENERS_FOR_MOUSE_CLICK_EVENT----------------->
        button.on('pointerdown', () => {
            this.pause = !this.pause;
            if (this.pause) {
                this.scene.pause('SceneLvL1');
                buttonText.text = "Resume"
            } else {
                this.scene.resume('SceneLvL1');
                buttonText.text = "Set Pause";
            }
            console.log('OtherScene paused');
        });

        //HERE I WAS LAZY AND DIDNT ADD THE TEXT TO THE BUTTON :-)
        //NOMRALY YOU WOULD ADD THE TEXT TO THE BUTTON OBJECT AND NO SECOND LISTENER IS NEEDET :-)
        buttonText.on("pointerdown", () => {
            this.pause = !this.pause;
            if (this.pause) {
                this.scene.pause('SceneLvL1');
                buttonText.text = "Resume"
            } else {
                this.scene.resume('SceneLvL1');
                buttonText.text = "Set Pause";
            }
            console.log('OtherScene paused');
        });

        //LISTENER_FOR_ESC_BUTTON------------------------------->
        this.escButton.on("down", () => {
            if (!this.escPressed) {
                this.pause = !this.pause;
                if (this.pause) {
                    this.scene.pause('SceneLvL1');
                    buttonText.text = "Resume"
                } else {
                    this.scene.resume('SceneLvL1');
                    buttonText.text = "Set Pause";
                };
                this.escPressed = true;
            };
        });
        this.escButton.on("up", () => {
            this.escPressed = false;
        });
    };
};