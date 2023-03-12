import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'var(--background-color-main)',
        color: 'var(--text-color-main)',
      },
      a: {
        color: 'var(--text-color-link)',
      },
    },
  },
  fonts: {
    heading: `'Noto Sans JP', 'roboto', sans-serif`,
    body: `'Noto Sans JP', 'roboto', sans-serif`,
  },
  // components: {

  // },
})
