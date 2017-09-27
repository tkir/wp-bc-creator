<?php

class BC_Creator_RouterAPI
{

    private static $instance;

    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new BC_Creator_RouterAPI();
        }
        return self::$instance;
    }

    private function __construct()
    {
        $this->registerRoutes();
    }

    private function registerRoutes()
    {
        register_rest_route('business-card-creator/design/', '/(?P<slug>\S+)/', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'getDesign')
        ));

        register_rest_route('business-card-creator/', '/pdf/', array(
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => array($this, 'getPdf'),
            'permission_callback' => array($this, 'checkAuthorPermission')
        ));

        register_rest_route('business-card-creator/', '/preview/', array(
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => array($this, 'getPreview')
        ));

        register_rest_route('business-card-creator/', '/save/', array(
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => array($this, 'saveDesign'),
            'permission_callback' => array($this, 'checkAuthorPermission')
        ));

        register_rest_route('business-card-creator/', '/order/', array(
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => array($this, 'orderCard'),
            'permission_callback' => array($this, 'checkAuthorPermission')
        ));
    }

    public function checkAdminPermission()
    {
        return current_user_can('edit_plugins');
    }

    public function checkAuthorPermission()
    {
        return current_user_can('publish_posts');
    }

    public function getDesign($request)
    {
        include_once 'db.php';
        $res = BC_Creator_DB::get_instance()->getDesign((string)$request['slug']);
        $res->isEditable = get_current_user_id() == $res->UserId;
        return $res;
    }

    public function orderCard($request)
    {
        $slug = $this->saveDesign($request)->Slug;

        include_once 'order.php';
        return BC_Creator_Order::get_instance()->orderCard(json_decode($request->get_body()));
    }

    public function getPreview($request)
    {
        include_once 'util.php';
        include_once 'api.php';

        $data = BC_Creator_util::prepareObjForPdfAPI(json_decode($request->get_body()));

        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $path = $config->api->preview . '/' . get_option('BusinessCardCreator_hash');
        $res = BC_Creator_API::post($path, json_encode($data));

        return array('file' => base64_encode($res));
    }

    public function saveDesign($request)
    {
        include_once 'util.php';
        include_once 'api.php';
        include_once 'db.php';

        $body = json_decode($request->get_body());
        $data = BC_Creator_util::prepareObjForPdfAPI($body->card);

        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $path = $config->api->preview . '/' . get_option('BusinessCardCreator_hash');
        $res = BC_Creator_API::post($path, json_encode($data));

        $des = (object)array(
            'FieldsData' => json_encode($body->FieldsData),
            'DesignData' => json_encode($body->DesignData),
            'Slug' => md5($res),
            'Preview' => $res,

            'Name' => '',
            'Version' => 0,
            'Description' => '',
            'Preview_Order' => 100
        );

        BC_Creator_util::prepareDesignToDB($des, get_current_user_id());
        BC_Creator_DB::get_instance()->deleteDesign($des->Slug);
        BC_Creator_DB::get_instance()->addDesign($des, get_current_user_id());
        return BC_Creator_DB::get_instance()->getDesign($des->Slug);
    }
}