import { sleep } from './utility.js';
import { settings, loadSettings, updateSettings } from './settings.js';
import { updateUI, uiUpdated, createToggleControl } from './ui.js';

export const url = 'https://github.com/HLXII/Evolve-Autoscript';
export const version = '1.3.7';
export const workingVersion = '0.7.5';

(async function () {
    console.log("Waiting for game to load...");
    await sleep(2000);
    await main();
})();

async function main() {
    'use strict';

    await loadSettings();
    console.log(settings);

    setupSettingUI();

    // Main script loop
    var count = 1;
    while (1) {
        await sleep(50);
        await run();
        count += 1;
    }
}

function setupSettingUI() {
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


var counter = 1;
async function run() {
    counter++;
    let currentTab = getCurrentTab();
    await autoClick();
    await autoSell();
    await autoBuy();
    if (counter % 23 == 0) {
        await autoBuild();
    }
    else if (counter % 101 == 0) {
        await autoResearch();
    }
    await goToTab(currentTab);
}

var clickCounter = 0;
async function autoClick() {
    if (!settings.autoClick) {
        return;
    }
    clickCounter += 1;
    if (clickCounter % 3 == 0) {
        var foodButton = $('button').filter(function () {
            return $(this).text().trim() === "Food";
        });
        foodButton.click();
    } else if (clickCounter % 3 == 1) {
        var woodButton = $('button').filter(function () {
            return $(this).text().trim() === "Wood";
        });
        woodButton.click();
    } else {
        var stoneButton = $('button').filter(function () {
            return $(this).text().trim() === "Stone";
        });
        stoneButton.click();
    }
}

function getCurrentResources() {
    let resources = {};
    $('.tour-resources-container tr').each(function () {
        let rowData = [];
        $(this).find('td').each(function () {
            rowData.push($(this).text().trim());
        });
        if (rowData.length > 0) {
            let resource = {}
            let resourceName = rowData[0];
            let [cur, max] = rowData[1].split('/').map(s => parseInt(s.replace(/,/g, '').trim()));
            resource.name = resourceName;
            resource.current = cur;
            resource.max = max;
            resource.fill = cur / max;
            resource.rate = rowData[2];
            resources[resource.name] = resource
        }
    });
    return resources;
}

function getCurrentTab() {
    const selectedtab = document.querySelector('#main-tabs button[aria-selected="true"]');
    return selectedtab.textContent;
}

async function goToTab(tabName) {
    let currentTab = getCurrentTab();
    if (currentTab == tabName) {
        return;
    }
    const tabButton = $(`#main-tabs button:contains("${tabName}")`);
    if (!!tabButton) {
        tabButton.click();
        await uiUpdated(() => {
            return getCurrentTab() == tabName;
        });
    }
}

function getMarketButtons() {
    let buttonsByResource = {};
    $('.p-4:has(h5)').each(function () {
        let resourceName = $(this).find('h5').text().trim();
        let buttons = $(this).find('button').toArray();
        buttonsByResource[resourceName] = buttons;
    });
    return buttonsByResource;
}

async function autoSell() {
    if (!settings.autoSell) {
        return;
    }
    let resources = getCurrentResources();
    let sellableResources = [
        "Iron",
        "Copper",
        "Stone",
        "Wood",
        // "Food",
        "Tools",
        "Cow",
        "Horse"
    ];
    let resourcesToSell = [];
    for (var res of sellableResources) {
        if (resources[res].current >= resources[res].max) {
            resourcesToSell.push(res);
        }
    }
    if (resourcesToSell.length) {
        console.log("Auto Selling");
        await goToTab("Marketplace");
        let marketButtons = getMarketButtons();
        if (Object.keys(marketButtons).length) {
            for (var res of resourcesToSell) {
                console.log(`\tSelling ${res}`);
                marketButtons[res][0].click();
            }
        }
    }
}

async function autoBuy() {
    if (!settings.autoBuy) {
        return;
    }
    let resources = getCurrentResources();
    if (resources["Gold"].current < resources["Gold"].max - 50) {
        return;
    }

    let buyableResources = [
        "Iron",
        "Copper",
        "Stone",
        "Wood",
        "Food",
        "Tools",
        // "Cow",
        // "Horse"
    ];
    let resourcesToBuy = buyableResources.map(res => resources[res]).filter(res => res.fill < .8)
    resourcesToBuy.sort((a, b) => a.fill - b.fill);
    if (resourcesToBuy.length) {
        console.log("Auto Buying");
        await goToTab("Marketplace");
        let marketButtons = getMarketButtons();
        if (Object.keys(marketButtons).length) {
            for (var res of resourcesToBuy) {
                console.log(`\tBuying ${res.name}`);
                marketButtons[res.name][3].click();
                return;
            }
        }
    }
}

function getBuildButtons() {
    return $('div.tab-container button');
}

async function autoBuild() {
    if (!settings.autoBuild) {
        return;
    }
    console.log("Auto Building");
    await goToTab("Build");
    let buildButtons = getBuildButtons();
    buildButtons.click();
}

function getResearchButtons() {
    return $('div.tab-container button');
}

async function autoResearch() {
    if (!settings.autoResearch) {
        return;
    }
    console.log("Auto Researching");
    await goToTab("Research");
    let researchButtons = getResearchButtons();
    researchButtons.click();
}