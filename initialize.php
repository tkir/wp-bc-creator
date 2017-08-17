<?php

class Initialize
{
    protected $config;

    private static $instance;

    /**
     * Returns an instance of this class.
     */
    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new Initialize();
        }
        return self::$instance;
    }

    private function __construct()
    {
        register_activation_hook(__FILE__, array($this, 'plugin_activation'));
        register_deactivation_hook(__FILE__, array($this, 'plugin_deactivation'));
        register_uninstall_hook(__FILE__, array($this, 'plugin_uninstall'));
        add_action('admin_menu', array($this, 'add_menu_page'));

        $this->plugin_activation();

        $this->config = json_decode(file_get_contents("config.json"), true);
    }


    //при активации плагина
    public function plugin_activation()
    {
        include_once('util.php');

//    если таблицы нет, создаем
        global $wpdb;
        $tableName = $wpdb->prefix . 'BusinessCardCreator_design';
        if ($wpdb->get_var("SHOW TABLES LIKE $tableName") != $tableName) {
            $sql = "CREATE TABLE IF NOT EXISTS `$tableName`(
			`id` INT NOT NULL AUTO_INCREMENT,
			`Name` VARCHAR(255),
			`Version` FLOAT,
			`Slug` VARCHAR(255) NOT NULL,
			`UserId` INT,
			`FieldData` TEXT NOT NULL,
			`DesignData` TEXT NOT NULL,
			`Preview` VARCHAR(255),
			`Create_Date` DATETIME,
			PRIMARY KEY(`id`)
		)
		ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";

            $wpdb->query($sql);
        }

//    добавляем записи в опции: url & hash
        add_option('BusinessCardCreator_url', 'business-card-creator');
        add_option('BusinessCardCreator_hash', null);

        businessCardCreator_createPage(get_option('BusinessCardCreator_url'));
        businessCardCreator_set_page_template();
    }

    protected function set_padeNotFound_design()
    {
        $name=$this->config['pageNotFound']->name;
        $version=$this->config['pageNotFound']->version;
        $slug = $this->config['pageNotFound']->slug;
        $fieldData=$this->config['pageNotFound']->fieldsData;
        $designData=$this->config['pageNotFound']->designData;

        global $wpdb;
        $tableName = $wpdb->prefix . 'BusinessCardCreator_design';
        $wpdb->query("INSERT INTO $tableName 
(Name, Version, Slug, FieldData, DesignData) VALUES 
($name, $version, $slug, $fieldData, $designData)");
    }

//при деактивации плагина
    public function deactivation()
    {
        $slug = get_option('BusinessCardCreator_url');
        $old = get_page_by_path($slug);
        if ($old !== null)
            wp_delete_post($old->ID, true);

        $this->plugin_uninstall();
    }

//при удалении плагина
    public function plugin_uninstall()
    {
        global $wpdb;
        $tableName = $wpdb->prefix . 'BusinessCardCreator_design';
        $wpdb->query("DROP TABLE IF EXISTS $tableName");

        delete_option('BusinessCardCreator_url');
        delete_option('BusinessCardCreator_hash');
    }

//добавляем субменю
    public function add_menu_page()
    {
        add_submenu_page('options-general.php', 'BusinessCardCreator', 'BC_Creator', 8, 'BusinessCardCreator', 'businessCardCreator_menu');
    }
}

register_activation_hook(__FILE__, array('Initialize', 'get_instance'));