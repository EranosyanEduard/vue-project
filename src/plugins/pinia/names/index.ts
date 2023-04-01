import { createEnum } from 'x-utils'

/**
 * Перечисление названий хранилищ.
 * @enum
 */
const AllStores = createEnum(['auth'] as const)

export default AllStores
