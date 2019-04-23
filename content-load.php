<business-card-editor></business-card-editor>

<script type="text/javascript" src="<?= getFileName( 'runtime' ); ?>"></script>
<script type="text/javascript" src="<?= getFileName( 'es2015-polyfills' ); ?>" nomodule></script>
<script type="text/javascript" src="<?= getFileName( 'polyfills' ); ?>"></script>
<script type="text/javascript" src="<?= getFileName( 'main' ); ?>"></script>

<?php
function getFileName( $name ) {
	return str_replace( WP_PLUGIN_DIR,
		plugins_url(),
		glob( WP_PLUGIN_DIR . "/business-card-creator/BusinessCardCreator/$name*.*" )[0] );
}

?>