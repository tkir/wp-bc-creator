<?php
//если зашли с данными: обновляем существующюю страницу, устанавливаем новый hash
if (!empty($_POST)) {
    include_once(plugin_dir_path(__DIR__) . 'util.php');
    BC_Creator_util::updatePage($_POST['page_url'], get_option('BusinessCardCreator_url'));
    BC_Creator_util::set_page_template($_POST['template']);

    update_option('BusinessCardCreator_url', str_replace(' ', '', $_POST['page_url']));
    update_option('BusinessCardCreator_hash', str_replace(' ', '', $_POST['hash']));
}
?>

<?php
$page_url = get_option('BusinessCardCreator_url');
$hash = get_option('BusinessCardCreator_hash');

include_once(plugin_dir_path(__DIR__) . 'util.php');
$options = BC_Creator_util::getOrderOptions();
?>


<link href="<?= plugins_url(__FILE__) . '/menu/main_menu.css'; ?>" rel="stylesheet"/>

<div id="bc-creator-menu">
    <div class="tab">
        <button class="tablinks active" onclick="open_BC_Creator_menu_tab(event, 0)">General</button>
        <button class="tablinks" onclick="open_BC_Creator_menu_tab(event, 1)">Design</button>
        <button class="tablinks" onclick="open_BC_Creator_menu_tab(event, 2)">Order</button>
    </div>

    <div class="tabcontent active">
        <form method="post">
            <label><input type="text" name="page_url" value="<?= $page_url ?>"> Page URL</label><br>
            <label><input type="text" name="hash" value="<?= $hash ?>"> Personal hash</label><br>
            <h3>Page template</h3>
            <select name="template">
                <option value="default">Default</option>
                <option value="bc_creator">Full screen</option>
            </select><br>
            <input type="submit" value="Update">
        </form>
    </div>

    <div class="tabcontent">
        <h3>Design</h3>
        <div class="bc-creator-menu-design-container">
            <div class="bc-creator-menu-previews-container">

                <template id="bc-creator-menu-preview-tpl">
                    <div id="bc-creator-menu-preview">
                        <h3>Name</h3>
                        <div class="bc-creator-preview-img">
                            <img>
                            <span class="bc-creator-preview-isActive"
                                  onclick="bc_creator_toggleActive(event)">&times;</span>
                        </div>
                        <div hidden>id</div>
                </template>

                <div class="bc-creator-menu-previews">
                </div>
                <button type="button" onclick="onUpdateDesignPreview()">Update</button>

            </div>
            <div class="menu-sidebar-container"></div>
        </div>
    </div>

    <div class="tabcontent">
        <h3>Order detail</h3>

        <?php foreach ($options as $option): $values=json_decode($option->Values)?>
        <div class="bc-creator-menu-order-detail">
            <a>X</a><input type="text" value="<?=$option->Name?>">
            <div class="bc-creator-menu-order-detail-option">

                <?php foreach ($values as $value): ?>
                <div>
                    <a>X</a><input type="text" value="<?=$value?>">
                </div>
                <?php endforeach;?>

            </div>
        </div>
        <?php endforeach;?>

    </div>

</div>

<script src="<?= plugins_url() . '/business-card-creator' . '/menu/main_menu.js'; ?>"></script>
<script>
    bc_creator_api.previews.sort((a, b) => a['Preview_Order'] - b['Preview_Order']);
    createPreviews(bc_creator_api.previews);

    document.querySelector('#bc-creator-menu select option[value="' + bc_creator_api.template + '"]')
        .setAttribute('selected', 'true');
</script>