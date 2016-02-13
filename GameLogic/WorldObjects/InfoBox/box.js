/*global validator, observer, $*/
var box = (function iife(parent) {
    'use strict';
    var box = Object.create(parent);

    Object.defineProperties(box, {
        init: {
            /**
             * Constructor for new observer.
             * @param domId - string
             * @param info - string
             * @param events - array
             * @returns {init} - new box
             */
            value: function init(domId, info, events){
                this.dom = domId;
                this.info = info;
                this.events = events;
                return this;
            }
        },
        dom: {
            /**
             * Gets box dom.
             * @returns {string}
             */
            get: function get() {
                return this._dom;
            },
            /**
             * Sets box dom.
             * @param domId - string
             */
            set: function set(domId) {
                validator.validateIfString(domId, 'Box dom');
                this._dom = $(domId);
            }
        },
        info: {
            /**
             * Gets box value.
             * @returns {string}
             */
            get: function get() {
                return this._info;
            },
            /**
             * Sets box value.
             * @param value - string
             */
            set: function set(value) {
                validator.validateIfNumber(value, 'Box info');
                this._info = value;
            }
        },
        events: {
            /**
             * Gets box events.
             * @returns {object}
             */
            get: function get() {
                return this._value;
            },
            /**
             * Sets box events.
             * @param value - array
             */
            set: function set(value) {
                validator.validateIfObject(value, 'Box events');
                this._value = value;
            }
        },
        update: {
            value: function(event, data){
                if(this.events.indexOf(event) !== -1){
                    this.info = data;
                    this.render();
                }
            }
        },
        render: {
            value: function render() {
                this.dom.text( this.info );
            }
        }
    });
    return box;
}(observer));
