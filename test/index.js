const Bundler = require('parcel-bundler');

let bundler = new Bundler('./examples/index.js');
bundler.addAssetType('.vue', require.resolve('../MyAsset'));

console.log(bundler.bundle());