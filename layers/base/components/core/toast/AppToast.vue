<script setup lang="ts">
import AppUnstyledButton from '@base/components/core/button/AppUnstyledButton.vue'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppLoader from '@base/components/core/loader/AppLoader.vue'
import AppText from '@base/components/core/text/AppText.vue'
import { useToastStyle } from '@base/components/core/toast/toast.style'
import type { Icon } from '@base/icons/icons'
import type { ToastAction, ToastType } from '@base/types/core/toast.type'
import { computed, toValue } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  action?: ToastAction | null
  description?: null | string
  icon: Icon
  type: ToastType
}>(), {
  action: null,
  description: null,
})

const emit = defineEmits<{
  closeToast: []
}>()

function onClose(): void {
  emit('closeToast')
}

const toastStyle = useToastStyle()

const containerClasses = computed<string>(() => toastStyle.container())
const closeContainerClasses = computed<string>(() => toastStyle.closeContainer())
const closeButtonClasses = computed<string>(() => toastStyle.closeButton())
const closeIconClasses = computed<string>(() => toastStyle.closeIcon())
const actionContainerClasses = computed<string>(() => toastStyle.actionContainer())
const actionButtonClasses = computed<string>(() => toastStyle.actionButton())
const actionButtonTextClasses = computed<string>(() => toastStyle.actionButtonText())
const actionLoaderClasses = computed<string>(() => toastStyle.actionLoader())

const contentContainerClasses = computed<string>(() => toastStyle.contentContainer())
const contentTitleClasses = computed<string>(() => toastStyle.contentTitle())
const contentDescriptionClasses = computed<string>(() => toastStyle.contentDescription())
const contentIconClasses = computed<string>(() => toastStyle.contentIcon({
  variant: props.type,
}))
const contentWrapperClasses = computed<string>(() => toastStyle.contentWrapper())
</script>

<template>
  <div :class="containerClasses">
    <div :class="closeContainerClasses">
      <button
        :class="closeButtonClasses"
        type="button"
        @click.stop="onClose"
      >
        <AppIcon
          :class="closeIconClasses"
          icon="close"
          size="full"
        />
      </button>
    </div>

    <div :class="contentContainerClasses">
      <AppIcon
        :icon="props.icon"
        :class="contentIconClasses"
        size="lg"
      />

      <div :class="contentWrapperClasses">
        <div>
          <AppText
            :class="contentTitleClasses"
            variant="body"
          >
            {{ props.title }}
          </AppText>

          <AppText
            v-if="props.description !== null"
            :class="contentDescriptionClasses"
            variant="subtext"
          >
            {{ props.description }}
          </AppText>
        </div>

        <div
          v-if="props.action !== null"
          :class="actionContainerClasses"
        >
          <AppLoader
            v-if="props.action.isLoading?.value ?? false"
            :class="actionLoaderClasses"
          />

          <AppUnstyledButton
            v-else
            :class="actionButtonClasses"
            @click="props.action.onClick(onClose)"
          >
            <AppText
              :class="actionButtonTextClasses"
              variant="subtext"
              as="span"
            >
              {{ toValue(props.action.label) }}
            </AppText>
          </AppUnstyledButton>
        </div>
      </div>
    </div>
  </div>
</template>
