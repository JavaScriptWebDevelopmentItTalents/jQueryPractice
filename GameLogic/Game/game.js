/*global clearInterval, setInterval, validator, player, obstacle, $, document */
var game = (function iife() {
    'use strict';
    var game = Object.create({}),
        GAME_CONSTANTS = {
            gameSpeed: 100,
            obstacleSpawningSpeed: 2000
        },
        self;

    Object.defineProperties(game, {
        init: {
            /**
             * Constructor for game.
             * @returns {init} - new game
             */
            value: function init() {
                if( self === undefined ){
                    self = this;

                }
                self.objectPool = [
                    Object.create(obstacle).init('#obstacle1'),
                    Object.create(obstacle).init('#obstacle2'),
                    Object.create(obstacle).init('#obstacle3'),
                    Object.create(obstacle).init('#obstacle4'),
                    Object.create(obstacle).init('#obstacle5')
                ];
                self.obstacles = [];
                self.player = Object.create(player).init('Player');

                return self;
            }
        },
        player: {
            /**
             * Gets game player.
             * @returns {player}
             */
            get: function get() {
                return this._player;
            },
            /**
             * Sets the game player.
             * @param newPlayer - player
             */
            set: function set(newPlayer) {
                validator.validateIfObject(newPlayer);
                this._player = newPlayer;
            }
        },
        obstacles: {
            /**
             * Gets obstacles.
             * @returns {obstacles} - array
             */
            get: function get() {
                return this._obstacles;
            },
            /**
             * Sets obstacles.
             * @param value - array
             */
            set: function set(value) {
                this._obstacles = value;
            }
        },
        gameInterval: {
            /**
             * Gets the game interval.
             * @returns {object}
             */
            get: function get() {
                return this._gameInterval;
            },
            /**
             * Sets the game interval.
             * @param value - object
             */
            set: function set(value) {
                validator.validateIfNumber(value, 'Game interval');
                this._gameInterval = value;
            }
        },
        obstacleInterval: {
            /**
             * Gets the game interval.
             * @returns {object}
             */
            get: function get() {
                return this._obstacleInterval;
            },
            /**
             * Sets the game interval.
             * @param value - object
             */
            set: function set(value) {
                validator.validateIfNumber(value, 'OBstacle interval');
                this._obstacleInterval = value;
            }
        },
        spawn: {
            /**
             * Adds new subscriber of type world object.
             * @param worldObject
             */
            value: function push(worldObject) {
                self.obstacles.push(worldObject);
            }
        },
        mainLoop: {
            /**
             * The main loop of the game.
             * Calls the behavior of each object in game.obstacles with foreach loop.
             */
            value: function mainLoop() {
                self.player.onGameLoop();
                self.obstacles.forEach(
                    function callback(subscriber) {
                        subscriber.onGameLoop();
                        self.checkForCollision(self.player, subscriber);
                        self.checkForEvade(subscriber);
                    }
                );
                if(self.player.health === 0){
                    self.gameOver();
                }
            }
        },
        start: {
            /**
             * Starts interval with this.main loop.
             */
            value: function start() {

                $('body').css("background", "url('img/cool-background-wallpapers-themes-media-3980.jpg') 1500px 0");

                self.objectPool.forEach(
                    function callback(object) {
                        self.spawn(object);
                    }
                );

                self.gameInterval = setInterval(
                    self.mainLoop,
                    GAME_CONSTANTS.gameSpeed
                );

                self.obstacleInterval = setInterval(
                    self.showNextObstacle,
                    GAME_CONSTANTS.obstacleSpawningSpeed
                );
            }
        },
        pause: {
            /**
             * Clears the main loop interval.
             */
            value: function pause() {
                clearInterval(self.obstacleInterval);
                clearInterval(self.gameInterval);
            }
        },
        obstaclePool: {
            /**
             * Gets obstacle pool.
             * @returns {*}
             */
            get: function get() {
                return this._obstaclePool;
            },
            /**
             * Gets obstacle pool.
             * @param array.
             */
            set: function set(value) {
                validator.validateIfObject(value, 'Obstacle Pool');
                this._obstaclePool = value;
            }
        },
        showNextObstacle: {
            /**
             * Gets next free obstacle.
             */
            value: function showNextObstacle() {
                var obstacle;
                for(obstacle in self.objectPool){
                    if(self.objectPool[obstacle].isUsed === false){
                        self.objectPool[obstacle].show();
                        self.objectPool[obstacle].move();
                        return;
                    }
                }
            }
        },
        checkForCollision: {
            value: function checkForCollision(player, obstacle) {
                if(obstacle.isUsed) {
                    if (player.position.left < (obstacle.position.left - 10) &&
                        (player.position.left + player.size.width) > obstacle.position.left &&
                        player.position.top < (obstacle.position.top + obstacle.size.height) &&
                        (player.position.top + player.size.height) > obstacle.position.top) {
                        player.takeHit();
                        obstacle.position.top = 0;
                        obstacle.draw();
                        obstacle.hide();
                        return;
                    }
                }
            }
        },
        checkForEvade: {
            value: function checkForEvade(obstacle){
                if(obstacle.position.left < 2 && obstacle.position.left > 1){
                    self.player.evade();
                    return;
                }
            }
        },
        gameOver: {
            value: function gameOver() {
                $('body').css("background", "url('img/Game-Over-Text-Retro-Game-Wallpaper-HD.jpg') -250px -200px");
                self.pause();
                document.location.hash = '#';
            }
        }
    });
    return game;
}());