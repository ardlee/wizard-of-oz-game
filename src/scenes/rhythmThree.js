class rhythm3Scene {
    preload() {
        this.load.audio("song3", "assets/merry.ogg");
    }

    create() {
        /*---------------*/
        // Notes timestamps, made with the other script "record.html". They are relative to the start of the song, meaning a value of 1000 equals to 1 second after the song has started
       
        this.notesTimestamps = JSON.parse('[{"timestamp":613},{"timestamp":796},{"timestamp":1010},{"timestamp":1530},{"timestamp":1794},{"timestamp":2073},{"timestamp":2697},{"timestamp":2950},{"timestamp":3203},{"timestamp":3467},{"timestamp":3713},{"timestamp":4709},{"timestamp":4937},{"timestamp":5206},{"timestamp":5771},{"timestamp":6029},{"timestamp":6294},{"timestamp":6852},{"timestamp":7107},{"timestamp":7329},{"timestamp":7577},{"timestamp":7817},{"timestamp":9000},{"timestamp":9222},{"timestamp":9463},{"timestamp":10020},{"timestamp":10230},{"timestamp":10502},{"timestamp":11059},{"timestamp":11277},{"timestamp":11521},{"timestamp":11744},{"timestamp":12001},{"timestamp":13079},{"timestamp":13286},{"timestamp":13587},{"timestamp":14148},{"timestamp":14681},{"timestamp":15255},{"timestamp":15471},{"timestamp":15705},{"timestamp":15926},{"timestamp":16145},{"timestamp":17084},{"timestamp":17261},{"timestamp":17494},{"timestamp":17726},{"timestamp":18031},{"timestamp":18267},{"timestamp":18522},{"timestamp":18771},{"timestamp":19116},{"timestamp":19353},{"timestamp":21343},{"timestamp":21607},{"timestamp":21841},{"timestamp":22088},{"timestamp":22339},{"timestamp":22601},{"timestamp":22839},{"timestamp":23114},{"timestamp":23402},{"timestamp":24620},{"timestamp":24867},{"timestamp":25557},{"timestamp":25760},{"timestamp":25979},{"timestamp":26500},{"timestamp":26717},{"timestamp":26969},{"timestamp":27547},{"timestamp":27757},{"timestamp":27999},{"timestamp":28244},{"timestamp":28499},{"timestamp":29546},{"timestamp":29829},{"timestamp":30108},{"timestamp":30630},{"timestamp":31141},{"timestamp":31667},{"timestamp":31857},{"timestamp":32104},{"timestamp":32342},{"timestamp":32574},{"timestamp":33785},{"timestamp":34026},{"timestamp":34256},{"timestamp":34805},{"timestamp":35049},{"timestamp":35282},{"timestamp":35851},{"timestamp":36087},{"timestamp":36335},{"timestamp":36582},{"timestamp":36840},{"timestamp":37852},{"timestamp":38127},{"timestamp":38396},{"timestamp":38691},{"timestamp":38914},{"timestamp":39164},{"timestamp":39413},{"timestamp":39903},{"timestamp":40107},{"timestamp":40364},{"timestamp":40644},{"timestamp":40935},{"timestamp":41187},{"timestamp":41442},{"timestamp":42060},{"timestamp":42312},{"timestamp":42557},{"timestamp":42791},{"timestamp":43055}]')
        this.timeToFall = 1000; // ms, time for the note to go to the bottom. The lower the faster/hardest
        this.lastNoteIndex = 0; // last note spawned
        this.notes = [];        // array of notes already spawned
        this.colliders = [];    // colliders for player input vs falling note
        this.score = 0;         // score, needs no explanation
        /*--------------*/

        // this is thebar at the bottom
        this.noteBar = this.add.rectangle(1920 / 2, 1000, 1920, 10, 0x00FF00);

        // The score text
        this.scoreText = this.add.text(100, 100, "SCORE", { fontFamily: "arial", fontSize: "100px" });

        // Help text under the red bar
        this.helpText = this.add.text(1920 / 2, 1050, "Press SPACEBAR when yellow dots are on the green line", { fontFamily: "arial", fontSize: "50px" });
        this.helpText.setOrigin(0.5, 0.5);

        // audio object 
        this.song = this.sound.add("song3");
        this.song.volume = 3;
        this.song.play();

        // set the start time of the game
        this.startTime = Date.now();
 
    }

    update() {
        this.returnMenu();
        this.PlayerTapInput();
        this.spawnNotes();
        this.checkNoteCollisions();
    }

    returnMenu() {
        if (isKeyPressed("Escape")) {
            this.scene.stop('rythm3');
            this.song.stop(); 
            this.scene.start('menuScene');
            this.sound.get('song3').stop();
        }
    }


    spawnNotes() {
        // lets look up to the 15 next notes and spawn if needed
        for (let i = this.lastNoteIndex; i < this.lastNoteIndex + 15; i++) {
            let note = this.notesTimestamps[i];
            if (!note) break;

            // Spawn note if: is not already spawned, and the timing is right. From the start of the song, we need to consider the time it takes for the note to fall so we start it at the timestamp minus the time to fall
            if (
                note.spawned != true
                && note.timestamp <= Date.now() - this.startTime + this.timeToFall
            ) {
                this.spawnNote();
                this.lastNoteIndex = i;
                note.spawned = true;
            }
        }
    }

    spawnNote() {
        // spawn note and let physics drop it
        let note = this.add.circle(1920 / 2, 0, 15, 0xffff00);
        this.notes.push(note);
        this.physics.add.existing(note);
        this.physics.moveTo(note, 1920 / 2, 1000, null, this.timeToFall);
    }

    PlayerTapInput() {
        if (isKeyPressed("Space")) {
            // collider at the bar
            let collider = this.add.circle(1920 / 2, 1000, 30, 0xaaaaff);

            //physics for collider to destroy notes
            this.physics.add.existing(collider);

            // tween to grow collider
            this.tweens.add({
                targets: collider,
                scale: 2.5,
                duration: 100,
                alpha: 0,
                onComplete: () => {
                    collider.destroy();

                    // if miss lower score and shake camera
                    if (collider.collided != true) {
                        this.cameras.main.shake(500, 0.01);
                        this.score -= 200;
                        this.updateScoreText();
                    }
                }
            });

            // add the collider to the list
            this.colliders.push(collider);
        }
    }

    checkNoteCollisions() {
        this.physics.overlap(this.colliders, this.notes, (collider, note) => {
            // the collider collided
            collider.collided = true;

            // remove the collider from list
            this.colliders.splice(this.colliders.indexOf(collider), 1);

            // destroy the note and remove from list
            note.destroy();
            this.notes.splice(this.notes.indexOf(note), 1);

            // increase the score and update the text
            this.score += 100;
            this.updateScoreText();
        });
    }

    updateScoreText() {
        this.scoreText.text = this.score;
    }


}

