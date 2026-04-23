<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <PropietariosTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import PropietariosTable from '@/components/PropietariosTable.vue'
</script>
