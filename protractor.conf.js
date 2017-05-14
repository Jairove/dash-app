exports.config = {
  allScriptsTimeout: 180000,
  specs:['./e2e/**/*.feature'],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {}
  },
  plugins: [],
  baseUrl: 'http://localhost:4200/',
  directConnect: true,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    format: "pretty",
    require:[
      './e2e/**/*.steps.ts'
    ]
  },
  useAllAngular2AppRoots: true,
  onPrepare: function() {
    const globals = require('protractor');
    const browser = globals.browser;
    browser.ignoreSynchronization = true;
  }
};
