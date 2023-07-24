/* eslint-disable @typescript-eslint/no-misused-promises */
import { VStack } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Spinner } from '@/components/Elements'

import { useRecipe } from '../lib'

import { MoveDayHeader } from './MoveDayHeader'
import { RecipeFormComponent } from './RecipeFormComponent'

export const RecipeRegisterComponent: FC = () => {
  const { date } = useParams()

  const {
    isLoading,
    recipeData,
    registerRecipeHandler,
    imgFiles,
    updateImgFile,
    isLoadingButton,
    options,
    updateLocalRecipeHandler,
    removeRecipeHandler,
    updateRecipeHandler,
    fetchRecipe,
  } = useRecipe()

  useEffect(() => {
    fetchRecipe(date!)
  }, [date, fetchRecipe])

  if (isLoading) return <Spinner variants="full" />

  return (
    <VStack
      px={'4'}
      pb={8}
      pt={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh - 69px)`}
    >
      <MoveDayHeader />
      {recipeData.map((v, i) => (
        <RecipeFormComponent
          key={i}
          index={i}
          recipe={v}
          hasSubmit={recipeData.length === i + 1}
          onSubmit={recipeData[0].name === '' ? registerRecipeHandler : updateRecipeHandler}
          imgFiles={imgFiles ? imgFiles[i] : undefined}
          updateImgFile={updateImgFile}
          options={options ?? undefined}
          isLoadingButton={isLoadingButton}
          updateLocalRecipeHandler={updateLocalRecipeHandler}
          removeRecipeHandler={removeRecipeHandler}
        />
      ))}
    </VStack>
  )
}
