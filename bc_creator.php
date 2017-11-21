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

//    регистрируем скипты page
    public static function localize_page_scripts()
    {
        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        include_once 'db.php';

        wp_enqueue_script('bc_creator_main', wp_normalize_path('/BusinessCardCreator/main.bundle.js'));
        wp_localize_script('bc_creator_main', 'bc_creator_config', array(
            'path' => esc_url_raw(rest_url()).'business-card-creator',
            'nonce' => wp_create_nonce('wp_rest'),
            'previews' => BC_Creator_DB::get_instance()->getPreviews(false, get_current_user_id()),
            'defaultDesign'=> get_option('BusinessCardCreator_defaultDesign'),
            'settings' => $config->creatorSettings,
            'orderOptions' => BC_Creator_DB::get_instance()->getOrderOptions(),
            'price' => BC_Creator_DB::get_instance()->getPrice(),
            'hints' => array(
                'short hint',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tellus magna, vulputate sed scelerisque ac, rutrum a est. Nam bibendum.'
            )
        ));
    }

}