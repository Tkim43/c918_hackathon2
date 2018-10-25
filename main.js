$(document).ready(initializeApp);

function initializeApp(){
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
};
var randomBeer;


function clickHandlers(){
    $('#beerSelector').submit(beerSelectorCheckbox);
    $('#closebtn').click(hideModal);
}

function beerSelectorCheckbox(event){
    console.log("SUPPPP");
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
    showModal();
    populateBeerInfo(`${randomBeer.name}`,`${randomBeer.price}`,`${randomBeer.abv}`,`${randomBeer.image_url}`);
    console.log(randomBeer);
    findingDescription(`${randomBeer.brewer}`, `${randomBeer.type}`);
    youtubeAPI(randomBeer.name);
    placesAPI();
}

function populateBeerInfo(name, price, abv, img){
    $('#name').text(name);
    $('#price').text(price);
    $('#abv').text(abv);
    $('.beerImage').css('background-image', `url("${img}")`);
}

//** Modal Funcationality

function showModal(){
    $('.backgroundModal').removeClass('displaynone');
    $('.infoModal').removeClass('displaynone');
    $('.backgroundModal').addClass('showBackgroundModal');
    $('.infoModal').addClass('showInfoModal');
}
function hideModal(){
    $('.infoModal').removeClass('showInfoModal');
    $('.backgroundModal').removeClass('showBackgroundModal');
    $('.infoModal').addClass('hidden');
    $('.backgroundModal').addClass('hiddenBackground');
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
            $("#randomize").prop("disabled", false);
        },
        error: err => {
            console.log("error", err);  
            err.onRejected=()=>console.log('rejected');
            err.onFulfilled= ()=>console.log('fulfilled');
            err.onProgress=()=>console.log('progress')
        }
    };

    $.ajax(beerDataBase);
}

function youtubeAPI(name){
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
            'q': name + ' beer review',
            'type': 'video',
            'key': 'AIzaSyAz5xq3SxTLX3I7l9jiA28_gfzQ05uB5ts'
        }
    };

    function getData(responseData){
        console.log("Youtube Response Data: ",responseData)
        var video = null;
        if(responseData.items.length === 0){
            video = "qFJFoH6zk5I";
            playExactVideo(video);
            return;
        }
        video = responseData.items[0].id.videoId;
        playExactVideo(video);
    }
    $.ajax(youtubeAjaxObject);
    console.log(youtubeAjaxObject);
}

function playExactVideo(vidID){
    $('#player').attr('src','http://www.youtube.com/embed/' + vidID);
}

function initMap(lati, longi) {
    // making the map night mode
    var maps = new google.maps.Map(document.getElementById('googleMap'), {
        center: {lat: lati, lng: longi},
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
        url: 'images/beer-icon-googlemaps.png',
        scaledSize: new google.maps.Size(25,25)
    };
    var marker = new google.maps.Marker({
        position: {lat: lati, lng: longi},
        map: maps,
        icon: icon
    });
}



var typesBeer = {};

function wikipediaApiSummary(parameter, short_name){
    var ajaxConfig= {
        "async": true,
        "crossDomain": true,
        dataType: 'jsonp',
        "url": "https://en.wikipedia.org/w/api.php",
        "method": "GET",
        "data": {
            action:"query",
            format:"json",
            prop:"extracts",
            exintro:"true",
            explaintext:"true",
            titles:parameter,
            redirects: ''
        },
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "c8d081b1-fdbf-4fc7-836b-19fbead00753"
        },
        success: function( response ){
            var data = Object.values(response.query.pages)[0].extract;
            if (short_name === "Ale2" || short_name === "Stout2" || short_name === "Lager2" ||  short_name ==="Malt2" || short_name === "Non-Alcoholic Beer2") {
                typesBeer[short_name] = data;

            }
            else{
                renderingDescriptionOnDom(data, short_name);
            }

        }
    };
    $.ajax(ajaxConfig);
}
function callingStoreTypesOfBeer(){ ///////I HAVE STORED ALL 5 TYPES OF BEERS IN AN OBJECT SO WE CAN USE THEM FOR ERROR HANDLING
    wikipediaApiSummary("ale beer", "Ale2");
    wikipediaApiSummary("stout beer", "Stout2");
    wikipediaApiSummary("lager beer", "Lager2");
    wikipediaApiSummary("malt beer", "Malt2");
    wikipediaApiSummary("Non-alcoholic drink", "Non-Alcoholic Beer2");
}

callingStoreTypesOfBeer(); ////GETTING THOSE BEERS IN THAT ARRAY FOR ERROR HANDLING

function findingDescription(parameterRender1, parameterRender2) ///PARAM TAKES NAME OF BEER AND PASSES TO THE wikipediaApiSummary FUNCTION
{
    wikipediaApiSummary(parameterRender1, parameterRender2);
}
function renderingDescriptionOnDom(param1, param2){ ///PARAM1 IS THE DESCRIPTION(FROM WIKI) WE GOT FROM wikipediaApiSummary FUNCTION, PARAM2 IS ONE OF 5 BEERS, DEFAULT IF NO DESCRIPTION FROM WIKIPEDIA

    if (!param1 || randomBeer.brewer === "Brick" || randomBeer.brewer === "Bavaria"){                       ///IF PARAM1 IS UNDEFINED (IT WOULD BE UNDEFINED IF THERE IS NO PAGE OR IF THE PAGE DOES NOT GET LOADED WHEN WE DO THE API CALL
       param2 = `${param2}2`;               ///HAD TO DO THIS BECAUSE param2 ONLY EQUALS ex: ale AND WE NEED IT TO HAVE A 2 AT THE END TO USE IT AS A KEY VALUE PAIR FROM TYPES BEER OBJ
        var errorRenderingFromTypesBeer = typesBeer[param2];
        $('.encaseOfNoWiki').removeClass('displayingNone');
       $('.encaseOfNoWiki').text(`${randomBeer.name} is a ${randomBeer.type} originally from ${randomBeer.country}. ${randomBeer.name} is brewed at ${randomBeer.brewer}. This beer has an alcohol percentage of ${randomBeer.abv}.`);
        $('.wikipedia').html(`<span class="moreInfoWiki">More Information:</span> ${errorRenderingFromTypesBeer}`);
   }

   else{
       $('.wikipedia').html(`<span class="moreInfoWiki">Brewery Information:</span> ${param1}`);
        $('.encaseOfNoWiki').addClass('displayingNone');

   }

}


function placesAPI(){
    var theData = {
        key: "AIzaSyAz5xq3SxTLX3I7l9jiA28_gfzQ05uB5ts",
        input: randomBeer.brewer,
        inputtype: "textquery",
        fields: "photos,formatted_address,name,rating,opening_hours,geometry",
    };
    var placesAPIinput = {
    dataType: "json",
    url: "proxies/googleplaces.php",
    method: "GET",
    error: err => console.log(err),
    data: theData,
        success: function(response){
            var latCoord = null;
            var lngCoord = null;
            var placesAPIData = response;
            console.log("Success happened ", placesAPIData);
            console.log(randomBeer.brewer);
            console.log(randomBeer.country);
            if (response.status === "ZERO_RESULTS"){
                if(randomBeer.country === "Canada"){
                    latCoord = 45.425507;
                    lngCoord = -75.700233;
                    initMap(latCoord, lngCoord);
                    return;
                } else if (randomBeer.country === "United States"){
                    latCoord = 38.897957;
                    lngCoord = -77.036560;
                    initMap(latCoord, lngCoord);
                    return;
                } else if (randomBeer.country === "United Kingdom"){
                    latCoord = 51.510357;
                    lngCoord = -0.116773;
                    initMap(latCoord, lngCoord);
                    return;
                }
            }
// Estonia, Czech Republic, Turkey (Countries to Add)
            latCoord = response.candidates[0].geometry.location.lat;
            lngCoord =  response.candidates[0].geometry.location.lng;
            console.log("latitude: "+ latCoord);
            console.log("longtitude: "+ lngCoord);
            initMap(latCoord, lngCoord);
        },
    };
    $.ajax(placesAPIinput);
}
