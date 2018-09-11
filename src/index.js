const express = require('express')
const morgan = require('morgan') // Paquete para ver por consola las peticiones al servidor
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/mevn-database')
    .then(db => console.log('DB is connected')) // Mensaje
    .catch(err => console.error(err))

// Settings
app.set('port', process.env.PORT || 3000) // Si hay un puerto configurado configurado en el sv que lo utilize, sino el puerto 3000

// Middlewares
// Nos ayudan a realizar funciones, procesar antes de que lleguen las rutas o URL
app.use(morgan('dev')) // dev es una opción de visualización
app.use(express.json()) // El servidor puede entender JSON, para manipularlo

// Routes
app.use('/api/tasks', require('./routes/tasks')) // Todas las rutas van a comenzar con /tasks, comunicación con el objeto que devuelve esta ruta

// Static files
app.use(express.static(__dirname + '/public')) // Definiendo donde estarán los archivos estaticos, con un método de express y __dirname es la ruta donde se encuentra este index.js

// Server is listining
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})