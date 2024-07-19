import { useGlobalI18n } from '@base/composables/i18n/useGlobaI18n'
import {
  type ErrorMapCtx,
  z,
  type ZodIssueOptionalMessage,
} from 'zod'

export default defineNuxtPlugin({
  dependsOn: [
    'i18n:plugin',
  ],
  name: 'api',
  parallel: true,
  setup() {
    function customErrorMap(issue: ZodIssueOptionalMessage, ctx: ErrorMapCtx): { message: string } {
      const { t } = useGlobalI18n()

      const isStringAndEmpty = issue.code === 'too_small' && issue.minimum === 1 && issue.type === 'string'
      const isInvalidType = issue.code === 'invalid_type'
      const isInvalidDiscriminator = issue.code === 'invalid_union_discriminator'

      if (isStringAndEmpty || isInvalidType || isInvalidDiscriminator) {
        return {
          message: t('validation.required'),
        }
      }

      if (issue.code === z.ZodIssueCode.invalid_union) {
        return {
          message: t('validation.invalid_union'),
        }
      }
      if (issue.code === z.ZodIssueCode.invalid_string) {
        if (issue.validation === 'email') {
          return {
            message: t('validation.invalid_email'),
          }
        }
        if (issue.validation === 'url') {
          return {
            message: t('validation.invalid_url'),
          }
        }
        if (issue.validation === 'uuid') {
          return {
            message: t('validation.invalid_uuid'),
          }
        }
        if (issue.validation === 'regex') {
          return {
            message: t('validation.invalid_regex'),
          }
        }
        if (issue.validation === 'datetime') {
          return {
            message: t('validation.invalid_datetime'),
          }
        }

        return {
          message: t('validation.invalid_string'),
        }
      }

      if (issue.code === z.ZodIssueCode.invalid_date) {
        return {
          message: t('validation.invalid_date'),
        }
      }
      if (issue.code === z.ZodIssueCode.too_big) {
        if (issue.type === 'string') {
          return {
            message: t('validation.too_big_string', {
              count: issue.maximum,
            }),
          }
        }
        if (issue.type === 'number') {
          return {
            message: t('validation.too_big_number', {
              count: issue.maximum,
            }),
          }
        }
        if (issue.type === 'array') {
          return {
            message: t('validation.too_big_array', {
              count: issue.maximum,
            }),
          }
        }
        if (issue.type === 'date') {
          return {
            message: t('validation.too_big_date', {
              count: issue.maximum,
            }),
          }
        }

        return {
          message: t('validation.too_big', {
            count: issue.maximum,
          }),
        }
      }
      if (issue.code === z.ZodIssueCode.too_small) {
        if (issue.type === 'string') {
          return {
            message: t('validation.too_small_string', {
              count: issue.minimum,
            }),
          }
        }
        if (issue.type === 'number') {
          return {
            message: t('validation.too_small_number', {
              count: issue.minimum,
            }),
          }
        }
        if (issue.type === 'array') {
          return {
            message: t('validation.too_small_array', {
              count: issue.minimum,
            }),
          }
        }
        if (issue.type === 'date') {
          return {
            message: t('validation.too_small_date', { v: issue.minimum }),
          }
        }

        return {
          message: t('validation.too_small', {
            count: issue.minimum,
          }),
        }
      }

      return {
        message: ctx.defaultError,
      }
    }

    z.setErrorMap(customErrorMap)
  },
})
