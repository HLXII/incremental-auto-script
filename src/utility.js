import { settings } from './settings.js';
import { resources } from './resources.js';

// async function for sleeping
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Gets the multiplier on the resource
// 'Global' returns the global multiplier
export function getMultiplier(res) {
    let multiplier = 1;
    for (let val in window.evolve.breakdown.p[res]) {
        let data = window.evolve.breakdown.p[res][val];
        if (data[data.length-1] == '%') {
            multiplier *= 1 + (+data.substring(0, data.length - 1)/100)
        }
    }
    return multiplier;
}

export function prioCompare(a, b) {
    return b.priority - a.priority;
}

export function oldAllocate(totalNum,priorities,ratios,args) {
    args = args || {};
    let allocationList = [];
    let curNum = [];
    let totalAllocated = 0;
    for (let i = 0;i < priorities.length;i++) {curNum.push(0);}
    for (let i = 0;i < totalNum;i++) {
        let total = i+1;
        let error = null;
        let choice = null;
        for (let j = 0;j < priorities.length;j++) {
            // Ignoring zero priority zero ratio choices
            if (priorities[j] == 0 || ratios[j] == 0) {continue;}

            // Checking maxes
            if (args.hasOwnProperty('max') && args.max[j] != -1 && curNum[j] >= args.max[j]) {continue;}

            // Checking requirement function
            if (args.hasOwnProperty('requireFunc') && !args.requireFunc(j, curNum[j])) {continue;}

            // Checking mins
            if (args.hasOwnProperty('min') && curNum[j] < args.min[j]) {
                choice = j;
                break;
            }

            // Finding error differential
            let tempError = (((curNum[j]+1) / total) - ratios[j]) ** 2;
            if (total != 1) {tempError -= ((curNum[j] / (total-1)) - ratios[j]) ** 2;}

            if (error === null || tempError < error) {
                error = tempError;
                choice = j;
            }
        }
        if (choice === null) {
            break;
        }
        allocationList[i] = choice;
        curNum[choice] += 1;
        totalAllocated += 1;
        if (args.hasOwnProperty('allocFunc')) {
            args.allocFunc(choice, curNum[choice]);
        }
    }
    return {seq:allocationList,alloc:curNum,total:totalAllocated};
}

export function allocate(totalNum,priorities,args) {
    args = args || {};
    let allocSeq = [];
    let allocNum = [];
    let totalAllocated = 0;
    // Setting up curNum array
    for (let i = 0;i < priorities.length;i++) {allocNum.push(0);}
    for (let i = 0;i < totalNum;i++) {
        let candidates = [];
        let totalPriority = 0;
        let total = totalAllocated;
        for (let j = 0;j < priorities.length;j++) {
            // Assuming will ignore, remove allocated from total pool
            total -= allocNum[j];

            // Ignoring zero priority zero ratio choices
            if (priorities[j] == 0) {continue;}

            // Checking maxes
            if (args.hasOwnProperty('max') && args.max[j] != -1 && allocNum[j] >= args.max[j]) {continue;}

            // Checking requirement function
            if (args.hasOwnProperty('requireFunc') && !args.requireFunc(j, allocNum[j])) {continue;}

            // Checking mins
            if (args.hasOwnProperty('min') && allocNum[j] < args.min[j]) {
                candidates = [j];
                break;
            }

            candidates.push(j);
            totalPriority += priorities[j];

            // Did not ignore, re-add allocated to pool
            total += allocNum[j];
        }

        // Calculating new ratios
        total += 1;
        let error = null;
        let choice = null;
        let ratios = [];
        for (let k = 0;k < candidates.length;k++) {
            let candidate = candidates[k];
            let ratio = priorities[candidate] / totalPriority;
            // Finding error differential
            let tempError = (((allocNum[candidate]+1) / total) - ratio) ** 2;
            if (total != 1) {tempError -= ((allocNum[candidate] / (total-1)) - ratio) ** 2;}

            if (error === null || tempError < error) {
                error = tempError;
                choice = candidate;
            }
        }

        if (choice === null) {
            break;
        }
        allocSeq[i] = choice;
        allocNum[choice] += 1;
        totalAllocated += 1;
        if (args.hasOwnProperty('allocFunc')) {
            args.allocFunc(choice, allocNum[choice]);
        }
    }
    return {seq:allocSeq,alloc:allocNum,total:totalAllocated};
}

export function messageQueue(msg,color){
    color = color || 'warning';
    var new_message = $('<p class="has-text-'+color+'">'+msg+'</p>');
    $('#autolog').prepend(new_message);
    if ($('#autolog').children().length > 30){
        $('#autolog').children().last().remove();
    }
}

export function getTotalGameDays() {
    try {
    let str = $('#statsPanel')[0].children[$('#statsPanel')[0].children.length-1].innerText;
    let reg = /Game Days Played: ([\d]+)/.exec(str);
    return parseInt(reg[1]);
    } catch(e) {
        console.log('Error in getting total game days');
        return null;
    }
}
export function getYear() {
    try {
        return parseInt($('.year > .has-text-warning')[0].innerText);
    } catch(e) {
        console.log('Error in getting current year');
        return null;
    }
}
export function getDay() {
    try {
        return parseInt($('.day > .has-text-warning')[0].innerText);
    } catch(e) {
        console.log('Error: Day');
        return null;
    }
}
export function getLunarPhase() {
    let moon = document.querySelector('.calendar > .is-primary');
    if (moon !== null) {
        return moon.attributes['data-label'].value;
    } else {
        console.log("Error: Lunar Phase");
        return "";
    }
}
export function getRace() {
    try {
        return $('#race > .column > span')[0].innerText;
    } catch(e) {
        console.log('Error in getting current race');
        return null;
    }
}

// Forces keyup event for all the multiplier keys
export function disableMult() {
    var evt = new KeyboardEvent('keyup', {'ctrlKey':false, 'shiftKey':false, 'altKey':false});
    document.dispatchEvent (evt);
}
// Finds total key multiplier from keyEvent
export function keyMult(e) {
    let mult = 1;
    mult *= (e.ctrlKey) ? 10 : 1;
    mult *= (e.shiftKey) ? 25 : 1;
    mult *= (e.altKey) ? 100 : 1;
    return mult;
}

// Convert from abbreviated value to actual number
export function getRealValue(num){
    var suffix = {
        K:1000,
        M:1000000
    }
    var currSuff = /([-]?)([\.0-9]+)([^\d\.])/.exec(num);
    if(currSuff !== null && currSuff.length == 4){
        var sign = (currSuff[1] == "-") ? -1 : 1;
        var n = parseFloat(currSuff[2]);
        var suff = currSuff[3];
        if (suffix[suff] !== null) {n *= suffix[suff];}
        n *= sign;
        return n;
    }
    return parseFloat(num);
}

// Determines if stage is currently in evolution
export function inEvolution() {
    return window.evolve.global.race.species == 'protoplasm';
}
// Determines if the civics tab has been unlocked
export function civicsOn() {
    let civicsTabLabel = getTabLabel("Civics");
    if (civicsTabLabel === null) {return false;}
    return civicsTabLabel.style.display != 'none';
}
// Finding tab-items
export function getTab(name) {
    let nav = $('#mainColumn > .content > .b-tabs > .tabs > ul > li > a > span');
    for (let i = 0;i < nav.length;i++) {
        if (nav[i].innerText.trim() == name) {
            let nth=i+1
            nav = null;
            return document.querySelector('#mainColumn > .content > .b-tabs > .tab-content > div:nth-child('+nth+')')
        }
    }
    nav = null;
    return null;
}
function getTabLabel(name) {
    let nav = $('#mainColumn > .content > .b-tabs > .tabs > ul > li > a > span');
    for (let i = 0;i < nav.length;i++) {
        if (nav[i].innerText.trim() == name) {
            let nth=i+1
            return document.querySelector('#mainColumn > .content > .b-tabs > .tabs > ul > li:nth-child('+nth+')')
        }
    }
    return null;
}

// Determines if a perk has been unlocked
export function perkUnlocked(perk) {
    let pat = "";
    switch(perk) {
        case 'Morphogenesis':
            pat = /Evolution costs decreased/;
            break;
        default:
            return false;
    }
    let divList = $('#perksPanel > div');
    for (let i = 0;i < divList.length;i++) {
        if (pat.exec(divList[i].innerText) !== null) {
            return true;
        }
    }
    return false;
}
// Determines if an achievement has been unlocked
// Returns the achievement level (1-5) if unlocked
// Returns -1 if not unlocked
export function achievementUnlocked(achievement) {
    let divList = $('.achievement');
    for (let i = 0;i < divList.length;i++) {
        if (divList[i].children[0].innerText == achievement) {
            if (divList[i].children.length < 3) { return 1; }
            return divList[i].children[2].children[0].attributes.class.value[4];
        }
    }
    return -1;
}

export function getMinMoney() {
    if (settings.minimumMoney < 1) {
        return settings.minimumMoney * resources.Money.storage;
    } else {
        return settings.minimumMoney;
    }
}