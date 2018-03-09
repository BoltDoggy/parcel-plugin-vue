const fs = require('fs');

const Debug = require('debug');
// const { Packager } = require('parcel-bundler');
const JSPackagerOfficial = require('parcel-bundler/src/packagers/JSPackager.js');

let ownDebugger = Debug('parcel-plugin-vue:JSPackager');

const prelude = fs.readFileSync(__dirname + '/../builtins/prelude.js', 'utf8').trim();
const hmr = fs.readFileSync(__dirname + '/../builtins/hmr-runtime.js', 'utf8').trim();

ownDebugger('JSPackager');
class JSPackager extends JSPackagerOfficial {
    async start() {
        ownDebugger('start');

        this.first = true;
        this.dedupe = new Map();
        this.bundleLoaders = new Set();
        this.externalModules = new Set();

        if (this.options.target === 'electron') {
            prelude =
                `process.env.HMR_PORT=${
                this.options.hmrPort
                };process.env.HMR_HOSTNAME=${JSON.stringify(
                    this.options.hmrHostname
                )};` + prelude;
        }

        await this.dest.write(prelude + '({');
    }

    async end() {
        ownDebugger('end');

        let entry = [];

        // Add the HMR runtime if needed.
        if (this.options.hmr) {
            let asset = await this.bundler.getAsset(
                require.resolve('../builtins/hmr-runtime')
            );
            await this.addAssetToBundle(asset);
            entry.push(asset.id);
        }

        if (await this.writeBundleLoaders()) {
            entry.push(0);
        }

        // Load the entry module
        if (this.bundle.entryAsset) {
            entry.push(this.bundle.entryAsset.id);
        }

        await this.dest.end('},{},' + JSON.stringify(entry) + ')');
    }
}

module.exports = JSPackager;
