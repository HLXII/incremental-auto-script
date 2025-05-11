// ==UserScript==
// @name        Incremental Auto Script
// @version     0.0.0
// @author      HLXII
// @description Cheat your way to infinity
// @homepage    https://github.com/HLXII/incremental-auto-script
// @match       https://www.incremental-game-site.com/
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loopInterval\", function() { return loopInterval; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"runLoop\", function() { return runLoop; });\n\n/**\n * The number of milliseconds between each loop iteration\n */\nconst loopInterval = 50;\n\nasync function runLoop(count) {\n\n}\n\n//# sourceURL=webpack:///./src/loop.js?");

/***/ }),

/***/ "./src/settingControls.js":
/*!********************************!*\
  !*** ./src/settingControls.js ***!
  \********************************/
/*! exports provided: setupSettingUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupSettingUI\", function() { return setupSettingUI; });\n\nfunction setupSettingUI() {\n\n}\n\n//# sourceURL=webpack:///./src/settingControls.js?");

/***/ })

/******/ });