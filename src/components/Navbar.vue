<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <span class="navbar-brand">🚗 Carros App</span>
    <div class="navbar-nav">
      <RouterLink class="nav-link" :to="{ name: 'dashboard' }">Inicio</RouterLink>
      <RouterLink class="nav-link" :to="{ name: 'carros' }">Carros</RouterLink>
      <RouterLink class="nav-link" :to="{ name: 'propietarios' }">Propietarios</RouterLink>
      <RouterLink class="nav-link" :to="{ name: 'revisiones' }">Revisiones</RouterLink>

    </div>
    <div class="ms-auto">
      <button class="btn btn-outline-light btn-sm" @click="logout">Cerrar sesión</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

async function logout() {
  try {
    await api.post('/logout')
  } finally {
    localStorage.removeItem('token')
    router.push({ name: 'login' })
  }
}
</script>
