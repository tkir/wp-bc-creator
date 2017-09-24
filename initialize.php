<?php

class BC_Creator_Initializer
{

    protected static $instance;

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
        include_once 'db.php';
        BC_Creator_DB::get_instance()->createTableDesign();
        BC_Creator_DB::get_instance()->createTableOrderOptions();

//    добавляем записи в опции: url & hash
        update_option('BusinessCardCreator_url', 'business-card-creator');
        update_option('BusinessCardCreator_hash', null);

        include_once('util.php');
        BC_Creator_util::createPage(get_option('BusinessCardCreator_url'));

        include_once 'db.php';
        BC_Creator_DB::get_instance()->set_pageNotFound_design();
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
        include_once 'menu/initialize.php';
        add_action('admin_menu', array('BC_Creator_MenuInit', 'get_instance'));

        /**
         * Creator page
         */
        include_once 'bc_creator.php';
        add_shortcode('BusinessCardCreator', array('BC_Creator', 'add_short'));
        add_action('wp_head', array('BC_Creator', 'add_head'));
        add_action('parse_request', array('BC_Creator', 'get_query'));
        add_action('wp_enqueue_scripts', array('BC_Creator', 'localize_page_scripts'));

        /**
         * API
         */
        include_once 'router-api.php';
        add_action('rest_api_init', array('BC_Creator_RouterAPI', 'get_instance'));
        include_once 'menu/router-menu-api.php';
        add_action('rest_api_init', array('BC_Creator_RouterMenuAPI', 'get_instance'));
    }

    //при деактивации плагина
    public static function deactivation()
    {
        $slug = get_option('BusinessCardCreator_url');
        $old = get_page_by_path($slug);
        if ($old !== null)
            wp_delete_post($old->ID, true);

//        TODO remove in production
        BC_Creator_Initializer::uninstall();
    }

    //при удалении плагина
    public static function uninstall()
    {
        include_once 'db.php';
        BC_Creator_DB::get_instance()->deleteTablesOnUninstall();

        delete_option('BusinessCardCreator_url');
        delete_option('BusinessCardCreator_hash');
    }
}