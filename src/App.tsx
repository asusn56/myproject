import UseCasePage from './pages/useCases/UseCasePage'
import CategoryPage from './pages/categories/CategoryPage'
import AmplifierContextProvider from './pages/Amplifiers/AmplifierContextProvider'
import AmplifiersPage from './pages/Amplifiers/AmplifiersPage'

function App() {
  

  return (
    <>
    <AmplifierContextProvider>
      <AmplifiersPage/>
      <UseCasePage/>
      <CategoryPage/>
      </AmplifierContextProvider>
    </>
  )
}

export default App
