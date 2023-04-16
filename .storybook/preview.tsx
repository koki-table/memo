import React from 'react'
import { initialize } from 'msw-storybook-addon'
import { MemoryRouter } from 'react-router-dom'

import { ChakraProvider } from '../src/providers/ChakraProvider'

initialize()

const withChakra = (StoryFn: Function) => {
  return (
    <ChakraProvider>
      <MemoryRouter>
        <div id="story-wrapper">
          <StoryFn />
        </div>
      </MemoryRouter>
    </ChakraProvider>
  )
}

export const decorators = [withChakra]
