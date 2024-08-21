const assert = require('assert')
const run = require('./cli')

describe("Test suite", () => {
    console.info = (message) => {
        return message
    }

    const input = [
        { major: true, actual: "1.0.0", next: "2.0.0", check: "major", expected: true },
        { major: true, actual: "1.0.0", next: "1.1.1", check: "major", expected: false },
        { major: true, actual: "1.0.0", next: "1.1.0", check: "major", expected: false },
        { major: true, actual: "1.0.0", next: "1.0.1", check: "major", expected: false },
        { major: true, actual: "1.0.0", next: "1.0.0", check: "major", expected: false },

        { minor: true, actual: "1.0.0", next: "2.0.0", check: "minor", expected: true },
        { minor: true, actual: "1.0.0", next: "1.1.1", check: "minor", expected: true },
        { minor: true, actual: "1.0.0", next: "1.1.0", check: "minor", expected: true },
        { minor: true, actual: "1.0.0", next: "1.0.1", check: "minor", expected: false },
        { minor: true, actual: "1.0.0", next: "1.0.0", check: "minor", expected: false },

        { patch: true, actual: "1.0.0", next: "2.0.0", check: "patch", expected: true },
        { patch: true, actual: "1.0.0", next: "1.1.1", check: "patch", expected: true },
        { patch: true, actual: "1.0.0", next: "1.1.0", check: "patch", expected: true },
        { patch: true, actual: "1.0.0", next: "1.0.1", check: "patch", expected: true },
        { patch: true, actual: "1.0.0", next: "1.0.0", check: "patch", expected: false },
    ]

    test.each(input)("Checking $check for $actual actual and $next next", (options) => {
        assert.equal(run(options), options.expected)
    })
})