/*global $, validator*/
var worldObject = (function () {
    'use strict';
    var worldObject = Object.create({});

    Object.defineProperties(worldObject, {
        init: {
            /**
             * Constructor for worldObject.
             * @param domId - string
             * @returns {init} - new worldObject
             */
            value: function init(domId) {
                var self = this;
                self.dom = domId;
                if(domId !== undefined){
                    self.position = {
                        left: parseFloat( $( domId ).css("left") ),
                        top: parseFloat( $( domId ).css("top") )
                    };
                    self.size = {
                        width: parseFloat( $( domId ).css("width") ),
                        height: parseFloat( $( domId ).css("height") )
                    };
                } else {
                    self.position = {
                        left: 0,
                        top: 0
                    };
                    self.size = {
                        width: 0,
                        height: 0
                    };
                }

                return self;
            }
        },
        dom: {
            /**
             * Gets dom element.
             * @returns {jQuery|HTMLElement|*}
             */
            get: function get() {
                return this._dom;
            },
            /**
             * Sets dom element with id or makes a new div as default.
             * @param id - string
             */
            set: function set(id) {
                if (id) {
                    this._dom = $(id);
                } else {
                    this._dom = $('<div></div>');
                }
            }
        },
        position: {
            /**
             * Gets position.
             * @returns {{int, int}}
             */
            get: function get() {
                return this._position;
            },
            /**
             * Sets position.
             * @param position - object{int, int}
             */
            set: function set(position) {
                validator.validateIfNumber(position.left, 'Position left');
                validator.validateIfNumber(position.top, 'Position top');
                this._position = position;
            }
        },
        size: {
            /**
             * Gets size.
             * @returns {{int, int}}
             */
            get: function get() {
                return this._size;
            },
            /**
             * Sets size.
             * @param size - object{int, int}
             */
            set: function set(size) {
                validator.validateIfNumber(size.width, 'Width');
                validator.validateIfNumber(size.height, 'Height');
                this._size = size;
            }
        },
        draw: {
            /**
             * Changes the css properties of the dom object that correspond to the position and size.
             */
            value: function draw() {
                var self = this;
                self.dom.css("left", self.position.left + 'px');
                self.dom.css("top", self.position.top + 'px');
                self.dom.css("width", self.size.width + 'px');
                self.dom.css("height", self.size.height + 'px');
            }
        },
        onGameLoop: {
            /**
             * Abstract on game loop.
             */
            value: function loop() {
                throw new Error('Not implemented onGameLoop Method');
            }
        }
    });
    return worldObject;
}());