var observer = (function iife() {
    'use strict';
    var observer = Object.create({});

    Object.defineProperties(observer, {
        /**
         * Abstract method update.
         */
        update: {
            value: function(event, data){
                throw new Error('You must implement this method');
            }
        }
    });
    return observer;
}());
