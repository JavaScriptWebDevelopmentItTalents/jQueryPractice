/*jslint browser: true*/
/*global $, document, game */
(function iife() {
    'use strict';
    var newGame;
    /**
     * Imports html content in div with id view
     * @param data
     */
    function importInView(data) {
        $('#view').html(data);
        if(newGame !== undefined){
            newGame.pause();
        }
    }

    /**
     * Imports html content in div with id view for home page
     * @param data
     */
    function importInViewForHome(data) {
        importInView.call(this, data);

        function eventHandler(){
            document.location.hash = '#game';
        }

        $( '#startButton').on('click', eventHandler);
    }

    /**
     * Imports html content and starts the game
     * @param data
     */
    function importInViewAndStartGame(data) {
        importInView.call(this, data);

        newGame = Object.create(game).init();
        newGame.start();
    }

    /**
     * Makes ajax request for some url and on success imports in in view
     */
    function ajaxRequestWithCallback(url, callback) {
        $.ajax(url).done(callback);
    }

    /**
     * Makes routing according to hash change
     */
    function routing() {
        switch (document.location.hash) {
            case '':
                ajaxRequestWithCallback('views/home.html', importInViewForHome);
                break;
            case "#game":
                ajaxRequestWithCallback('views/game.html', importInViewAndStartGame);
                break;
            case "#score":
                ajaxRequestWithCallback('views/score.html', importInView);
                break;
            default:
                ajaxRequestWithCallback('views/pageNotFound.html', importInView);
                break;
        }
    }

    /**
     * Adds event listener to window on load event and on window hash change event.
     */
    function addEventListeners() {
        $(window).load(routing);
        $(window).bind('hashchange', routing);
    }

    addEventListeners();

    $('#open-modal').on('click', function () {
        $('#name-modal').modal('show');
    });
}());