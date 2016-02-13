/*global $*/
var request = (function (){
    'use strict';
    var data = {},
        self = {
        post : makePOSTRequestJSON,
        get : makeGETRequestJSON
    };
    function makePOSTRequestJSON(baseUrl, dataObject, handleSuccess, handleError){
        handleSuccess = handleSuccess || function(){};
        handleError = handleError || function(){};
        $.ajax({
            type : 'POST',
            contentType : 'application/json',
            url : baseUrl,
            data : JSON.stringify(dataObject),
            dataType:'json',
            success : handleSuccess,
            error : handleError
        });

        return self;
    }

    function makeGETRequestJSON(baseUrl, paramsObject, handleSuccess, handleError){
        handleSuccess = handleSuccess || function(){};
        handleError = handleError || function(){};
        if(paramsObject){
            baseUrl += '?';
        }
        $.ajax({
            type : 'GET',
            contentType : 'application/json',
            url : baseUrl + parseParams(paramsObject),
            success : handleSuccess,
            error : handleError
        });

        return self;
    }

    function parseParams(params) {
        var paramsAsString = [];

        for (var key in params) {
            var pair = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            paramsAsString.push(pair);
        }

        return paramsAsString.join('&');
    }
    return self;
})();