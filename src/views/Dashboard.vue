<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <h2>Bienvenido, {{ usuario?.name }}</h2>
      <p class="text-muted">Selecciona una opción del menú para comenzar.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import api from '../services/api'

const router = useRouter()
const usuario = ref(null)

onMounted(async () => {
  try {
    const res = await api.get('/user')
    usuario.value = res.data
  } catch {
    router.push({ name: 'login' })
  }
})
</script>
