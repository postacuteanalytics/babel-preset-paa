Post Acute Analytics Babel Presets
==================================

This project establishes a baseline [Babel](https://babeljs.io) configuration for use across all PAA [NodeJS](https://nodejs.org) projects. This repository builds an NPM package that can be hosted on private PAA repositories. The package extends a [Babel preset plugin](https://babeljs.io/docs/plugins) to be consumed by the Babel CLI or .babelrc files.

It is based on a slimmed down selection of the plugins and presets used by ReactJS, only tailored specifically to NodeJS applications instead of web browsers. It also lacks JSX support by default.

## Configuration

This project can be installed in one of two ways, either is acceptable.

The simplest method for installation is using the following command, which does not require configuration:
```
npm install -D https://github.com/postacuteanalytics/babel-preset-paa.git
```

This preset can also be found as an NPM package available from PAA's own [internal registry](https://verdaccio.postacute.io) (https://verdaccio.postacute.io). Before you can download and install it into a new NodeJS project, you'll need to configure NPM to pull the package from the internal registry instead of the public NPM registry. This method is less useful than installing straight from github due to the fact that it increases complexity of automated build environments.

To do this, ask someone for credentials to Verdaccio. Once you receive them, type the following command:
```
npm adduser --registry "https://verdaccio.postacute.io" --scope "@paa"
```

The command will ask you to associate a username, password, and email to the registry. Any package prefixed with the "@paa" scope will be pushed to/pulled from Verdaccio automatically.

## Installation

If you did not opt to install this package directly from github and instead configured your local environment to use Verdaccio, simply run the following in your project directory:
```
npm install -D @paa/babel-preset-paa
```

In order to enable the PAA preset by default, edit or create the `.babelrc` file in your project's root directory. It's contents should include the following at a bare minimum:
```
{
	presets: ["@paa/babel-preset-paa"]
}
```

If you're currently using the `flow` or `env` presets, you should remove those from your defaults; the `paa` preset will pull them in with a specific configuration.

Next, modify your project's `package.json` file. You'll need to add a babel compilation step for the start script, in addition to a build script. For the purposes of this documentation, I'll only cover nodemon and node usage, but you should totally check out [Babel's extensive setup guide](https://babeljs.io/docs/setup) if you need help configuring this preset for another purpose.

These steps assume your ES6-based code is stored in the `src/` directory in your project's root directory.

For *nodemon*-based projects, edit the `start` and `build` scripts in your package.json to resemble the following:
```
{
	...
	"scripts": {
		"build": "babel src/ -d lib/"
		"start": "NODE_PATH=src/ nodemon --exec babel-node src/"
	}
}
```

For *node*-based projects, edit the `start` and `build` scripts in your package.json to resemble the following:
```
{
	...
	"scripts": {
		"build": "babel src/ -d lib/"
		"start": "babel-node src/app.js"
	}
}
```

And you're done! Running the command `npm start` will now use Babel to compile your code to Node-compliant Javascript!

## Dependencies

This preset will pull in the following other presets:
- env - The defacto Babel preset for major ES2015+ transformations.
- flow - For type-safety in large projects.

It also pulls in the following Babel plugins to complement them:
- babel-plugin-dynamic-import-node - For converting import() calls to a deferred require.
- babel-plugin-transform-es2015-destructuring - For entirely contrived destructuring usage not supported properly in env.
- babel-plugin-transform-object-rest-spread - Uses Object.assign({}) syntax for spreading into objects. This plugin is encouraged to use built-ins.
- babel-plugin-transform-runtime - Because ReactJS does and I don't know why.

## Changelog

__1.0.0__

- Initial release

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
