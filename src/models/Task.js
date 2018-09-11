// Aquí creo la estructura o esquema
const mongoose = require('mongoose') // No la requiero para conectarme a la bd, sino para modelar los datos
const { Schema } = mongoose // Solo una parte de la biblioteta, sera solo Schema

const Task = new Schema({
    title : String, // Titulo tipo String
    description : String
})

// Para interactuar con la aplicación no necesito un esquema, sino un modelo

module.exports = mongoose.model('Task', Task) // Nombre del modelo y el esquema o la estructura