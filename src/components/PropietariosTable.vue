<template>
  <div>
    <!-- //prevent no deja que la pagina recargue, y @submit es un listener, y el action a la funcion de abajo del script -->
    <form @submit.prevent="guardarPropietario" class="border p-4 rounded shadow-sm bg-light">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Cedula</label>
          <input
            v-model="form.cedula"
            type="number"
            class="form-control"
            placeholder="1234567890"
            required
          />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Nombre completo</label>
          <input
            v-model="form.nombre_completo"
            type="text"
            class="form-control"
            placeholder="Nombre completo"
            required
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Correo</label>
          <input v-model="form.correo" type="email" class="form-control" placeholder="Marca" />
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Direccion</label>
          <input
            v-model="form.direccion"
            type="text"
            class="form-control"
            placeholder="Cra 00 # 12-34"
            required
          />
        </div>

        <div class="col-md-12 mb-3">
          <label class="form-label">Fecha nacimiento</label>
          <input
            v-model="form.fecha_nacimiento"
            type="date"
            class="form-control"
            placeholder="Cra 00 # 12-34"
            required
          />
        </div>
      </div>

      <button type="submit" class="btn btn-primary w-100">Guardar persona</button>
    </form>

    <!-- "Oye, solo muestra este párrafo en la pantalla SI Y SOLO SI la variable mensaje tiene
     algo adentro (no está vacía)".
      Si mensaje está vacío (''), el párrafo ni siquiera existe en el código HTML de la página. -->
    <p v-if="mensaje">{{ mensaje }}</p>

    <h2>Lista de Propietarios</h2>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Cedula</th>
          <th scope="col">Nombre completo</th>
          <th scope="col">Correo electronico</th>
          <th scope="col">Direccion</th>
          <th scope="col">Fecha_nacimiento</th>
          <th scope="col">Fecha ingreso</th>
        </tr>
      </thead>
      <tbody>
        <!-- bucle for para imprimir datos de la bd -->
        <tr v-for="p in propietarios" :key="p.id">
          <th scope="row">{{ p.id }}</th>
          <td>{{ p.cedula }}</td>
          <td>{{ p.nombre_completo }}</td>
          <td>{{ p.correo }}</td>
          <td>{{ p.direccion }}</td>
          <!-- <td>{{ c.disponible }}</td> asi lo tenia yo, pero usamos ternario para mas legibilidad -->
          <td>{{ p.fecha_nacimiento }}</td>
          <!-- y para created at lo formateo como en hora COL para que sea legible -->
          <td>{{ new Date(p.created_at).toLocaleDateString('es-CO') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<!-- //aca en el script va la logica para hacer la llamada a la API -->
<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const propietarios = ref([])
const mensaje = ref('')
//este es el ref
const form = ref({
  //variables del html arriba en los data rows
  id: '',
  cedula: '',
  nombre_completo: '',
  correo: '',
  direccion: '',
  fecha_nacimiento: '',
  // creado_en: '', no es necesario, ya que solo se muestra desde vue
})

//cuando carga la pagina, trae todos los porpietarios de laravel
onMounted(async () => {
  const res = await api.get('/propietarios')
  propietarios.value = res.data
})

//cuando hago submit, envio los datos al controller de laravel,
// este form.value es como accede al contenido dentro de una caja
async function guardarPropietario() {
  try {
    const res = await api.post('/propietarios', form.value)
    propietarios.value.push(res.data)
    form.value = {
      id: '',
      cedula: '',
      nombre_completo: '',
      correo: '',
      direccion: '',
      fecha_nacimiento: '',
      // creado_en: '',
    }
    mensaje.value = 'Persona ingresado exitosamente!'
  } catch (error) {
    mensaje.value = 'Error: ' + error.response.data.message
  }
}
</script>
