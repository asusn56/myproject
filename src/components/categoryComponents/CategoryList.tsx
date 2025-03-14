import { useCategories } from "../../pages/categories/CategoryContextProvider";
import CategoryItem from "./CategoryItem";

const CategoryList: React.FC = () => {
    const { categoriesList } = useCategories();

    if (categoriesList.length === 0) {
        return <div>No categories found.</div>;
    }

    return (
        <div className="category-list">
            {categoriesList.map((category) => (
                <CategoryItem key={category.id} data={category} />
            ))}
        </div>
    );
};

export default CategoryList;
