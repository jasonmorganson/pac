const rc = require('rc')
const jsonFile = require('jsonfile')
const fetchPackage = require('package-json')
const download = require('github-download')
const normalizePackageData = require('normalize-package-data')
const repository = 'https://github.com/jasonmorganson/hermes'
const directory = process.cwd() + '/tmp'
const defaults = {npm: 'npi'}
const {log} = console
const {exit} = process

const config = rc('pac', defaults)
const {npm, github} = config

const updatePackageJson = (object) => {
    const {name, description, version, main, author, license, ...rest} = object
    const local = jsonFile.readFileSync('package.json')
    const final = normalizePackageData({...local, ...rest})

    jsonFile.writeFileSync('package.json', final)
}

if (npm && github) {
    log('Specify only npm or github in config')
    exit(1)
}

else if (npm) {
    fetchPackageJson(npm).then(updatePackageJson)
}

else if (github) {
    download(github, directory)
    const object = jsonFile.readFileSync(`${directory}/package.json`)
    updatePackageJson(object)
}

else {
    log('Specify either npm or github in config')
    exit(1)
}

