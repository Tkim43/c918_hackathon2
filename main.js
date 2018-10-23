$(document).ready(initializeApp());
function initializeApp(){
    youtubeAPI();
}
function youtubeAPI(){
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
    var source = $('iframe').attr('src');
    var sourceLength = source.length;
    var index = source.lastIndexOf("/");
    var afterLastSlash = sourceLength - index;
    var sourceArray = source.split('');
    // replacing the last portion of the source with the video ID
    var newVidID = sourceArray.splice(index+1, afterLastSlash,vidID);
    var vidIDString = newVidID.join('');
    console.log(vidIDString);
    $('iframe').attr('src','http://www.youtube.com/embed/' + vidIDString);
}
