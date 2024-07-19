<template>
  <div>
    <div class="flex min-h-screen flex-col">
      <TheHeader />
      <div class="container relative z-0 mx-auto flex w-full flex-1 flex-col items-center justify-center px-4">
        <slot />
      </div>
    </div>
    <TheFooter />
  </div>
</template>
