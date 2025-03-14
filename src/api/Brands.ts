import axios from "axios";
import { Brand, CreateBrand } from "../pages/brands/BrandsPageContextProvider";

const API_URL = 'http://localhost:3000';

export const fetchAllBrands = async (): Promise<Brand[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/brands`);
    return data;
  } catch (error) {
    console.error("fetchAllBrands", error);
    throw new Error("fetchAllBrands");
  }
};

export const createNewBrand = async (brand: CreateBrand): Promise<Brand> => {
  try {
    const { data } = await axios.post(`${API_URL}/brands`, brand);
    return data;
  } catch (error) {
    console.error("createNewBrand", error);
    throw new Error("Error createNewBrand");
  }
};

export const updateBrand = async (updatedBrand: Brand): Promise<Brand> => {
  try {
    const { data } = await axios.put(`${API_URL}/brands/${updatedBrand.id}`, updatedBrand);
    return data;
  } catch (error) {
    console.error("updateBrand", error);
    throw new Error("Error updateBrand");
  }
};

export const deleteBrand = async (brandId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/brands/${brandId}`);
  } catch (error) {
    console.error("deleteBrand", error);
    throw new Error("Error deleteBrand");
  }
};
