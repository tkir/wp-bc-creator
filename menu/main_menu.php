<?php
//если зашли с данными: обновляем существующюю страницу, устанавливаем новый hash
if (!empty($_POST)) {
    include_once(plugin_dir_path(__DIR__) . 'util.php');
    echo businessCardCreator_updatePage($_POST['page_url'], get_option('BusinessCardCreator_url'));

    update_option('BusinessCardCreator_url', str_replace(' ', '', $_POST['page_url']));
    update_option('BusinessCardCreator_hash', str_replace(' ', '', $_POST['hash']));
}
?>

<?php
$page_url = get_option('BusinessCardCreator_url');
$hash = get_option('BusinessCardCreator_hash');
?>


    <form method="post">
        <label><input type="text" name="page_url" value="<?= $page_url ?>"> Page URL</label><br>
        <label><input type="text" name="hash" value="<?= $hash ?>"> Personal hash</label><br>
        <input type="submit" value="Update">
    </form>

<?php
//$page=get_page_by_path('business-card-creator');
//echo '<pre>';
//if($page===null)echo 'no';
//print_r($page->ID);
//echo '</pre>';
//
//echo plugin_dir_path(__DIR__);
?>