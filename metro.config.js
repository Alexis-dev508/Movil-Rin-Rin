// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);
module.exports ={
    transformer:{
        getTransformOptions: async()=>({
            transform:{
                experimentalImportSupport: false,
                inlineRequires: true,

            },
        }),
    },

    resolver:{
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
    },
};


// const { getDefaultConfig } = require("metro-config");
// const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
// exports.resolver = {
//   ...defaultResolver,
//   sourceExts: [
//     ...defaultResolver.sourceExts,
//     "cjs",
//   ],
// };
