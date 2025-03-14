    import axios from "axios";
    import { Category, CreateCategory } from "../pages/categories/CategoryContextProvider";

    const API_URL = "http://localhost:3000";
    

    export const fetchAllCategories = async (): Promise<Category[]> => {
        const { data } = await axios.get(`${API_URL}/categories`);
        return data;
    };

    export const createNewCategory = async (category: CreateCategory): Promise<Category> => {
        const { data } = await axios.post(`${API_URL}/categories`, category);
        return data;
    };

    export const updateCategory = async (updatedCategory: Category): Promise<Category> => {
        const { data } = await axios.put(`${API_URL}/categories/${updatedCategory.id}`, updatedCategory);
        return data;
    };

    export const deleteCategory = async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/categories/${id}`);
    };
