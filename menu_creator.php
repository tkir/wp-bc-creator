<?php

class Menu_Creator
{
//добавляем субменю
    public static function add_menu_page()
    {
        add_submenu_page(
            'options-general.php',
            'BusinessCardCreator',
            'BC_Creator',
            8,
            'BusinessCardCreator',
            array('Menu_Creator','menu')
        );
    }

    //вход в меню
    public static function menu()
    {
        include_once("menu/main_menu.php");
    }
}