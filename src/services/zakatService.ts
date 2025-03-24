
import { ZakatRecord, ZakatFormData } from "@/types/ZakatTypes";
import { getAllRecords as fetchAllRecords, getRecordById as fetchRecordById, createRecord, updateRecord, deleteRecord } from "./zakatApiService";
import { initializeWithSampleData } from "./zakatInitService";

// Re-export the API service functions
export const getAllRecords = fetchAllRecords;
export const getRecordById = fetchRecordById;
export { createRecord, updateRecord, deleteRecord, initializeWithSampleData };
