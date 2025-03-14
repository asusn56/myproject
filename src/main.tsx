
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import AmplifiersPage from './pages/Amplifiers/AmplifiersPage'
import App from './App'
import Navigation from './components/navigation/Navigation'
import CategoryPage from './pages/categories/CategoryPage'
import AmplifierContextProvider from './pages/Amplifiers/AmplifierContextProvider'
import AmplifierPage from './pages/Amplifiers/SingleAmplifierPage'
import AmplifierForm from './components/amplifierComponents/AmplifierForm'
import BrandContextProvider from './pages/brands/BrandsPageContextProvider'
import CategoryContextProvider from './pages/categories/CategoryContextProvider'
import UseCaseContextProvider from './pages/useCases/UseCasePageProvider'
import BrandsPage from './pages/brands/BrandsPage'
import UseCasesPage from './pages/useCases/UseCasesPage'
import SingleCategoryPage from './pages/categories/SingleCategoryPage'
import './styles/main.scss' 
import UseCasePage from './pages/useCases/UseCasePage'
import SingleBrandPage from './pages/brands/SingleBrandPage'

createRoot(document.getElementById('root')!).render(
  

  <StrictMode>
  <BrowserRouter>
    <BrandContextProvider>
      <CategoryContextProvider>
        <UseCaseContextProvider>
          <AmplifierContextProvider>
            
            <Navigation/>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/amplifiers" element={<AmplifiersPage/>} />
              <Route path="/amplifiers/:id" element={<AmplifierPage/>} />
              <Route path="/createAmplifier" element={<AmplifierForm/>} />
              <Route path="/brands" element={<BrandsPage/>} />
              <Route path="/brands/:id" element={<SingleBrandPage/>} />
              <Route path="/categories" element={<CategoryPage/>} />
              <Route path="/categories/:id" element={<SingleCategoryPage/>} />
             
              <Route path="/useCases" element={<UseCasesPage/>} />
              <Route path="/useCases/:id" element={<UseCasePage/>} />
            </Routes>
          </AmplifierContextProvider>
        </UseCaseContextProvider>
      </CategoryContextProvider>
    </BrandContextProvider>
  </BrowserRouter>
</StrictMode>,
)
