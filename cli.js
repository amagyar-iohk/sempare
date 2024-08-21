#!/usr/bin/env node
function detectVersionChanges(oldVersion, newVersion) {
    // Split versions into components
    const oldVersionComponents = oldVersion.split('.')
    const newVersionComponents = newVersion.split('.')

    // Determine the longest component length
    const maxComponentLength = Math.max(oldVersionComponents.length, newVersionComponents.length)

    // Pad components with 0s to ensure equal length
    for (let i = 0; i < maxComponentLength; i++) {
        if (!oldVersionComponents[i]) {
            oldVersionComponents.push('0')
        }
        if (!newVersionComponents[i]) {
            newVersionComponents.push('0')
        }
    }

    // Iterate through components and detect changes
    for (let i = 0; i < maxComponentLength; i++) {
        const oldComponent = parseInt(oldVersionComponents[i])
        const newComponent = parseInt(newVersionComponents[i])

        if (newComponent > oldComponent) {
            if (i === 0) {
                return 'major'; // Major change if first component increases
            } else if (i === 1) {
                return 'minor'; // Minor change if second component increases
            } else {
                return 'patch'; // Patch change if third or subsequent component increases
            }
        } else if (newComponent < oldComponent) {
            return 'unknown';
        }
    }

    // If no changes were detected, it's likely a patch update
    return 'equal';
}

function run(options) {
    const { minor, patch, actual, next } = options

    const result = detectVersionChanges(actual, next)

    if (result == 'major') {
        return console.info(true)
    }

    if (result == 'minor' && (minor || patch)) {
        return console.info(true)
    }

    if (result == 'patch' && patch) {
        return console.info(true)
    }

    return console.info(false)
}

module.exports = run