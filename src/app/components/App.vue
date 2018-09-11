<template>
    <div>
        <nav class="navbar navbar-light bg-light"><!-- navbar con colores ligeros o claros y el background también -->
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>

        <div class="container">
            <div class="row pt-5"><!-- pt-5 = padding top de 5 a la fila osea a todo -->
                <div class="col-md-5"><!-- Clase de boostrap -->
                    <div class="card">
                        <div class="card-body"><!-- Otra clase de boostrap -->
                            <form @submit.prevent="sendTask"><!-- @submit evento de vuejs para enviar los datos al servidor y .prevent para que no se refresque la pantalla-->
                                <div class="form-group"><!-- Clase de boostrap para agrupar contenidos del formulario -->
                                    <input type="text"  v-model="task.title" placeholder="Insert a Task" class="form-control"><!-- v-model, solo actualizara el titulo -->
                                </div>
                                <div class="form-group">
                                    <textarea v-model="task.description" cols="30" rows="10" class="form-control" placeholder="Insert A Description"></textarea>
                                </div>
                                <template v-if="edit === false"><!-- Si no esta editando que muestre send o enviar -->
                                    <button class="btn btn-primary btn-block">Send</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Update</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered"><!-- Clase de boostrap para que la tabla tenga un bordeado-->
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks"><!-- Lo que hace este for es listar las tareas pero en especial dice, quiero una tarea, de todas las tareas -->
                                <td>{{task.title}}</td>
                                <td>{{task.description}}</td>
                                <td>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                                    <button @click="editTask(task._id)" class="btn btn-secondary">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div><!-- Vue debe ir solo dentro de una etiqueta por eso esta todo dentro de un div, después de template-->
</template>

<script>
    class Task {
        constructor(title, description) {
            this.title = title
            this.description = description
        }
    }
    export default {
        data() { // data manera de definir que datos va a utilizar la app
            return {
                task: new Task(), // Para crear tarea con addTask
                tasks: [], // Para listarlas con getTasks
                edit: false,
                taskToEdit: '' // ID de la tarea que vamos a utilizar
            }
        },
        created() { // Método que se ejecuta apenas la aplicación esta cargando
            this.getTasks()
        },
        methods: { // Objeto compuesto por multiples métodos
            sendTask() { // Método que utilizares en el submit del form
                if(this.edit === false) {
                    fetch('/api/tasks', { // fetch, método del navegador solicitar y enviar datos, especificar ruta de la api
                        method: 'POST', // Método por el cuál serán enviados los datos
                        body:  JSON.stringify(this.task), // Ya que POST manda datos lo que mandara sera la tarea, pero lo debemos mandar como un string por eso utilizamos el método de JSON que convertira nuestro objeto a un STRING
                        headers: { // Especificar que tipos de datos vamos a enviar
                            'Accept' : 'application/json',
                            'Content-type' : 'application/json'
                        }
                        }) // Con esto enviamos los datos al servidor y los recibe con la api que habíamos creado  
                            .then(res => res.json()) // Lo convertimos en un JSON
                            .then(data => {
                                this.getTasks()
                            })
                } else {
                    fetch('/api/tasks/' + this.taskToEdit, { // Le damos el id de la tarea que tiene que actualizar
                        method: 'PUT',
                        body: JSON.stringify(this.task), // Convierte JSON a string
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTasks() //Después de editar, actualiza las tareas
                        this.edit = false
                    })
                }
                this.task = new Task()
            },
            getTasks() {
                fetch('/api/tasks')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data
                    })
            },
            deleteTask(id) {
                fetch('/api/tasks/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-type' : 'application/json'
                    }
                })
                .then(res => res.json()) // Cuando me responda el servidor vamos a tomar esa respuesta y transformarla a un JSON
                .then(data => {
                    this.getTasks() // Para actualizar las tareas al eliminar una
                })
            },
            editTask(id) {
                fetch('/api/tasks/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.title, data.description)
                        this.taskToEdit = data._id
                        this.edit = true
                    })
            }
        }
    }
</script>
