PAC
===

# package.json automatic configurator

Automatically configures a package.json file from another. This is allows you to
keep a master copy of a package.json file and keep other package.json files in
sync with it. This helps with keeping package.json files consistent accross
multiple projects.

## Setup

Include a `.pacrc` file in the same directory as the `package.json` you want to
sync. The file can be in JSON or INI format. See
[node-config](https://github.com/lorenwest/node-config) for other ways to
specify the config file.

### `.pacrc`

The `.pacrc` file tells PAC where to pull the master `package.json` file from.
It can come from either a published npm module or a Github repository.

#### npm

Specify any npm modules in the npm registry:
```json
{
    "npm": "npi"
}
```

Scoped modules also work:
```jsaon
{
    "npm": "@jasonmorganson/wp"
}
```

#### Github

Specify a Github repository:
```json
{
    "github": "jasonmorganson/npi"
}
```

Github urls also work:
```jsaon
{
    "github": "https://github.com/jasonmorganson/npi"
}
```

#### Whitelist

You can also set a whitelist in the config file. An keys in the whitelist array
will be merged from the master file. If a key is not in the whitelist it will
not be included.

```json
{
    "npm": "npi",
    "whitelist": [
        "ava",
        "babel"
    ]
}
```

| Default: `["scripts"]`

#### Blacklist

You can also set a blacklist in the config file. An keys in the blacklist array
will NOT be merged from the master file. This is applied only to the whitelisted
keys, if a key is not in the whitelist then it will not be included at all.

```json
{
    "npm": "npi",
    "blacklist": [
        "scripts"
    ]
}
```

| Default:
|`[
|   "name",
|   "description",
|   "keywords",
|   "version",
|   "homepage",
|   "repository",
|   "bugs",
|   "bin",
|   "main",
|   "dist",
|   "directories",
|   "dependencies",
|   "devDependencies",
|   "peerDependencies"
|]`

## Usage

> npx @jasonmorganson/pac

This will update the package.json in the directory its run in with the
properties from the master package.json file.
