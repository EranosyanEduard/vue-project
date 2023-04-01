import breakpoint from './Theme.breakpoint'
import { theme as Default } from './default'

const AllThemes = { Default } as const

/**
 * Возвращает конфигурацию темы под названием **themeKey**.
 * @param themeKey название темы
 */

export const useTheme = <K extends keyof typeof AllThemes>(
  themeKey: K
): { breakpoint: typeof breakpoint; themes: (typeof AllThemes)[K] } => ({
  breakpoint,
  themes: AllThemes[themeKey]
})
