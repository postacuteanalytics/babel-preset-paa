'use strict';

module.exports = {
  presets: [
    [
      require('babel-preset-env').default,
      {
        targets: {
          node: 'current',
        },
      },
    ],
    "flow"
  ],

  plugins: [
    require.resolve('babel-plugin-dynamic-import-node'),

    // https://github.com/babel/babel/issues/7215
    require.resolve('babel-plugin-transform-es2015-destructuring'),

    require.resolve('babel-plugin-transform-class-properties'),

    [
      require.resolve('babel-plugin-transform-object-rest-spread'),
      {
        useBuiltIns: true,
      },
    ],

    [
      require.resolve('babel-plugin-transform-runtime'),
      {
        helpers: false,
        polyfill: false,
        regenerator: true,
      },
    ],
  ],
};
