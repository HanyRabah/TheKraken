// ==UserScript==
// @name         Qkam Counter
// @namespace    https://qkam.dubizzle.com/qkam/
// @version      0.2
// @description  Counting dubizzle Qkam ads ( approved - deleted - moved ) 
// @author       dubizzle
// @match        https://qkam.dubizzle.com/cpanel/*
// @grant        none
// ==/UserScript==


// database variables 
//  agentName
//  agentEmail
//  approvedAds
//  deletedAds
//  MovedtoWow
//  MovedtoQuality

//retriveLSData
//pushLSData
//params
//qkamDiv
//notificationsDiv


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
    var params = {
        agentId: $('#user_id').val(),
        agentName: $.trim($('.links-list .link-item .user-imgs').text()),
        agentEmail: '',
        queueName: '',
        approvedAdsNum: 0,
        deletedAdsNum: 0,
        movedWowAdsNum: 0,
        movedQualityAdsNum: 0,
        reasonOfDelete: ''
        
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

    // check localstorage // localStorage.setItem("QkamCount", JSON.stringify({ id : 'id', code: "1", title: 'title',  date: 'asasaas', description: 'description' }))
    function checkLocalStorage() {
        if (params.localStoragedb) {
            getDataFromLocalStorage(params.localStoragedb);
        } else {
            params.agentEmail = window.prompt("Please Write Down Your Email", "Agent Email");
            if (checkEmail(params.agentEmail) === true) {
                var QkamData = {
                    agentId: params.agentId,
                    agentName: params.agentName,
                    agentEmail: params.agentEmail,
                    approveNum: params.approvedAdsNum,
                    deleteNum: params.deletedAdsNum,
                    moveWowNum: params.movedWowAdsNum,
                    moveQualityNum: params.movedQualityAdsNum
                };
                localStorage.setItem("QkamCount_" + params.agentId, JSON.stringify(QkamData));
            } else {
                checkLocalStorage();
            }
        }
    }

    function checkEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        // Get data and  Apply if avaliable
    function getDataFromLocalStorage(userdata) {
        params.agentId = userdata.agentId;
        params.agentName = userdata.agentName;
        params.agentEmail = userdata.agentEmail;
        params.approvedAdsNum = userdata.approveNum;
        params.deletedAdsNum = userdata.deleteNum;
        params.movedWowAdsNum = userdata.moveWowNum;
        params.movedQualityAdsNum = userdata.moveQualityNum;
        updateScore();
    }
 
    //Events
    function activateEvents() {

        $(buttons.approveBtn).click(function(event) {

            var params = {
                    id: agentId,
                    time: event.timeStamp,
                    name: agentName,
                    email:'',
                    queue: '',
                    country: $('#cs-user-info ins').text(),
                    city: $('#id_city option:selected' ).text();,
                    neighbourhood: $('#id_neighbourhood option:selected' ).text();,
                    action {
                        type: 'Approve', // approve, delete, move
                        data: '' // ( wow, quality ), delete resone
                    }
                }
            sendData(params);

            updateScore();
        });
        $(buttons.deleteBtn).click(function() {
            params.deletedAdsNum++;
            params.reasonOfDelete = $(this).text();
            updateScore();
        });
        $(buttons.moveBtn).click(function() {
            if ($(this).find('.icon-move_quality_street').length != 0) {
                params.movedWowAdsNum++;
                updateScore();
            } else {
                params.movedQualityAdsNum++;
                updateScore();
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
        
   
    function clearCounter(){
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

    // Save to localstorage
    function updateLocalStorage() {
        var QkamData = {
            agentId: params.agentId,
            agentName: params.agentName,
            agentEmail: params.agentEmail,
            approveNum: params.approvedAdsNum,
            deleteNum: params.deletedAdsNum,
            moveWowNum: params.movedWowAdsNum,
            moveQualityNum: params.movedQualityAdsNum
        };

        localStorage.setItem("QkamCount_" + params.agentId, JSON.stringify(QkamData));
    }

    function sendData(params){
        $.ajax({
            crossDomain: true,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            async: false,
            url: 'https://dubizzlelab.com/Qkam-counter/db-connection/Qkam.php',
            dataType: 'jsonp',
            data: params
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
