<?php

class BC_Creator_Order {
	private static $instance;

	public static function get_instance() {
		if ( null == self::$instance ) {
			self::$instance = new BC_Creator_Order();
		}

		return self::$instance;
	}

	private function __construct() {
		include_once 'util.php';
		include_once 'api.php';
	}

	private function getPdf( $request ) {

		$body      = json_decode( $request->get_body() );
		$dataFront = BC_Creator_util::prepareObjForPdfAPI( $body->front );
		$dataBack  = BC_Creator_util::prepareObjForPdfAPI( $body->back );

		$config   = json_decode( file_get_contents( __DIR__ . "/config.json" ) );
		$path     = $config->api->pdf . '/' . get_option( 'BusinessCardCreator_hash' );
		$resFront = BC_Creator_API::post( $path, json_encode( $dataFront ) );
		$resBack  = BC_Creator_API::post( $path, json_encode( $dataBack ) );

		$res        = new stdClass();
		$res->front = $resFront;
		$res->back  = $resBack;

//        TODO save pdf to file
//        file_put_contents('test.pdf', $res);

		return array( 'file' => $res );
	}

	public function orderCard( $order ) {
		$message = 'Order options \n';
		foreach ( $order->options as $option ) {
			$message .= $option->optionName . ' = '
			            . $option->Value . '\n';
		}
		$message .= 'Price = ' . $order->price . '\n';
		$message .= 'Value = ' . $order->value . '\n';

		$headers = array( 'content-type: text/html' );

//        wp_mail(get_option('BusinessCardCreator_email'), 'Order business card', $message, $headers, __DIR__ . '/tmp');
		return array( res => $message );
	}
}