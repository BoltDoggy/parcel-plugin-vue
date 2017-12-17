const Bundler = require('parcel-bundler');
const PluginVue = require('../index');

let bundler = new Bundler('./examples/index.html', {
    watch: true
});

PluginVue(bundler);

bundler.serve();