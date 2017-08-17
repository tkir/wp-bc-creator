function open_BC_Creator_menu_tab(evt, tabNam) {

    var tabcontent = document.querySelectorAll("#bc-creator-menu .tabcontent");
    var tablinks = document.querySelectorAll("#bc-creator-menu .tablinks");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active');
        tablinks[i].classList.remove('active');
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    tabcontent[tabNam].classList.add('active');
    evt.currentTarget.className += " active";
}