<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <CarrosTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import CarrosTable from '@/components/CarrosTable.vue'
import Navbar from '@/components/Navbar.vue'
</script>
