const rc = require('rc')
const json = require('jsonfile')
const pick = require('lodash/fp/pick')
const omit = require('lodash/fp/omit')
const merge = require('lodash/fp/merge')
const fetchPackageJsonFromNpm = require('package-json')
const fetchPackageJsonFromGithub = require('get-package-json-from-github')
const defaults = {
    whitelist: require('./whitelist.json'),
    blacklist: require('./blacklist.json')
}
const config = rc('pac', defaults)
const {log} = console
const {exit} = process
const {npm, github, whitelist, blacklist} = config

const updateLocalPackageJson = (object) => {
    const whitelister = pick(whitelist)
    const blacklister = omit(blacklist)
    const localPackageJson = json.readFileSync('package.json')
    const updatedJson = merge(localPackageJson, blacklister(whitelister(object)))

    json.writeFileSync('package.json', updatedJson, {spaces: 2})
}

function pac () {

    if (npm && github) {
        log('Specify only npm or github in config')
        exit(1)
    }

    else if (npm) {
        fetchPackageJsonFromNpm(npm, {fullMetadata: true}).then(updateLocalPackageJson)
    }

    else if (github) {
        fetchPackageJsonFromGithub(github).then(updateLocalPackageJson)
    }

    else {
        log('Specify either npm or github in config')
        exit(1)
    }
}

module.exports = pac

