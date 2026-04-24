<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <RevisionesTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import RevisionesTable from '@/components/RevisionesTable.vue'
</script>
