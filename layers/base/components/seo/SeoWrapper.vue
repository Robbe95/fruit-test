<!-- eslint-disable @intlify/vue-i18n/no-dynamic-keys -->
<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const head = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
  identifierAttribute: 'id',
})

const title = computed<string>(() => t(
  'layouts.title',
  { title: route.meta.title != null ? t(route.meta.title as string) : 'TBD' },
))
</script>

<template>
  <Html
    :lang="head.htmlAttrs.lang"
    :dir="head.htmlAttrs.dir"
  >
    <Head>
      <Title>{{ title }}</Title>
      <template
        v-for="link in head.link"
        :key="link.id"
      >
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template
        v-for="meta in head.meta"
        :key="meta.id"
      >
        <Meta
          :id="meta.id"
          :property="meta.property"
          :content="meta.content"
        />
      </template>

      <Body>
        <slot />
      </Body>
    </Head>
  </Html>
</template>
