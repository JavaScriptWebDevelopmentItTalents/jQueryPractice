/*jslint browser: true*/
/*global $, jQuery, alert, request*/
var table = (function iife() {
    'use strict';
    var allScorers = [],
        tableRows = [],
        serverURL = 'server/server.php';

    /**
     * Adds scorer to table rows array
     * @param car
     */
    function appendScoreToTable(scorer) {
        var row = $('<tr class="info text-center"></tr>'),
            data,
            property;

        row.append($('<td></td>'));

        for (property in scorer) {
            data = $('<td></td>').append(scorer[property]);
            row.append(data);
        }
        tableRows.push(row);
    }

    /**
     * Checks if the input params of user are not empty and then sends them to server.
     * @param scorer
     */
    function checkData(scorer) {
        var correctScorerInput = true,
            property;
        if (scorer) {
            for (property in scorer) {
                if (scorer[property].value === '') {
                    correctScorerInput = false;
                }
            }

            if (correctScorerInput) {

                request.post(serverURL, scorer);
            }
        }
    }

    /**
     * Writes current data to table
     */
    function rewriteTable() {
        var row,
            rowCounter = 0,
            scorer,
            tbody;

        tableRows = [];

        for (scorer in allScorers) {
            appendScoreToTable(allScorers[scorer]);
        }

        tbody = $('<tbody></tbody>');

        //makes row index of table
        for (row in tableRows) {
            tableRows[row].children(':first-child').replaceWith($('<td></td>').append(rowCounter += 1));
            tbody.append(tableRows[row]);
        }
        //adds new table to dom
        $('tbody').replaceWith(tbody);
    }

    /**
     * Gets data from server.
     * @param data
     */
    function getData() {
        function success(data){
            allScorers = data;
            table.drawTable();
        }
        request.get(serverURL, {}, success);
    }

    return {
        addScore: checkData,
        drawTable: rewriteTable,
        getData: getData
    };
}());