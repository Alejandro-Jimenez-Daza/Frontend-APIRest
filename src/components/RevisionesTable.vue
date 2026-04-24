<template>
  <div>
    <form @submit.prevent="guardarRevision" class="border p-4 rounded shadow-sm bg-light">
      <div class="row">

        <!-- SELECT de carros — llena con la lista de carros que traemos de la API -->
        <div class="col-md-6 mb-3">
          <label class="form-label">Carro</label>
          <select v-model="form.carro_id" class="form-control" required>
            <option value="">-- Selecciona un carro --</option>
            <!-- v-for recorre 'carros' (lista separada), muestra matricula pero guarda el id -->
            <option v-for="c in carros" :key="c.id" :value="c.id">
              {{ c.matricula }}
            </option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Fecha de revision</label>
          <input v-model="form.fecha_revision" type="datetime-local" class="form-control" required />
        </div>

      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Tipo de mecanica</label>
          <select v-model="form.tipo_mecanica" class="form-control" required>
            <option value="">-- Selecciona un tipo --</option>
            <option value="Mecanica">Mecanica</option>
            <option value="Electrica">Electrica</option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Costo</label>
          <input v-model="form.costo" type="number" class="form-control" placeholder="Sin puntos o comas" required />
        </div>
      </div>

      <!-- observaciones es texto libre, no checkbox -->
      <div class="mb-3">
        <label class="form-label">Observaciones</label>
        <textarea v-model="form.observaciones" class="form-control" rows="2" placeholder="Notas adicionales..."></textarea>
      </div>

      <button type="submit" class="btn btn-primary w-100">Guardar Revision</button>
    </form>

    <p v-if="mensaje">{{ mensaje }}</p>

    <h2>Lista de Revisiones</h2>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Vehiculo</th>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Costo</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- loop sobre 'revisiones', variable 'r' -->
        <tr v-for="r in revisiones" :key="r.id">
          <td>{{ r.id }}</td>
          <!-- r.carro viene del load('carro') del controller — el ? evita error si es null -->
          <td>{{ r.carro?.matricula }}</td>
          <td>{{ r.fecha_revision }}</td>
          <td>{{ r.tipo_mecanica }}</td>
          <td>{{ r.costo }}</td>
          <td>{{ r.observaciones }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

// DOS listas separadas — una para el select, otra para la tabla
const carros = ref([])      // llena el select de carros
const revisiones = ref([])  // llena la tabla de revisiones
const mensaje = ref('')

const form = ref({
  carro_id: '',
  fecha_revision: '',
  tipo_mecanica: '',
  costo: '',
  observaciones: '',
})

// Un solo onMounted — trae carros Y revisiones al mismo tiempo
onMounted(async () => {
  const [resCarros, resRevisiones] = await Promise.all([
    api.get('/carros'),
    api.get('/revisiones'),
  ])
  carros.value = resCarros.data
  revisiones.value = resRevisiones.data
})

async function guardarRevision() {
  try {
    const res = await api.post('/revisiones', form.value)
    revisiones.value.push(res.data)
    form.value = {
      carro_id: '',
      fecha_revision: '',
      tipo_mecanica: '',
      costo: '',
      observaciones: '',
    }
    mensaje.value = 'Revision ingresada exitosamente!'
  } catch (error) {
    mensaje.value = 'Error: ' + error.response.data.message
  }
}
</script>
