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

	private function getPdf( $card, $isDoubleSide, $slug ) {

		$dataFront = BC_Creator_util::prepareObjForPdfAPI( $card->front );
		$dataBack  = BC_Creator_util::prepareObjForPdfAPI( $card->back );

		$config   = json_decode( file_get_contents( __DIR__ . "/config.json" ) );
		$path     = $config->api->pdf . '/' . get_option( 'BusinessCardCreator_hash' );
		$resFront = BC_Creator_API::post( $path, json_encode( $dataFront ) );
		if ( $isDoubleSide ) {
			$resBack = BC_Creator_API::post( $path, json_encode( $dataBack ) );
		}

		$pdfPath = wp_normalize_path( __DIR__ . "/img/" . get_current_user_id() . "/$slug" );
		file_put_contents( "$pdfPath/front.pdf", $resFront );
		if ( $isDoubleSide ) {
			file_put_contents( "$pdfPath/back.pdf", $resBack );
		}

		if ( $isDoubleSide ) {
			return array( "$pdfPath/front.pdf", "$pdfPath/back.pdf" );
		}

		return "$pdfPath/front.pdf";
	}

	public function orderCard( $order, $slug ) {
		$message = 'Order options \n';
		foreach ( $order->options as $option ) {
			$message .= $option->optionName . ' = '
			            . $option->Value . '\n';
		}
		$message .= 'Price = ' . $order->price . '\n';
		$message .= 'Value = ' . $order->value . '\n';

		$headers = array( 'content-type: text/html' );
		$pdfs    = $this->getPdf( $order->card, $order->isDoubleSide, $slug );

		$mailResult = wp_mail(
			get_option( 'BusinessCardCreator_email' ),
			'Order business card',
			$message,
			$headers,
			$pdfs
		);

//		file_put_contents( __DIR__ . '/test.json', $mailResult );
		return array( 'mail' => $message, 'res' => $mailResult );
	}
}