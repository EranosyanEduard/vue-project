import type { BreakpointOptions } from 'vuetify/types/services/breakpoint'

const BREAKPOINT: Required<Pick<BreakpointOptions, 'scrollBarWidth' | 'thresholds'>> = {
  scrollBarWidth: 24,
  thresholds: {
    xs: 0,
    sm: 1024,
    md: 1600,
    lg: 1920
  }
}

export default BREAKPOINT
