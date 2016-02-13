var validator = (function iife() {
    'use strict';
    var validator = {
        validateIfUndefined: function (val, name) {
            name = name || 'Value';
            if (val === undefined) {
                throw new Error(name + ' cannot be undefined');
            }
        },
        validateIfObject: function (val, name) {
            name = name || 'Value';
            if (typeof val !== 'object') {
                throw new Error(name + ' must be an object');
            }
        },
        validateIfNumber: function (val, name) {
            name = name || 'Value';
            if (typeof val !== 'number') {
                throw new Error(name + ' must be a number');
            }
        },
        validateIfBool: function (val, name) {
            name = name || 'Value';
            if (typeof val !== 'boolean') {
                throw new Error(name + ' must be a number');
            }
        },
        validateIfString: function (val, name) {
            name = name || 'Value';
            if (typeof val !== 'string') {
                throw new Error(name + ' must be a string');
            }
        },
        validateStringLength: function (val, name, minLength, maxLength) {
            name = name || 'Value';
            this.validateIfUndefined(val, name);
            this.validateIfString(val, name);
            if (val.length < minLength || val.length > maxLength) {
                throw new Error(name + ' must be between ' + minLength + ' and '
                    + maxLength + ' symbols.');
            }
        },
        validateNonEmptyString: function (val, name) {
            name = name || 'Value';
            this.validateIfUndefined(val, name);
            this.validateIfString(val, name);
            if (val.length === 0) {
                throw new Error(name + ' should not be empty');
            }
        },
        validateNumberInRange: function (val, name, min, max) {
            name = name || 'Value';
            this.validateIfUndefined(val, name);
            this.validateIfNumber(val, name);
            if (val < min || val > max) {
                throw new Error(name + ' should be a number between ' + min +
                    ' and ' + max);
            }
        }
    };
    return validator;
}());
