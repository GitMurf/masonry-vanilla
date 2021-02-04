
async function andyModeToggle() {

    var mySleep = m => new Promise(r => setTimeout(r, m));
    //Loop to check if roam-topbar has been loaded yet... if not, sleep for a bit to wait for it
    for (let y = 1; y < 20; y++) {
        if (document.getElementsByClassName("rm-topbar") != null && document.getElementsByClassName("roam-body-main") != null && document.getElementById("right-sidebar") != null) {
            if (document.getElementsByClassName("rm-topbar").length > 0 && document.getElementsByClassName("roam-body-main").length > 0) { break; }
        }
        await mySleep(100);
    }

    //Sleep for an extra little bit to load later than my other icons to help with ordering left to right (300 = 4th)
    await mySleep(300);

    if (!window.andyMode) { window.andyMode = {}; }
    andyMode["andyModeOption"] = 1;
    andyMode["andyModeReverse"] = false;

    async function toggleAndyMode(evt) {
        var reverseDirection = andyMode["andyModeReverse"]; //If you want new pages in sidebar opened to the very right, set this to true
        var currentOption = Number(andyMode["andyModeOption"]);
        var direction = 1;
        if (evt.ctrlKey) { direction = -1; } //If ctrl + click is used

        //Check if added stylesheet is already present
        var foundStyleSheet = document.getElementById('masonryStyle');
        //Add css stylesheet
        if (!foundStyleSheet) {
            var cssSheet = document.createElement('style');
            cssSheet.type = "text/css";
            cssSheet.id = 'masonryStyle';
            cssSheet.appendChild(document.createTextNode(""));
            var findRoamBody = document.getElementsByClassName('roam-body')[0];
            findRoamBody.appendChild(cssSheet);
            foundStyleSheet = document.getElementById('masonryStyle');
        }

        var newOption = currentOption + direction;
        if (newOption < 1) { newOption = 6 }
        andyMode["andyModeOption"] = newOption;

        switch (newOption) {
            case 2: //Currently normal starting grid view (or whatever default css is). Change to skinny.
                var newWidth = 'var(--masonry-minWidth)';
                var newMaxWidth = '650px';
                var sidebarWidth = 27.5; //This is a percentage but need to list as number to subtract and get main window size too
                break;
            case 3: //Currently skinny, now make medium
                var newWidth = '650px';
                var newMaxWidth = '900px';
                var sidebarWidth = 38;
                break;
            case 4: //Currently medium, now make normal
                var newWidth = '900px';
                var newMaxWidth = 'var(--masonry-maxWidth)';
                var sidebarWidth = 51;
                break;
            case 5: //Currently normal, now make large
                var newWidth = 'var(--masonry-maxWidth)';
                var newMaxWidth = '90vw';
                var sidebarWidth = 67;
                break;
            case 6: //Currently large, now make extra wide
                var newWidth = '90vw';
                var newMaxWidth = '90vw';
                var sidebarWidth = 67;
                break;
            default:
                newOption = 1;
                andyMode["andyModeOption"] = 1;
                var sidebarWidth = 33;
        }

        var newHTMLCss = '';
        var reverseCss = '';

        if (newOption == 1) {
            //Clear all rules
            foundStyleSheet.innerHTML = '';
        } else {
            newHTMLCss = `
                .sidebar-content > div:not(.rm-dnd-separator) > div:not(.rm-dnd-separator) > div:nth-child(2) > div:nth-child(2) {
                    width: ${newWidth};
                    max-width: ${newMaxWidth};
                    height: 100%;
                }`;

            if (reverseDirection) {
                reverseCss = `
                    .sidebar-content {
                        display: inline-flex;
                        flex-direction: row-reverse;    
                        flex-wrap: nowrap;
                        height: 97%;
                    }
                    .sidebar-content > div:not(.rm-dnd-separator) {
                        height: 100%;
                    }`;
            }

            if (sidebarWidth) {
                var mainWidth = 100 - sidebarWidth;
                var sbWidthStr = `${sidebarWidth}%`;
                var mainWidthStr = `${mainWidth}%`;

                document.getElementsByClassName('roam-main')[0].style.flexBasis = mainWidthStr;
                document.getElementById('right-sidebar').style.flexBasis = sbWidthStr;
            }

            foundStyleSheet.innerHTML = `
                ${newHTMLCss}
                ${reverseCss}
                `;
        }

        if (sidebarWidth) {
            var mainWidth = 100 - sidebarWidth;
            var sbWidthStr = `${sidebarWidth}%`;
            var mainWidthStr = `${mainWidth}%`;

            document.getElementsByClassName('roam-main')[0].style.flexBasis = mainWidthStr;
            document.getElementById('right-sidebar').style.flexBasis = sbWidthStr;
        }
    }

    //Add button (thanks Tyler Wince!)
    var nameToUse = 'andy';
    //Find icons to use at: https://blueprintjs.com/docs/#icons
    var bpIconName = 'fullscreen';

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
        mainButton.addEventListener('click', toggleAndyMode);
    }
}

andyModeToggle();
