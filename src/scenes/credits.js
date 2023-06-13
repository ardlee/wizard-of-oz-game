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
            "Sheet music for the songs were used as a reference for note placement",
            { fontFamily: "arial", color: "white", fontSize: "40px" }
        )
        this.text2.setOrigin(0.5, 0.5);

        this.text4 = this.add.text(
            1920/2,
            850,
            "https://www.youtube.com/watch?v=7uqp7WBzdU0&list=RDQMliP5YCb4_go&index=19&ab_channel=BertLahr-Topic",
            { fontFamily: "arial", color: "white", fontSize: "20px" }
        )
        this.text4.setOrigin(0.5, 0.5);

        this.text5 = this.add.text(
            1920/2,
            900,
            "https://www.youtube.com/watch?v=kPIdRJlzERo&ab_channel=Myvoinar",
            { fontFamily: "arial", color: "white", fontSize: "20px" }
        )
        this.text5.setOrigin(0.5, 0.5);

        this.text6 = this.add.text(
            1920/2,
            950,
            "https://www.youtube.com/watch?v=6QoELNjcc9w&ab_channel=RichardWick",
            { fontFamily: "arial", color: "white", fontSize: "20px" }
        )
        this.text6.setOrigin(0.5, 0.5);

        this.text3 = this.add.text(
            1400,
            1000,
            "Press 'Esc' to go back",
            { fontFamily: "arial", color: "white", fontSize: "20px" }
        )
        this.text2.setOrigin(0.5, 0.5);

    }

    update() {
        if (isKeyPressed("Escape")) {
            this.scene.start("menuScene");
        }
    }
}