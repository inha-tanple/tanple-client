const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')
const { generate } = require('@storybook/react-native/scripts/generate')

generate({
  configPath: path.resolve(__dirname, './.storybook'),
})

module.exports = (() => {
  const config = getDefaultConfig(__dirname)

  const { transformer, resolver } = config

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    unstable_allowRequireContext: true,
  }

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'mjs'],
  }

  return config
})()
