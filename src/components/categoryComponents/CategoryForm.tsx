import { useState } from "react";
import { useCategories, Category } from "../../pages/categories/CategoryContextProvider";

type CategoryFormProps = {
    editCategoryData?: Category;
};

const CategoryForm: React.FC<CategoryFormProps> = ({ editCategoryData }) => {
    const { addCategory, editCategoryHandler, getEditCategory } = useCategories();
    const [category, setCategory] = useState(editCategoryData?.category || "");

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (editCategoryData) {
            editCategoryHandler({ id: editCategoryData.id, category });
        } else {
            addCategory({ category });
        }
        setCategory("");
    };

    return (
        <form onSubmit={submitHandler}>
            <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} required/>
            <button type="submit">{editCategoryData ? "Edit" : "Add"} Category</button>
            {editCategoryData && <button onClick={() => getEditCategory(null)}>Cancel</button>}
        </form>
    );
};

export default CategoryForm;
