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
        css.href = 'https://dubizzlelab.com/Qkam-counter/resources/Test-Qkam.css';
        css.rel = 'stylesheet';
        document.body.appendChild(css);

        // variables // $(location).attr('href');
        var savedData,
            QkamDiv,
            QkamData,
            notificationDiv,
            localStoragedb = JSON.parse(localStorage.getItem("QkamCount_" + $('#user_id').val())),
            agentId = $('#user_id').val(),
            agentName: $.trim($('.links-list .link-item .user-imgs').text());

        //params
        var buttons = {
            approveBtn: $('#approve-btn'),
            deleteBtn: $('#reasons-list li'),
            moveBtn: $('#move-btn'),
            logoBtn: $('#main-menu a.logo')
        }

        //init function
        function init() {
                //checkLocalStorage();
                generateElement();
            }
            // creating element and append to body.
        function generateElement(){
            console.log('creating Element ...'  + params.approvedAdsNum  +'    ' + params.deletedAdsNum +'    ' + params.movedWowAdsNum+'    ' + params.movedQualityAdsNum);
            QkamDiv = '<div class="Qkam-counter">'
            + '<h4 class="agentName">' + params.agentName + '</h4>'
            + '<div class="Approved"><p>Approved<span id="approvedNum">' + params.approvedAdsNum + '</span></p></div>'
            + '<div class="Deleted"><p>Deleted<span id="deletedNum">' + params.deletedAdsNum + '</span></p></div>'
            + '<div class="MovedtoWow"><p>WOW Move<span id="movedWowNum">' + params.movedWowAdsNum + '</span></p></div>'
            + '<div class="MovedQuality"><p>Quality Move<span id="movedQualityNum">' + params.movedQualityAdsNum + '</span></p></div>'
            //+ '<button id="clearBtn" class="button bg-grey color-black">clear</button>'
            //+ '<button id="saveBtn" class="button bg-green color-white">save</button>'
            + '</div>';
            $('body').prepend(QkamDiv);

            notificationDiv = '<div class="notifcations">'
            + '<div class="success bg-green padding-s color-white inline-block"> تمام كدة، كلو قشطة <div class="close">x</div></div>'
            + '<div class="error bg-red padding-s color-white inline-block">لا كدة فية حاجة مش تمام عيد تاني<div class="close">x</div></div></div>'
            $('body').prepend(notificationDiv);

            activateEvents();
        }


        //Events
        function activateEvents() {

            $(buttons.approveBtn).click(function(event) {
                action {
                    type: 'approve',
                    data: ''
                }
                sendData(action);
                updateScore();
            });
            $(buttons.deleteBtn).click(function() {
                action {
                    type: 'delete',
                    data: $(this).text()
                }
                sendData(action);
            });
            $(buttons.moveBtn).click(function() {

                if ($(this).find('.icon-move_quality_street').length != 0) {
                    action {
                        type: 'move',
                        data: 'wow'
                    }
                } else {
                    action {
                        type: 'move',
                        data: 'quality'
                    }
                }
            });
            $(buttons.logoBtn).click(function() {
                $('.Qkam-counter').toggleClass('goBtn');
            });

            $('.close').click(function() {
                $(this).parent('div').hide();
            });
            /*
            $('#clearBtn').click(function() {
                if (confirm("متاكد ياعم الحج؟")) {
                    params.approvedAdsNum = 0;
                    params.deletedAdsNum = 0;
                    params.movedWowAdsNum = 0;
                    params.movedQualityAdsNum = 0;
                    $('#approvedNum').empty().text('0');
                    $('#deletedNum').empty().text('0');
                    $('#movedWowNum').empty().text('0');
                    $('#movedQualityNum').empty().text('0');
                    localStorage.clear();
                }
            });
            $('#saveBtn').click(function() {
                //sending data to database
                $.ajax({
                    crossDomain: true,
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    url: 'https://dubizzlelab.com/Qkam-counter/db-connection/Qkam.php',
                    dataType: 'jsonp',
                    data: {
                        'agentId': params.agentId,
                        'agent': params.agentName,
                        'agentEmail': params.agentEmail,
                        'approveNum': params.approvedAdsNum,
                        'deleteNum': params.deletedAdsNum,
                        'moveWowNum': params.movedWowAdsNum,
                        'moveQualityNum': params.movedQualityAdsNum
                    }
                }).done(function(data) {
                    $('.notifcations .success').show();
                }).error(function(data) {
                    $('.notifcations .error').show();
                });
                updateLocalStorage();
                clearCounter();
            }
             */


            function clearCounter() {
                params.approvedAdsNum = 0;
                params.deletedAdsNum = 0;
                params.movedWowAdsNum = 0;
                params.movedQualityAdsNum = 0;
                $('#approvedNum').empty().text('0');
                $('#deletedNum').empty().text('0');
                $('#movedWowNum').empty().text('0');
                $('#movedQualityNum').empty().text('0');
                localStorage.clear();
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
                            id: agentId,
                            time: event.timeStamp,
                            name: agentName,
                            email: '',
                            queue: $('#queue-title h1').text(),
                            country: $('#cs-user-info ins').text(),
                            city: $('#id_city option:selected').text();,
                            neighbourhood: $('#id_neighbourhood option:selected').text();,
                            action {
                                type: eventData.type, // approve, delete, move
                                data: eventData.data // ( wow, quality ), delete resone
                            }
                        }
                    });
                }
                // Update results
            function updateScore() {
                $('#approvedNum').empty().text(params.approvedAdsNum);
                $('#deletedNum').empty().text(params.deletedAdsNum);
                $('#movedWowNum').empty().text(params.movedWowAdsNum);
                $('#movedQualityNum').empty().text(params.movedQualityAdsNum);
                updateLocalStorage();
            }

            init();


        }
