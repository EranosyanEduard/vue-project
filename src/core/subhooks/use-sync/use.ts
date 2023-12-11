import { keys } from 'lodash'
import type { Dictionary } from 'ts-essentials'
import {
  watch,
  type WatchCallback,
  type WatchOptions,
  type WatchSource
} from 'vue'
import type { V } from '@/core/d-ts'
import { vue } from '@/core/utils'
import {
  type ISyncOpts,
  type SyncRefs,
  type SyncFnOpts,
  type Validator,
  FALLBACK_VALUE_KEY
} from './types'

/**
 * Возвращает функцию для синхронизации интерфейсов хука и компонента.
 * @param refs значения хука, подлежащие синхронизации
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
const use = <T extends object>(
  refs: T,
  target: V.WatchSources<T>,
  opts?: SyncFnOpts<T>
): SyncRefs<T> => {
  const { validators = null } = opts ?? {}
  const watchOptions: Readonly<Required<WatchOptions>> = {
    deep: true,
    immediate: true
  }

  return keys(refs).reduce<Dictionary<ISyncOpts<unknown>>>((acc, key) => {
    const validatorList: Array<Validator<unknown>> = []
    // @ts-expect-error wtf?
    const watchSource: WatchSource<unknown> = vue.is.watchSource(
      target[key as keyof T]
    )
      ? target[key as keyof T]
      : (): unknown => target[key as keyof T]

    // @ts-expect-error Код гарантирует соответствие типов.
    if (validators?.[key] !== undefined) {
      // @ts-expect-error Код гарантирует соответствие типов.
      validatorList.push(validators[key])
    }

    const watchFn: WatchCallback = (next) => {
      for (const it of validatorList) {
        const valid = it(next)

        if (valid !== true) {
          // @ts-expect-error Всё должно быть ок ;-)
          refs[key as keyof T] = valid[FALLBACK_VALUE_KEY]
          console.table({
            error: 'вы пытаетесь присвоить недопустимое значение',
            hook: 'useSync',
            key,
            value: next
          })
          return
        }
      }

      refs[key as keyof T] = next
    }

    acc[key] = {
      resync(v): void {
        acc[key].unsync()
        acc[key].unsync = watch(v, watchFn, watchOptions)
      },
      unsync: watch(watchSource, watchFn, watchOptions),
      validate(v): void {
        validatorList.push(v)
        acc[key].resync(watchSource)
      }
    }

    return acc
  }, {}) as ReturnType<typeof use<T>>
}

export default use
