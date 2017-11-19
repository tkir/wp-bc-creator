<?php

class BC_Creator_DB {
	private static $instance;
	protected $tableDesign;
	protected $tableOrderOptions;
	protected $config;

	public static function get_instance() {
		if ( null == self::$instance ) {
			self::$instance = new BC_Creator_DB();
		}

		return self::$instance;
	}

	private function __construct() {
		global $wpdb;
		$this->config            = json_decode( file_get_contents( __DIR__ . "/config.json" ) );
		$this->tableDesign       = $wpdb->prefix . $this->config->tableDesign;
		$this->tableOrderOptions = $wpdb->prefix . $this->config->tableOrderOptions;
	}

	public function addDesign( $design, $userID ) {
		$userID = ! empty( $userID ) ? "$userID" : "NULL";

		global $wpdb;

		return $wpdb->query( $wpdb->prepare( "
INSERT INTO $this->tableDesign (`Name`, `Version`, `Slug`, `Description`, `UserId`, `FieldsData`, `DesignData`, `Preview`, `Preview_Order`, `isDoubleSide`) 
VALUES ('%s', %d, '%s', '%s', $userID, '%s', '%s','%s',%d, %d);",
			$design->Name,
			$design->Version,
			$design->Slug,
			$design->Description,
			$design->FieldsData,
			$design->DesignData,
			$design->Preview,
			$design->Preview_Order,
			$design->isDoubleSide ? $design->isDoubleSide : 1 ) );
	}

	public function set_pageNotFound_design() {
		global $wpdb;
		$config = json_decode( file_get_contents( __DIR__ . "/config.json" ) );

		$name       = $config->pageNotFound->name;
		$version    = $config->pageNotFound->version;
		$slug       = $config->pageNotFound->slug;
		$fieldsData = json_encode( $config->pageNotFound->fieldsData );
		$designData = json_encode( $config->pageNotFound->designData );

		$wpdb->query( "DELETE FROM `$this->tableDesign` WHERE `Name`='$name'" );

		$wpdb->query( "
INSERT INTO `$this->tableDesign`
(`Name`,  `Version`, `Slug`,  `FieldsData`,  `DesignData`) VALUES
('$name', $version, '$slug', '$fieldsData', '$designData')
" );

	}

	public function deleteDesign( $slug ) {
		global $wpdb;

		return $wpdb->query( "DELETE FROM `$this->tableDesign` WHERE Slug = '$slug'" );
	}

	public function getPreviews( $isAdmin, $userID = null ) {
		global $wpdb;
		$query = "SELECT id, Name, Slug, Description, Preview, isActive FROM `$this->tableDesign`";

		if ( $isAdmin ) {
			$query = $query . " WHERE UserId IS NULL ";
		} else {
			$query = $query . " WHERE isActive = 1 AND (UserId = $userID OR UserId IS NULL) ";
		}
		$query = $query . " ORDER BY Preview_Order";

		return $wpdb->get_results( $query );
	}

	public function getOrderOptions() {
		global $wpdb;

		return $wpdb->get_results( "SELECT id, `Name`, `Values`, `OptionType` FROM `$this->tableOrderOptions` WHERE `OptionType` <> 'price'" );
	}

	public function setOrderOption( $options ) {
		global $wpdb;

		$wpdb->query("DELETE from `$this->tableOrderOptions` WHERE `OptionType` <> 'price'");

		foreach ( $options as $option ) {
			$wpdb->query(
				$wpdb->prepare( "
INSERT INTO `$this->tableOrderOptions` (`OptionType`, `Name`, `Values`) VALUES ('%s','%s', '%s');",
					$option->type, $option->Name, json_encode( $option->Values )
				)
			);
		}
	}

	public function setPrice( $price ) {
		global $wpdb;

		return $wpdb->query(
			$wpdb->prepare( "UPDATE `$this->tableOrderOptions` SET `Values` = %f WHERE `Name`='Price'", floatval( $price ) ) );
	}

	public function getPrice() {
		global $wpdb;

		return $wpdb->get_var( "SELECT `Values` FROM `$this->tableOrderOptions` WHERE `Name`='Price'" );
	}

	public function toggleActive( $id ) {
		global $wpdb;
		$isActive = (bool) $wpdb->get_var( "SELECT isActive FROM `$this->tableDesign` WHERE id = $id" );

		return $wpdb->update( $this->tableDesign,
			array( 'isActive' => ! $isActive ),
			array( 'id' => $id )
		);
	}

	public function getDesign( $slug ) {
		global $wpdb;

		return $wpdb->get_row(
			$wpdb->prepare( "SELECT * FROM `$this->tableDesign` WHERE Slug = %s", $slug ) );
	}

	public function getDesignsForUpdate() {
		global $wpdb;

		return $wpdb->get_results( "
          SELECT `Slug`, `Version` FROM `$this->tableDesign`;
        " );
	}

	public function createTableDesign() {
		global $wpdb;

		if ( $wpdb->get_var( "SHOW TABLES LIKE $this->tableDesign" ) != $this->tableDesign ) {
			$sql = "CREATE TABLE IF NOT EXISTS `$this->tableDesign`(
			`id` INT NOT NULL AUTO_INCREMENT,
			`Name` VARCHAR(255),
			`Version` INT NOT NULL,
			`Slug` VARCHAR(255) NOT NULL,
			`Description` TEXT,
			`UserId` INT,
			`FieldsData` MEDIUMTEXT NOT NULL,
			`DesignData` MEDIUMTEXT NOT NULL,
			`Preview` MEDIUMTEXT,
			`Create_Date` DATETIME,
			`isActive` BOOLEAN NOT NULL DEFAULT 1,
			`Preview_Order` INT NOT NULL,
			`isDoubleSide` BOOLEAN NOT NULL DEFAULT 1,
			PRIMARY KEY(`id`)
		)
		ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";

			$wpdb->query( $sql );
		}
	}

	public function createTableOrderOptions() {
		global $wpdb;

		if ( $wpdb->get_var( "SHOW TABLES LIKE $this->tableOrderOptions" ) != $this->tableOrderOptions ) {
			$sql = "CREATE TABLE IF NOT EXISTS `$this->tableOrderOptions`(
			`id` INT NOT NULL AUTO_INCREMENT,
			`OptionType` VARCHAR(255) NOT NULL,
			`Name` VARCHAR(255),
			`Values` TEXT,			
			`isActive` BOOLEAN NOT NULL DEFAULT 1,
			PRIMARY KEY(`id`)
		)
		ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";

			$wpdb->query( $sql );

			foreach ( $this->config->orderOptions as $option ) {
				$wpdb->query( "
INSERT INTO `$this->tableOrderOptions` (`OptionType`, `Name`, `Values`) VALUES ('$option->OptionType','$option->Name', '" . json_encode( $option->Values ) . "');
                " );
			}
		}
	}

	public function deleteTablesOnUninstall() {
		global $wpdb;

		$wpdb->query( "DROP TABLE IF EXISTS $this->tableDesign" );
		$wpdb->query( "DROP TABLE IF EXISTS $this->tableOrderOptions" );
	}
}