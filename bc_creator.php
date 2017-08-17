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

}