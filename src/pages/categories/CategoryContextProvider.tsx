import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { createNewCategory, fetchAllCategories, updateCategory, deleteCategory } from "../../api/Category";

export enum CategoryActionTypes {
    ADD_CATEGORY = "ADD_CATEGORY",
    FETCH_CATEGORIES = "FETCH_CATEGORIES",
    SET_EDIT_CATEGORY = "SET_EDIT_CATEGORY",
    DELETE_CATEGORY = "DELETE_CATEGORY"
}

export type CategoryAction =
    | { type: CategoryActionTypes.ADD_CATEGORY; payload: Category }
    | { type: CategoryActionTypes.FETCH_CATEGORIES; payload: Category[] }
    | { type: CategoryActionTypes.SET_EDIT_CATEGORY; payload: Category | null }
    | { type: CategoryActionTypes.DELETE_CATEGORY; payload: string };

export interface CreateCategory {
    category: string;
}

export interface Category extends CreateCategory {
    id: string;
}

type CategoryContextType = {
    categoriesList: Category[];
    editCategory: Category | null;
    getEditCategory: (category: Category | null) => void;
    addCategory: (category: CreateCategory) => void;
    editCategoryHandler: (updatedCategory: Category) => void;
    deleteCategoryHandler: (id: string) => void;
};

type CategoryContextProviderProps = {
    children: ReactNode;
};

type CategoryState = {
    categories: Category[];
    editCategory: Category | null;
};

const initialState: CategoryState = {
    categories: [],
    editCategory: null,
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryContextProvider: React.FC<CategoryContextProviderProps> = ({ children }) => {
    const reducer = (state: CategoryState, action: CategoryAction): CategoryState => {
        switch (action.type) {
            case CategoryActionTypes.FETCH_CATEGORIES:
                return { ...state, categories: action.payload };
            case CategoryActionTypes.ADD_CATEGORY:
                return { ...state, categories: [...state.categories, action.payload] };
            case CategoryActionTypes.SET_EDIT_CATEGORY:
                return { ...state, editCategory: action.payload };
            case CategoryActionTypes.DELETE_CATEGORY:
                return { ...state, categories: state.categories.filter((category) => category.id !== action.payload) };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const { categories, editCategory } = state;

    useEffect(() => {
        const fetchAllCategoriesData = async () => {
            const data = await fetchAllCategories();
            dispatch({ type: CategoryActionTypes.FETCH_CATEGORIES, payload: data });
        };
        fetchAllCategoriesData();
    }, []);

    const addCategory = async (category: CreateCategory) => {
        
        try {
            const createdCategory = await createNewCategory(category);
            dispatch({ type: CategoryActionTypes.ADD_CATEGORY, payload: createdCategory });
            
          } catch (error) {
            console.error("addCategory", error);
          }
        };
    
          
      

    const getEditCategory = (category: Category | null) => {
        dispatch({ type: CategoryActionTypes.SET_EDIT_CATEGORY, payload: category });
    };

    const editCategoryHandler = async (updatedCategory: Category) => {
        try {
            const res = await updateCategory(updatedCategory);
            const updatedCategories = categories.map((category) =>
                category.id === updatedCategory.id ? res : category
            );

            dispatch({ type: CategoryActionTypes.FETCH_CATEGORIES, payload: updatedCategories });
            dispatch({ type: CategoryActionTypes.SET_EDIT_CATEGORY, payload: null });
        } catch (error) {
            console.error("editCategoryHandler:", error);
        }
    };

    const deleteCategoryHandler = async (id: string) => {
        try {
            await deleteCategory(id);
            dispatch({ type: CategoryActionTypes.DELETE_CATEGORY, payload: id });
        } catch (error) {
            console.error("deleteCategoryHandler", error);
        }
    };

    const ctxValue: CategoryContextType = {
        categoriesList: categories,
        editCategory,
        getEditCategory,
        addCategory,
        editCategoryHandler,
        deleteCategoryHandler,
    };

    return <CategoryContext.Provider value={ctxValue}>{children}</CategoryContext.Provider>;
};

export default CategoryContextProvider;

export const useCategories = () => {
    const ctx = useContext(CategoryContext);
    if (!ctx) {
        throw new Error("useCategories Error");
    }
    return ctx;
};
