<?php

class RouterAPI
{
    /**
     * A reference to an instance of this class.
     */
    private static $instance;
    protected $db;

    /**
     * Returns an instance of this class.
     */
    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new RouterAPI();
        }
        return self::$instance;
    }

    /**
     * Initializes the plugin by setting filters and administration functions.
     */
    private function __construct()
    {

        register_rest_route('business-card-creator/design', '/.*/', array(
            // By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
            'methods' => WP_REST_Server::READABLE,
            // Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
            'callback' => array($this, 'check_permission'),
        ));
    }

    public function check_permission(WP_REST_Request $request)
    {

    }
}

add_action('rest_api_init', array('RouterAPI', 'get_instance'));