<?php

class BC_Creator_DB
{
    private static $instance;
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
        global $wpdb;
        $this->config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $this->tableDesign = $wpdb->prefix . $this->config->tableDesign;
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
        return $wpdb->query($wpdb->prepare("
INSERT INTO $this->tableDesign (`Name`, `Version`, `Slug`, `Description`, `UserId`, `FieldsData`, `DesignData`, `Preview`, `Preview_Order`) 
VALUES ('%s', %d, '%s', '%s', $userID, '%s', '%s','%s',%d);",
            $design->Name,
            $design->Version,
            $design->Slug,
            $design->Description,
            $design->FieldsData,
            $design->DesignData,
            $design->Preview,
            $design->Preview_Order));
    }

    public function deleteDesign($slug)
    {
        global $wpdb;
        return $wpdb->query("DELETE FROM `$this->tableDesign` WHERE Slug = '$slug'");
    }

    public function getPreviews($isActive)
    {
        global $wpdb;
        $query = "SELECT id, Name, Slug, Description, Preview, isActive FROM `$this->tableDesign`";
        if ($isActive) $query = $query . " WHERE isActive = 1 ";
        $query = $query . "ORDER BY Preview_Order";

        return $wpdb->get_results($query);
    }

    public function createTableDesign()
    {
        global $wpdb;

        if ($wpdb->get_var("SHOW TABLES LIKE $this->tableDesign") != $this->tableDesign) {
            $sql = "CREATE TABLE IF NOT EXISTS `$this->tableDesign`(
			`id` INT NOT NULL AUTO_INCREMENT,
			`Name` VARCHAR(255),
			`Version` INT NOT NULL,
			`Slug` VARCHAR(255) NOT NULL,
			`Description` TEXT,
			`UserId` INT,
			`FieldsData` MEDIUMTEXT NOT NULL,
			`DesignData` MEDIUMTEXT NOT NULL,
			`Preview` MEDIUMTEXT,
			`Create_Date` DATETIME,
			`isActive` BOOLEAN NOT NULL DEFAULT 1,
			`Preview_Order` INT NOT NULL,
			PRIMARY KEY(`id`)
		)
		ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";

            $wpdb->query($sql);
        }
    }

    public function toggleActive($id)
    {
        global $wpdb;
        $isActive = (bool)$wpdb->get_var("SELECT isActive FROM `$this->tableDesign` WHERE id = $id");
        return $wpdb->update($this->tableDesign,
            array('isActive' => !$isActive),
            array('id' => $id)
        );
    }

    public function getDesign($slug)
    {
        global $wpdb;
        return $wpdb->get_row(
            $wpdb->prepare("SELECT * FROM `$this->tableDesign` WHERE Slug = %s", $slug));
    }
}