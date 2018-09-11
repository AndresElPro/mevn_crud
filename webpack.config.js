// webpack no es una dependencia de producción solo una de desarrollo, por lo tanto solo nos sirve cuando estamos programando

const { VueLoaderPlugin } = require('vue-loader') // Requiero solo una parte de este modulo

module.exports = {
    entry: './src/app/index.js', // Archivo de entrada
    output: {
        path: __dirname + '/src/public/js', // Salida de este archivo procesado
        filename: 'bundle.js' // Nombre que tendra el archivo procesado
    },
    module: {
        rules: [ // Reglas de webpack
            {
                test: /\.js$/, // Testear o leer todos los archivos que terminen con .js
                exclude: /node_modules/, // Ignora la carpeta node_modules
                use: {
                    loader: 'babel-loader'
                } 
            }, // Con esto transforma nuestro codigo a todos los navegadores
            {
                test: /\.vue$/, // Todos los archivos que terminene en vue
                loader: 'vue-loader' // Los revisa o lee a travéz de este modulo
            }

        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}