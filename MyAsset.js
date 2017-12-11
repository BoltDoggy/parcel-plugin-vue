const Bunyan = require('bunyan');
const { Asset } = require('parcel-bundler');
const { compiler } = require('vueify');

const dev = process.env.NODE_ENV === 'development';

const logger = Bunyan.createLogger({
    name: `MyAsset`,
    streams: dev ? [
        {
            path: `${__dirname}/MyAsset.log`,
        },
        {
            stream: process.stdout
        }
    ] : []
});

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

logger.info('MyAsset');
class MyAsset extends Asset {
    // type = 'vue'; // set the main output type.
    // constructor(...args) {
    //     // ...
    //     logger.info('constructor');
    //     super(...args);
    //     this.type = 'vue';
    // }

    async parse(code) {
        logger.info('parse');
        // parse code to an AST
        return await compilerPromise(code);
    }

    pretransform() {
        logger.info('pretransform');
        // optional. transform prior to collecting dependencies.
    }

    collectDependencies() {
        // analyze dependencies
        logger.info('collectDependencies');
        this.addDependency('vue');
        this.addDependency('vue-hot-reload-api');
    }

    transform() {
        // optional. transform after collecting dependencies.
        logger.info('transform');
    }

    generate() {
        // code generate. you can return multiple renditions if needed.
        // results are passed to the appropriate packagers to generate final bundles.
        logger.info('generate');

        return {
            vue: this.contents, // main output
            js: this.ast // alternative rendition to be placed in JS bundle if needed
        };
    }
}

module.exports = MyAsset;
