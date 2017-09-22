<?php

class BC_Creator_MenuInit
{
    private static $instance;

    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new BC_Creator_MenuInit();
        }
        return self::$instance;
    }

    private function __construct()
    {
        add_options_page('BusinessCardCreator', 'BC_Creator', 'edit_plugins', 'BC_Creator', array($this, 'menuInsert'));

        include_once 'router-menu-api.php';
        add_action('rest_api_init', array('BC_Creator_RouterMenuAPI', 'get_instance'));
        add_action('admin_enqueue_scripts', array($this, 'localize_admin_scripts'));

    }

    //вход в меню
    public function menuInsert()
    {
        include_once 'menu-content.php';
    }

    //    регистрируем скипты admin
    public function localize_admin_scripts()
    {
        $config = json_decode(file_get_contents(dirname(__DIR__) . "/config.json"));
        include_once dirname(__DIR__) . '/db.php';

        wp_enqueue_script('main_menu', wp_normalize_path('/main.bundle.js'));
        wp_localize_script('main_menu', 'bc_creator_api', array(
            'path' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
            'previews' => BC_Creator_DB::get_instance()->getPreviews(true),
            'template' => $config->template
        ));
    }
}