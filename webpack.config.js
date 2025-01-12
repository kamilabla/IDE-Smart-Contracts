module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: /node_modules\/monaco-editor/, // Ignoruj mapy źródłowe dla monaco-editor
        },
      ],
    },
    devtool: 'source-map',
  };
  