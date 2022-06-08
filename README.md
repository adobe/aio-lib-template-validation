# aio-lib-template-validation
NPM-based tool to validate App Builder templates during submission process to [App Builder Template Registry](https://github.com/adobe/aio-template-submission).

# Validation checks
## package.json file

| Field         | Description                                       | Required           |
| ------------- | ------------------------------------------------- | ------------------ |
| `description` | Template must have a description                  | :heavy_check_mark: |
| `keywords`    | Must contain a keyword `aio-app-builder-template` | :heavy_check_mark: |

## install.yml file

| Field        | Type | Description                                                                                                                    | Required           |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `categories` | list of strings | Template must have categories defined.                                                                                          | :heavy_check_mark: |
| `extension`  | object | Template might implement an extension point. One of its properties must be `serviceCode`, which will contain the extension metadata. |                    |
| `apis`   | list of objects | List the APIs required to be added to all Workspaces in the App Builder Project, if they don't exist. Each API object must contain `code` as one of its properties, this is the sdk code of the service. |                    |
| `event`   | object | This will list the event configuration for the template. The event template code that contains this specification may read this to configure itself. |                    |
| `runtime`   | boolean | Whether to add Runtime to App Builder application or not. Defaults to `false`. |                    |

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
