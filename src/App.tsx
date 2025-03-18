import UseCasePage from './pages/useCases/UseCasePage'
import CategoryPage from './pages/categories/CategoryPage'
import AmplifierContextProvider from './pages/Amplifiers/AmplifierContextProvider'
import AmplifiersPage from './pages/Amplifiers/AmplifiersPage'
import { Container } from '@mui/material'

function App() {
  

  return (
    <>
    <Container>
    <AmplifierContextProvider>
      <AmplifiersPage/>
      <UseCasePage/>
      <CategoryPage/>
      </AmplifierContextProvider>
      </Container>
    </>
  )
}

export default App
