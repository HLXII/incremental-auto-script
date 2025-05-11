
/**
 * Settings object that will store all settings data for the auto-script
 */
export var settings = {};
export async function loadSettings() {
    console.log("Loading Settings");

    let jsonSettings = localStorage.getItem('settings');
    if (jsonSettings != null) { settings = JSON.parse(jsonSettings); }
}

/**
 * Stores the settings object into localStorage
 */
export function updateSettings() {
    localStorage.setItem('settings', JSON.stringify(settings));
}

// export function importSettings() {
//     console.log("Importing Settings");
//     if ($('textarea#settingsImportExport').val().length > 0) {
//         let settingStr = $('textarea#settingsImportExport').val();
//         settings = JSON.parse(LZString.decompressFromBase64(settingStr));
//         updateSettings();
//         resetUI();
//     }
// }
// export function exportSettings() {
//     console.log("Exporting Settings");
//     $('textarea#settingsImportExport').val(LZString.compressToBase64(JSON.stringify(settings)));
//     $('textarea#settingsImportExport').select();
//     document.execCommand('copy');
// }

let refreshInterval = null;
/**
 * Sets up a timer to automatically refresh the page every 200 seconds.
 * Should be called in main loop to ensure the timer is cleaned up if the setting gets updated.
 * Only useful if there are issues with leaving the site open/script running for long periods of time.
 */
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

