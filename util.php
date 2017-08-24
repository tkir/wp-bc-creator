<?php

class BC_Creator_util
{

    protected static $tableDesign = 'BusinessCardCreator_design';

    public static function createPage($slug)
    {

        if ($slug === null || $slug === '' || get_page_by_path($slug) !== null) return 0;

        $user_id = get_current_user_id();
        $post_date = current_time('mysql');

        $options = array(
            'menu_order' => 0,                                                            //If new post is a page, sets the order should it appear in the tabs.
            'comment_status' => 'closed',                                                //'closed' means no comments.
            'ping_status' => 'closed',                                                    //Ping status?
            'post_author' => $user_id,                                                    //The user ID number of the author.
            'post_content' => '<div id="business-card-creator">[BusinessCardCreator]</div>',
            'post_date' => $post_date,                                                    //The time post was made.
            'post_excerpt' => 'constructor for creating perfect business cards',            //For all your post excerpt needs.
            'post_name' => $slug,                                                        //The name (slug) for your post
            'post_parent' => 0,                                                            //Sets the parent of the new post.
            'post_status' => 'publish',                                                    //Set the status of the new post.
            'post_title' => 'Business Card Creator',                                        //The title of your post.
            'post_type' => 'page',                                                        //Sometimes you want to post a page.
            'tags_input' => 'BusinessCard'                                                //For tags.
        );
        // Insert the post into the database
        $page_id = wp_insert_post($options);
        update_post_meta($page_id, '_wp_page_template', 'template.php');

        return $page_id;
    }

    public static function updatePage($slug, $prevSlug)
    {
        if ($slug == $prevSlug) return 0;

        $old = get_page_by_path($prevSlug);
        if ($old !== null)
            wp_delete_post($old->ID, true);

        $id = BC_Creator_util::createPage($slug);
        BC_Creator_util::set_page_template();
        return $id;
    }

    public static function set_page_template()
    {
        $slug = get_option('BusinessCardCreator_url');
        $page = get_page_by_path($slug);
        if ($page !== null)
            update_post_meta($page->ID, '_wp_page_template', 'template.php');
    }

//    public static function getDesigns()
//    {
//        global $wpdb;
//        $table = $wpdb->prefix . BC_Creator_util::$tableDesign;
//        return $wpdb->get_results("
//          SELECT * FROM $table;
//        ");
//    }

    public static function getDesignsForUpdate()
    {
        global $wpdb;
        $table = $wpdb->prefix . BC_Creator_util::$tableDesign;
        return $wpdb->get_results("
          SELECT `Slug`, `Version` FROM $table;
        ");
    }

    public static function blobToImg($blob, $slug, $filename)
    {
        $imgPth = 'img/-1';
        $path = wp_normalize_path(__DIR__ ."/$imgPth/$slug");
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        $matches = array();
        preg_match("/^data:image\/([a-z]{3})/i", $blob, $matches);
        $filename = "$filename.$matches[1]";

        $blob = preg_replace("/^data:image\/([a-z]{3});base64,/i", "", $blob);
        file_put_contents($path . "/$filename", base64_decode($blob));

        return plugin_dir_url(__FILE__) ."$imgPth/$slug/$filename";
    }

    public static function deleteDir($dirPath) {
        if (! is_dir($dirPath)) {
            throw new InvalidArgumentException("$dirPath must be a directory");
        }
        if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
            $dirPath .= '/';
        }
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                self::deleteDir($file);
            } else {
                unlink($file);
            }
        }
        rmdir($dirPath);
    }

//создаем объект опций
    public static function createOptions()
    {
        $imgPath = plugins_url() . '/business-card-creator' . '/BusinessCardCreator/assets/img';
        $hash = get_option('BusinessCardCreator_hash');
        return '
{
  "hash": "' . $hash . '",
  "host": {
    "db":{
      "endpoint": "https://businesscardeditor.firebaseio.com",
      "design": "/design",
      "data": "/data"
    },
    "api":{
      "endpoint": "https://html-pdf-api.appspot.com",
      "pdf": "/pdf",
      "preview": "/preview"
    }
  },
  "allowedFonts": [
    "Work Sans",
    "Playfair Display",
    "Open Sans",
    "Josefin Slab",
    "Arvo",
    "Lato"
  ],
  "allowedDesigns": [
    "default",
    "des1",
    "des2"
  ],
  "allowedSizes": [
    {
      "width": 85,
      "height": 55
    },
    {
      "width": 55,
      "height": 85
    }
  ],
  "allowedHrDesigns": [
    "solid",
    "dashed",
    "dotted",
    "double"
  ],
  "ratio": 7,
  "fontSizeStep": 0.2,
  "polygraphPadding": 5,
  "imageUpload": {
    "resizeQuality": 1,
    "resizeType": "image/png",
    "allowedExtensions": [
      "jpg",
      "jpeg",
      "png"
    ]
  },
  "default": {
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/69/Marvel_Cinematic_Universe_Logo.png"
  },
  "imagePath": "' . $imgPath . '"
}
';
    }
}