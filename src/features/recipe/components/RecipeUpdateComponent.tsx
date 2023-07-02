/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Flex, Link, HStack } from '@chakra-ui/react'
import { FC } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { MdCalendarMonth } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '@/components/Elements'
import { calculateDay } from '@/utils/calculateDay'

import { useRecipe } from '../lib'

import { RecipeFormComponent } from './RecipeFormComponent'

export const RecipeUpdateComponent: FC = () => {
  const navigate = useNavigate()
  const { date } = useParams()
  const formattedDate = `${date!.slice(0, 4)}/${date!.slice(4, 6)}/${date!.slice(6)}`

  const {
    isLoading,
    recipeData,
    registerRecipeHandler,
    imgFiles,
    appendImgFile,
    isLoadingButton,
    options,
    updateRecipeHandler,
    removeRecipeHandler,
  } = useRecipe()

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
      <VStack spacing={6}>
        <Flex w="100%" whiteSpace={'nowrap'} alignItems={'center'} justifyContent="space-between">
          <HStack alignItems={'center'} spacing={3}>
            <Text w={'100%'} fontSize={'sm'} fontWeight="700">
              {formattedDate}
            </Text>
            <Link
              onClick={() => navigate(`/recipe/${calculateDay({ date: date!, isNextDay: false })}`)}
            >
              <IoIosArrowBack />
            </Link>
            <Link
              onClick={() => navigate(`/recipe/${calculateDay({ date: date!, isNextDay: true })}`)}
            >
              <IoIosArrowForward />
            </Link>
          </HStack>
          <Link onClick={() => navigate(`/calendar`)} mr={'2'}>
            <MdCalendarMonth size={27} />
          </Link>
        </Flex>
      </VStack>
      {recipeData.map((v, i) => (
        <RecipeFormComponent
          key={i}
          index={i}
          recipe={v}
          hasSubmit={recipeData.length === i + 1}
          onSubmit={registerRecipeHandler}
          imgFiles={imgFiles ? imgFiles[i] : undefined}
          appendImgFile={appendImgFile}
          options={options ?? undefined}
          isLoadingButton={isLoadingButton}
          updateRecipeHandler={updateRecipeHandler}
          removeRecipeHandler={removeRecipeHandler}
        />
      ))}
    </VStack>
  )
}