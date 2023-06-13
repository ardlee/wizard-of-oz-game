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
            "Press ESC to view credits, or press ESC during songs to return to menu",
            { fontFamily: "arial",color: "gold", fontSize: "60px" }
        );
        this.text2.setOrigin(0.5, 0.5);

        this.text3 = this.add.text(
            1920 / 2,
            800,
            "Press Space to play 'Follow the Yellow Brick Road",
            { fontFamily: "arial",color: "yellow", fontSize: "40px" }
        );
        this.text3.setOrigin(0.5, 0.5);

        this.text4 = this.add.text(
            1920 / 2,
            900,
            "Press Enter to play 'Ding Dong the Witch is Dead",
            { fontFamily: "arial",color: "green", fontSize: "40px" }
        );
        this.text4.setOrigin(0.5, 0.5);

        this.text5 = this.add.text(
            1920 / 2,
            1000,
            "Press the left shift button to play 'the Merry Land of Oz",
            { fontFamily: "arial",color: "red", fontSize: "40px" }
        );
        this.text5.setOrigin(0.5, 0.5);
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
