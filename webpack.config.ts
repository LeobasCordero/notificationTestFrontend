const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Asegúrate de tener el punto de entrada correcto
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Inyecta los estilos en el DOM
          'css-loader', // Convierte CSS a módulos comunes de JS
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                ],
              },
            },
          },
          {
            loader: 'resolve-url-loader', // Resuelve las URL relativas en SCSS
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader', // Compila Sass a CSS
            options: {
              sourceMap: true, // Necesario para resolve-url-loader
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    port: 3000,
  },
};
