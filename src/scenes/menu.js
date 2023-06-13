class MenuScene extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }
    create() {
        this.text1 = this.add.text(
            1920 / 2,
            460,
            "Wizard of Oz Rhythm Game",
            { fontFamily: "arial", color: "gold", fontSize: "100px" }
        );
        this.text1.setOrigin(0.5, 0.5);

        this.text2 = this.add.text(
            1920 / 2,
            700,
            "Press the SPACE BAR to start, press ESC to restart",
            { fontFamily: "arial",color: "gold", fontSize: "60px" }
        );
        this.text2.setOrigin(0.5, 0.5);
    }

    update() {
        if (isKeyPressed("Space")) {
            this.scene.add("rhythm1", rhythm1Scene);
            this.scene.start("rhythm1");
        }

        if (isKeyPressed("Enter")) {
            this.scene.add("rhythm2", rhythm2Scene);
            this.scene.start("rhythm2");
        }

        if (isKeyPressed("ShiftLeft")) {
            this.scene.add("rhythm3", rhythm3Scene);    
            this.scene.start("rhythm3");
        }

        if (isKeyPressed("Escape")) {
            this.scene.add("creditsScene", CreditsScene);
            this.scene.start("creditsScene");
        }
    }
}
