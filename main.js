$(document).ready(initializeApp);

function initializeApp(){
    youtubeAPI();
    clickHandlers();
    organizeBeerDatabase();
}

//**   Globals
var beer = {
    ales: [],
    lagers: [],
    malts: [],
    stouts: [],
    nonAlcs: []
}
var randomBeer;


function clickHandlers(){
    $('#beerSelector').submit(beerSelectorCheckbox);
}

function beerSelectorCheckbox(event){
    event.preventDefault();
    var beerSelected=[];
    $("input:checked").each(function(index, element) {
        var currentBeerSelection = $(this).val();
        beerSelected.push(currentBeerSelection);
    });

    randomlySelectBeer(beerSelected);
}

function randomlySelectBeer( beerArray ){
    var randomBeerType = Math.floor(Math.random() * beerArray.length);
    var beerType= beerArray[randomBeerType];
    var randomBeerIndex = Math.floor(Math.random() * beer[beerType].length);
    randomBeer = beer[beerType][randomBeerIndex];
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
                    beer.lagers.push(beerList[i]);
                } else if (beerList[i].type === 'Ale'){
                    beer.ales.push(beerList[i]);
                } else if (beerList[i].type === 'Malt'){
                    beer.malts.push(beerList[i]);
                } else if (beerList[i].type === 'Stout'){
                    beer.stouts.push(beerList[i]);
                } else if (beerList[i].type === 'Non-Alcoholic Beer'){
                    beer.nonAlcs.push(beerList[i]);
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
            'q': 'corn chips',
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
    $('#player').attr('src','http://www.youtube.com/embed/' + vidID);
}

// Initialize and add the map
function initMap() {
    // making the map night mode
    var maps = new google.maps.Map(document.getElementById('googleMap'), {
        center: {lat: 44.0748579, lng: -81.00349039999999},
        zoom: 12,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
    });
    var icon = {
        url: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/beer-icon.png',
        scaledSize: new google.maps.Size(60,60)
    };
    // creates a marker
    var marker = new google.maps.Marker({
        position: {lat: 44.0748579, lng: -81.00349039999999},
        map: maps,
        icon: icon
    });
}
