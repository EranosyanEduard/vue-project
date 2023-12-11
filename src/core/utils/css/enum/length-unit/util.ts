import { z } from 'zod'

/**
 * Перечисление единиц измерения, использующихся в CSS для определения
 * размеров HTML-элемента.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export type LengthUnit = z.infer<typeof lengthUnit>

/**
 * Перечисление единиц измерения, использующихся в CSS для определения
 * размеров HTML-элемента.
 * @enum
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
const lengthUnit = z.enum([
  '%',
  'ch',
  'cm',
  'em',
  'ex',
  'in',
  'mm',
  'pc',
  'pt',
  'px',
  'rem',
  'vh',
  'vmax',
  'vmin',
  'vw'
] as const)

export default lengthUnit
