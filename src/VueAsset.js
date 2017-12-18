const Debug = require('debug');
// const { Asset } = require('parcel-bundler');
const JSAsset = require('parcel-bundler/src/assets/JSAsset');
const { compiler } = require('vueify-bolt');

let ownDebugger = Debug('parcel-plugin-vue:MyAsset');

compiler.loadConfig();

function compilerPromise(fileContent, filePath) {
    return new Promise((resolve, reject) => {
        compiler.compile(fileContent, filePath, function (err, result) {
            // result is a common js module string
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

ownDebugger('MyAsset');
class MyAsset extends JSAsset {
    async parse(code) {
        ownDebugger('parse');

        // parse code to an AST
        this.outputCode = await compilerPromise(this.contents, this.name);
        return await super.parse(this.outputCode);
    }

    collectDependencies() {
        ownDebugger('collectDependencies');

        // analyze dependencies
        this.addDependency('vue');
        this.addDependency('vueify/lib/insert-css');
        this.addDependency('vue-hot-reload-api');
        super.collectDependencies();
    }
}

module.exports = MyAsset;
