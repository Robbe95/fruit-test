<script setup lang="ts">

</script>

<template>
  <footer class="w-screen border-t border-solid border-primary/10 bg-neutral-100">
    <div>
      <div class="container mx-auto grid w-full gap-8 px-4 py-12 lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-0">
        <div class="flex w-full flex-col gap-2 lg:flex-row lg:gap-12">
          <FooterLogo />
          <FooterSocials />
        </div>
        <div class="flex w-full flex-col justify-end gap-32 text-subtext lg:flex-row">
          <FooterLinks />
          <FooterAddress />
        </div>
      </div>
    </div>
    <FooterCopyright />
  </footer>
</template>
