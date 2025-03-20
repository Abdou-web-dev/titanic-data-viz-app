import axios from "axios";
import { Passenger } from "../types/types";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to trigger CSV import
export const triggerImport = async () => {
  try {
    const response = await api.post("/passengers/import");

    return response.data; // Return the server response
  } catch (error) {
    console.error("Error triggering CSV import:", error);
    alert("Failed to trigger CSV import.");
  }
};

// Function to fetch the passengers from the backend
export const getPassengers = async (): Promise<Passenger[]> => {
  try {
    const response = await api.get<any>("/passengers/getAll");
    return response?.data?.passengers;
  } catch (error) {
    console.error("Error fetching passengers data:", error);
    throw new Error("Failed to fetch passengers data");
  }
};
