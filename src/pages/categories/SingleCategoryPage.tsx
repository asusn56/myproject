import { useParams, useNavigate } from "react-router";
import Container from "../../components/Container";
import { useCategories } from "./CategoryContextProvider";
import CategoryComponent from "../../components/categoryComponents/CategoryComponent";

export const CategoryPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { categoriesList } = useCategories();
    
    const category = categoriesList.find(cat => cat.id === id);

    if (!category) {
        return <div>Category not found</div>;
    }

    return (
        <Container>
            <CategoryComponent data={category} />
            <button onClick={() => navigate("/categories")}>Back to List</button>
        </Container>
    );
};

export default CategoryPage;