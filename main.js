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
            if (short_name == "ale" || "stout" || "lager" || "malt" || "non-alcohol") {
                typesBeer[short_name] = data;
            }
            else{


                renderingDescriptionOnDom(data);
            }

        }
    }
    $.ajax(ajaxConfig);
}
function callingStoreTypesOfBeer(){ ///////I HAVE STORED ALL 5 TYPES OF BEERS IN AN OBJECT SO WE CAN USE THEM FOR ERROR HANDLING
    settings("ale beer", "ale");
    settings("stout beer", "stout");
    settings("lager beer", "lager");
    settings("malt beer", "malt");
    settings("Non-alcoholic drink", "non-alcohol");
}

callingStoreTypesOfBeer(); ////GETTING THOSE BEERS IN THAT ARRAY FOR ERROR HANDLING

console.log('hi', typesBeer);

function findingDescription(parameterRender) ///PARAM TAKES NAME OF BEER AND PASSES TO THE SETTINGS FUNCTION
{
    settings(parameterRender);
}
function renderingDescriptionOnDom(thedata){ ///PARAM IS THE DESCRIPTION(FROM WIKI) WE GOT FROM SETTINGS FUNCTION, RENDERS IT TO DOM
    $('.wikipedia').text(thedata);
}

findingDescription("Blue Moon") //// CALLING FUNCTION FOR PRACTICE