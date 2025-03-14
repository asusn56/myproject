import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { createNewBrand, deleteBrand, fetchAllBrands, updateBrand } from "../../api/Brands";



export enum BrandActionTypes {
  ADD_BRAND = "ADD_BRAND",
  FETCH_BRANDS = "FETCH_BRANDS",
  SET_EDIT_BRAND = "SET_EDIT_BRAND",
  DELETE_BRAND = "DELETE_BRAND", 
}

export type BrandAction =
  | { type: BrandActionTypes.ADD_BRAND; payload: Brand }
  | { type: BrandActionTypes.FETCH_BRANDS; payload: Brand[] }
  | { type: BrandActionTypes.SET_EDIT_BRAND; payload: Brand | null }
  | { type: BrandActionTypes.DELETE_BRAND; payload: string };

export interface CreateBrand {
  brand: string;
}

export interface Brand extends CreateBrand {
  id: string;
}

type BrandContextType = {
  brandsList: Brand[];
  editBrand: Brand | null;
  getEditBrand: (brand: Brand | null) => void;
  addBrand: (brand: CreateBrand) => void;
  editBrandHandler: (updatedBrand: Brand) => void;
  deleteBrand: (brandId: string) => void; 
}

type BrandContextProviderProps = {
  children: ReactNode;
};

type BrandState = {
  brands: Brand[];
  editBrand: Brand | null;
};

const initialState: BrandState = {
  brands: [],
  editBrand: null,
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandContextProvider: React.FC<BrandContextProviderProps> = ({ children }) => {
  const reducer = (state: BrandState, action: BrandAction): BrandState => {
    switch (action.type) {
      case BrandActionTypes.FETCH_BRANDS:
        return { ...state, brands: action.payload };
      case BrandActionTypes.ADD_BRAND:
        return { ...state, brands: [...state.brands, action.payload] };
      case BrandActionTypes.SET_EDIT_BRAND:
        return { ...state, editBrand: action.payload };
      case BrandActionTypes.DELETE_BRAND:
        return { ...state, brands: state.brands.filter((brand) => brand.id !== action.payload) };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { brands, editBrand } = state;

  useEffect(() => {
    const fetchAllBrandsData = async () => {
      const data = await fetchAllBrands();
      dispatch({ type: BrandActionTypes.FETCH_BRANDS, payload: data });
    };
    fetchAllBrandsData();
  }, []);

  const addBrand = async (brand: CreateBrand) => {
    try {
      const createdBrand = await createNewBrand(brand);
      dispatch({ type: BrandActionTypes.ADD_BRAND, payload: createdBrand });
    } catch (error) {
      console.error("addBrand BrandContextProvider component ", error);
    }
  };

  const getEditBrand = (brand: Brand | null) => {
    dispatch({ type: BrandActionTypes.SET_EDIT_BRAND, payload: brand });
  };

  const editBrandHandler = async (updatedBrand: Brand) => {
    try {
      const res = await updateBrand(updatedBrand);
      const updatedBrands = brands.map((brand) =>
        brand.id === updatedBrand.id ? res : brand
      );
      dispatch({ type: BrandActionTypes.FETCH_BRANDS, payload: updatedBrands });
      dispatch({ type: BrandActionTypes.SET_EDIT_BRAND, payload: null });
    } catch (error) {
      console.error("editBrandHandler Error", error);
    }
  };

  const deleteBrandHandler = async (brandId: string) => {
    try {
      await deleteBrand(brandId); 
      dispatch({ type: BrandActionTypes.DELETE_BRAND, payload: brandId }); 
    } catch (error) {
      console.error("deleteBrandHandler Error", error);
    }
  };

  const ctxValue: BrandContextType = {
    brandsList: brands,
    editBrand: editBrand,
    getEditBrand,
    addBrand,
    editBrandHandler,
    deleteBrand: deleteBrandHandler, 
  };

  return <BrandContext.Provider value={ctxValue}>{children}</BrandContext.Provider>;
};

export default BrandContextProvider;

export const useBrands = () => {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrands must be used within a BrandContextProvider");
  }
  return ctx;
};
