
async function blockWidthToggle() {

    var mySleep = m => new Promise(r => setTimeout(r, m));
    //Loop to check if roam-topbar has been loaded yet... if not, sleep for a bit to wait for it
    for (let y = 1; y < 20; y++) {
        if (document.getElementsByClassName("rm-topbar") != null && document.getElementsByClassName("roam-body-main") != null && document.getElementById("right-sidebar") != null) {
            if (document.getElementsByClassName("rm-topbar").length > 0 && document.getElementsByClassName("roam-body-main").length > 0) { break; }
        }
        await mySleep(100);
    }

    //Sleep for an extra little bit to load later than my other icons to help with ordering left to right (100 = 2nd)
    await mySleep(100);

    if (!window.blockWidthMode) { window.blockWidthMode = {}; }
    blockWidthMode["currentWidth"] = 1;

    async function toggleBlockWidth(evt) {
        var currentOption = Number(blockWidthMode["currentWidth"]);
        var direction = 1;

        //MACs can't use the ctrl key because that simulates a right click so using Alt (Option) key for them
        //var specialKeyHeld = evt.shiftKey;
        //var specialKeyHeld = evt.ctrlKey;
        //var specialKeyHeld = evt.metaKey; //metakey for Macs is Command key
        var specialKeyHeld = evt.altKey; //This is option key on Macs
        if (specialKeyHeld || evt.ctrlKey) { direction = -1; } //If ctrl + click or Mac alt/option + click is used

        //Check if added stylesheet is already present
        var foundStyleSheet = document.getElementById('blockWidthStyle');
        //Add css stylesheet
        if (!foundStyleSheet) {
            var cssSheet = document.createElement('style');
            cssSheet.type = "text/css";
            cssSheet.id = 'blockWidthStyle';
            cssSheet.appendChild(document.createTextNode(""));
            var findRoamBody = document.getElementsByClassName('roam-body')[0];
            findRoamBody.appendChild(cssSheet);
            foundStyleSheet = document.getElementById('blockWidthStyle');
        }

        var newOption = currentOption + direction;
        if (newOption < 1) { newOption = 6 }
        blockWidthMode["currentWidth"] = newOption;
        //var newWidth = '1500px'; //For example: padding-right: calc((100% - 1500px) / 2) !important;
        switch (newOption) {
            case 2:
                //This is the Roam default
                var newWidth = '800px'; //For example: padding-right: calc((100% - 800px) / 2) !important;
                break;
            case 3:
                var newWidth = '1000px';
                break;
            case 4:
                var newWidth = '1300px';
                break;
            case 5:
                var newWidth = '1700px';
                break;
            case 6:
                var newWidth = '3400px'; //Full screen
                break;
            default:
                //Normal whatever your CSS has by default (mine uses 1500px)
                newOption = 1;
                blockWidthMode["currentWidth"] = 1;
        }

        if (newOption == 1) {
            //Clear all rules
            foundStyleSheet.innerHTML = '';
        } else {
            foundStyleSheet.innerHTML = `
                    /* Extend the main page wider to allow for blocks to be wider  */
                    div[style*="padding-right: calc((100% - 800px) / 2); padding-left: calc((100% - 800px) / 2);"],
                    div[style*="padding-right: calc((100% - 568px) / 2); padding-left: calc((100% - 1032px) / 2);"] {
                        padding-right: calc((100% - ${newWidth}) / 2) !important;
                        padding-left: calc((100% - ${newWidth}) / 2) !important;
                    }

					/* For safari / ipad */
					div[style*="padding-right: calc(0.5 * (100% - 568px)); padding-left: calc(0.5 * (100% - 1032px));"],
					div[style*="padding-right: calc(0.5 * (100% - 800px)); padding-left: calc(0.5 * (100% - 800px));"] {
 					    padding-right: calc(0.5 * (100% - ${newWidth})) !important;
  						padding-left : calc(0.5 * (100% - ${newWidth})) !important;
					}

                    /* Block text widths to extend block text wider for when you make the page wider with the CSS above  */
                    .roam-block-container {
                        max-width: unset;
                    }
                    #right-sidebar .rm-block-children.rm-block__children.rm-level-0 > div.roam-block-container,
                    #right-sidebar div.zoom-path-view + div > div.roam-block-container {
                        width: 98%;
                    }
                    .rm-block-text {
                        max-width: unset;
                    }
                    #right-sidebar div.rm-zoom.zoom-path-view {
                        width: 98%;
                    }
                `;
        }
    }

    //Add button (thanks Tyler Wince!)
    var nameToUse = 'blockWidth';
    //Find icons to use at: https://blueprintjs.com/docs/#icons
    var bpIconName = 'exchange';

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
        mainButton.addEventListener('click', toggleBlockWidth);
    }
}

blockWidthToggle();
