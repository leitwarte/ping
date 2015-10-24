Package.describe({
  name: 'leitwarte:ping',
  version: '0.0.3',
  // Brief, one-line summary of the package.
  summary: 'Perform an ICMP ping to a host using jjg-ping',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/leitwarte/ping',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles(['ping.js'], 'server');
  api.export('Ping');
});

Npm.depends({
  'jjg-ping': '1.0.1'
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('leitwarte:ping');
  api.addFiles('ping-tests.js');
});
