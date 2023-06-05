class MenuScene extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }
    create() {
        this.text1 = this.add.text(
            1920 / 2,
            460,
            "Final Game",
            { fontFamily: "arial", color: "gold", fontSize: "100px" }
        );
        this.text1.setOrigin(0.5, 0.5);

        this.text2 = this.add.text(
            1920 / 2,
            700,
            "Press the SPACE BAR to start",
            { fontFamily: "arial",color: "gold", fontSize: "100px" }
        );
        this.text2.setOrigin(0.5, 0.5);
    }

    update() {
        if (isKeyPressed("Space")) {
            this.scene.add("rhythm1", rhythm1Scene);
            this.scene.start("rhythm1");
        }

        if (isKeyPressed("Escape")) {
            this.scene.add("creditsScene", CreditsScene);
            this.scene.start("creditsScene");
        }
    }
}
