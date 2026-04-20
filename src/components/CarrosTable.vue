<template>
  <div>
    <!-- //prevent no deja que la pagina recargue, y @submit es un listener, y el action a la funcion de abajo del script -->
    <form @submit.prevent="guardarCarro" class="border p-4 rounded shadow-sm bg-light">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Matrícula</label>
          <input
            v-model="form.matricula"
            type="text"
            class="form-control"
            placeholder="ABC123"
            required
          />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Propietario</label>
          <input
            v-model="form.propietario"
            type="text"
            class="form-control"
            placeholder="Nombre completo"
            required
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Marca</label>
          <input v-model="form.marca" type="text" class="form-control" placeholder="Marca" />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Cilindraje</label>
          <input
            v-model="form.cilindraje"
            type="number"
            class="form-control"
            placeholder="Cilindraje"
            required
          />
        </div>
      </div>

      <!-- con : le digo a laravel esto es un entero, no un text -->
      <div class="mb-3 form-check">
        <input
          v-model="form.disponible"
          type="checkbox"
          class="form-check-input"
          id="checkDisp"
          :true-value="1"
          :false-value="0"
        />
        <label class="form-check-label" for="checkDisp">Disponible para venta</label>
      </div>

      <button type="submit" class="btn btn-primary w-100">Guardar Carro</button>
    </form>

    <!-- "Oye, solo muestra este párrafo en la pantalla SI Y SOLO SI la variable mensaje tiene
     algo adentro (no está vacía)".
      Si mensaje está vacío (''), el párrafo ni siquiera existe en el código HTML de la página. -->
    <p v-if="mensaje">{{ mensaje }}</p>

    <h2>Lista de carros</h2>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Matricula</th>
          <th scope="col">Propietario</th>
          <th scope="col">Marca</th>
          <th scope="col">Cilindraje</th>
          <th scope="col">Disponible</th>
          <th scope="col">Fecha ingreso</th>
        </tr>
      </thead>
      <tbody>
        <!-- bucle for para imprimir datos de la bd -->
        <tr v-for="c in carros" :key="c.id">
          <th scope="row">{{ c.id }}</th>
          <td>{{ c.matricula }}</td>
          <td>{{ c.propietario }}</td>
          <td>{{ c.marca }}</td>
          <td>{{ c.cilindraje }}</td>
          <!-- <td>{{ c.disponible }}</td> asi lo tenia yo, pero usamos ternario para mas legibilidad -->
          <td>{{ c.disponible ? 'Si' : 'No' }}</td>
          <!-- y para created at lo formateo como en hora COL para que sea legible -->
          <td>{{ new Date(c.created_at).toLocaleDateString('es-CO') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<!-- //aca en el script va la logica para hacer la llamada a la API -->
<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const carros = ref([])
const mensaje = ref('')
//este es el ref
const form = ref({
  //variables del html arriba en los data rows
  id: '',
  matricula: '',
  propietario: '',
  marca: '',
  cilindraje: '',
  disponible: 0, // ← default false
  // creado_en: '', no es necesario, ya que solo se muestra desde vue
})

//cuando carga la pagina, trae todos los carros de laravel
onMounted(async () => {
  const res = await api.get('/carros')
  carros.value = res.data
})

//cuando hago submit, envio los datos al controller de laravel,
// este form.value es como accede al contenido dentro de una caja
async function guardarCarro() {
  try {
    const res = await api.post('/carros', form.value)
    carros.value.push(res.data)
    form.value = {
      id: '',
      matricula: '',
      propietario: '',
      marca: '',
      cilindraje: '',
      disponible: 0, // ← default false
      // creado_en: '',
    }
    mensaje.value = 'Carro ingresado exitosamente!'
  } catch (error) {
    mensaje.value = 'Error: ' + error.response.data.message
  }
}
</script>
