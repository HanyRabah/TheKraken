// ==UserScript==
// @name         Qkam Counter
// @namespace    https://qkam.dubizzle.com/qkam/
// @version      0.2
// @description  Counting dubizzle Qkam ads ( approved - deleted - moved ) 
// @author       dubizzle
// @match        https://qkam.dubizzle.com/cpanel/*
// @grant        none
// ==/UserScript==

if (!($ = window.jQuery)) { // typeof jQuery=='undefined' works too
    script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
    script.onload = releasetheKraken;
    document.body.appendChild(script);
} else {
    releasetheKraken();
}

function releasetheKraken() {
        //Load css
        css = document.createElement('link');
        css.href = 'https://dubizzlelab.com/Qkam-counter/resources/Qkam-counter.css';
        css.rel = 'stylesheet';
        document.body.appendChild(css);

        // variables // $(location).attr('href');
        var QkamDiv,
            localStorageEmail = JSON.parse(localStorage.getItem("QkamCounter")),
            agentId = $('#user_id').val(),
            agentName = $.trim($('.links-list .link-item .user-imgs').text()),
            currentQueue = $('#queue-title h1').text(),
            currentCountry = $('#cs-user-info ins').text(),
            currentCity = $('#id_city option:selected').text(),
            currentNeighbourhood = $('#id_neighbourhood option:selected').text();

        // event buttons approve-btn   -> reasons-list li
        var buttons = {
            approveBtn: $('#queue-title'),
            deleteBtn: $('#cs-email-info'),
            moveBtn: $('#move-btn'),
            logoBtn: $('#main-menu a.logo'),
            logout: $('.link-item .user-imgs')
        }

        // creating element and append to body.
        function init(){
            QkamDiv = '<div class="Qkam-counter">'
            + '<div class="Approved"><p>Approved<span id="approvedNum"></span></p></div>'
            + '<div class="Deleted"><p>Deleted<span id="deletedNum"></span></p></div>'
            + '<div class="MovedtoWow"><p>WOW Move<span id="movedWowNum"></span></p></div>'
            + '<div class="MovedQuality"><p>Quality Move<span id="movedQualityNum"></span></p></div>'
            + '</div>';
            $('body').prepend(QkamDiv);
            activateEvents();
            updateScore();
        }

        //Events
        function activateEvents() {

            $(buttons.approveBtn).click(function(event) {
                var action = {
                    type: 'approve',
                    data: ''
                };
                sendData(action);
            });
            $(buttons.deleteBtn).click(function() {
                var action = {
                    type: 'delete',
                    data: $(this).text()
                }
                sendData(action);
            });
            $(buttons.moveBtn).click(function() {
                var action;
                if ($(this).find('.icon-move_quality_street').length != 0) {
                    item = {
                        type: 'move',
                        data: 'wow'
                    }
                } else {
                    action = {
                        type: 'move',
                        data: 'quality'
                    }
                }
                sendData(action);
            });
            $(buttons.logoBtn).click(function() {
                $('.Qkam-counter').toggleClass('goBtn');
            });
        }
        function sendData(eventData) {
                $.ajax({
                    crossDomain: true,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    url: 'https://dubizzlelab.com/Qkam-counter/db-connection/Qkam.php',
                    dataType: 'jsonp',
                    data: {
                        'id': agentId,
                        'time': event.timeStamp,
                        'name': agentName,
                        'email': localStorageEmail,
                        'queue': currentQueue,
                        'country': currentCountry,
                        'city': currentCity,
                        'neighbourhood': currentNeighbourhood,
                        'action': eventData
                    }
                }).done(function() {
                    var existingEntries = JSON.parse(localStorage.getItem("offlineQkamCounter"));
                    if(existingEntries != null) {
                        sendOfflineData(existingEntries);
                        localStorage.removeItem('entry');
                        localStorage.removeItem('offlineQkamCounter');
                    }
                }).error(function() {
                    var logData = {
                         log: {
                            'id': agentId,
                            'time': event.timeStamp,
                            'name': agentName,
                            'email': localStorageEmail.email,
                            'queue': currentQueue,
                            'country': currentCountry,
                            'city': currentCity,
                            'neighbourhood': currentNeighbourhood,
                            'action': eventData
                        }
                    }
                   var existingEntries = JSON.parse(localStorage.getItem("offlineQkamCounter"));
                   if(existingEntries === null) existingEntries = [];
                   localStorage.setItem("entry", JSON.stringify(logData));
                   existingEntries.push(logData);
                   localStorage.setItem("offlineQkamCounter", JSON.stringify(existingEntries));
                });

                updatels(eventData);
            }


            function sendOfflineData(offlineData) {
                    $.ajax({
                        crossDomain: true,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        async: false,
                        url: 'https://dubizzlelab.com/Qkam-counter/db-connection/Qkam.php',
                        dataType: 'jsonp',
                        data: offlineData
                    });
                }
            // Update results
        function updatels(item) {

            var localst = JSON.parse(localStorage.getItem("QkamCounter"));
            var targetItem;
            if (item.type === 'delete' || item.type === 'approve'){
                targetItem = item.type;
            }else{
                targetItem = item.type+':'+item.data;
            }
            localst[targetItem]++
            localStorage.setItem("QkamCounter" , JSON.stringify(localst));
            updateScore();

        }
        function updateScore(){
            var localst = JSON.parse(localStorage.getItem("QkamCounter"));
            $('#approvedNum').empty().text(localst['approve']);
            $('#deletedNum').empty().text(localst['delete']);
            $('#movedWowNum').empty().text(localst['move:wow']);
            $('#movedQualityNum').empty().text(localst['move:quality']);
        }

        init();


}
