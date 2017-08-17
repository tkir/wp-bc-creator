<?php
/*
Plugin Name: Business Card Creator
Plugin URI: http://tkir.github.io/BusinessCardEditor
Description: Wordpress plugin for creating business cards
Version: 1.0
Author: Kirill Titenko
Author URI: http://github.com/tkir/
*/

/*  Copyright 2017  Kirill Titenko  (email: kirill.titenko@gmail.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

//вход в меню
function businessCardCreator_menu()
{
    include_once("menu/main_menu.php");
}

//вход в шорт код
function businessCardCreator_add_short()
{
    ob_start();
    include_once('content-load.php');
    return ob_get_clean();
}

//добавляем в <head>
function businessCardCreator_add_head()
{
    include_once('head-load.php');
}

//проверяем переадресацию на страницу business-card-creator
function businessCardCreator_get_query($query)
{
    $slug = get_option('BusinessCardCreator_url');
    $pageName = $query->query_vars['pagename'];

    if ($pageName != $slug && strpos($pageName, $slug) !== false) {
        $query->query_vars['pagename'] = $slug;
    }
}

include_once  'initialize.php';
add_shortcode('BusinessCardCreator', 'businessCardCreator_add_short');
add_action('wp_head', 'businessCardCreator_add_head');
add_action('parse_request', 'businessCardCreator_get_query');

/**
 * Template creation
 */
include_once 'page-templater.php';
add_action('plugins_loaded', array('PageTemplater', 'get_instance'));

/**
 * API
 */
include_once 'router-api.php';