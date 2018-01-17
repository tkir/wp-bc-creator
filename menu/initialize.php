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
        $i18n = json_decode(file_get_contents(dirname(__DIR__) . "/languages/" . get_option('BusinessCardCreator_language') . '.json'));
        $config = json_decode(file_get_contents(dirname(__DIR__) . "/config.json"));
        include_once dirname(__DIR__) . '/db.php';

        $aTpl=$config->allowedTemplates;
        $tpl = get_option('BusinessCardCreator_template');
        foreach ($aTpl as &$o){
            $o->isActive = ($o->value == $tpl) ? true : false;
        }

        $aLn=$config->allowedLanguages;
        $ln = get_option('BusinessCardCreator_language');
        foreach ($aLn as &$o){
            $o->isActive = ($o->abbreviation == $ln) ? true : false;
        }

        wp_enqueue_script('main_menu', plugin_dir_url( __FILE__ ).'/menu/main.bundle.js');
        wp_localize_script('main_menu', 'bc_creator_menu_options', array(
            'path' => esc_url_raw(rest_url()) . 'business-card-creator/menu',
            'nonce' => wp_create_nonce('wp_rest'),
            'page_url' => get_option('BusinessCardCreator_url'),
            'hash' => get_option('BusinessCardCreator_hash'),
            'email' => get_option('BusinessCardCreator_email'),
            'defaultDesign'=> get_option('BusinessCardCreator_defaultDesign'),
            'allowedTemplates' => $aTpl,
            'allowedLanguages' => $aLn,
            'previews' => BC_Creator_DB::get_instance()->getPreviews(true),
            'orderOptions' => BC_Creator_DB::get_instance()->getOrderOptions(),
            'price' => BC_Creator_DB::get_instance()->getPrice()
        ));
        wp_localize_script('main_menu', 'bc_creator_menu_i18n', (array)$i18n->menu);
    }
}