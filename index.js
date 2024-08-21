#!/usr/bin/env node
const yargs = require('yargs')
const run = require('./cli')

try {
    const cli = yargs()
        .command("$0", "Run semver check", (yargs) => { yargs.demandCommand(0, 0).usage("Arguments:") })
        .group(['major', 'minor', 'patch'], "Check")
        .option("major", { describe: "Detect major change", boolean: true, default: true })
        .option("minor", { describe: "Detect minor change", boolean: true })
        .option("patch", { describe: "Detect patch change", boolean: true })
        .group(['actual', 'next'], "Versions to compare")
        .option("actual", { describe: "Actual version", string: true, demandOption: true })
        .option("next", { describe: "Next version", string: true, demandOption: true })
        .option("h", { alias: "help" })

    const { help, version, ...options } = cli.parse(process.argv.slice(2));

    if (help || version) {
        return 0;
    }

    return run(options)
} catch (e) {
    console.error(e)
    return 1;
}
