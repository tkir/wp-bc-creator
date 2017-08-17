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


<link href="<?= plugins_url() . '/business-card-creator' . '/menu/main_menu.css'; ?>" rel="stylesheet"/>

<div id="bc-creator-menu">
    <div class="tab">
        <button class="tablinks active" onclick="open_BC_Creator_menu_tab(event, 0)">General</button>
        <button class="tablinks" onclick="open_BC_Creator_menu_tab(event, 1)">Design</button>
    </div>

    <div class="tabcontent active">
        <form method="post">
            <label><input type="text" name="page_url" value="<?= $page_url ?>"> Page URL</label><br>
            <label><input type="text" name="hash" value="<?= $hash ?>"> Personal hash</label><br>
            <input type="submit" value="Update">
        </form>
    </div>

    <div class="tabcontent">
        <h3>Paris</h3>
        <p>Paris is the capital of France.</p>
    </div>
</div>

<script src="<?= plugins_url() . '/business-card-creator' . '/menu/main_menu_tabs.js'; ?>"></script>