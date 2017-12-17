module.exports = function (bundler) {
    bundler.addAssetType('vue', require.resolve('./src/VueAsset.js'));
    bundler.addPackager('js', require.resolve('./src/packagers/JSPackager.js'));
};