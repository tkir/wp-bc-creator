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
    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
        var res = JSON.parse(this.responseText);
        createPreviews(res);
    };
    oReq.open("get",
        bc_creator_api.path + "business-card-creator/updateDesigns",
        true);
    oReq.setRequestHeader('X-WP-Nonce', bc_creator_api.nonce);
    oReq.send();
}

function createPreviews(previews) {

    var divPreviews = document.querySelector('#bc-creator-menu .bc-creator-menu-previews');
    divPreviews.innerHTML = '';

    previews.forEach(preview => {

        var div = document.getElementById('bc-creator-menu-preview-tpl')
            .content.getElementById('bc-creator-menu-preview').cloneNode(true);

        var h3 = div.querySelector('h3');
        var img = div.querySelector('img');
        var active = div.querySelector('span.bc-creator-preview-isActive');
        var id = div.querySelector('div[hidden]');

        id.innerText = preview['id'];
        h3.innerText = preview['Name'];
        img.src = preview['Preview'];
        if (preview['isActive']==0) {
            img.classList.add('inactive');
            active.classList.add('inactive');
        }

        divPreviews.appendChild(div);
    })
}

function bc_creator_toggleActive(e) {

    var target = e.target;
    while (target !== document.body) {
        target = target.parentElement;
        if (target.id === 'bc-creator-menu-preview')break;
    }
    if (target === document.body)return;

    var img = target.querySelector('img');
    var active = target.querySelector('span.bc-creator-preview-isActive');
    var id = target.querySelector('div[hidden]').innerText;

    var oReq = new XMLHttpRequest();
    oReq.onload = function () {

        var res = JSON.parse(this.responseText);
        if (res['result']===0)return;

        img.classList.toggle('inactive');
        active.classList.toggle('inactive');
    };
    oReq.open("get",
        bc_creator_api.path + "business-card-creator/toggleActive/" + id,
        true);
    oReq.setRequestHeader('X-WP-Nonce', bc_creator_api.nonce);
    oReq.send();

}