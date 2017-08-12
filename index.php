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


//при активации плагина
function businessCardCreator_plugin_activation()
{
    include_once('util.php');

//    если таблицы нет, создаем
    global $wpdb;
    $tableName = $wpdb->prefix . 'BusinessCardCreator';
    if ($wpdb->get_var("SHOW TABLES LIKE $tableName") != $tableName) {
        $sql = "CREATE TABLE IF NOT EXISTS `$tableName`(
			`id` INT NOT NULL AUTO_INCREMENT, 
			`UserId` INT NOT NULL,
			`FieldData` TEXT NOT NULL,
			`DesignData` TEXT NOT NULL,
			`Preview` VARCHAR(255) NOT NULL,
			PRIMARY KEY(`id`)
		)
		ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";

        $wpdb->query($sql);
    }

//    добавляем записи в опции: url & hash
    add_option('BusinessCardCreator_url', 'business-card-creator');
    add_option('BusinessCardCreator_hash', null);

    //echo businessCardCreator_createPage(get_option('BusinessCardCreator_url'));
}

//при деактивации плагина
function businessCardCreator_plugin_deactivation()
{
}

//при удалении плагина
function businessCardCreator_plugin_uninstall()
{
    global $wpdb;
    $tableName = $wpdb->prefix . 'BusinessCardCreator';
    $wpdb->query("DROP TABLE IF EXISTS $tableName");

    delete_option('BusinessCardCreator_url');
    delete_option('BusinessCardCreator_hash');
}

//добавляем субменю
function businessCardCreator_add_menu_page()
{
    add_submenu_page('options-general.php', 'BusinessCardCreator', 'BC_Creator', 8, 'BusinessCardCreator', 'businessCardCreator_menu');
}

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
    $url = get_option('BusinessCardCreator_url');
    $pageName = $query->query_vars['pagename'];

    if ($pageName != $url && strpos($pageName, $url) !== false) {
        $query->query_vars['pagename'] = $url;
    }
}

register_activation_hook(__FILE__, 'businessCardCreator_plugin_activation');
register_deactivation_hook(__FILE__, 'businessCardCreator_plugin_deactivation');
register_uninstall_hook(__FILE__, 'businessCardCreator_plugin_uninstall');
add_action('admin_menu', 'businessCardCreator_add_menu_page');
add_shortcode('BusinessCardCreator', 'businessCardCreator_add_short');
add_action('wp_head', 'businessCardCreator_add_head');
add_action('parse_request', 'businessCardCreator_get_query');