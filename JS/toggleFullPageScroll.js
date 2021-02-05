
async function loadLeftToggleStart() {

    var mySleep = m => new Promise(r => setTimeout(r, m));
    //Loop to check if roam-topbar has been loaded yet... if not, sleep for a bit to wait for it
    for (let y = 1; y < 20; y++) {
        if (document.getElementsByClassName("rm-topbar") != null && document.getElementsByClassName("roam-body-main") != null && document.getElementById("right-sidebar") != null) {
            if (document.getElementsByClassName("rm-topbar").length > 0 && document.getElementsByClassName("roam-body-main").length > 0) { break; }
        }
        await mySleep(100);
    }

    //Sleep for an extra little bit to load later than my other icons to help with ordering left to right (200 = 3rd)
    await mySleep(200);

    function toggleLeftSide(evt) {
        var roamAppFlex = document.querySelector("div.roam-app > div.flex-h-box");
        var roamRSBCont = document.getElementById("roam-right-sidebar-content");
        if (roamRSBCont && roamAppFlex) {
            if (roamRSBCont.style.overflow == 'visible') { //Make main left side pinned
                roamAppFlex.style.removeProperty("overflow");
                roamRSBCont.style.setProperty("overflow", "auto");
                var sbButton = document.getElementsByClassName('bp3-button bp3-minimal bp3-small bp3-icon-standard bp3-icon-menu-open');
                if(sbButton.length == 1) {
                    var sbButtonElem = sbButton[0];
                    sbButtonElem.style.opacity = 1;
                    sbButtonElem.style.zIndex = 1001;
                }
            } else { //Allow the right sidebar to scroll the entire screen (un-pin main left)
                roamAppFlex.style.setProperty("overflow", "auto");
                roamRSBCont.style.setProperty("overflow", "visible", "important");
                var sbButton = document.getElementsByClassName('bp3-button bp3-minimal bp3-small bp3-icon-standard bp3-icon-menu-open');
                if(sbButton.length == 1) {
                    var sbButtonElem = sbButton[0];
                    sbButtonElem.style.opacity = 0;
                    sbButtonElem.style.zIndex = 1;
                }
            }
        }
    }

    //Add button (thanks Tyler Wince!)
    var nameToUse = 'unpin-left-main';
    //Find icons to use at: https://blueprintjs.com/docs/#icons
    var bpIconName = 'pin';

    var checkForButton = document.getElementById(nameToUse + '-icon');
    if (!checkForButton) {
        var mainButton = document.createElement('span');
        mainButton.id = nameToUse + '-button';
        mainButton.classList.add('bp3-popover-wrapper');
        var spanTwo = document.createElement('span');
        spanTwo.classList.add('bp3-popover-target');
        mainButton.appendChild(spanTwo);
        var mainIcon = document.createElement('span');
        mainIcon.id = nameToUse + '-icon';
        mainIcon.classList.add('bp3-icon-' + bpIconName, 'bp3-button', 'bp3-minimal', 'bp3-small', 'murf-icon');
        spanTwo.appendChild(mainIcon);
        var roamTopbar = document.getElementsByClassName("rm-topbar");
        //var nextIconButton = roamTopbar[0].getElementsByClassName("rm-find-or-create-wrapper")[0].nextElementSibling;
        //if (nextIconButton.className != "") { nextIconButton = nextIconButton.nextElementSibling; }
        //var nextIconButton = roamTopbar[0].getElementsByClassName("bp3-button bp3-minimal bp3-icon-help bp3-small")[0].nextElementSibling;
        var nextIconButton = roamTopbar[0].lastElementChild;
        var flexDiv = document.createElement('div');
        flexDiv.id = nameToUse + '-flex-space';
        flexDiv.className = 'rm-topbar__spacer-sm';
        nextIconButton.insertAdjacentElement('afterend', mainButton);
        mainButton.insertAdjacentElement('afterend', flexDiv);
        //Need to change the function name to something unique and change below
        mainButton.addEventListener('click', toggleLeftSide);
    }
}

loadLeftToggleStart();
