<?php

class BC_Creator_util {
	public static function createPage( $slug ) {

		if ( $slug === null || $slug === '' || get_page_by_path( $slug ) !== null ) {
			return 0;
		}

		$user_id   = get_current_user_id();
		$post_date = current_time( 'mysql' );

		$options = array(
			'menu_order'     => 0,
			//If new post is a page, sets the order should it appear in the tabs.
			'comment_status' => 'closed',
			//'closed' means no comments.
			'ping_status'    => 'closed',
			//Ping status?
			'post_author'    => $user_id,
			//The user ID number of the author.
			'post_content'   => '<div id="business-card-creator">[BusinessCardCreator]</div>',
			'post_date'      => $post_date,
			//The time post was made.
			'post_excerpt'   => 'constructor for creating perfect business cards',
			//For all your post excerpt needs.
			'post_name'      => $slug,
			//The name (slug) for your post
			'post_parent'    => 0,
			//Sets the parent of the new post.
			'post_status'    => 'publish',
			//Set the status of the new post.
			'post_title'     => 'Business Card Creator',
			//The title of your post.
			'post_type'      => 'page',
			//Sometimes you want to post a page.
			'tags_input'     => 'BusinessCard'
			//For tags.
		);
		// Insert the post into the database
		$page_id = wp_insert_post( $options );
		update_post_meta( $page_id, '_wp_page_template', 'template.php' );

		return $page_id;
	}

	public static function updatePage( $slug, $prevSlug ) {
		if ( $slug == $prevSlug ) {
			return 0;
		}

		$old = get_page_by_path( $prevSlug );
		if ( $old !== null ) {
			wp_delete_post( $old->ID, true );
		}

		$id = BC_Creator_util::createPage( $slug );
		BC_Creator_util::set_page_template();

		return $id;
	}

	public static function set_page_template( $tpl ) {
		$config = json_decode( file_get_contents( __DIR__ . "/config.json" ) );
		if ( $config->template == $tpl ) {
			return;
		}

		switch ( $tpl ) {
			case 'bc_creator':
				$tplFile = 'template.php';
				break;
			case 'default':
			default:
				$tplFile = '';
		}

		$slug = get_option( 'BusinessCardCreator_url' );
		$page = get_page_by_path( $slug );
		if ( $page !== null ) {
			update_post_meta( $page->ID, '_wp_page_template', $tplFile );
		}

		$config->template = $tpl;
		file_put_contents( __DIR__ . "/config.json", json_encode( $config ), LOCK_EX );
	}

	public static function blobToImg( $blob, $slug, $filename, $userID ) {
		$path = wp_normalize_path( __DIR__ . "/img/$userID/$slug" );
		if ( ! file_exists( $path ) ) {
			mkdir( $path, 0777, true );
		}

//        проверяем, если записан URL то копируем файл с URL или создаем из blob или пустая строка
		if ( preg_match( "/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i", $blob ) ) {
			$ext = preg_replace( "#(.+)?\.(\w+)(\?.+)?#", "$2", $blob );
			copy( $blob, $path . "/$filename.$ext" );
		} else if ( preg_match( "/^data:image/i", $blob ) ) {
			$ext = array();
			preg_match( "/^data:image\/([a-z]{3})/i", $blob, $ext );
			$filename = "$filename.$ext[1]";

			$blob = preg_replace( "/^data:image\/([a-z]{3});base64,/i", "", $blob );
			file_put_contents( $path . "/$filename", base64_decode( $blob ) );
		} else {
			$filename = "$filename.jpg";
			file_put_contents( $path . "/$filename", $blob );
		}

		return plugin_dir_url( __FILE__ ) . "img/$userID/$slug/$filename";
	}

	public static function deleteDir( $dirPath ) {
		if ( ! is_dir( $dirPath ) ) {
			throw new InvalidArgumentException( "$dirPath must be a directory" );
		}
		if ( substr( $dirPath, strlen( $dirPath ) - 1, 1 ) != '/' ) {
			$dirPath .= '/';
		}
		$files = glob( $dirPath . '*', GLOB_MARK );
		foreach ( $files as $file ) {
			if ( is_dir( $file ) ) {
				self::deleteDir( $file );
			} else {
				unlink( $file );
			}
		}
		rmdir( $dirPath );
	}

	public static function prepareObjForPdfAPI( $data ) {
		BC_Creator_util::prepareObjForPdfAPI2( $data->front );
		BC_Creator_util::prepareObjForPdfAPI2( $data->back );

		return array(
			'base_href' => get_option( 'siteurl' ),
			'data'      => $data
		);
	}

	private static function prepareObjForPdfAPI2( $data ) {
		if ( count( $data->Logo ) ) {
			foreach ( $data->Logo as &$logo ) {
				if ( preg_match( '/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $logo->src ) ) {
					$imgLogo = addslashes( file_get_contents( $logo->src ) );
					if ( $imgLogo ) {
						$logo->src = $imgLogo;
					}
				}
			}
		}
		if ( preg_match( '/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $data->Background[0]->src ) ) {
			$imgBg = addslashes( file_get_contents( $data->Background[0]->src ) );
			if ( $imgBg ) {
				$data->Background[0]->src = $imgBg;
			}
		}
	}

	public static function getOrderOptions() {
		include_once 'db.php';

		return BC_Creator_DB::get_instance()->getOrderOptions();
	}

	public static function updateOrderOption( $options ) {
		include_once 'db.php';

		return BC_Creator_DB::get_instance()->updateOrderOption( $options );
	}

	public static function prepareDesignToDB( $des, $userID ) {
		$fieldsDataFront = json_decode( $des->FieldsData )->front;
		$designDataFront = json_decode( $des->DesignData )->front;
		$fieldsDataBack  = json_decode( $des->FieldsData )->back;
		$designDataBack  = json_decode( $des->DesignData )->back;

//            create images from blobs
		if ( $designDataFront->background->src !== "" ) {
			$imgPath                          = BC_Creator_util::blobToImg( $designDataFront->background->src, $des->Slug . '/front', "bg", $userID );
			$designDataFront->background->src = $imgPath;
		}
		if ( count( $fieldsDataFront->logos ) ) {
			for ( $i = 0; $i < count( $fieldsDataFront->logos ); $i ++ ) {
				$imgPath                      = BC_Creator_util::blobToImg( $fieldsDataFront->logos[ $i ], $des->Slug . '/front', "logo_$i", $userID );
				$fieldsDataFront->logos[ $i ] = $imgPath;
			}
		}

		if ( $designDataBack->background->src !== "" ) {
			$imgPath                         = BC_Creator_util::blobToImg( $designDataBack->background->src, $des->Slug . '/back', "bg", $userID );
			$designDataBack->background->src = $imgPath;
		}
		if ( count( $fieldsDataBack->logos ) ) {
			for ( $i = 0; $i < count( $fieldsDataBack->logos ); $i ++ ) {
				$imgPath                     = BC_Creator_util::blobToImg( $fieldsDataBack->logos[ $i ], $des->Slug . '/back', "logo_$i", $userID );
				$fieldsDataBack->logos[ $i ] = $imgPath;
			}
		}

		$fObj            = new stdClass();
		$fObj->front     = $fieldsDataFront;
		$fObj->back      = $fieldsDataBack;
		$des->FieldsData = json_encode( $fObj );

		$dObj            = new stdClass();
		$dObj->front     = $designDataFront;
		$dObj->back      = $designDataBack;
		$des->DesignData = json_encode( $dObj );

		if ( $des->Preview ) {
			$imgPath      = BC_Creator_util::blobToImg( $des->Preview, $des->Slug, "preview", $userID );
			$des->Preview = $imgPath;
		}
	}
}