
/**
 * Sleeps for the specified number of milliseconds
 * @param {number} ms - Number of milliseconds to sleep 
 * @returns Promise to be awaited
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}