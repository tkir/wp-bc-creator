<?php

/**
 * Created by IntelliJ IDEA.
 * User: tkir
 * Date: 22.09.2017
 * Time: 14:59
 */
class BC_Creator_RouterMenuAPI
{
    private static $instance;

    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new BC_Creator_RouterMenuAPI();
        }
        return self::$instance;
    }

    private function __construct()
    {
        $this->registerRoutes();
    }

    private function registerRoutes()
    {
        register_rest_route('business-card-creator/menu/', '/updateDesigns/', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'updateDesigns'),
            'permission_callback' => array($this, 'checkAdminPermission')
        ));

        register_rest_route('business-card-creator/menu/toggleActive/', '/(?P<id>\d+)/', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'toggleActive'),
            'permission_callback' => array($this, 'checkAdminPermission')
        ));

        register_rest_route('business-card-creator/design/', '/(?P<slug>\S+)/', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'getDesign')
        ));

        register_rest_route('business-card-creator/menu/', '/price/', array(
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => array($this, 'updatePrice'),
            'permission_callback' => array($this, 'checkAdminPermission')
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
    }

    public function checkAdminPermission()
    {
        return current_user_can('edit_plugins');
    }

    public function updateDesigns()
    {

        include_once 'util.php';
        include_once 'api.php';
        include_once 'db.php';

        $designs = BC_Creator_util::getDesignsForUpdate();
        $data = '{"designs":' . json_encode($designs) . ', "url": "' . get_option('siteurl') . '"}';

        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $path = $config->api->designs . '/' . get_option('BusinessCardCreator_hash');

        $res = BC_Creator_API::post($path, $data);
        $resObj = json_decode($res);

//        delete unused designs
        $this->deleteDesigns($resObj->deleteDesigns, null);

//        TODO обработать ошибки
        if ($resObj->err) {
            return $resObj->err;
        }

        foreach ($resObj->designs as &$des) {
            $this->prepareDesignToDB($des, '-1');
            BC_Creator_DB::get_instance()->addDesign($des, null);
        }

        return BC_Creator_DB::get_instance()->getPreviews(true);
    }

    protected function prepareDesignToDB($des, $userID)
    {
        $fieldsData = json_decode($des->FieldsData);
        $designData = json_decode($des->DesignData);

//            create images from blobs
        if ($designData->background->src !== "") {
            $imgPath = BC_Creator_util::blobToImg($designData->background->src, $des->Slug, "bg", $userID);
            $designData->background->src = $imgPath;
            $des->DesignData = json_encode($designData);
        }
        if ($fieldsData->logos != []) {
            for ($i = 0; $i < count($fieldsData->logos); $i++) {
                $imgPath = BC_Creator_util::blobToImg($fieldsData->logos[$i], $des->Slug, "logo_$i", $userID);
                $fieldsData->logos[$i] = $imgPath;
            }
            $des->FieldsData = json_encode($fieldsData);
        }
        if ($des->Preview) {
            $imgPath = BC_Creator_util::blobToImg($des->Preview, $des->Slug, "preview", $userID);
            $des->Preview = $imgPath;
        }
    }

    protected function deleteDesigns($slugs, $userID)
    {
        if (!$userID) $userID = -1;
        include_once 'util.php';
        include_once 'db.php';

        foreach ($slugs as $slug) {
            BC_Creator_DB::get_instance()->deleteDesign($slug);
            BC_Creator_util::deleteDir(wp_normalize_path(__DIR__ . "/img/$userID/$slug"));
        }
    }

    public function toggleActive($request)
    {
        include_once 'db.php';
        $res = BC_Creator_DB::get_instance()->toggleActive((int)$request['id']);
        return array('result' => $res);
    }

    public function updatePrice($request){
        include_once 'db.php';
        if(BC_Creator_DB::get_instance()->updatePrice(json_decode($request->get_body())))
            return BC_Creator_DB::get_instance()->getPrice();
    }
}