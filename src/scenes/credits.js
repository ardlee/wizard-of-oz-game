class CreditsScene {
 
    create() {
     
        this.text1 = this.add.text(
            1920 / 2,
            600,
            "Credits",
            { fontFamily: "arial", color: "gold", fontSize: "100px" }
        );
        this.text1.setOrigin(0.5, 0.5);

        this.text2 = this.add.text(
            1920/2,
            800,
            "Sheet music for the songs were used as a reference for note placement"
        )
        this.text2.setOrigin(0.5, 0.5);

    }

    update() {
        if (isKeyPressed("Space")) {
            this.scene.add("rhythm1", rhythm1Scene);
            this.scene.start("rhythm1");
        }
    }
}