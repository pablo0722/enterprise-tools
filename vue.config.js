const { defineConfig } = require("@vue/cli-service");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.plugin("eslint").tap((args) => {
      args[0].fix = true;
      return args;
    });
  },

  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "src/modules/scrum_poker/src/public/js/*.js",
            to: "js/[name][ext]",
          },
        ],
      }),
    ],
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "sass",
      patterns: [],
    },
  },
});
