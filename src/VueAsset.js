const { EventEmitter } = require('events');

const Debug = require('debug');
// const { Asset } = require('parcel-bundler');
const JSAsset = require('parcel-bundler/src/assets/JSAsset');
const { compiler } = require('vueify-bolt');

let ownDebugger = Debug('parcel-plugin-vue:MyAsset');

let event = new EventEmitter();

compiler.loadConfig();

function compilerPromise(fileContent, filePath) {
    return new Promise((resolve, reject) => {
        let style = '';
        function compilerStyle(e) {
            style = e.style;
        }
        compiler.on('style', compilerStyle);
        compiler.compile(fileContent, filePath, function (err, result) {
            compiler.removeListener('style', compilerStyle);
            // result is a common js module string
            if (err) {
                reject(err);
            } else {
                resolve({
                    js: result,
                    css: style
                });
            }
        });
    });
}

ownDebugger('MyAsset');
class MyAsset extends JSAsset {
    constructor(...args) {
        super(...args);
        if (compiler.options.extractCSS) {
            this.type = 'css';
        }
    }

    async parse(code) {
        ownDebugger('parse');

        // parse code to an AST
        this.outputAll = await compilerPromise(this.contents, this.name);
        this.outputCode = this.outputAll.js;
        return await super.parse(this.outputCode);
    }

    collectDependencies() {
        ownDebugger('collectDependencies');

        // analyze dependencies
        super.collectDependencies();
    }

    async generate() {
        ownDebugger('generate');

        let ret = await super.generate() || {};
        ret.css = this.outputAll.css;
        return ret;
    }
}

module.exports = MyAsset;
