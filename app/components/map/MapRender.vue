<script setup lang="ts">
import type { FetchContext } from 'ofetch'
import type Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON.js'
import type { Geometry } from 'ol/geom'
import { Draw } from 'ol/interaction'
import { Tile } from 'ol/layer'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import View from 'ol/View'
import { z } from 'zod'

import { useFeatureApiQueue } from '~/composables/useFeatureApiQueue'
import type { FeatureRequest } from '~/utils/createFeaturesRequestDatabase'

const map = shallowRef<Map | null>(null)
const drawVectorLayer = shallowRef<VectorLayer<Feature<Geometry>> | null>(null)
const drawVectorSource = shallowRef<VectorSource<Feature<Geometry>> | null>(null)
const drawInstance = shallowRef<Draw | null>(null)
const geoJSON = new GeoJSON()

function getDrawInstance({ source, style }: { source: VectorSource, style?: Style }) {
  return new Draw({
    freehand: true,
    source,
    style: style ?? undefined,
    type: 'Polygon',
  })
}

function getVectorSource(): VectorSource<Feature<Geometry>> {
  return new VectorSource<Feature<Geometry>>({
    features: [],
  })
}

function getVectorLayer(source: VectorSource<Feature<Geometry>>) {
  return new VectorLayer<Feature<Geometry>>({
    source,
    zIndex: 50,
  })
}

function setUpMap(id = 'map') {
  return new Map({
    controls: [],
    layers: [
      new Tile({
        source: new OSM(),
      }),
    ],
    pixelRatio: 1,
    target: id,
    view: new View({
      center: fromLonLat([
        5.420643775715746,

        50.894594810674846,
      ]),
      zoom: 19,
    }),
  })
}

onMounted(() => {
  map.value = setUpMap()
  drawVectorSource.value = getVectorSource()
  drawVectorLayer.value = getVectorLayer(drawVectorSource.value)

  drawInstance.value = getDrawInstance({
    source: drawVectorSource.value,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.1)',
      }),
      stroke: new Stroke({
        color: 'red',
        width: 2,
      }),
    }),
  })

  drawVectorSource.value.on('addfeature', (event) => {
    if (event.feature == null) {
      return
    }

    void onAddFeature(event.feature)
  })
  map.value.addInteraction(drawInstance.value)
  map.value.addLayer(drawVectorLayer.value)
})

const baseUrl = useNuxtApp().$config.public.apiBaseUrl
const featuresQueue = useFeatureApiQueue()

async function handleRequestError(request: { error: FetchContext, featureJson: string }) {
  const headers: Record<string, string> = JSON.parse(JSON.stringify(request.error.options.headers))

  const requestUrl = request.error.request.toString()

  if (headers == null || requestUrl == null) {
    return
  }

  const requestData: FeatureRequest = {
    feature: request.featureJson,
    retryAmount: 0,
  }

  await featuresQueue.addRequestToQueue(requestData)
}

async function onAddFeature(feature: Feature<Geometry>) {
  const httpClient = useNuxtApp().$httpClient
  const featureJson = geoJSON.writeFeature(feature)
  const url = `${baseUrl}/api/features`

  await httpClient.post({ body: featureJson,
    config: {
      onRequestError: async (error) => {
        await handleRequestError({ error, featureJson })
      },
      onResponseError: async (error) => {
        await handleRequestError({ error, featureJson })
      },
    },
    responseSchema: z.unknown(),
    url })
}

function enableDrawInteraction() {
  drawInstance.value?.setActive(true)
}

function disableDrawInteraction() {
  drawInstance.value?.setActive(false)
}
</script>

<template>
  <div class="relative flex w-full flex-1 bg-background">
    <div class="absolute bottom-0 left-0 z-50 flex w-full flex-col gap-2 bg-background px-12 py-4">
      <AppButton
        class="w-full"
        @click="enableDrawInteraction"
      >
        Draw
      </AppButton>
      <AppButton
        class="w-full"
        @click="disableDrawInteraction"
      >
        Move
      </AppButton>
    </div>
    <div
      id="map"
      class="flex w-full flex-1 "
    />
  </div>
</template>
