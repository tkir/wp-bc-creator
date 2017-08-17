<?php

class BC_Creator_API
{
    public static function post($path, $data){
        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $url = $config->api . $path;

// use key 'http' even if you send the request to https://...
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/json\r\n
                              Accept: application/json\r\n",
                'method'  => 'POST',
                'content' => $data
            )
        );
        $context  = stream_context_create($options);
        return file_get_contents($url, false, $context);
    }
}