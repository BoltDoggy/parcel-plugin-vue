const Bunyan = require('bunyan');
const { Packager } = require('parcel-bundler');

const logger = Bunyan.createLogger({
    name: `MyPackager`,
    streams: [
        {
            path: `${__dirname}/MyPackager.log`,
        },
        {
            stream: process.stdout
        }
    ]
});

logger.info('MyPackager');
class MyPackager extends Packager {
    async start() {
        // optional. write file header if needed.
        logger.info('start');
        await this.dest.write(header);
    }

    async addAsset(asset) {
        // required. write the asset to the output file.
        logger.info('addAsset');
        await this.dest.write(asset.generated.foo);
    }

    async end() {
        // optional. write file trailer if needed.
        logger.info('end');
        await this.dest.end(trailer);
    }
}

module.exports = MyPackager;
