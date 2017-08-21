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

        include_once 'util.php';
        $designs = BC_Creator_util::getDesignsForUpdate();
        $data = '{"designs":' . json_encode($designs) . ', "url": "' . get_option('siteurl') . '"}';

        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $path = $config->api->designs . '/' . get_option('BusinessCardCreator_hash');

        include_once 'api.php';
        $res = BC_Creator_API::post($path, $data);
        $resObj = json_decode($res);

//        TODO обработать ошибки
        if ($resObj->err) {
            return $resObj->err;
        }

        foreach ($resObj->designs as $des) {
            $fieldsData = json_decode($des->FieldsData);
            $designData = json_decode($des->DesignData);

//            create images from blobs
            $path = wp_normalize_path(__DIR__ . '/img/-1/' . $des->Slug);

            if ($designData->background->src !== "") {
                BC_Creator_util::blobToImg($designData->background->src, $path, "bg");
            }
            if ($fieldsData->logos != []) {
                for ($i = 0; $i < count($fieldsData->logos); $i++) {
                    BC_Creator_util::blobToImg($fieldsData->logos[$i], $path, "logo_$i");
                }
            }
            if ($des->Preview) {
                BC_Creator_util::blobToImg($des->Preview, $path, "preview");
            }

            return $des;
        }

        return 'ok';
    }

    protected function removeDesigns($designs)
    {
        foreach ($designs as $design){

        }
    }
}