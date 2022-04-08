# aio-lib-template-validation
NPM-based tool to validate App Builder templates during submission process to [App Builder Template Registry](https://github.com/adobe/aio-template-submission).

# Validation checks
## package.json file

| Check        | Description                      | Condition                           |
|--------------|----------------------------------|-------------------------------------|
| Description  | Template must have a description | Not empty                           |
| Keywords     | Must contain a keyword           | `aio-app-builder-template`          |

## install.yml file

| Check           | Description                   | Condition |
|-----------------|-------------------------------|-----------|
| Categories      | Must declare categories       | Not empty |
| Extension point | Must declare extension points | Not empty |

# Getting started
## Installation
```bash
$ npm i -g @adobe/aio-lib-template-validation
$ tv
```

## Usage
To check a specific template run:
```bash
$ tv run-checks <path>
```
This will execute all checks on App Builder template given path to the template code and output the results.
You can add `--json` or `-j` option to output results in JSON format.

## Installation as a library
If you want to use this package as a library within your project, run:
```bash
$ npm i @adobe/aio-lib-template-validation
```

## Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

To get started:

1. Install [node.js](https://nodejs.org/).
3. Clone the repository.
4. After navigating into the project directory, install project dependencies by running `npm install`.

### Scripts

To run tests a single time, run the following command:

`npm run test`

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
