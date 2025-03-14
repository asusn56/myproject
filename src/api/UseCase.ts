import axios from "axios";
import { createUseCase, UseCase } from "../pages/useCases/UseCasePageProvider";


const API_URL = 'http://localhost:3000';

export const fetchAllUseCases = async (): Promise<UseCase[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/useCases/`);
        console.log('Response received:', data.response);

        return data;
    } catch (error) {
        console.error("fetchAllUseCases", error);
        throw new Error("Error fetchAllUseCasess");
    }
};

export const createNewUseCase = async (useCase: createUseCase): Promise<UseCase> => {
    try {
        const { data } = await axios.post(`${API_URL}/useCases/`, useCase);
        return data;
    } catch (error) {
        console.error("createNewUseCase", error);
        throw new Error("Error createNewUseCase");
    }
};

export const updateUseCase = async (updatedUseCase: UseCase): Promise<UseCase> => {
    try {
        const { data } = await axios.put(`${API_URL}/useCases/${updatedUseCase.id}`, updatedUseCase);
        return data;
    } catch (error) {
        console.error("updateUseCase", error);
        throw new Error("Error updateUseCase");
    }
};

export const deleteUseCase = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/useCases/${id}`);
    } catch (error) {
        console.error("deleteUseCase", error);
        throw new Error("Error deleteUseCase");
    }
};