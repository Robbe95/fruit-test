import { useApi } from '@base/composables/api/useApi'
import { useToast } from '@base/composables/core/toast.composable'
import { z } from 'zod'

import {
  createFeaturesRequestDatabase,
  type FeatureRequest,
  FEATURES_REQUEST_DB_STORE_NAME,
} from '~/utils/createFeaturesRequestDatabase'

export function useFeatureApiQueue() {
  async function getDatabaseAndFeaturesStore() {
    const database = await createFeaturesRequestDatabase()

    if (database == null || database.transaction == null) {
      throw new Error('Database is null')
    }

    const featuresTransaction = database.transaction(FEATURES_REQUEST_DB_STORE_NAME, 'readwrite')
    const featuresStore = featuresTransaction.objectStore(FEATURES_REQUEST_DB_STORE_NAME)

    return {
      database,
      featuresStore,
    }
  }

  const network = useNetwork()

  watch(network.isOnline, async (isOnline) => {
    if (isOnline) {
      await handleQueue()
    }
  }, { immediate: true })

  async function addRequestToQueue(request: FeatureRequest) {
    const { featuresStore } = await getDatabaseAndFeaturesStore()

    if (request == null) {
      return
    }

    featuresStore.add(request)
  }

  async function handleQueue() {
    if (network.isOnline.value === false) {
      return
    }

    const { featuresStore } = await getDatabaseAndFeaturesStore()
    const queue = featuresStore.getAll()

    queue.onsuccess = async (event) => {
      const toast = useToast()

      // @ts-expect-error TS doesnt know about IDBRequest
      const data = event.target?.result as (FeatureRequest & { id: number })[] | null

      if (data == null) {
        return
      }

      for (const request of data) {
        try {
          await handleRequest(request)

          const { featuresStore } = await getDatabaseAndFeaturesStore()

          featuresStore.delete(request.id)
        }
        catch (error) {
          await handleRetryError(error, request)
        }
      }

      toast.success({
        title: `Synced ${data.length} features`,
      })
    }
  }

  async function handleRetryError(error: unknown, request: FeatureRequest & { id: number }) {
    const toast = useToast()

    const { featuresStore } = await getDatabaseAndFeaturesStore()

    if (request.retryAmount >= 5) {
      featuresStore.delete(request.id)
      toast.error({
        title: `Error while syncing feature. Retried ${request.retryAmount} times`,
      })

      return Promise.reject(error)
    }

    request.retryAmount = request.retryAmount + 1
    featuresStore.put(request)
  }

  return {
    addRequestToQueue,
    handleQueue,
  }
}

async function handleRequest(featureRequest: FeatureRequest) {
  const baseUrl = useNuxtApp().$config.public.apiBaseUrl
  const url = `${baseUrl}/api/features`

  const api = useApi()

  return await api.post({ body: featureRequest.feature,
    responseSchema: z.unknown(),
    url })
}
