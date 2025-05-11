import { sleep } from './utility.js';
import { settings, loadSettings } from './settings.js';
import { loopInterval, runLoop } from '../loop.js';
import { setupSettingUI } from '../settingControls.js';

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
        await sleep(loopInterval);
        await runLoop(count);
        count += 1;
    }
}