import { createInjectionState } from '@vueuse/core'
import type {
  EmblaCarouselType as CarouselApi,
  EmblaOptionsType as CarouselOptions,
  EmblaPluginType as CarouselPlugin,
} from 'embla-carousel'
import emblaCarouselVue from 'embla-carousel-vue'
import type { HTMLAttributes, Ref } from 'vue'
import { onMounted, ref } from 'vue'

export interface CarouselProps {
  isLoading?: boolean
  opts?: CarouselOptions | Ref<CarouselOptions>
  orientation?: 'horizontal' | 'vertical'
  plugins?: CarouselPlugin[] | Ref<CarouselPlugin[]>
}

export interface CarouselEmits {
  (e: 'init-api', payload: CarouselApi): void
}

export interface WithClassAsProps {
  class?: HTMLAttributes['class']
}
const [
  useProvideCarousel,
  useInjectCarousel,
] = createInjectionState(
  ({
    opts,
    orientation,
    plugins,
  }: CarouselProps, emits: CarouselEmits) => {
    const [
      emblaNode,
      emblaApi,
    ] = emblaCarouselVue({
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    }, plugins)

    function scrollPrev() {
      emblaApi.value?.scrollPrev()
    }

    function scrollNext() {
      emblaApi.value?.scrollNext()
    }

    const canScrollNext = ref<boolean>(true)
    const canScrollPrev = ref<boolean>(true)

    function onSelect(api: CarouselApi) {
      canScrollNext.value = api.canScrollNext()
      canScrollPrev.value = api.canScrollPrev()
    }

    onMounted(() => {
      if (emblaApi.value == null) {
        return
      }

      emblaApi.value?.on('init', onSelect)
      emblaApi.value?.on('reInit', onSelect)
      emblaApi.value?.on('select', onSelect)

      emits('init-api', emblaApi.value)
    })

    return {
      canScrollNext,
      canScrollPrev,
      carouselApi: emblaApi,
      carouselRef: emblaNode,
      orientation,
      scrollNext,
      scrollPrev,
    }
  },
)

function useCarousel() {
  const carouselState = useInjectCarousel()

  if (carouselState == null) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return carouselState
}

export { useCarousel, useProvideCarousel }
