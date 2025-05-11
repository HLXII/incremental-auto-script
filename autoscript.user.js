// ==UserScript==
// @name        Incremental Auto Script
// @version     0.0.0
// @author      HLXII
// @description Cheat your way to infinity
// @homepage    https://github.com/HLXII/incremental-auto-script
// @match       https://www.theresmoregame.com/play/
// @bugs        https://github.com/HLXII/incremental-auto-script/issues
// @require     https://code.jquery.com/jquery-1.11.1.min.js
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/core/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/main.js":
/*!**************************!*\
  !*** ./src/core/main.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility.js */ \"./src/core/utility.js\");\n/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.js */ \"./src/core/settings.js\");\n/* harmony import */ var _loop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loop.js */ \"./src/loop.js\");\n/* harmony import */ var _settingControls_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../settingControls.js */ \"./src/settingControls.js\");\n\n\n\n\n\n(async function () {\n    console.log(\"Waiting for game to load...\");\n    await Object(_utility_js__WEBPACK_IMPORTED_MODULE_0__[\"sleep\"])(2000);\n    await main();\n})();\n\nasync function main() {\n    'use strict';\n\n    await Object(_settings_js__WEBPACK_IMPORTED_MODULE_1__[\"loadSettings\"])();\n    console.log(_settings_js__WEBPACK_IMPORTED_MODULE_1__[\"settings\"]);\n\n    Object(_settingControls_js__WEBPACK_IMPORTED_MODULE_3__[\"setupSettingUI\"])();\n\n    // Main script loop\n    var count = 1;\n    while (1) {\n        await Object(_utility_js__WEBPACK_IMPORTED_MODULE_0__[\"sleep\"])(_loop_js__WEBPACK_IMPORTED_MODULE_2__[\"loopInterval\"]);\n        await Object(_loop_js__WEBPACK_IMPORTED_MODULE_2__[\"runLoop\"])(count);\n        count += 1;\n    }\n}\n\n//# sourceURL=webpack:///./src/core/main.js?");

/***/ }),

/***/ "./src/core/settings.js":
/*!******************************!*\
  !*** ./src/core/settings.js ***!
  \******************************/
/*! exports provided: settings, loadSettings, updateSettings, autoRefresh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadSettings\", function() { return loadSettings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateSettings\", function() { return updateSettings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"autoRefresh\", function() { return autoRefresh; });\n\n/**\n * Settings object that will store all settings data for the auto-script\n */\nvar settings = {};\nasync function loadSettings() {\n    console.log(\"Loading Settings\");\n\n    let jsonSettings = localStorage.getItem('settings');\n    if (jsonSettings != null) { settings = JSON.parse(jsonSettings); }\n}\n\n/**\n * Stores the settings object into localStorage\n */\nfunction updateSettings() {\n    localStorage.setItem('settings', JSON.stringify(settings));\n}\n\n// export function importSettings() {\n//     console.log(\"Importing Settings\");\n//     if ($('textarea#settingsImportExport').val().length > 0) {\n//         let settingStr = $('textarea#settingsImportExport').val();\n//         settings = JSON.parse(LZString.decompressFromBase64(settingStr));\n//         updateSettings();\n//         resetUI();\n//     }\n// }\n// export function exportSettings() {\n//     console.log(\"Exporting Settings\");\n//     $('textarea#settingsImportExport').val(LZString.compressToBase64(JSON.stringify(settings)));\n//     $('textarea#settingsImportExport').select();\n//     document.execCommand('copy');\n// }\n\nlet refreshInterval = null;\n/**\n * Sets up a timer to automatically refresh the page every 200 seconds.\n * Should be called in main loop to ensure the timer is cleaned up if the setting gets updated.\n * Only useful if there are issues with leaving the site open/script running for long periods of time.\n */\nfunction autoRefresh() {\n    if (settings.autoRefresh && refreshInterval === null) {\n        refreshInterval = setInterval(function () { location.reload(); }, 200 * 1000);\n    } else {\n        if (!settings.autoRefresh && !(refreshInterval === null)) {\n            clearInterval(refreshInterval);\n            refreshInterval = null;\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/core/settings.js?");

/***/ }),

/***/ "./src/core/ui.js":
/*!************************!*\
  !*** ./src/core/ui.js ***!
  \************************/
/*! exports provided: uiUpdated, createToggleControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uiUpdated\", function() { return uiUpdated; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createToggleControl\", function() { return createToggleControl; });\n/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.js */ \"./src/core/settings.js\");\n\n\n/**\n * Waits until the UI is updated\n * @param {function} when - Boolean function that should check whether the UI was updated\n * @param {number} timeout - Time in milliseconds before we timeout the UI update check\n * @returns Promise\n */\nasync function uiUpdated({ when = () => true, timeout = 1000 } = {}) {\n    return new Promise((resolve, reject) => {\n        const observer = new MutationObserver(() => {\n            try {\n                if (when()) {\n                    cleanup();\n                    resolve();\n                }\n            } catch (e) {\n                cleanup();\n                reject(e);\n            }\n        });\n        observer.observe(document.body, {\n            childList: true,\n            subtree: true,\n        });\n\n        // Optional timeout to avoid hanging forever\n        const timer = setTimeout(() => {\n            cleanup();\n            reject(new Error('UI update timed out'));\n        }, timeout);\n\n        const cleanup = () => {\n            observer.disconnect();\n            clearTimeout(timer);\n        };\n\n        // Handle immediate condition\n        try {\n            if (when()) {\n                cleanup();\n                resolve();\n                return;\n            }\n        } catch (e) {\n            cleanup();\n            reject(e);\n            return;\n        }\n    });\n}\n\nlet toolTipClass = 'is-primary is-bottom is-small b-tooltip is-animated is-multiline';\nfunction createNumControl(currentValue, name, subFunc, addFunc, args) {\n    args = args || {}\n    let subBtn = $(`<span role=\"button\" aria-label=\"Decrease ${name}\" class=\"sub\">«</span>`);\n    let label = $(`<span id=\"${name}_control\" class=\"count current\" style=\"width:2rem;\">${currentValue}</span>`);\n    subBtn.on('click', function (e) {\n        document.getElementById(name + '_control').innerText = subFunc();\n        Object(_settings_js__WEBPACK_IMPORTED_MODULE_0__[\"updateSettings\"])();\n    });\n    let addBtn = $(`<span role=\"button\" aria-label=\"Increase ${name}\" class=\"add\">»</span>`);\n    addBtn.on('click', function (e) {\n        document.getElementById(name + '_control').innerText = addFunc();\n        Object(_settings_js__WEBPACK_IMPORTED_MODULE_0__[\"updateSettings\"])();\n    });\n    let control = $(`<div class=\"controls as-${name}-settings\" style=\"display:flex\"></div>`).append(subBtn).append(label).append(addBtn);\n    return control;\n}\n/**\n * Generates a toggle control for a boolean setting value\n * @param {string} toggleId - the boolean setting property name \n * @param {string} toggleName - the name of the setting \n * @param {object} args - additional optional arguments \n * @returns The created Toggle element\n */\nfunction createToggleControl(toggleId, toggleName, args) {\n    args = args || {};\n    let controlName = (Array.isArray(toggleId)) ? toggleId.join('_') : toggleId;\n    let checkStyle = (args.small !== undefined) ? 'style=\"height:5px;\"' : '';\n    let toggle = $(`\n    <label id=\"${controlName}_toggle\">\n    <input type=\"checkbox\" true-value=\"true\" value=\"false\">\n    <span class=\"check\" ${checkStyle}></span>\n    <span class=\"control-label\"><span class=\"is-primary is-bottom is-small is-animated is-multiline\">${toggleName}</span>\n    </span>\n    </label>`);\n    let setting = _settings_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"];\n    if (args.hasOwnProperty('path')) {\n        setting = args.path[0];\n        for (let i = 1; i < args.path.length - 1; i++) {\n            setting = setting[args.path[i]];\n        }\n        toggleId = args.path[args.path.length - 1];\n    }\n    toggle.children('input').on('click', function (e) {\n        if (e.which != 1) { return; }\n        let input = e.currentTarget;\n        let state = !(input.getAttribute('value') === \"true\");\n        input.setAttribute('value', state);\n        setting[toggleId] = state;\n        console.log(`Setting ${controlName} to ${state}`);\n        Object(_settings_js__WEBPACK_IMPORTED_MODULE_0__[\"updateSettings\"])();\n        if (state && args.enabledCallBack !== undefined) {\n            args.enabledCallBack();\n        }\n        else if (args.disabledCallBack !== undefined) {\n            args.disabledCallBack()\n        }\n        if (args.onChange !== undefined) {\n            args.onChange(state);\n        }\n    });\n    if (setting[toggleId]) {\n        setTimeout(function () {\n            console.log(`Setting ${controlName} initially to true`);\n            toggle.children('span.check').click();\n            toggle.children('input').attr('value', true);\n        }, 1000);\n    }\n    return toggle;\n}\nfunction createDropDownControl(currentValue, id, name, values, args) {\n    args = args || {};\n    let option = $(`<div style=\"display:flex;\" id=\"${id}_dropdown\"></div>`);\n    let label = $(`<span class=\"has-text-warning\" style=\"width:12rem;\">${name}:</span>`);\n    if (args.toolTip !== undefined) {\n        label.addClass(toolTipClass);\n        label.attr('data-label', args.toolTip);\n    }\n    option.append(label);\n    let decision = $(`<select style=\"width:12rem;\"></select>`);\n    for (let val in values) {\n        decision.append($(`<option value=\"${val}\">${values[val]}</option>`));\n    }\n    decision[0].value = _settings_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"][id];\n    decision[0].onchange = function () {\n        _settings_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"][id] = decision[0].value;\n        console.log(`Changing ${id} to ${_settings_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"][id]}`);\n        Object(_settings_js__WEBPACK_IMPORTED_MODULE_0__[\"updateSettings\"])();\n        if (args.onChange !== undefined) {\n            args.onChange(decision[0].value);\n        }\n    };\n    option.append(decision);\n    return option;\n}\nfunction createCheckBoxControl(currentValue, id, name, args) {\n    args = args || {};\n    let checkBox = $(`\n    <label class=\"b-checkbox checkbox\" id=\"${id}\">\n    <input type=\"checkbox\" true-value=\"Yes\" false-value=\"No\" value=\"false\">\n    <span class=\"check is-dark\"></span>\n    <span class=\"control-label\">${name}</span>\n    </label>`);\n    if (args.toolTip !== undefined) {\n        checkBox.addClass(toolTipClass);\n        checkBox.attr(\"data-label\", args.toolTip);\n    }\n    let setting = _settings_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"];\n    if (args.hasOwnProperty('path')) {\n        setting = args.path[0];\n        for (let i = 1; i < args.path.length - 1; i++) {\n            setting = setting[args.path[i]];\n        }\n        id = args.path[args.path.length - 1];\n    }\n    checkBox.children('input').on('click', function (e) {\n        if (e.which != 1) { return; }\n        let input = e.currentTarget;\n        let state = !(input.getAttribute('value') === \"true\");\n        input.setAttribute('value', state);\n        setting[id] = state;\n        console.log(\"Setting\", id, \"to\", state);\n        Object(_settings_js__WEBPACK_IMPORTED_MODULE_0__[\"updateSettings\"])();\n        if (state && args.enabledCallBack !== undefined) {\n            args.enabledCallBack();\n        } else if (args.disabledCallBack !== undefined) {\n            args.disabledCallBack()\n        }\n    });\n    if (setting[id]) {\n        setTimeout(function () {\n            console.log(\"Setting initially to true\");\n            checkBox.children('span.check').click();\n            checkBox.children('input').attr('value', true);\n        }, 1000);\n    }\n    return checkBox;\n}\nfunction createInputControl(currentValue, id, name, args) {\n    args = args || {};\n    let div = $(`<div style=\"display:flex\" id=\"${id}_input\"></div>`);\n    let label = $(`<span class=\"has-text-warning\" style=\"width:12rem;\">${name}:</span>`);\n    if (args.toolTip !== undefined) {\n        label.addClass(toolTipClass);\n        label.attr('data-label', args.toolTip);\n    }\n    div.append(label);\n    let input = $(`<input type=\"text\" class=\"input is-small\" style=\"width:10rem;\"/>`);\n    div.append(input);\n    let setting = _settings_js__WEBPACK_IMPORTED_MODULE_0__[\"settings\"];\n    if (args.hasOwnProperty('path')) {\n        setting = args.path[0];\n        for (let i = 1; i < args.path.length - 1; i++) {\n            setting = setting[args.path[i]];\n        }\n        id = args.path[args.path.length - 1];\n    }\n    input.val(currentValue);\n    let setBtn = $(`<a class=\"button is-dark is-small\" id=\"${id}_input_set\" style=\"width:2rem;\"><span>Set</span></a>`);\n    div.append(setBtn);\n    setBtn.on('click', function (e) {\n        if (e.which != 1) { return; }\n        let val = input.val();\n        // Converting input\n        if (args.convertFunc !== undefined) { val = args.convertFunc(val); }\n        if (val === null) { input.val(setting[id]); return; }\n        console.log(`Setting input ${name} to ${val}`);\n        setting[id] = val;\n        input.val(val);\n        Object(_settings_js__WEBPACK_IMPORTED_MODULE_0__[\"updateSettings\"])();\n        // CallBack function\n        if (args.setFunc !== undefined) { args.setFunc(setting.id); }\n    });\n    return div;\n}\n\n//# sourceURL=webpack:///./src/core/ui.js?");

/***/ }),

/***/ "./src/core/utility.js":
/*!*****************************!*\
  !*** ./src/core/utility.js ***!
  \*****************************/
/*! exports provided: sleep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sleep\", function() { return sleep; });\n\n/**\n * Sleeps for the specified number of milliseconds\n * @param {number} ms - Number of milliseconds to sleep \n * @returns Promise to be awaited\n */\nfunction sleep(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n}\n\n//# sourceURL=webpack:///./src/core/utility.js?");

/***/ }),

/***/ "./src/loop.js":
/*!*********************!*\
  !*** ./src/loop.js ***!
  \*********************/
/*! exports provided: loopInterval, runLoop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loopInterval\", function() { return loopInterval; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"runLoop\", function() { return runLoop; });\n/* harmony import */ var _core_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/settings */ \"./src/core/settings.js\");\n/* harmony import */ var _core_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/ui */ \"./src/core/ui.js\");\n\n\n\n/**\n * The number of milliseconds between each loop iteration\n */\nconst loopInterval = 50;\n\nasync function runLoop(count) {\n    let currentTab = getCurrentTab();\n    await autoClick();\n    await autoSell();\n    await autoBuy();\n    if (count % 23 == 0) {\n        await autoBuild();\n    }\n    else if (count % 101 == 0) {\n        await autoResearch();\n    }\n    await goToTab(currentTab);\n}\n\nvar clickCounter = 0;\nasync function autoClick() {\n    if (!_core_settings__WEBPACK_IMPORTED_MODULE_0__[\"settings\"].autoClick) {\n        return;\n    }\n    clickCounter += 1;\n    if (clickCounter % 3 == 0) {\n        var foodButton = $('button').filter(function () {\n            return $(this).text().trim() === \"Food\";\n        });\n        foodButton.click();\n    } else if (clickCounter % 3 == 1) {\n        var woodButton = $('button').filter(function () {\n            return $(this).text().trim() === \"Wood\";\n        });\n        woodButton.click();\n    } else {\n        var stoneButton = $('button').filter(function () {\n            return $(this).text().trim() === \"Stone\";\n        });\n        stoneButton.click();\n    }\n}\n\nfunction getCurrentResources() {\n    let resources = {};\n    $('.tour-resources-container tr').each(function () {\n        let rowData = [];\n        $(this).find('td').each(function () {\n            rowData.push($(this).text().trim());\n        });\n        if (rowData.length > 0) {\n            let resource = {}\n            let resourceName = rowData[0];\n            let [cur, max] = rowData[1].split('/').map(s => parseInt(s.replace(/,/g, '').trim()));\n            resource.name = resourceName;\n            resource.current = cur;\n            resource.max = max;\n            resource.fill = cur / max;\n            resource.rate = rowData[2];\n            resources[resource.name] = resource\n        }\n    });\n    return resources;\n}\n\nfunction getCurrentTab() {\n    const selectedtab = document.querySelector('#main-tabs button[aria-selected=\"true\"]');\n    return selectedtab.textContent;\n}\n\nasync function goToTab(tabName) {\n    let currentTab = getCurrentTab();\n    if (currentTab == tabName) {\n        return;\n    }\n    const tabButton = $(`#main-tabs button:contains(\"${tabName}\")`);\n    if (!!tabButton) {\n        tabButton.click();\n        await Object(_core_ui__WEBPACK_IMPORTED_MODULE_1__[\"uiUpdated\"])(() => {\n            return getCurrentTab() == tabName;\n        });\n    }\n}\n\nfunction getMarketButtons() {\n    let buttonsByResource = {};\n    $('.p-4:has(h5)').each(function () {\n        let resourceName = $(this).find('h5').text().trim();\n        let buttons = $(this).find('button').toArray();\n        buttonsByResource[resourceName] = buttons;\n    });\n    return buttonsByResource;\n}\n\nasync function autoSell() {\n    if (!_core_settings__WEBPACK_IMPORTED_MODULE_0__[\"settings\"].autoSell) {\n        return;\n    }\n    let resources = getCurrentResources();\n    let sellableResources = [\n        \"Iron\",\n        \"Copper\",\n        \"Stone\",\n        \"Wood\",\n        // \"Food\",\n        \"Tools\",\n        \"Cow\",\n        \"Horse\"\n    ];\n    let resourcesToSell = [];\n    for (var res of sellableResources) {\n        if (resources[res].current >= resources[res].max) {\n            resourcesToSell.push(res);\n        }\n    }\n    if (resourcesToSell.length) {\n        console.log(\"Auto Selling\");\n        await goToTab(\"Marketplace\");\n        let marketButtons = getMarketButtons();\n        if (Object.keys(marketButtons).length) {\n            for (var res of resourcesToSell) {\n                console.log(`\\tSelling ${res}`);\n                marketButtons[res][0].click();\n            }\n        }\n    }\n}\n\nasync function autoBuy() {\n    if (!_core_settings__WEBPACK_IMPORTED_MODULE_0__[\"settings\"].autoBuy) {\n        return;\n    }\n    let resources = getCurrentResources();\n    if (resources[\"Gold\"].current < resources[\"Gold\"].max - 50) {\n        return;\n    }\n\n    let buyableResources = [\n        \"Iron\",\n        \"Copper\",\n        \"Stone\",\n        \"Wood\",\n        \"Food\",\n        \"Tools\",\n        // \"Cow\",\n        // \"Horse\"\n    ];\n    let resourcesToBuy = buyableResources.map(res => resources[res]).filter(res => res.fill < .8)\n    resourcesToBuy.sort((a, b) => a.fill - b.fill);\n    if (resourcesToBuy.length) {\n        console.log(\"Auto Buying\");\n        await goToTab(\"Marketplace\");\n        let marketButtons = getMarketButtons();\n        if (Object.keys(marketButtons).length) {\n            for (var res of resourcesToBuy) {\n                console.log(`\\tBuying ${res.name}`);\n                marketButtons[res.name][3].click();\n                return;\n            }\n        }\n    }\n}\n\nfunction getBuildButtons() {\n    return $('div.tab-container button');\n}\n\nasync function autoBuild() {\n    if (!_core_settings__WEBPACK_IMPORTED_MODULE_0__[\"settings\"].autoBuild) {\n        return;\n    }\n    console.log(\"Auto Building\");\n    await goToTab(\"Build\");\n    let buildButtons = getBuildButtons();\n    buildButtons.click();\n}\n\nfunction getResearchButtons() {\n    return $('div.tab-container button');\n}\n\nasync function autoResearch() {\n    if (!_core_settings__WEBPACK_IMPORTED_MODULE_0__[\"settings\"].autoResearch) {\n        return;\n    }\n    console.log(\"Auto Researching\");\n    await goToTab(\"Research\");\n    let researchButtons = getResearchButtons();\n    researchButtons.click();\n}\n\n//# sourceURL=webpack:///./src/loop.js?");

/***/ }),

/***/ "./src/settingControls.js":
/*!********************************!*\
  !*** ./src/settingControls.js ***!
  \********************************/
/*! exports provided: setupSettingUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupSettingUI\", function() { return setupSettingUI; });\n/* harmony import */ var _core_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/ui */ \"./src/core/ui.js\");\n\n\nfunction setupSettingUI() {\n    const targetDiv = document.querySelector('.tour-resources-container');\n    if (targetDiv) {\n        const parentDiv = targetDiv.parentElement;\n        createSettingPanel(parentDiv);\n    }\n}\n\nfunction createSettingPanel(parentPanel) {\n    let mainDiv = $('<div id=\"script-settings\"></div>');\n    parentPanel.append(mainDiv[0]);\n\n    mainDiv.append(Object(_core_ui__WEBPACK_IMPORTED_MODULE_0__[\"createToggleControl\"])('autoClick', 'Auto Click'));\n    mainDiv.append(Object(_core_ui__WEBPACK_IMPORTED_MODULE_0__[\"createToggleControl\"])('autoBuild', 'Auto Build'));\n    mainDiv.append(Object(_core_ui__WEBPACK_IMPORTED_MODULE_0__[\"createToggleControl\"])('autoResearch', 'Auto Research'));\n    mainDiv.append(Object(_core_ui__WEBPACK_IMPORTED_MODULE_0__[\"createToggleControl\"])('autoSell', 'Auto Sell'));\n    mainDiv.append(Object(_core_ui__WEBPACK_IMPORTED_MODULE_0__[\"createToggleControl\"])('autoBuy', 'Auto Buy'));\n}\n\n\n//# sourceURL=webpack:///./src/settingControls.js?");

/***/ })

/******/ });