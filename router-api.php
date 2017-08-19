<?php

class BC_Creator_RouterAPI
{
    /**
     * A reference to an instance of this class.
     */
    private static $instance;
    protected $db;

    /**
     * Returns an instance of this class.
     */
    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new BC_Creator_RouterAPI();
        }
        return self::$instance;
    }

    /**
     * Initializes the plugin by setting filters and administration functions.
     */
    private function __construct()
    {

        register_rest_route('business-card-creator/design', '/.*/', array(
            // By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
            'methods' => WP_REST_Server::READABLE,
            // Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
            'callback' => array($this, 'check_permission'),
        ));

        register_rest_route('business-card-creator/', '/updateDesigns/', array(
            // By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
            'methods' => WP_REST_Server::READABLE,
            // Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
            'callback' => array($this, 'updateDesigns'),
        ));
    }

    public function check_permission(WP_REST_Request $request)
    {

    }

    public function updateDesigns()
    {
//        проверяем, может ли редактировать плагины не работает
//        if (!current_user_can('read')) return 'Goodbuy';

        include_once 'util.php';
        $designs = BC_Creator_util::getDesignsForUpdate();
        $data = '{"designs":' . json_encode($designs) . ', "url": "' . get_option('siteurl') . '"}';

        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $path = $config->api->designs . '/' . get_option('BusinessCardCreator_hash');

        include_once 'api.php';
        $res = BC_Creator_API::post($path, $data);
        $resObj = json_decode($res);
//        TODO обработать ошибки
        if ($res . err) {}
        foreach ($resObj->designs as $des) {
//            BC_Creator_util::blobToJpg($des->)
            return json_decode($des->FieldsData)->logos[0];
        }

        return 'ok';
    }
}