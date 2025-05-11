import { createToggleControl } from "./core/ui";

export function setupSettingUI() {
    const targetDiv = document.querySelector('.tour-resources-container');
    if (targetDiv) {
        const parentDiv = targetDiv.parentElement;
        createSettingPanel(parentDiv);
    }
}

function createSettingPanel(parentPanel) {
    let mainDiv = $('<div id="script-settings"></div>');
    parentPanel.append(mainDiv[0]);

    mainDiv.append(createToggleControl('autoClick', 'Auto Click'));
    mainDiv.append(createToggleControl('autoBuild', 'Auto Build'));
    mainDiv.append(createToggleControl('autoResearch', 'Auto Research'));
    mainDiv.append(createToggleControl('autoSell', 'Auto Sell'));
    mainDiv.append(createToggleControl('autoBuy', 'Auto Buy'));
}