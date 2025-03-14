import { Category } from "../../pages/categories/CategoryContextProvider";
import CategoryComponent from "./CategoryComponent";

type CategoryItemProps = {
  data: Category;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ data }) => {
  return (
    <div>
      <CategoryComponent data={data} />
    </div>
  );
};

export default CategoryItem;