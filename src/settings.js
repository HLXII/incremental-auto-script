import { sleep, inEvolution } from './utility.js';
import { loadEvolution, evoChallengeActions } from './evolution.js';
import { loadFarm } from './farm.js';
import { loadResources } from './resources.js';
import { loadMiscActions, loadArpas, loadStorages } from './miscactions.js';
import { loadResearches } from './researches.js';
import { loadBuildings } from './buildings.js';
import { loadJobs, loadCraftJobs } from './jobs.js';
import { loadGovernments } from './government.js';
import { loadSmelter, loadFactory, loadDroid, loadGraphene } from './industry.js';
import { loadSupport } from './support.js';
import { updateUI, resetUI } from './ui.js';
import { openModal, closeModal } from './modal.js';

export var settings = {};
export async function loadSettings() {
    console.log("Loading Settings");

    let jsonSettings = localStorage.getItem('settings');
    if (jsonSettings != null) { settings = JSON.parse(jsonSettings); }
}

export const printSettings = ['Buildings', 'Researches', 'Misc'];

export function updateSettings() {
    localStorage.setItem('settings', JSON.stringify(settings));
}

export function importSettings() {
    console.log("Importing Settings");
    if ($('textarea#settingsImportExport').val().length > 0) {
        let settingStr = $('textarea#settingsImportExport').val();
        settings = JSON.parse(LZString.decompressFromBase64(settingStr));
        updateSettings();
        resetUI();
    }
}
export function exportSettings() {
    console.log("Exporting Settings");
    $('textarea#settingsImportExport').val(LZString.compressToBase64(JSON.stringify(settings)));
    $('textarea#settingsImportExport').select();
    document.execCommand('copy');
}

let refreshInterval = null;
export function autoRefresh() {
    if (settings.autoRefresh && refreshInterval === null) {
        refreshInterval = setInterval(function () { location.reload(); }, 200 * 1000);
    } else {
        if (!settings.autoRefresh && !(refreshInterval === null)) {
            clearInterval(refreshInterval);
            refreshInterval = null;
        }
    }
}

