/*global $, jQuery, worldObject, validator, setTimeout, document, observable*/
var player = (function iife(parent, IObservable, observer) {
    'use strict';
    var player = Object.create(parent),
        PLAYER_CONSTANTS = {
            id: '#player',
            width: 50,
            height: 150,
            top: 150,
            left: 50,
            animationTime: 500,
            moveInterval: 500,
            health: 3,
            score: 0

        },
        PLAYER_COMMANDS = {
            duck: 'duck',
            jump: 'jump',
            layDown: 'layDown',
            stand: 'stand'
        },
        self,
        keyHold = false,
        scoreBox,
        healthBox;

    Object.defineProperties(player, {
        init: {
            /**
             * Constructor for player.
             * @param name - string
             * @returns {init} - new player
             */
            value: function init(name) {
                if( self === undefined ){
                    self = this;
                }
                parent.init.call(self, PLAYER_CONSTANTS.id);
                IObservable.init.call(self);

                self.name = name;
                self.hasMoved = false;
                self.score = PLAYER_CONSTANTS.score;
                self.health = PLAYER_CONSTANTS.health;
                self.size = {
                    width: PLAYER_CONSTANTS.width,
                    height: PLAYER_CONSTANTS.height
                };

                scoreBox = Object.create(observer).init('#scoreInfo', PLAYER_CONSTANTS.score, ['evade']);
                healthBox = Object.create(observer).init('#healthInfo', PLAYER_CONSTANTS.health, ['takeHit']);
                self.observers = [];
                self.addObserver(scoreBox);
                self.addObserver(healthBox);
                scoreBox.render();
                healthBox.render();

                $( document ).on('keydown', self.keyboardController);
                $( document ).on('keyup', self.keyboardController);

                return self;
            }
        },
        name: {
            /**
             * Gets player name.
             * @returns {string}
             */
            get: function get() {
                return self._name;
            },
            /**
             * Sets player name.
             * @param value - string
             */
            set: function set(value) {
                validator.validateIfString(value, 'Player name');
                self._name = value;
            }
        },
        score: {
            /**
             * Gets player score.
             * @returns {int}
             */
            get: function get() {
                return self._score;
            },
            /**
             * Sets player score.
             * @param value - int
             */
            set: function set(value) {
                validator.validateIfNumber(value, 'Score');
                self._score = value;
            }
        },
        health: {
            /**
             * Gets the player health;
             * @returns {int}
             */
            get: function get() {
                return self._health;
            },
            /**
             * Sets the player health;
             * @param value
             */
            set: function set(value) {
                validator.validateIfNumber(value, 'Player Health');
                self._health = value;
            }
        },
        hasMoved: {
            /**
             * Gets hasMoved.
             * @returns {bool}
             */
            get: function get() {
                return self._hasMoved;
            },
            /**
             * Sets hasMoved.
             * @param value
             */
            set: function set(value) {
                validator.validateIfBool(value, 'Has moved');
                self._hasMoved = value;
            }
        },
        onGameLoop: {
            /**
             * Player behavior on game loop.
             */
            value: function loop() {
                self.draw();
            }
        },
        keyboardController: {
            /**
             * Event handler for player.
             * @param e
             */
            value: function keyboardListener(e) {
                if (e.type === 'keydown') {
                    if(!keyHold){
                        keyHold = true;
                        switch (e.keyCode) {
                            case 90://z
                                self.move(PLAYER_COMMANDS.layDown);
                                break;
                            case 88://x
                                self.move(PLAYER_COMMANDS.duck);
                                break;
                            case 67://c
                                self.move(PLAYER_COMMANDS.jump);
                                break;
                        }
                    }
                }
                else if (e.type === 'keyup') {
                    keyHold = false;
                    switch (e.keyCode) {
                        case 90://z
                            self.move(PLAYER_COMMANDS.stand);
                            break;
                        case 88://x
                            self.move(PLAYER_COMMANDS.stand);
                            break;
                    }
                }
            }
        },
        move: {
            /**
             * Factory for player actions.
             * @param command - string
             */
            value: function move(command) {
                if (!self.hasMoved) {
                    self.hasMoved = true;
                    setTimeout(function moveTimeout() {
                        self.hasMoved = false;
                    }, PLAYER_CONSTANTS.moveInterval);

                    switch (command) {
                        case PLAYER_COMMANDS.duck :
                            self.duck();
                            break;
                        case PLAYER_COMMANDS.layDown :
                            self.layDown();
                            break;
                        case PLAYER_COMMANDS.stand :
                            self.stand();
                            break;
                        case PLAYER_COMMANDS.jump :
                            self.jump();
                            break;
                        default:
                            self.stand();
                            break;
                    }
                }
            }
        },
        layDown: {
            /**
             * Player lays down.
             */
            value: function layDown() {
                self.dom.animate(
                    {
                        height: PLAYER_CONSTANTS.width,
                        width: PLAYER_CONSTANTS.height,
                        top: 250
                    },
                    {
                        progress: self.keepProgress,
                        complete: function(){
                            if(!keyHold){
                                self.stand();
                            }
                        },
                        duration: PLAYER_CONSTANTS.animationTime
                    }
                );
            }
        },
        duck: {
            /**
             * Player ducks.
             */
            value: function duck() {
                self.dom.animate(
                    {
                        height: PLAYER_CONSTANTS.height - 60,
                        top: PLAYER_CONSTANTS.top + 60
                    },
                    {
                        progress: self.keepProgress,
                        complete: function(){
                            if(!keyHold){
                                self.stand();
                            }
                        },
                        duration: PLAYER_CONSTANTS.animationTime
                    }
                );
            }
        },
        jump: {
            /**
             * Player jumps.
             */
            value: function jump() {
                self.dom.animate(
                    {
                        top: PLAYER_CONSTANTS.top - 60
                    },
                    {
                        progress: self.keepProgress,
                        complete: self.stand,
                        duration: PLAYER_CONSTANTS.animationTime
                    }
                );
            }
        },
        stand: {
            /**
             * Player stands.
             */
            value: function stand() {
                self.dom.animate(
                    {
                        top: PLAYER_CONSTANTS.top,
                        height: PLAYER_CONSTANTS.height,
                        width: PLAYER_CONSTANTS.width
                    },
                    {
                        progress: self.keepProgress,
                        duration: PLAYER_CONSTANTS.animationTime
                    }
                );
            }
        },
        keepProgress: {
            /**
             * Keeps progress of player position and width and height.
             */
            value: function progress() {
                self.position.top = parseFloat(self.dom.css("top"));
                self.position.left = parseFloat(self.dom.css("left"));
                self.size.width = parseFloat(self.dom.css("width"));
                self.size.height = parseFloat(self.dom.css("height"));
            }
        },
        observers: {
            /**
             * Gets prop value.
             * @returns {object} - array
             */
            get: function get() {
                return this._observers;
            },
            /**
             * Sets prop value.
             * @param value - array
             */
            set: function set(value) {
                validator.validateIfObject(value, 'Observers');
                this._observers = value;
            }
        },
        addObserver: {
            /**
             * Adds new observer to observers array.
             * @param value - observer box
             */
            value: function addObservers(value) {
                validator.validateIfObject(value, 'Observer addObservers');
                this.observers.push(value);
            }
        },
        notifyObservers: {
            /**
             * Notifies observers.
             * @param event
             * @param data
             */
            value: function(event, data) {
                var i;
                for (i = 0; i < this.observers.length; i+=1) {
                    this.observers[i].update(event, data);
                }
            }
        },
        takeHit: {
            /**
             * Player takes damage
             */
            value: function hit() {
                self.health -= 1;
                self.notifyObservers('takeHit', self.health);
            }
        },
        evade: {
            /**
             * Player evades obstacle.
             */
            value: function evade() {
                self.score += 1;
                self.notifyObservers('evade', self.score);
            }
        }

    });
    return player;
}(worldObject, observable, box));