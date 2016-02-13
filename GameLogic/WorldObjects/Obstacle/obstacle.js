/*global $, validator, worldObject*/
var obstacle = (function iife(parent) {
    'use strict';
    var obstacle = Object.create(parent),
        OBSTACLE_CONSTANTS = {
            left: 420,
            height: 20,
            width: 20,
            top: {
                high: 150,
                medium: 200,
                low: 270
            },
            animationTime: 3000,
            hideTime: 1000
        };

    Object.defineProperties(obstacle, {
        init: {
            /**
             * Constructor for obstacle.
             * @param id - string
             */
            value: function init(id) {
                var self = this;
                parent.init.call(self, id);

                self.position = {
                    left: OBSTACLE_CONSTANTS.left,
                    top: self.randomPos()
                };
                self.size = {
                    width: OBSTACLE_CONSTANTS.width,
                    height: OBSTACLE_CONSTANTS.height
                };
                self.hide();
                return self;
            }
        },
        isUsed: {
            /**
             * Gets obstacle isUsed.
             * @returns {bool}
             */
            get: function get() {
                return this._isUsed;
            },
            /**
             * Sets obstacle isUsed;
             * @param value - bool
             */
            set: function set(value) {
                validator.validateIfBool(value, "Obstacle used");
                this._isUsed = value;
            }
        },
        onGameLoop: {
            /**
             * Obstacle behavior on game loop.
             */
            value: function onGameLoop() {
                this.draw();
            }
        },
        move: {
            /**
             * Moves obstacle.
             */
            value: function move() {
                var self = this;
                self.dom.animate(
                    {
                        left: 0
                    },
                    {
                        progress: function progress() {
                            self.position.top = parseFloat(self.dom.css("top"));
                            self.position.left = parseFloat(self.dom.css("left"));
                        },
                        complete: function hide() {
                            self.dom.hide(0, self.dom.css("display", "none"));
                            self.isUsed = false;
                        },
                        duration: OBSTACLE_CONSTANTS.animationTime
                    }
                );
            }
        },
        randomPos: {
            /**
             * Returns random vertical position of obstacle.
             * @returns {int}
             */
            value: function randomPos() {
                switch (Math.ceil((( Math.random() * 10 ) / 3 ))) {
                    case 1:
                        return OBSTACLE_CONSTANTS.top.low;
                    case 2:
                        return OBSTACLE_CONSTANTS.top.medium;
                    case 3:
                        return OBSTACLE_CONSTANTS.top.high;
                    default:
                        return OBSTACLE_CONSTANTS.top.medium;
                }
            }
        },
        hide: {
            /**
             * Hides obstacle.
             */
            value: function hide() {
                var self = this;
                self.dom.hide(0, self.dom.css("display", "none"));
                self.isUsed = false;
            }
        },
        show: {
            /**
             * Shows obstacle.
             */
            value: function show() {
                var self = this;
                self.hasPoints = true;
                self.position = {
                    left: OBSTACLE_CONSTANTS.left,
                    top: self.randomPos()
                };
                self.dom.css("display", "inline");
                self.draw();
                self.isUsed = true;
            }
        },
        hasPoints: {
            get: function get() {
                return this._hasPoints;
            },
            set: function set(value) {
                this._hasPoints = value;
            }
        }
    });
    return obstacle;
}(worldObject));