const Debug = require('debug');
const { Asset } = require('parcel-bundler');
const { compiler } = require('vueify');

let ownDebugger = Debug('parcel-plugin-vue:MyAsset');

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

class MyAsset extends Asset {
    // type = 'vue'; // set the main output type.
    constructor(...args) {
        ownDebugger('constructor');

        // ...
        super(...args);
        this.type = 'js';
    }

    parse(code) {
        ownDebugger('parse');

        // parse code to an AST
        return {};
    }

    pretransform() {
        ownDebugger('pretransform');

        // optional. transform prior to collecting dependencies.
    }

    collectDependencies() {
        ownDebugger('collectDependencies');

        // analyze dependencies
        this.addDependency('vue');
        this.addDependency('vueify/lib/insert-css');

        if (process.env.NODE_ENV !== 'production') {
            this.addDependency('vue-hot-reload-api');
        }
    }

    async transform() {
        ownDebugger('transform');

        // optional. transform after collecting dependencies.
        this.ast.cjs = await compilerPromise(this.contents, this.name);
    }

    generate() {
        ownDebugger('generate');

        // code generate. you can return multiple renditions if needed.
        // results are passed to the appropriate packagers to generate final bundles.
        return {
            // vue: this.contents, // main output
            js: this.ast.cjs // alternative rendition to be placed in JS bundle if needed
        };
    }
}

module.exports = MyAsset;
