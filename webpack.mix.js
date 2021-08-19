const mix = require('laravel-mix');
mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': __dirname + '/resources/js',
        }
    }
})

module.exports = {
    module: {
      rules: [
        {
          test: /\.s(c|a)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              // Requires sass-loader@^7.0.0
              options: {
                implementation: require('sass'),
                indentedSyntax: true // optional
              },
              // Requires >= sass-loader@^8.0.0
              options: {
                implementation: require('sass'),
                sassOptions: {
                  indentedSyntax: true // optional
                },
              },
            },
          ],
        },
      ],
    }
  }

mix.js('resources/js/app.js', 'public/js').vue()
    .postCss('resources/css/app.css', 'public/css', [
    ]);
mix.browserSync("localhost:8000");
