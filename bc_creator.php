<?php

class BC_Creator
{
    //вход в шорт код
    public static function add_short()
    {
        ob_start();
        include_once('content-load.php');
        return ob_get_clean();
    }

    //добавляем в <head>
    public static function add_head()
    {
        include_once('head-load.php');
    }

    //проверяем переадресацию на страницу business-card-creator
    public static function get_query($query)
    {
        $slug = get_option('BusinessCardCreator_url');
        $pageName = $query->query_vars['pagename'];

        if ($pageName != $slug && strpos($pageName, $slug) !== false) {
            $query->query_vars['pagename'] = $slug;
        }
    }

//    регистрируем скипты
    public static function localize_admin_scripts()
    {
        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));

        include_once 'db.php';
        wp_enqueue_script('main_menu', wp_normalize_path(__DIR__ . '/menu/main_menu.js'));
        wp_localize_script('main_menu', 'bc_creator_api', array(
            'path' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
            'previews' => BC_Creator_DB::get_instance()->getPreviews(),
            'template' => $config->template
        ));
    }

}