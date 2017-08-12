<?php

function businessCardCreator_createPage($slug)
{

    if ($slug === null || $slug === '' || get_page_by_path($slug) !== null) return 0;

    $user_id = get_current_user_id();
    $post_date = current_time('mysql');

    $options = array(
        'menu_order' => 0,                                                            //If new post is a page, sets the order should it appear in the tabs.
        'comment_status' => 'closed',                                                //'closed' means no comments.
        'ping_status' => 'closed',                                                    //Ping status?
        'post_author' => $user_id,                                                    //The user ID number of the author.
        'post_content' => '<div>[BusinessCardCreator]</div>',                        //The full text of the post.
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
    return wp_insert_post($options);
}

function businessCardCreator_updatePage($slug, $prevSlug)
{
//    TODO раскоментить после тестирования
//    if ($slug == $prevSlug) return 0;

    $old = get_page_by_path($prevSlug);
    if ($old !== null)
        wp_delete_post($old->ID, true);

    return businessCardCreator_createPage($slug);
}

//создаем объект опций
function businessCardCreator_createOptions()
{
    $imgPath = plugins_url() . '/business-card-creator' . '/BusinessCardCreator/assets/img';
    return '
{
  "hash": "111222333",
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