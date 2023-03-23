import { extendTheme } from '@chakra-ui/react'

import { buttonTheme, headingTheme, tooltipTheme } from '@/components/Elements'

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
  components: {
    Button: buttonTheme,
    Heading: headingTheme,
    Checkbox: {
      baseStyle: {
        control: {
          bg: 'white',
          w: '4',
          _checked: {
            bg: 'var(--primary-color-main)',
            borderColor: 'var(--primary-color-main)',
            _hover: {
              bg: 'var(--primary-color-heavy)',
              borderColor: 'var(--primary-color-heavy)',
            },
            _disabled: {
              bg: 'var(--primary-color-main)',
              color: 'white',
            },
          },
        },
        label: {
          mr: '7',
          _checked: {
            _disabled: {
              opacity: 1,
            },
          },
        },
      },
    },
    Tooltip: tooltipTheme,
  },
})
