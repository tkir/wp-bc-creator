<?php
//если зашли с данными: обновляем существующюю страницу, устанавливаем новый hash
if (!empty($_POST)) {
    include_once(plugin_dir_path(__DIR__) . 'util.php');
    echo BC_Creator_util::updatePage($_POST['page_url'], get_option('BusinessCardCreator_url'));

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
            <h3>Page template</h3>
            <select>
                <option value="default">Default</option>
                <option value="full_screen">Full screen</option>
            </select><br>
            <input type="submit" value="Update">
        </form>
    </div>

    <div class="tabcontent">
        <h3>Design</h3>
        <div class="menu-design-container">
            <div class="menu-previews-container">
                <!-- form design preview -->
                <form method="post" class="bc-creator-previews">
                    `
                    <ul>
                        <?php
                        include_once (WP_PLUGIN_DIR.'/business-card-creator'.'/util.php');
                        $designs = BC_Creator_util::getDesigns();
                        foreach ($designs as $design): ?>
                        <li>
                            <input type="hidden" name="id" value="<?= $design->id ?>">
                            <input type="checkbox" checked="<?= $design->isActive ?>" name="design-<?= $design->id ?>">
<!--                        TODO заманить на preview-->
                            <div><?= $design->Name ?></div>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                    <button type="button" onclick="onUpdateDesignPreview()">Update</button>
                </form>

            </div>
            <div class="menu-sidebar-container"></div>
        </div>
    </div>
</div>

<script src="<?= plugins_url() . '/business-card-creator' . '/menu/main_menu.js'; ?>"></script>