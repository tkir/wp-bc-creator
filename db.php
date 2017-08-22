<?php

class BC_Creator_DB
{
    private static $instance;
    protected $config;
    protected $tableDesign;

    /**
     * Returns an instance of this class.
     */
    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new BC_Creator_DB();
        }
        return self::$instance;
    }

    private function __construct()
    {
        $this->config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $this->tableDesign = $this->config->tableDesign;
    }

    public static function get_design($design, $user = '')
    {
        global $wpdb;
        $query = "SELECT * FROM Designes WHERE author = %s AND name=%s";
        $wpdb->prepare($query, $user, $design);
    }

    public function addDesign($design, $userID)
    {
        $userID = !empty($userID) ? "$userID" : "NULL";

        global $wpdb;
        $table = $wpdb->prefix . $this->tableDesign;

        return $wpdb->query("
INSERT INTO $table (`Name`, `Version`, `Slug`, `Description`, `UserId`, `FieldsData`, `DesignData`, `Preview`, `Preview_Order`) 
VALUES ('$design->Name', $design->Version, '$design->Slug', '$design->Description', $userID, '$design->FieldsData', '$design->DesignData','$design->Preview',$design->Preview_Order);");
    }
}