const Bundler = require('parcel-bundler');

let bundler = new Bundler('./examples/index.html');
bundler.addAssetType('.vue', require.resolve('../MyAsset'));

bundler.bundle();