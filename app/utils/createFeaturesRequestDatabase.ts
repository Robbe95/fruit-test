export const FEATURES_REQUEST_DB_NAME = 'Queue'
export const FEATURES_REQUEST_DB_VERSION = 1
export const FEATURES_REQUEST_DB_STORE_NAME = 'FeaturesQueue'

export interface FeatureRequest {
  feature: string
  retryAmount: number
}

export function createFeaturesRequestDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const database = indexedDB.open(FEATURES_REQUEST_DB_NAME, FEATURES_REQUEST_DB_VERSION)

    database.onerror = (event) => {
      console.error('Error opening database', event)
      reject(new Error('Error opening database'))
    }
    database.onupgradeneeded = (event) => {
    // @ts-expect-error TS doesnt know about IDBDatabase
      const db = event?.target?.result as IDBDatabase | null

      if (db == null) {
        return
      }

      if (db.objectStoreNames.contains(FEATURES_REQUEST_DB_STORE_NAME)) {
        return
      }

      db.createObjectStore(FEATURES_REQUEST_DB_STORE_NAME, {
        autoIncrement: true,
        keyPath: 'id',
      })
    }

    database.onsuccess = () => {
      const db = database.result

      if (db == null) {
        return
      }

      resolve(db)
    }
  })
}
