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

function onUpdateDesignPreview() {
    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        alert(this.responseText); //Will alert: 42
    };
    oReq.open("get", "get-data.php", true);
    oReq.send();
}