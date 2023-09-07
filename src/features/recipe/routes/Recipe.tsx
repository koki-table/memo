import { useParams } from 'react-router-dom'

import { RecipeRegisterComponent } from '../components'

export const Recipe = () => {
  const { date } = useParams()
  return <RecipeRegisterComponent key={date} />
}
