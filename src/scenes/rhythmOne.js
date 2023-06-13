

class rhythm1Scene {
    preload() {
        this.load.audio("song1", "assets/off to see the wizard.mp3");
    }

    create() {
        /*---------------*/
        // Notes timestamps, made with the other script "record.html". They are relative to the start of the song, meaning a value of 1000 equals to 1 second after the song has started
        // this.notesTimestamps = JSON.parse('[{"timestamp":2925},{"timestamp":3095},{"timestamp":3275},{"timestamp":3478},{"timestamp":3652},{"timestamp":6302},{"timestamp":6511},{"timestamp":6717},{"timestamp":6902},{"timestamp":9520},{"timestamp":9698},{"timestamp":9948},{"timestamp":10188},{"timestamp":10385},{"timestamp":11967},{"timestamp":12137},{"timestamp":12309},{"timestamp":12490},{"timestamp":13808},{"timestamp":13975},{"timestamp":14155},{"timestamp":14379},{"timestamp":14541},{"timestamp":15418},{"timestamp":15614},{"timestamp":15816},{"timestamp":16128},{"timestamp":16343},{"timestamp":16542},{"timestamp":17183},{"timestamp":17433},{"timestamp":17833},{"timestamp":18039},{"timestamp":18931},{"timestamp":19304},{"timestamp":19749},{"timestamp":20203},{"timestamp":20673},{"timestamp":21000},{"timestamp":21205},{"timestamp":21395},{"timestamp":21586},{"timestamp":26165},{"timestamp":26436},{"timestamp":26816},{"timestamp":27274},{"timestamp":27764},{"timestamp":27965},{"timestamp":28176},{"timestamp":28459},{"timestamp":28658},{"timestamp":33110},{"timestamp":33434},{"timestamp":33820},{"timestamp":33998},{"timestamp":34158},{"timestamp":34741},{"timestamp":35163},{"timestamp":35360},{"timestamp":35641},{"timestamp":36623},{"timestamp":37024},{"timestamp":37485},{"timestamp":37926},{"timestamp":38364},{"timestamp":38780},{"timestamp":39239},{"timestamp":40128},{"timestamp":40434},{"timestamp":40634},{"timestamp":40981},{"timestamp":41422},{"timestamp":41893},{"timestamp":42342},{"timestamp":42615},{"timestamp":42829},{"timestamp":43046},{"timestamp":43250},{"timestamp":43550},{"timestamp":43744},{"timestamp":43964},{"timestamp":44161},{"timestamp":44377},{"timestamp":44571},{"timestamp":44848},{"timestamp":45018},{"timestamp":45296},{"timestamp":45763},{"timestamp":46235},{"timestamp":46698},{"timestamp":47133},{"timestamp":47336},{"timestamp":47511},{"timestamp":47670},{"timestamp":47823},{"timestamp":47981},{"timestamp":48138},{"timestamp":48334},{"timestamp":50643},{"timestamp":51065},{"timestamp":51510},{"timestamp":51673},{"timestamp":52336},{"timestamp":52521},{"timestamp":52711},{"timestamp":52901},{"timestamp":53082},{"timestamp":53276}]');
        this.notesTimestamps = JSON.parse('[{"timestamp":2931},{"timestamp":3082},{"timestamp":3231},{"timestamp":3379},{"timestamp":3509},{"timestamp":3650},{"timestamp":3798},{"timestamp":6062},{"timestamp":6213},{"timestamp":6362},{"timestamp":6510},{"timestamp":6640},{"timestamp":6781},{"timestamp":6929},{"timestamp":9420},{"timestamp":9571},{"timestamp":9720},{"timestamp":9868},{"timestamp":10018},{"timestamp":10139},{"timestamp":10287},{"timestamp":11960},{"timestamp":12111},{"timestamp":12260},{"timestamp":12559},{"timestamp":12459},{"timestamp":12679},{"timestamp":12827},{"timestamp":13725},{"timestamp":13904},{"timestamp":14061},{"timestamp":14218},{"timestamp":14381},{"timestamp":14540},{"timestamp":15486},{"timestamp":15617},{"timestamp":15757},{"timestamp":15894},{"timestamp":16037},{"timestamp":16189},{"timestamp":16359},{"timestamp":16514},{"timestamp":17317},{"timestamp":17476},{"timestamp":17623},{"timestamp":17784},{"timestamp":17986},{"timestamp":18159},{"timestamp":19037},{"timestamp":19473},{"timestamp":19900},{"timestamp":20297},{"timestamp":20738},{"timestamp":21197},{"timestamp":21372},{"timestamp":21528},{"timestamp":21700},{"timestamp":26151},{"timestamp":26553},{"timestamp":27071},{"timestamp":27500},{"timestamp":27954},{"timestamp":28390},{"timestamp":28836},{"timestamp":33098},{"timestamp":33223},{"timestamp":33512},{"timestamp":33665},{"timestamp":33940},{"timestamp":34073},{"timestamp":34216},{"timestamp":34812},{"timestamp":34969},{"timestamp":35131},{"timestamp":35299},{"timestamp":35464},{"timestamp":35630},{"timestamp":35823},{"timestamp":36783},{"timestamp":37221},{"timestamp":37670},{"timestamp":38081},{"timestamp":38504},{"timestamp":38899},{"timestamp":39314},{"timestamp":40276},{"timestamp":40749},{"timestamp":41209},{"timestamp":41636},{"timestamp":42055},{"timestamp":42520},{"timestamp":42951},{"timestamp":43347},{"timestamp":43731},{"timestamp":44180},{"timestamp":44636},{"timestamp":45058},{"timestamp":45502},{"timestamp":47316},{"timestamp":47723},{"timestamp":48166},{"timestamp":48543},{"timestamp":50832},{"timestamp":51242},{"timestamp":51694},{"timestamp":52536},{"timestamp":52691},{"timestamp":52858},{"timestamp":53033},{"timestamp":53189},{"timestamp":53353},{"timestamp":53508}]')
        this.timeToFall = 1000; // ms, time for the note to go to the bottom. The lower the faster/hardest
        this.lastNoteIndex = 0; // last note spawned
        this.notes = [];        // array of notes already spawned
        this.colliders = [];    // colliders for player input vs falling note
        this.score = 0;         // score, needs no explanation
        /*--------------*/

        // this is the bar at the bottom
        this.noteBar = this.add.rectangle(1920 / 2, 1000, 1920, 10, 0xFFD700);

        // The score text
        this.scoreText = this.add.text(100, 100, "SCORE", { fontFamily: "arial", fontSize: "100px" });

        // Help text under the red bar
        this.helpText = this.add.text(1920 / 2, 1050, "Press SPACEBAR when yellow dots are on the golden line", { fontFamily: "arial", fontSize: "50px" });
        this.helpText.setOrigin(0.5, 0.5);

        // audio object 
        this.song = this.sound.add("song1");
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

