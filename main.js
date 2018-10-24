$(document).ready(initializeApp());
function initializeApp(){
    youtubeAPI();
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


var typesBeer = {};

function settings(parameter, short_name){
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
            if (short_name === "ale2" || short_name === "stout2" || short_name === "lager2" ||  short_name ==="malt2" || short_name === "non-alcohol2") {
                typesBeer[short_name] = data;

            }
            else{
                console.log('HIIIIIIIIIII!!!!!!')

                renderingDescriptionOnDom(data, short_name);
            }

        }
    }
    $.ajax(ajaxConfig);
}
function callingStoreTypesOfBeer(){ ///////I HAVE STORED ALL 5 TYPES OF BEERS IN AN OBJECT SO WE CAN USE THEM FOR ERROR HANDLING
    settings("ale beer", "ale2");
    settings("stout beer", "stout2");
    settings("lager beer", "lager2");
    settings("malt beer", "malt2");
    settings("Non-alcoholic drink", "non-alcohol2");
}

callingStoreTypesOfBeer(); ////GETTING THOSE BEERS IN THAT ARRAY FOR ERROR HANDLING

console.log('hi', typesBeer);

function findingDescription(parameterRender1, parameterRender2) ///PARAM TAKES NAME OF BEER AND PASSES TO THE SETTINGS FUNCTION
{
    settings(parameterRender1, parameterRender2);
}
function renderingDescriptionOnDom(param1, param2){ ///PARAM1 IS THE DESCRIPTION(FROM WIKI) WE GOT FROM SETTINGS FUNCTION, PARAM2 IS ONE OF 5 BEERS, DEFAULT IF NO DESCRIPTION FROM WIKIPEDIA
    if (param1.length > 100){
        $('.wikipedia').text(param1);
    }
    else{
        param2 = `${param2}2`; ///HAD TO DO THIS BECAUSE param2 ONLY EQUALS ex: ale AND WE NEED IT TO HAVE A 2 AT THE END TO USE IT AS A KEY VALUE PAIR FROM TYPES BEER OBJ
        var errorRenderingFromTypesBeer = typesBeer[param2];
        $('.wikipedia').text(errorRenderingFromTypesBeer);
    }



}
var practiceBeer = "Blue Moon"
console.log(`${practiceBeer} beer`);

findingDescription(`${practiceBeer} beer`, "ale") //// CALLING FUNCTION FOR PRACTICE