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
        register_rest_route('business-card-creator/', '/updateDesigns/', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'updateDesigns'),
            'permission_callback' => array($this, 'checkPermission')
        ));
    }

    public function checkPermission(){
        return current_user_can( 'edit_plugins' );
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

//        delete unused designs
        $this->deleteDesigns($resObj->deleteDesigns, null);

//        TODO обработать ошибки
        if ($resObj->err) {
            return $resObj->err;
        }

        foreach ($resObj->designs as &$des) {
            $fieldsData = json_decode($des->FieldsData);
            $designData = json_decode($des->DesignData);

//            create images from blobs
            if ($designData->background->src !== "") {
                $imgPath = BC_Creator_util::blobToImg($designData->background->src, $des->Slug, "bg");
                $designData->background->src = $imgPath;
                $des->DesignData=json_encode($designData);
            }
            if ($fieldsData->logos != []) {
                for ($i = 0; $i < count($fieldsData->logos); $i++) {
                    $imgPath = BC_Creator_util::blobToImg($fieldsData->logos[$i], $des->Slug, "logo_$i");
                    $fieldsData->logos[$i] = $imgPath;
                }
                $des->FieldsData=json_encode($fieldsData);
            }
            if ($des->Preview) {
                $imgPath = BC_Creator_util::blobToImg($des->Preview, $des->Slug, "preview");
                $des->Preview = $imgPath;
            }

            BC_Creator_DB::get_instance()->addDesign($des, NULL);
        }

        return 'ok';
    }

    protected function deleteDesigns($slugs, $userID)
    {
        if(!$userID)$userID=-1;
        include_once 'util.php';
        include_once 'db.php';

        foreach ($slugs as $slug){
            BC_Creator_DB::get_instance()->deleteDesign($slug);
            BC_Creator_util::deleteDir(wp_normalize_path(__DIR__."/img/$userID/$slug"));
        }
    }
}