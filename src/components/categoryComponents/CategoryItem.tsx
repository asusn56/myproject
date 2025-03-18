import { Category, useCategories } from "../../pages/categories/CategoryContextProvider";
import { Link } from "react-router";
import CategoryForm from "./CategoryForm";
import { FaEdit, FaTrash } from 'react-icons/fa';

type CategoryItemProps = {
  data: Category;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ data }) => {
  const { getEditCategory, editCategory, deleteCategoryHandler } = useCategories();
  
  if (editCategory && editCategory.id === data.id) {
    return (
      <div className="category-item editing">
        <CategoryForm editCategoryData={data} />
        <button onClick={() => getEditCategory(null)}>Cancel</button>
      </div>
    );
  }
  
  return (
    <div className="category-item">
      <h3>
        <Link to={`/categories/${data.id}`}>{data.category}</Link>
      </h3>
      <div className="controls">
        <button onClick={() => getEditCategory(data)}><FaEdit/>Edit</button>
        <button onClick={() => deleteCategoryHandler(data.id)}><FaTrash/>Delete</button>
      </div>
    </div>
  );
};

export default CategoryItem;