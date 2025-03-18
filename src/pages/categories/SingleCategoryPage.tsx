import { useParams, useNavigate } from "react-router";
import { useCategories } from "./CategoryContextProvider";
import CategoryComponent from "../../components/categoryComponents/CategoryItem";

export const CategoryPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { categoriesList } = useCategories();
    
    const category = categoriesList.find(cat => cat.id === id);

    if (!category) {
        return <div>Category not found</div>;
    }

    return (
        <div className="category-item-wrapper">
        <CategoryComponent data={category} />
            <button onClick={() => navigate("/categories")}>Back to List</button>
            </div>
    );
};

export default CategoryPage;