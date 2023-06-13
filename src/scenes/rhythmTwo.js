class rhythm2Scene {
    preload() {
        this.load.audio("song2", "assets/Ding-Dong-the-Witch-is-Dead.ogg");
    }

    create() {
        /*---------------*/
        // Notes timestamps, made with the other script "record.html". They are relative to the start of the song, meaning a value of 1000 equals to 1 second after the song has started
        
        this.notesTimestamps = JSON.parse('[{"timestamp":12643},{"timestamp":12863},{"timestamp":13217},{"timestamp":13370},{"timestamp":13546},{"timestamp":13729},{"timestamp":14164},{"timestamp":14371},{"timestamp":14589},{"timestamp":14789},{"timestamp":15097},{"timestamp":15315},{"timestamp":15523},{"timestamp":15975},{"timestamp":16374},{"timestamp":16754},{"timestamp":16911},{"timestamp":17117},{"timestamp":17324},{"timestamp":17665},{"timestamp":19482},{"timestamp":20002},{"timestamp":20454},{"timestamp":20634},{"timestamp":20912},{"timestamp":21427},{"timestamp":21832},{"timestamp":22302},{"timestamp":22474},{"timestamp":22705},{"timestamp":23162},{"timestamp":23615},{"timestamp":24044},{"timestamp":24207},{"timestamp":24420},{"timestamp":24625},{"timestamp":24905},{"timestamp":26769},{"timestamp":27212},{"timestamp":27686},{"timestamp":27873},{"timestamp":28152},{"timestamp":28619},{"timestamp":29476},{"timestamp":29901},{"timestamp":30366},{"timestamp":31128},{"timestamp":31320},{"timestamp":31578},{"timestamp":31778},{"timestamp":32000},{"timestamp":32209},{"timestamp":33312},{"timestamp":33470},{"timestamp":33702},{"timestamp":34086},{"timestamp":34497},{"timestamp":34925},{"timestamp":35079},{"timestamp":35278},{"timestamp":35505},{"timestamp":35933},{"timestamp":36183},{"timestamp":36359},{"timestamp":36587},{"timestamp":36827},{"timestamp":37042},{"timestamp":37252},{"timestamp":37729},{"timestamp":38211},{"timestamp":38661},{"timestamp":38886},{"timestamp":39092},{"timestamp":39306},{"timestamp":39515}]')
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
        this.song = this.sound.add("song2");
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
            // this.scene.stop('rythmOne');
            this.scene.start('menuScene');
            this.song.stop(); 
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

