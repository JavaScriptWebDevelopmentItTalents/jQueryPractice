/*jslint browser: true*/
/*global $, document, game, table */
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

        $('body').css("background", "url('img/cool-background-wallpapers-themes-media-3980.jpg') 1500px 0");
    }

    /**
     * Imports html content and starts the game
     * @param data
     */
    function importInViewAndStartGame(data) {
        importInView.call(this, data);

        $('body').css("background", "url('img/cool-background-wallpapers-themes-media-3980.jpg') 1500px 0");
        newGame = Object.create(game).init();
        newGame.start();
    }

    /**
     * Imports html content and starts the game
     * @param data
     */
    function importInViewAndSaveScore(data) {
        importInView.call(this, data);

        var playerName,
            score = newGame.player.score;

        $('body').css("background", "url('img/Game-Over-Text-Retro-Game-Wallpaper-HD.jpg') -250px -200px");
        $('#name-modal').modal('show');
        $("#modalButton").on('click', function sendScoreAndHideModal(){
            playerName = $('#name').val() || newGame.player.name;
            $('#name-modal').modal('hide');
            table.addScore({
                name: playerName,
                score: score
            });
        });
    }

    /**
     * Imports html content in div with id view for home page
     * @param data
     */
    function importInViewAndShowScore(data) {
        importInView.call(this, data);

        $('body').css("background", "url('img/6795655-gamer-wallpaper.jpg')");
        table.getData();
    }

    /**
     * Imports html content and starts the game
     * @param data
     */
    function importInViewAndShowControls(data) {
        importInView.call(this, data);

        $('body').css("background", "url('img/images.png') no-repeat 530px 230px");
        $('body').css("background-color", "black");
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
                ajaxRequestWithCallback('views/score.html', importInViewAndShowScore);
                break;
            case "#controls":
                ajaxRequestWithCallback('views/controls.html', importInViewAndShowControls);
                break;
            case "#modal":
                ajaxRequestWithCallback('views/modal.html', importInViewAndSaveScore);
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
}());