import { defineTheme } from '../utils'

const theme = defineTheme({
  light: {
    base: [0xffffff, 0xebeff5, 0xdce2ea, 0xbcc5d1, 0x8f9cac],
    error: 0xce574a,
    info: 0x3474c5,
    primary: {
      base: 0x1a965a,
      lighten5: 0xe8f5ef
    },
    secondary: {
      base: 0x030724
    },
    success: 0x319f62,
    text: [0x030724, 0x525e74, 0x8a92a0, 0xffffff],
    warning: 0xd9ab36
  }
} as const)

export default theme
