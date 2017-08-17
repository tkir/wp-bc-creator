<?php

/**
 * Created by IntelliJ IDEA.
 * User: tkir
 * Date: 16.08.2017
 * Time: 21:59
 */
class BC_Creator_DB
{
    private static $instance;

    /**
     * Returns an instance of this class.
     */
    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new BC_Creator_DB();
        }
        return self::$instance;
    }

    private function __construct()
    {

    }

    public static function get_design($design, $user = '')
    {
        global $wpdb;
        $query = "SELECT * FROM Designes WHERE author = %s AND name=%s";
        $wpdb->prepare($query, $user, $design);
    }
}