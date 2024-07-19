<script setup lang="ts">
import { COMPANY_INFO } from '@base/constants/company-info/companyInfo.constant'

const { t } = useI18n()

const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${COMPANY_INFO.street}_${COMPANY_INFO.postalCode}_${COMPANY_INFO.city}`
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="font-medium text-neutral-400">
      {{ t('footer.address') }}
    </p>
    <div class="flex flex-col">
      <a
        :href="googleMapsUrl"
        class="group rounded focus-ring"
      >
        <p class="text-foreground group-hover:underline">
          {{ COMPANY_INFO.street }}
        </p>
        <p class=" text-foreground  group-hover:underline">
          {{ `${COMPANY_INFO.postalCode} ${COMPANY_INFO.city}` }}
        </p>
      </a>

      <a
        :href="`tel:${COMPANY_INFO.phoneNumber}`"
        class="rounded text-foreground focus-ring hover:underline"
      >
        {{ COMPANY_INFO.phoneNumber }}
      </a>
    </div>
  </div>
</template>
