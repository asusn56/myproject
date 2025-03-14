import CategoryForm from "../../components/categoryComponents/CategoryForm";
import CategoryList from "../../components/categoryComponents/CategoryList";
import Container from "../../components/Container";


export const CategoryPage:React.FC = ()=>{
  

    return (
          <Container>
             <CategoryForm/>
            <CategoryList/>
            </Container>
           
          
        
    )
  }
  
  export default CategoryPage;