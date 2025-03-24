
import { ZakatRecord } from "@/types/ZakatTypes";
import { getRecordById as fetchRecordById, deleteRecord as apiDeleteRecord } from "@/services/zakatApiService";

// Proxy the API functions for now to fix the errors
export const getRecordById = (id: string): Promise<ZakatRecord | null> => {
  return fetchRecordById(id);
};

export const deleteRecord = (id: string): Promise<boolean> => {
  return apiDeleteRecord(id);
};
