/**
 * Arthur Lee
 * Wizard of Oz Rhythm Game
 * 
 * Phaser Components:
 * *Camera
 * *Tween
 * *Physics
 * *Time
 * *Text Objects
 * 
 * 
 * 
 * Another code file called record was used to get timestamps for note placement, that code just played the song
 * and when a button was pressed it would record the time stamp for me at the time of the button pressed. This is how I got the note placements
 */ 




let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    width: 1920,
    height: 1080,
    scene: MenuScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

this.game = new Phaser.Game(config);
