# Salesforce Commerce Cloud Playground

## Configuration

The tool uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) so you can use:

- a `sfcc-playground` property in package.json
- a `.sfcc-playgroundrc` file in JSON or YAML format
- a `.sfcc-playgroundrc.json`, `.sfcc-playgroundrc.yaml`, `.sfcc-playgroundrc.yml`, `.sfcc-playgroundrc.js`, or `.sfcc-playgroundrc.cjs` file
- a `sfcc-playground.config.js` or `sfcc-playground.config.cjs` CommonJS module exporting an object

### Configuration options

| Value         | Description                   | Default value               |
|---------------|-------------------------------|-----------------------------|
| rootDir       | Root directory of the project | `process.cwd()`             |
| cartridgesDir | Path to cartridges directory  | `${cwd}/cartridges`         |
| cartridgePath | Cartridge path                | app_storefront_base         |
| modulesPath   | Path to modules directory     | `${cwd}/cartridges/modules` |
| apiPort       | Port to use for API app       | 8080                        |

## Usage

The easies way to use the tool is to install package globally.

```shell
npm install --global sfcc-playground@alpha
```
