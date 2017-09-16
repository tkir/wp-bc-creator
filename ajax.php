<?php

class BC_Creator_AJAX
{
    private static $instance;

    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new BC_Creator_AJAX();
        }
        return self::$instance;
    }

    private function __construct()
    {
        add_action('wp_ajax_get_order_options', array($this, 'get_order_options_via_ajax'));
        add_action('wp_ajax_nopriv_get_order_options', array($this, 'get_order_options_via_ajax'));
    }

    public function get_order_options_via_ajax()
    {
        if (check_ajax_referer($_REQUEST['action']) !== 1
            || wp_verify_nonce($_REQUEST['_wpnonce'], $_REQUEST['action']) !== 1
            || !$this->checkAdminPermission()
        ) {
            wp_send_json_error([
                'message' => 'Ошибка! Запрос не разрешен.'
            ]);
        }

        include_once 'util.php';
        header('Content-Type: application/json');
        wp_send_json_success(BC_Creator_util::getOrderOptions());

        wp_die();
    }

    public function checkAdminPermission()
    {
        return current_user_can('edit_plugins');
    }
}