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

/**
 * Plugin initialization
 */
include_once 'initialize.php';
register_activation_hook(__FILE__, array('BC_Creator_Initializer', 'on_activation'));
register_deactivation_hook(__FILE__, array('BC_Creator_Initializer', 'on_deactivation'));
register_uninstall_hook(__FILE__, array('BC_Creator_Initializer', 'on_uninstall'));

add_action('plugins_loaded', array('BC_Creator_Initializer', 'init'));

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
        include_once('util.php');

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

        businessCardCreator_createPage(get_option('BusinessCardCreator_url'));
        businessCardCreator_set_page_template();

        BC_Creator_Initializer::set_pageNotFound_design();
    }

    protected static function set_pageNotFound_design()
    {
        global $wpdb;
        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $table = $wpdb->prefix . BC_Creator_Initializer::$tableDesign;

        $name =$config->pageNotFound->name;
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
//        add_action('admin_menu', array($this, 'add_menu_page'));
//        add_shortcode('BusinessCardCreator', 'businessCardCreator_add_short');
//        add_action('wp_head', 'businessCardCreator_add_head');
//        add_action('parse_request', 'businessCardCreator_get_query');

        /**
         * Template creation
         */
//        include_once 'page-templater.php';
//        add_action('plugins_loaded', array('PageTemplater', 'get_instance'));

        /**
         * API
         */
//        include_once 'router-api.php';
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

    //добавляем субменю
    public function add_menu_page()
    {
        add_submenu_page('options-general.php', 'BusinessCardCreator', 'BC_Creator', 8, 'BusinessCardCreator', 'businessCardCreator_menu');
    }
}


