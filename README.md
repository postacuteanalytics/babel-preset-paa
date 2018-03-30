Post Acute Analytics Babel Presets
==================================

This project establishes a baseline [Babel](https://babeljs.io) configuration for use across all PAA [NodeJS](https://nodejs.org) projects. This repository builds an NPM package that can be hosted on private PAA repositories. The package extends a [Babel preset plugin](https://babeljs.io/docs/plugins) to be consumed by the Babel CLI or .babelrc files.

It is based on a slimmed down selection of the plugins and presets used by ReactJS, only tailored specifically to NodeJS applications instead of web browsers. It also lacks JSX support by default.

## Installation

Simply run the following in your project directory:
```
npm install -D babel-preset-paa
```

This will install the relevant plugins needed for compilation. In order to enable the PAA preset by default, edit or create the `.babelrc` file in your project's root directory. It's contents should include the following at a bare minimum:
```
{
	presets: ["paa"]
}
```

If you're currently using the `flow` or `env` presets, you should remove those from your defaults; the `paa` preset will pull them in with a specific configuration.

Next, modify your project's `package.json` file. You'll need to add a babel compilation step for the start script, in addition to a build script. For the purposes of this documentation, I'll only cover nodemon usage, but you should totally check out [Babel's extensive setup guide](https://babeljs.io/docs/setup) if you need help configuring this preset for another purpose.

These steps assume your ES6-based code is stored in the `src/` directory in your project's root directory. Edit the `start` and `build` scripts in your package.json to resemble the following:
```
{
	...
	"scripts": {
		"build": "babel src/ -d lib/" 
		"start": "NODE_PATH=src/ nodemon --exec babel-node src/"
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

