<?php

class BC_Creator_RouterAPI {

	private static $instance;

	public static function get_instance() {
		if ( null == self::$instance ) {
			self::$instance = new BC_Creator_RouterAPI();
		}

		return self::$instance;
	}

	private function __construct() {
		$this->registerRoutes();
	}

	private function registerRoutes() {
		register_rest_route( 'business-card-creator/design/', '/(?P<slug>\S+)/', array(
			'methods'  => WP_REST_Server::READABLE,
			'callback' => array( $this, 'getDesign' )
		) );

		register_rest_route( 'business-card-creator/design/', '/(?P<slug>\S+)/', array(
			'methods'             => WP_REST_Server::DELETABLE,
			'callback'            => array( $this, 'deleteDesign' ),
			'permission_callback' => array( $this, 'checkAuthorPermission' )
		) );

		register_rest_route( 'business-card-creator/', '/pdf/', array(
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => array( $this, 'getPdf' ),
			'permission_callback' => array( $this, 'checkAuthorPermission' )
		) );

		register_rest_route( 'business-card-creator/', '/previews/', array(
			'methods'  => WP_REST_Server::READABLE,
			'callback' => array( $this, 'getPreviews' )
		) );

		register_rest_route( 'business-card-creator/', '/preview/', array(
			'methods'  => WP_REST_Server::EDITABLE,
			'callback' => array( $this, 'getPreview' )
		) );

		register_rest_route( 'business-card-creator/', '/save/', array(
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => array( $this, 'saveDesign' ),
			'permission_callback' => array( $this, 'checkAuthorPermission' )
		) );

		register_rest_route( 'business-card-creator/', '/order/', array(
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => array( $this, 'orderCard' ),
			'permission_callback' => array( $this, 'checkAuthorPermission' )
		) );

//        TODO удалить в продакшен
		register_rest_route( 'business-card-creator/', '/adminSave/', array(
			'methods'             => WP_REST_Server::EDITABLE,
			'callback'            => array( $this, 'adminSave' ),
			'permission_callback' => array( $this, 'checkAdminPermission' )
		) );
	}

	public function checkAdminPermission() {
		return current_user_can( 'edit_plugins' );
	}

	public function checkAuthorPermission() {
		return current_user_can( 'publish_posts' );
	}

	public function getDesign( $request ) {
		include_once 'db.php';
		$res             = BC_Creator_DB::get_instance()->getDesign( (string) $request['slug'] );
		$res->isEditable = get_current_user_id() == $res->UserId;

		return $res;
	}

	public function deleteDesign( $request ) {
		include_once 'util.php';
		$path = wp_normalize_path( __DIR__ . "/img/" . get_current_user_id() . "/" . $request['slug'] );

		if ( BC_Creator_DB::get_instance()->deleteDesign( (string) $request['slug'] ) ) {
			BC_Creator_util::deleteDir( $path );

			return array( 'err' => null, 'res' => 'success' );
		}

		return array( 'err' => 'delete error', 'res' => null );
	}

	public function orderCard( $request ) {
		$slug = $this->saveDesign( $request )->Slug;

		include_once 'order.php';

		return BC_Creator_Order::get_instance()->orderCard( json_decode( $request->get_body() ) );
	}

	public function getPreview( $request ) {
		include_once 'util.php';
		include_once 'api.php';

		$data = BC_Creator_util::prepareObjForPdfAPI( json_decode( $request->get_body() ) );

		$config = json_decode( file_get_contents( __DIR__ . "/config.json" ) );
		$path   = $config->api->preview . '/' . get_option( 'BusinessCardCreator_hash' );
		$res    = BC_Creator_API::post( $path, json_encode( $data ) );

		return array( 'file' => base64_encode( $res ) );
	}

	public function getPreviews() {
		include_once 'db.php';

		return BC_Creator_DB::get_instance()->getPreviews( false, get_current_user_id() );
	}

	public function saveDesign( $request ) {
		include_once 'util.php';
		include_once 'api.php';
		include_once 'db.php';

		$body = json_decode( $request->get_body() );
		$data = BC_Creator_util::prepareObjForPdfAPI( $body->card );

		$config  = json_decode( file_get_contents( __DIR__ . "/config.json" ) );
		$path    = $config->api->preview . '/' . get_option( 'BusinessCardCreator_hash' );
		$preview = BC_Creator_API::post( $path, json_encode( $data ) );

		$des = (object) array(
			'FieldsData' => json_encode( $body->FieldsData ),
			'DesignData' => json_encode( $body->DesignData ),
			'Slug'       => md5( $preview ),
			'Preview'    => $preview,

			'Name'          => '',
			'Version'       => 0,
			'Description'   => '',
			'Preview_Order' => 100
		);

		BC_Creator_util::prepareDesignToDB( $des, get_current_user_id() );
		BC_Creator_DB::get_instance()->deleteDesign( $des->Slug );
		BC_Creator_DB::get_instance()->addDesign( $des, get_current_user_id() );

		return BC_Creator_DB::get_instance()->getDesign( $des->Slug );
	}


//    TODO удалить в продакшен
	public function adminSave( $request ) {
        include_once 'util.php';
        include_once 'api.php';

        $body = json_decode( $request->get_body() );
        $data = BC_Creator_util::prepareObjForPdfAPI( $body->card );

        $config  = json_decode( file_get_contents( __DIR__ . "/config.json" ) );
        $path    = $config->api->preview . '/' . get_option( 'BusinessCardCreator_hash' );
        $preview = BC_Creator_API::post( $path, json_encode( $data ) );

        $design = (object) array(
            'FieldsData'    => json_encode( $body->FieldsData ),
            'DesignData'    => json_encode( $body->DesignData ),
            'Slug'          => 'Arabian',
            'Preview'       => base64_encode($preview),
            'Name'          => 'Arabian',
            'Version'       => 1,
            'Description'   => 'Test vertical card with Arabian logo',
            'Preview_Order' => 4,
            'Permission'    => 0
        );

        $mydb = new wpdb('root','','bc-creator-api','localhost');
        return $mydb->query($mydb->prepare("
INSERT INTO `designs` (`Name`, `Version`, `Slug`, `Description`, `UserId`, `FieldsData`, `DesignData`, `Preview`, `Preview_Order`, `Permission`) 
VALUES ('%s', %d, '%s', '%s', NULL, '%s', '%s','%s',%d, %d);",
            $design->Name,
            $design->Version,
            $design->Slug,
            $design->Description,
            $design->FieldsData,
            $design->DesignData,
            $design->Preview,
            $design->Preview_Order,
            $design->Permission));
	}
}