module.exports = function (bundler) {
    bundler.addAssetType('vue', require.resolve('./MyAsset'));
    // bundler.addPackager('vue', require.resolve('./MyPackager'));
};