import { RecipeUpdateComponent, RecipeRegisterComponent } from '../components'
import { useRecipe } from '../lib'

export const Recipe = () => {
  const { recipeData } = useRecipe()
  return recipeData[0].name === '' ? <RecipeRegisterComponent /> : <RecipeUpdateComponent />
}
