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
            'permission_callback' => array($this, 'checkAdminPermission')
        ));

        register_rest_route('business-card-creator/toggleActive/', '/(?P<id>\d+)/', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'toggleActive'),
            'permission_callback' => array($this, 'checkAdminPermission')
        ));

        register_rest_route('business-card-creator/design/', '/(?P<slug>\S+)/', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'getDesign'),
            'permission_callback' => array($this, 'checkReadPermission')
        ));

        register_rest_route('business-card-creator/', '/pdf/', array(
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => array($this, 'getPdf'),
            'permission_callback' => array($this, 'checkAuthorPermission')
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

    public function checkReadPermission()
    {
        return current_user_can('read');
    }

    public function checkAuthorPermission()
    {
        return current_user_can('publish_posts');
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

        return BC_Creator_DB::get_instance()->getPreviews();
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

    public function getDesign($request)
    {
        include_once 'db.php';
        $res = BC_Creator_DB::get_instance()->getDesign((string)$request['slug']);
        return $res;
    }

    public function getPdf($request)
    {
        include_once 'util.php';
        include_once 'api.php';

        $data = BC_Creator_util::prepareObjForPdfAPI(json_decode($request->get_body()));

        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $path = $config->api->pdf . '/' . get_option('BusinessCardCreator_hash');
        $res = BC_Creator_API::post($path, json_encode($data));

//        TODO save pdf to file
//        file_put_contents('test.pdf', $res);

        return array('file' => $res);
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
            'Slug' => md5(json_encode($body->card)),
            'Preview' => $res,

            'Name' => '',
            'Version' => 0,
            'Description' => '',
            'Preview_Order' => 100
        );

        $this->prepareDesignToDB($des, get_current_user_id());
        BC_Creator_DB::get_instance()->deleteDesign($des->Slug);
        return BC_Creator_DB::get_instance()->addDesign($des, get_current_user_id());
    }
}