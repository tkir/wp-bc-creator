<?php

class RouterAPI
{
    /**
     * A reference to an instance of this class.
     */
    private static $instance;
    /**
     * The array of templates that this plugin tracks.
     */
    protected $templates;

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

        register_rest_route('business-card-creator', '/check-permission/', array(
            // By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
            'methods' => WP_REST_Server::READABLE,
            // Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
            'callback' => array($this, 'check_permission'),
        ));
    }

    public function check_permission(WP_REST_Request $request)
    {
        // You can access parameters via direct array access on the object:
        $param = $request['some_param'];

        // Or via the helper method:
        $param = $request->get_param('some_param');

        // You can get the combined, merged set of parameters:
        $parameters = $request->get_params();

        // The individual sets of parameters are also available, if needed:
        $parameters = $request->get_url_params();
        $parameters = $request->get_query_params();
        $parameters = $request->get_body_params();
        $parameters = $request->get_json_params();
        $parameters = $request->get_default_params();

        // Uploads aren't merged in, but can be accessed separately:
        $parameters = $request->get_file_params();
    }

    public function prefix_get_endpoint_phrase()
    {
        // rest_ensure_response() wraps the data we want to return into a WP_REST_Response, and ensures it will be properly returned.
        return rest_ensure_response('Hello World, this is the WordPress REST API');
    }
}

add_action('rest_api_init', array('RouterAPI', 'get_instance'));