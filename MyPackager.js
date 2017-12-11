const { Packager } = require('parcel-bundler');

console.log('MyPackager');
class MyPackager extends Packager {
    async start() {
        // optional. write file header if needed.
        console.log('start');
        await this.dest.write(header);
    }

    async addAsset(asset) {
        // required. write the asset to the output file.
        console.log('addAsset');
        await this.dest.write(asset.generated.foo);
    }

    async end() {
        // optional. write file trailer if needed.
        console.log('end');
        await this.dest.end(trailer);
    }
}

module.exports = MyPackager;
