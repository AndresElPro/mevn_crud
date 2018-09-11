const express = require('express')
const router = express.Router() // Crea objeto para definir rutas

const Task = require('../models/Task') // Requerimos Task con .. salimos o subimos un nivel de donde nos encontramos

router.get('/', async (req, res) => {
    const tasks = await Task.find() // Esto es como hacer un select * from a la bd, y cuando los encuentre todos se asignaran a una constante
    res.json(tasks) // Enviando o respondiendo las tareas
}) // Cuando pidan la ruta inicial a /task, respondere con un mensaje
// Estás peticiones toman tiempo por eso las hacemos asíncronas, hacer la función asíncrona y utilizar el await nos evita estar utilizando callbacks y promises

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)
    res.json(task) // Y este objeto por el id que encontramos se lo retornamos al cliente
})

router.post('/', async (req, res) => { // req todo lo que envia el navegador al servidor
    const task = new Task(req.body) // Crea nueva tarea segun los datos que manda el usuario
    await task.save() // Espera a que termine la tarea con await y la guarda en la BD
    res.json({
        status : "Task Saved" // Mensaje del estado de la app
    })
}) // Para que el navegador pueda enviar peticiones y guardar

router.put('/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body)
    // Lo que hace este método es buscar por id y luego actualizarlo
    // req.params los parametros que mandamos osea el id en este caso y req.body los datos que vamos a actualizar
    res.json({
        status: 'Task Updated'
    })
}) // Actualizar recibe id del objeto que actualizara

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id) // Solo recibimos id ya que solo vamos a eliminar
    res.json({
        status : 'Task Deleted'
    })
})

module.exports = router // Lo exportamos para utilizarlo en otras partes de la aplicación
