<script setup lang="ts">
</script>

<template>
  <header class="sticky top-0 border-b border-solid border-primary/10 bg-neutral-100 py-4">
    <div class="container mx-auto hidden px-4 lg:block">
      <div class="flex items-center justify-between lg:grid lg:grid-cols-3 lg:items-center lg:justify-center">
        <HeaderNavigationMenu />
        <HeaderLogo />
        <HeaderActions />
      </div>
    </div>
  </header>
</template>
