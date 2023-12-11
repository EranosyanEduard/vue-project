import { isUndefined } from 'lodash'
import { computed, reactive } from 'vue'
import { z } from 'zod'
import type { U, V } from '@/core/d-ts'
import { useApi, useSync, SubhookTypes } from '@/core/subhooks'
import type { IRefs } from './types'
import { MAX, MIN } from './utils'

/**
 * Хук, позволяющий управлять тенью компонента.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
const use = (target: V.WatchSources<IRefs>) => {
  const api = useApi({
    elevation: computed<U.Or.Undefined<string>>(() => {
      return isUndefined(refs.elevation)
        ? undefined
        : `elevation-${refs.elevation}`
    })
  })
  const refs = reactive<IRefs>({ elevation: undefined })
  const sync = useSync(refs, target, {
    validators: {
      elevation: (v) => {
        return (
          z.coerce.number().min(MIN).max(MAX).optional().safeParse(v)
            .success || {
            [SubhookTypes.UseSync.FALLBACK_VALUE_KEY]: undefined
          }
        )
      }
    }
  })

  return { api, sync }
}

export default use
