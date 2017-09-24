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
        wp_localize_script('main_menu', 'bc_creator_menu_options', array(
            'path' => esc_url_raw(rest_url()) . 'business-card-creator/menu',
            'nonce' => wp_create_nonce('wp_rest'),
            'page_url' => get_option('BusinessCardCreator_url'),
            'hash' => get_option('BusinessCardCreator_hash'),
            'allowedTemplates' => $config->allowedTemplates,
            'previews' => BC_Creator_DB::get_instance()->getPreviews(true),
            'orderOptions' => BC_Creator_DB::get_instance()->getOrderOptions(),
            'price' => BC_Creator_DB::get_instance()->getPrice()
        ));
    }
}