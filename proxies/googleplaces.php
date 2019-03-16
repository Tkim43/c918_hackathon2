<?php

// EXAMPLE OF FUNCTIONING SAMPLE URL: https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Neustadt%20Springs%20Brewery&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyAz5xq3SxTLX3I7l9jiA28_gfzQ05uB5ts 
// purpose of this file is to make chrome not whine about us not having the most legal of connections 
$proxyURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"; //url of api 
$acceptableHeaders = []; // storage space for headers associated with api call

header("Access-Control-Allow-Origin: *"); // allows any origin of header (*) to access the api (gives permission)
header("Access-Control-Allow-Headers: ". implode(',',$acceptableHeaders)); // incorporates the headers you specify in the request call
$params = ''; // empty list of parameters for now
foreach($_GET as $key=>$value){ // $_GET is an array that has all the parameters you included in the api call
        $value = rawurlencode($value); // makes the parameters into usable code on the url adds (%20 in between words for readable code for the browser)
        $params.="&$key=$value"; // add the parameters in the $_GET array to the actual parameter list
}

$headers = apache_request_headers();

$curl = curl_init(); // curl is a library of all request calls to the server (fetch, pull, forms, )
$headerParams = [];
foreach($headers as $key=>$value){
        if(in_array($key, $acceptableHeaders)){
                $headerParams[] = "$key:$value";
        }
}

curl_setopt_array($curl, array(
  CURLOPT_URL => "$proxyURL?$params",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => $headerParams
));
$response = curl_exec($curl);
$err = curl_error($curl);
echo $err;
echo $response;
?>