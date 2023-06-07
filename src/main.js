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
 */ 



// let phaserGame;
// window.addEventListener("load", () => {
//     if (phaserGame == null) {
//         phaserGame = new PhaserGame();
//         phaserGame.init();
//     }
// });

// class PhaserGame {
//     init() {
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
        
//     }
// }