<?php

class BC_Creator_RouterMenuAPI {
	private static $instance;

	public static function get_instance() {
		if ( null == self::$instance ) {
			self::$instance = new BC_Creator_RouterMenuAPI();
		}

		return self::$instance;
	}

	private function __construct() {
		$this->registerRoutes();
		include_once dirname( __DIR__ ) . '/db.php';
		include_once dirname( __DIR__ ) . '/util.php';
	}

	private function registerRoutes() {
		register_rest_route( 'business-card-creator/menu/general/page_url/', '/(?P<url>\S+)/', array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => array( $this, 'updatePageUrl' ),
			'permission_callback' => array( $this, 'checkAdminPermission' )
		) );

		register_rest_route( 'business-card-creator/menu/general/hash/', '/(?P<hash>\S+)/', array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => array( $this, 'updateHash' ),
			'permission_callback' => array( $this, 'checkAdminPermission' )
		) );

		register_rest_route( 'business-card-creator/menu/general/email/', '/(?P<email>\S+)/', array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => array( $this, 'updateEmail' ),
			'permission_callback' => array( $this, 'checkAdminPermission' )
		) );

		register_rest_route( 'business-card-creator/menu/general/template/', '/(?P<tpl>\S+)/', array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => array( $this, 'updateTemplate' ),
			'permission_callback' => array( $this, 'checkAdminPermission' )
		) );

		register_rest_route( 'business-card-creator/menu/', '/updateDesigns/', array(
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => array( $this, 'updateDesigns' ),
			'permission_callback' => array( $this, 'checkAdminPermission' )
		) );

		register_rest_route( 'business-card-creator/menu/toggleActive/', '/(?P<id>\d+)/', array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => array( $this, 'toggleActive' ),
			'permission_callback' => array( $this, 'checkAdminPermission' )
		) );

		register_rest_route( 'business-card-creator/menu/', '/price/', array(
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => array( $this, 'updatePrice' ),
			'permission_callback' => array( $this, 'checkAdminPermission' )
		) );

		register_rest_route( 'business-card-creator/menu/', '/options/', array(
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => array( $this, 'updateOrderOptions' ),
			'permission_callback' => array( $this, 'checkAdminPermission' )
		) );
	}

	public function checkAdminPermission() {
		return current_user_can( 'edit_plugins' );
	}

	public function updatePageUrl( $request ) {
		update_option( 'BusinessCardCreator_url', str_replace( ' ', '', $request['url'] ) );

		return get_option( 'BusinessCardCreator_url' );
	}

	public function updateHash( $request ) {
		update_option( 'BusinessCardCreator_hash', str_replace( ' ', '', $request['hash'] ) );

		return get_option( 'BusinessCardCreator_hash' );
	}

	public function updateEmail( $request ) {
		update_option( 'BusinessCardCreator_email', str_replace( ' ', '', $request['email'] ) );

		return get_option( 'BusinessCardCreator_email' );
	}

	public function updateTemplate( $request ) {
		update_option( 'BusinessCardCreator_template', str_replace( ' ', '', $request['tpl'] ) );
		BC_Creator_util::set_page_template( get_option( 'BusinessCardCreator_template' ) );

		return get_option( 'BusinessCardCreator_template' );
	}

	public function updateDesigns() {
		include_once dirname( __DIR__ ) . '/api.php';

		$designs = BC_Creator_DB::get_instance()->getDesignsForUpdate();
		$data    = '{"designs":' . json_encode( $designs ) . ', "url": "' . get_option( 'siteurl' ) . '"}';

		$config = json_decode( file_get_contents( dirname( __DIR__ ) . "/config.json" ) );
		$path   = $config->api->designs . '/' . get_option( 'BusinessCardCreator_hash' );

		$res    = BC_Creator_API::post( $path, $data );
		$resObj = json_decode( $res );

//        delete unused designs
		$this->deleteDesigns( $resObj->deleteDesigns, null );

//        TODO обработать ошибки
		if ( $resObj->err ) {
			return $resObj->err;
		}

		foreach ( $resObj->designs as &$des ) {
			BC_Creator_util::prepareDesignToDB( $des, '-1' );
			BC_Creator_DB::get_instance()->addDesign( $des, null );
		}

		return BC_Creator_DB::get_instance()->getPreviews( true );
	}

	protected function deleteDesigns( $slugs, $userID ) {
		if ( ! $userID ) {
			$userID = - 1;
		}

		foreach ( $slugs as $slug ) {
			BC_Creator_DB::get_instance()->deleteDesign( $slug );
			BC_Creator_util::deleteDir( wp_normalize_path( dirname( __DIR__ ) . "/img/$userID/$slug" ) );
		}
	}

	public function toggleActive( $request ) {
		$res = BC_Creator_DB::get_instance()->toggleActive( (int) $request['id'] );

		return array( 'result' => $res );
	}

	public function updatePrice( $request ) {
		BC_Creator_DB::get_instance()->setPrice( json_decode( $request->get_body() ) );

		return BC_Creator_DB::get_instance()->getPrice();
	}

	public function updateOrderOptions( $request ) {
		BC_Creator_DB::get_instance()->setOrderOption( json_decode( $request->get_body() ) );

		return BC_Creator_DB::get_instance()->getOrderOptions();
	}
}