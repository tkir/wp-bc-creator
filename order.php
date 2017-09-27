<?php
class BC_Creator_Order
{
    private static $instance;

    public static function get_instance()
    {
        if (null == self::$instance) {
            self::$instance = new BC_Creator_Order();
        }
        return self::$instance;
    }

    private function __construct()
    {
        include_once 'util.php';
        include_once 'api.php';
    }

    private function getPdf($request)
    {


        $data = BC_Creator_util::prepareObjForPdfAPI(json_decode($request->get_body()));

        $config = json_decode(file_get_contents(__DIR__ . "/config.json"));
        $path = $config->api->pdf . '/' . get_option('BusinessCardCreator_hash');
        $res = BC_Creator_API::post($path, json_encode($data));

//        TODO save pdf to file
//        file_put_contents('test.pdf', $res);

        return array('file' => $res);
    }

    public function orderCard($order)
    {
        $res = BC_Creator_API::post('/email/' . get_option('BusinessCardCreator_hash'),
            json_encode(array('base_href' => get_option('siteurl')))
        );

        $message = 'Order options \n';
        foreach ($order->options as $option) {
            $message .= $option->optionName . ' = '
                . $option->Value . '\n';
        }
        $message .= 'Price = ' . $order->price . '\n';
        $message .= 'Value = ' . $order->value . '\n';

        $headers = array('content-type: text/html');

//        wp_mail($res->email, 'Order business card', $message, $headers, __DIR__ . '/tmp');
        return array(res => $message);
    }
}