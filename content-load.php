<business-card-editor></business-card-editor>

<script type="text/javascript" src="<?=get_script('inline');?>"></script>
<script type="text/javascript" src="<?=get_script('polyfills');?>"></script>
<script type="text/javascript" src="<?=get_script('main');?>"></script>

<?php
function get_script($src){
//    TODO uncomment in production
//    return plugins_url().'/business-card-creator'.'/BusinessCardCreator/'.$src.'.bundle.js';
    return plugins_url().'/business-card-creator/row/dist/'.basename(glob(__DIR__."/row/dist/$src.*")[0]);
}
?>