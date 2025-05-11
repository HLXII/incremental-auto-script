import { settings, updateSettings } from './settings.js';

/**
 * Waits until the UI is updated
 * @param {function} when - Boolean function that should check whether the UI was updated
 * @param {number} timeout - Time in milliseconds before we timeout the UI update check
 * @returns Promise
 */
export async function uiUpdated({ when = () => true, timeout = 1000 } = {}) {
    return new Promise((resolve, reject) => {
        const observer = new MutationObserver(() => {
            try {
                if (when()) {
                    cleanup();
                    resolve();
                }
            } catch (e) {
                cleanup();
                reject(e);
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Optional timeout to avoid hanging forever
        const timer = setTimeout(() => {
            cleanup();
            reject(new Error('UI update timed out'));
        }, timeout);

        const cleanup = () => {
            observer.disconnect();
            clearTimeout(timer);
        };

        // Handle immediate condition
        try {
            if (when()) {
                cleanup();
                resolve();
                return;
            }
        } catch (e) {
            cleanup();
            reject(e);
            return;
        }
    });
}

let toolTipClass = 'is-primary is-bottom is-small b-tooltip is-animated is-multiline';
function createNumControl(currentValue, name, subFunc, addFunc, args) {
    args = args || {}
    let subBtn = $(`<span role="button" aria-label="Decrease ${name}" class="sub">«</span>`);
    let label = $(`<span id="${name}_control" class="count current" style="width:2rem;">${currentValue}</span>`);
    subBtn.on('click', function (e) {
        document.getElementById(name + '_control').innerText = subFunc();
        updateSettings();
    });
    let addBtn = $(`<span role="button" aria-label="Increase ${name}" class="add">»</span>`);
    addBtn.on('click', function (e) {
        document.getElementById(name + '_control').innerText = addFunc();
        updateSettings();
    });
    let control = $(`<div class="controls as-${name}-settings" style="display:flex"></div>`).append(subBtn).append(label).append(addBtn);
    return control;
}
/**
 * Generates a toggle control for a boolean setting value
 * @param {string} toggleId - the boolean setting property name 
 * @param {string} toggleName - the name of the setting 
 * @param {object} args - additional optional arguments 
 * @returns The created Toggle element
 */
export function createToggleControl(toggleId, toggleName, args) {
    args = args || {};
    let controlName = (Array.isArray(toggleId)) ? toggleId.join('_') : toggleId;
    let checkStyle = (args.small !== undefined) ? 'style="height:5px;"' : '';
    let toggle = $(`
    <label id="${controlName}_toggle">
    <input type="checkbox" true-value="true" value="false">
    <span class="check" ${checkStyle}></span>
    <span class="control-label"><span class="is-primary is-bottom is-small is-animated is-multiline">${toggleName}</span>
    </span>
    </label>`);
    let setting = settings;
    if (args.hasOwnProperty('path')) {
        setting = args.path[0];
        for (let i = 1; i < args.path.length - 1; i++) {
            setting = setting[args.path[i]];
        }
        toggleId = args.path[args.path.length - 1];
    }
    toggle.children('input').on('click', function (e) {
        if (e.which != 1) { return; }
        let input = e.currentTarget;
        let state = !(input.getAttribute('value') === "true");
        input.setAttribute('value', state);
        setting[toggleId] = state;
        console.log(`Setting ${controlName} to ${state}`);
        updateSettings();
        if (state && args.enabledCallBack !== undefined) {
            args.enabledCallBack();
        }
        else if (args.disabledCallBack !== undefined) {
            args.disabledCallBack()
        }
        if (args.onChange !== undefined) {
            args.onChange(state);
        }
    });
    if (setting[toggleId]) {
        setTimeout(function () {
            console.log(`Setting ${controlName} initially to true`);
            toggle.children('span.check').click();
            toggle.children('input').attr('value', true);
        }, 1000);
    }
    return toggle;
}
function createDropDownControl(currentValue, id, name, values, args) {
    args = args || {};
    let option = $(`<div style="display:flex;" id="${id}_dropdown"></div>`);
    let label = $(`<span class="has-text-warning" style="width:12rem;">${name}:</span>`);
    if (args.toolTip !== undefined) {
        label.addClass(toolTipClass);
        label.attr('data-label', args.toolTip);
    }
    option.append(label);
    let decision = $(`<select style="width:12rem;"></select>`);
    for (let val in values) {
        decision.append($(`<option value="${val}">${values[val]}</option>`));
    }
    decision[0].value = settings[id];
    decision[0].onchange = function () {
        settings[id] = decision[0].value;
        console.log(`Changing ${id} to ${settings[id]}`);
        updateSettings();
        if (args.onChange !== undefined) {
            args.onChange(decision[0].value);
        }
    };
    option.append(decision);
    return option;
}
function createCheckBoxControl(currentValue, id, name, args) {
    args = args || {};
    let checkBox = $(`
    <label class="b-checkbox checkbox" id="${id}">
    <input type="checkbox" true-value="Yes" false-value="No" value="false">
    <span class="check is-dark"></span>
    <span class="control-label">${name}</span>
    </label>`);
    if (args.toolTip !== undefined) {
        checkBox.addClass(toolTipClass);
        checkBox.attr("data-label", args.toolTip);
    }
    let setting = settings;
    if (args.hasOwnProperty('path')) {
        setting = args.path[0];
        for (let i = 1; i < args.path.length - 1; i++) {
            setting = setting[args.path[i]];
        }
        id = args.path[args.path.length - 1];
    }
    checkBox.children('input').on('click', function (e) {
        if (e.which != 1) { return; }
        let input = e.currentTarget;
        let state = !(input.getAttribute('value') === "true");
        input.setAttribute('value', state);
        setting[id] = state;
        console.log("Setting", id, "to", state);
        updateSettings();
        if (state && args.enabledCallBack !== undefined) {
            args.enabledCallBack();
        } else if (args.disabledCallBack !== undefined) {
            args.disabledCallBack()
        }
    });
    if (setting[id]) {
        setTimeout(function () {
            console.log("Setting initially to true");
            checkBox.children('span.check').click();
            checkBox.children('input').attr('value', true);
        }, 1000);
    }
    return checkBox;
}
function createInputControl(currentValue, id, name, args) {
    args = args || {};
    let div = $(`<div style="display:flex" id="${id}_input"></div>`);
    let label = $(`<span class="has-text-warning" style="width:12rem;">${name}:</span>`);
    if (args.toolTip !== undefined) {
        label.addClass(toolTipClass);
        label.attr('data-label', args.toolTip);
    }
    div.append(label);
    let input = $(`<input type="text" class="input is-small" style="width:10rem;"/>`);
    div.append(input);
    let setting = settings;
    if (args.hasOwnProperty('path')) {
        setting = args.path[0];
        for (let i = 1; i < args.path.length - 1; i++) {
            setting = setting[args.path[i]];
        }
        id = args.path[args.path.length - 1];
    }
    input.val(currentValue);
    let setBtn = $(`<a class="button is-dark is-small" id="${id}_input_set" style="width:2rem;"><span>Set</span></a>`);
    div.append(setBtn);
    setBtn.on('click', function (e) {
        if (e.which != 1) { return; }
        let val = input.val();
        // Converting input
        if (args.convertFunc !== undefined) { val = args.convertFunc(val); }
        if (val === null) { input.val(setting[id]); return; }
        console.log(`Setting input ${name} to ${val}`);
        setting[id] = val;
        input.val(val);
        updateSettings();
        // CallBack function
        if (args.setFunc !== undefined) { args.setFunc(setting.id); }
    });
    return div;
}