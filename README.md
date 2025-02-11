# Experience Platform Tags Extension Sandbox

[![npm (scoped)](https://img.shields.io/npm/v/@adobe/reactor-sandbox.svg?style=flat)](https://www.npmjs.com/package/@adobe/reactor-sandbox)

Experience Platform Tags, by Adobe, is a next-generation tag management solution enabling simplified deployment of marketing technologies. For more information regarding Experience Platform Tags, please visit our [product website](http://www.adobe.com/enterprise/cloud-platform/launch.html).

This project provides a sandbox in which you can manually test your Experience Platform Tags extension. You can test both (1) your views that will eventually appear in the Experience Platform Tags UI and (2) your library logic that will eventually run on the user's website.

For more information about developing an extension for Experience Platform Tags, please visit our [extension development guide](https://experienceleague.adobe.com/docs/experience-platform/tags/extension-dev/overview.html?lang=en).

## Usage

### Running the Sandbox

Before running the sandbox, you must first have [Node.js](https://nodejs.org/en/) installed on your computer.

Once Node.js is installed, run the sandbox by executing the following command from the command line within your project's directory:

```
npx @adobe/reactor-sandbox
```

A server will be started at [http://localhost:3000](http://localhost:3000) (HTTP) and [https://localhost:4000](https://localhost:4000) (HTTPS). If you navigate to one of addresses in your browser (you may have to accept a security certificate if you use the HTTPS server), you will see the View Sandbox which allows you to test your views. You'll need to have previously created a view in your extension for it to show up in the sandbox. You can switch between views you would like to test using the controls toward the top of the page.

You may also click on the "Go to library sandbox" button at the top-right of the page to navigate to the library sandbox where you can test your library logic. See [Configuring the Sandbox](#configuring-the-sandbox) for how to configure the library sandbox for proper testing.

Once this is in place, you may then run the sandbox by executing the command `npm run sandbox` from the command line.

### Configuring the Sandbox

Web Extensions can also test the library logic inside the sandbox. To configure the Library Sandbox portion, execute the following command from the command line within your project's directory:

```
npx @adobe/reactor-sandbox init
```

This will generate a directory within your project named `.sandbox` that contains two files you may edit to configure the sandbox:

- `container.js` When Experience Platform Tags publishes a library, it consists of two parts: (1) a data structure that stores information about saved rules, data elements, and extension configuration and (2) an engine to operate on such a data structure. `container.js` is the data structure (not the engine) that you may modify to simulate saved rules, data elements, and extension configuration. This template will be used to produce a complete `container.js` (JavaScript from your extension will be added) which will be used in tandem with the `Turbine` engine inside the sandbox. We have tried to provide inline comments on how to modify `container.js`, but if you need further help, please [let the Experience Platform Tags team know](https://launch-developers.slack.com/) and we can help you out.
- `libSandbox.html` includes some simple HTML along with a single script tag called `launch-EN00000000000000000000000000000000.js`, which simulates a production Experience Platform Tags library. The simulated library contains the combined contents of your `container.js` file and the `Turbine` engine.

  `libSandbox.html` can be modified to manually test whatever you would like. For example, if you'd like to test that your brand new "focus" event type is working as desired, you can add a text input to the `libSandbox.html` to ensure your dummy rule fires when a form element receives focus.

Mobile extensions don't have a Library Sandbox portion. Running `npx @adobe/reactor-sandbox init` from inside a mobile extension, will show an error.

You are welcome to commit `.sandbox` to your version control repository.

### Installing as a Dependency

If you find yourself using the the sandbox tool frequently, you may wish to install it as a dependency in your project. This will allow the sandbox tool to run more quickly and provide more control over when you upgrade to newer versions of the sandbox.

If you do not yet have a `package.json` in your project's directory, you will need to generate one by running the following command from the command line within your project's directory:

```
npm init
```

You will need to provide the information requested on the screen. The values you provide are not particularly important and will not affect how your extension operates. After this process is complete, you should have a file called `package.json` inside your directory.

Once you have a `package.json`, you can install the sandbox as a dependency by running the following command from the command line within your project's directory:

```
npm i -D @adobe/reactor-sandbox
```

At this point, you can continue running the sandbox as outlined above.

## Advanced Integration with Node Scripts

For advanced users who need greater control of the sandbox from node-based build tools, you also have the option of importing the sandbox tool into your scripts and controlling it programmatically.

After [installing the sandbox as a dependency](#installing-as-a-dependency), you may use it from your node scripts as follows:

```js
const sandbox = require('@adobe/reactor-sandbox');
sandbox.run();
```

The sandbox module provides the following methods:

`run` - Runs the sandbox. A promise will be returned that will be resolved once the server is ready.

`init` - Initializes sandbox configuration files. A promise will be returned that will be resolved once the files have been generated.

## Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

To get started:

1. Install [node.js](https://nodejs.org/).
2. Clone the repository.
3. After navigating into the project directory, install project dependencies by running `npm install`.

To manually test your changes, first run the following command from the sandbox tool directory:

```
npm link
```

Then, in a directory containing an extension (any extension you would like to use for testing), run the following command:

```
npx @adobe/reactor-sandbox
```

Npx will execute the sandbox tool using your locally linked code rather than the code published on the public npm repository.

### Scripts

To ensure your code meets our linting standards, run the following command:

`npm run lint`

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
