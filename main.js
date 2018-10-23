$(document).ready(initializeApp);

function initializeApp(){
    youtubeAPI();
    initMap();
    clickHandlers();
    organizeBeerDatabase();
}

//**   Globals
var lagers=[];
var stouts=[];
var ales=[];
var malts=[];
var nonAlcs=[];
var randomBeer;
var b;


function clickHandlers(){
    $('#beerSelector').submit(beerSelectorCheckbox);
}

function beerSelectorCheckbox(event){
    event.preventDefault();
    var beerSelected=[];
    $("input:checked").each(function(index, element) {
        beerSelected = beerSelected.concat($(this).val());
    });
    randomlySelectBeer(beerSelected);
}

function randomlySelectBeer( beerArray ){
    randomize = Math.floor(Math.random() * beerArray.length); 
    randomBeer = beerArray[randomize];
    }

//**  Beer Roulette APIs   
function organizeBeerDatabase(){
    var beerDataBase = {
        dataType: 'json',
        "url": "https://danielpaschal.com/lfzproxies/ontariobeerproxy.php",
        "method": "GET",
        success: (beerList)=>{
            for(var i=0; i<beerList.length;i++){
                if (beerList[i].type === 'Lager'){
                    lagers.push(beerList[i]);
                } else if (beerList[i].type === 'Ale'){
                    ales.push(beerList[i]);
                } else if (beerList[i].type === 'Malt'){
                    malts.push(beerList[i]);
                } else if (beerList[i].type === 'Stout'){
                    stouts.push(beerList[i]);
                } else if (beerList[i].type === 'Non-Alcoholic Beer'){
                    nonAlcs.push(beerList[i]);
                }
            }
        },
        error: err => {
            console.log("error", err);  
            err.onRejected=()=>console.log('rejected');
            err.onFulfilled= ()=>console.log('fulfilled');
            err.onProgress=()=>console.log('progress')
        }
    }

    $.ajax(beerDataBase);
}

function youtubeAPI(){
    // add beer to whatever the name of the beer is
    var youtubeAjaxObject = {
        'dataType': 'json',
        'url': 'https://www.googleapis.com/youtube/v3/search',
        'method': 'GET',
        'timeout': 3000,
        success: getData,
        error: err => console.log(err),
        'data': {
            'part': 'snippet',
            'maxResults': '1',
            'q': 'beer',
            'type': 'video',
            'key': 'AIzaSyAz5xq3SxTLX3I7l9jiA28_gfzQ05uB5ts'
        }
    };

    function getData(responseData){
        var video = responseData.items[0].id.videoId;
        console.log(video);
        playExactVideo(video);
    }
    $.ajax(youtubeAjaxObject);
    console.log(youtubeAjaxObject);
}

function playExactVideo(vidID){
    $('iframe').attr('src','http://www.youtube.com/embed/' + vidID);
}

// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('googleMap'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
}
