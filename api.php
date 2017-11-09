<?php

class BC_Creator_API
{
//    public static function post($path, $data){
//        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
//        $url = $config->api->endpoint . $path;
//
//        $options = array(
//            'http' => array(
//                'header'  => "Content-type: application/json
//                              Accept: application/json\r\n",
//                'method'  => 'POST',
//                'content' => $data
//            )
//        );
//        $context  = stream_context_create($options);
//        return file_get_contents($url, false, $context);
//    }

    public static function post($path, $data){
	    $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
	    $url = $config->api->endpoint . $path;

	    $args = array(
		    'method' => 'POST',
		    'timeout' => 45,
		    'limit_response_size' => 30000000,
		    'blocking' => true,
		    'headers' => array(
		    	"Content-type"=>"application/json",
			    "Accept"=>"application/json"
		    ),
		    'body' => $data
	    );
	    $response = wp_remote_post( $url, $args );
	    file_put_contents(__DIR__.'/test.json', $response['body']);
	    return $response['body'];
    }
}