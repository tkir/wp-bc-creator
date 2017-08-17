<?php

class BC_Creator_Initializer
{

    protected static $instance;
    protected static $tableDesign = 'BusinessCardCreator_design';

    public static function init()
    {
        is_null(self::$instance) AND self::$instance = new self;
        return self::$instance;
    }

    public static function on_activation()
    {
        if (!current_user_can('activate_plugins')) return;

        $plugin = isset($_REQUEST['plugin']) ? $_REQUEST['plugin'] : '';
        check_admin_referer("activate-plugin_{$plugin}");

        BC_Creator_Initializer::activation();
    }

    public static function activation()
    {

//    если таблицы нет, создаем
        global $wpdb;
        $table = $wpdb->prefix . BC_Creator_Initializer::$tableDesign;

        if ($wpdb->get_var("SHOW TABLES LIKE $table") != $table) {
            $sql = "CREATE TABLE IF NOT EXISTS `$table`(
			`id` INT NOT NULL AUTO_INCREMENT,
			`Name` VARCHAR(255),
			`Version` FLOAT,
			`Slug` VARCHAR(255) NOT NULL,
			`UserId` INT,
			`FieldsData` TEXT NOT NULL,
			`DesignData` TEXT NOT NULL,
			`Preview` VARCHAR(255),
			`Create_Date` DATETIME,
			PRIMARY KEY(`id`)
		)
		ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";

            $wpdb->query($sql);
        }

//    добавляем записи в опции: url & hash
        update_option('BusinessCardCreator_url', 'business-card-creator');
        update_option('BusinessCardCreator_hash', null);

        include_once('util.php');
        businessCardCreator_createPage(get_option('BusinessCardCreator_url'));

        BC_Creator_Initializer::set_pageNotFound_design();
    }

    protected static function set_pageNotFound_design()
    {
        global $wpdb;
        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $table = $wpdb->prefix . BC_Creator_Initializer::$tableDesign;

        $name = $config->pageNotFound->name;
        $version = $config->pageNotFound->version;
        $slug = $config->pageNotFound->slug;
        $fieldsData = json_encode($config->pageNotFound->fieldsData);
        $designData = json_encode($config->pageNotFound->designData);

        $wpdb->query("DELETE FROM $table WHERE `Name`='$name'");

        $wpdb->query("
INSERT INTO $table
(`Name`,  `Version`, `Slug`,  `FieldsData`,  `DesignData`) VALUES
('$name', $version, '$slug', '$fieldsData', '$designData')
");

    }

    public static function on_deactivation()
    {
        if (!current_user_can('activate_plugins'))
            return;
        $plugin = isset($_REQUEST['plugin']) ? $_REQUEST['plugin'] : '';
        check_admin_referer("deactivate-plugin_{$plugin}");

        BC_Creator_Initializer::deactivation();
    }

    public static function on_uninstall()
    {
        if (!current_user_can('activate_plugins'))
            return;
        check_admin_referer('bulk-plugins');

        // Важно: проверим тот ли это файл, который
        // был зарегистрирован во время удаления плагина.
        if (__FILE__ != WP_UNINSTALL_PLUGIN)
            return;

        BC_Creator_Initializer::uninstall();
    }

    public function __construct()
    {
        /**
         * Template creation
         */
        include_once 'page-templater.php';
        PageTemplater::get_instance();

        /**
         * Menu page
         */
        include_once 'menu_creator.php';
        add_action('admin_menu', array('Menu_Creator', 'add_menu_page'));

        /**
         * Creator page
         */
        include_once 'bc_creator.php';
        add_shortcode('BusinessCardCreator', array('BC_Creator', 'add_short'));
        add_action('wp_head', array('BC_Creator', 'add_head'));
        add_action('parse_request', array('BC_Creator', 'get_query'));



        /**
         * API
         */
        include_once 'router-api.php';
        add_action('rest_api_init', array('BC_Creator_RouterAPI', 'get_instance'));
    }

    //при деактивации плагина
    public static function deactivation()
    {
        $slug = get_option('BusinessCardCreator_url');
        $old = get_page_by_path($slug);
        if ($old !== null)
            wp_delete_post($old->ID, true);
    }

    //при удалении плагина
    public static function uninstall()
    {
        global $wpdb;
        $tableDesign = $wpdb->prefix . 'BusinessCardCreator_design';
        $wpdb->query("DROP TABLE IF EXISTS $tableDesign");

        delete_option('BusinessCardCreator_url');
        delete_option('BusinessCardCreator_hash');
    }
}