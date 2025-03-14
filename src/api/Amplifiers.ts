import axios from "axios";
import { Amplifier, createAmplifier } from "../pages/Amplifiers/AmplifierContextProvider";

const API_URL = 'http://localhost:3000';

export const fetchAllAmplifiers = async (): Promise<Amplifier[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/amplifiers`);
        return data;
    } catch (error) {
        console.error("fetchAllAmplifiers", error);
        throw new Error("fetchAllAmplifiers");
    }
};

export const createNewAmplifier = async (amplifier: createAmplifier): Promise<Amplifier> => {
    try {
        const { data } = await axios.post(`${API_URL}/amplifiers`, amplifier);
        return data;
    } catch (error) {
        console.error("createNewAmplifier", error);
        throw new Error("createNewAmplifier");
    }
};

export const updateAmplifier = async (updatedAmplifier: Amplifier): Promise<Amplifier> => {
    try {
        const { data } = await axios.put(`${API_URL}/amplifiers/${updatedAmplifier.id}`, updatedAmplifier);
        return data;
    } catch (error) {
        console.error("updateAmplifier", error);
        throw new Error("updateAmplifier");
    }
};

export const deleteAmplifier = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/amplifiers/${id}`);
    } catch (error) {
        console.error("deleteAmplifier", error);
        throw new Error("deleteAmplifier");
    }
};