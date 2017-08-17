<business-card-editor></business-card-editor>
<?php
include_once('util.php');
$opt = BC_Creator_util::createOptions();
?>
<script>
    var businessCardCreatorOptions;
    businessCardCreatorOptions = <?=$opt;?>;
</script>
<script type="text/javascript" src="<?=plugins_url().'/business-card-creator'.'/BusinessCardCreator/inline.bundle.js';?>"></script>
<script type="text/javascript" src="<?=plugins_url().'/business-card-creator'.'/BusinessCardCreator/polyfills.bundle.js';?>"></script>
<script type="text/javascript" src="<?=plugins_url().'/business-card-creator'.'/BusinessCardCreator/vendor.bundle.js';?>"></script>
<script type="text/javascript" src="<?=plugins_url().'/business-card-creator'.'/BusinessCardCreator/main.bundle.js';?>"></script>

