
import { ZakatRecord, ZakatFormData } from "@/types/ZakatTypes";

const STORAGE_KEY = "zakat_records";

// Generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Calculate total amounts
const calculateTotals = (data: Omit<ZakatRecord, 'totalBeras' | 'totalUang'>): Pick<ZakatRecord, 'totalBeras' | 'totalUang'> => {
  const totalBeras = 
    data.zakatFitrah.berasKg + 
    data.infaq.beras + 
    data.fidyah.beras;
  
  const totalUang = 
    data.zakatFitrah.uang + 
    data.zakatMaal + 
    data.infaq.uang + 
    data.fidyah.uang;
  
  return { totalBeras, totalUang };
};

// Get all records
export const getAllRecords = (): ZakatRecord[] => {
  const records = localStorage.getItem(STORAGE_KEY);
  return records ? JSON.parse(records) : [];
};

// Get a single record by ID
export const getRecordById = (id: string): ZakatRecord | null => {
  const records = getAllRecords();
  return records.find(record => record.id === id) || null;
};

// Create a new record
export const createRecord = (data: ZakatFormData): ZakatRecord => {
  const records = getAllRecords();
  const now = new Date().toISOString();
  
  const totals = calculateTotals(data as Omit<ZakatRecord, 'totalBeras' | 'totalUang'>);
  
  const newRecord: ZakatRecord = {
    ...data,
    id: generateId(),
    ...totals,
    createdAt: now,
    updatedAt: now,
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...records, newRecord]));
  return newRecord;
};

// Update an existing record
export const updateRecord = (id: string, data: ZakatFormData): ZakatRecord | null => {
  const records = getAllRecords();
  const index = records.findIndex(record => record.id === id);
  
  if (index === -1) return null;
  
  const totals = calculateTotals(data as Omit<ZakatRecord, 'totalBeras' | 'totalUang'>);
  
  const updatedRecord: ZakatRecord = {
    ...data,
    id,
    ...totals,
    createdAt: records[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  
  records[index] = updatedRecord;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  
  return updatedRecord;
};

// Delete a record
export const deleteRecord = (id: string): boolean => {
  const records = getAllRecords();
  const filteredRecords = records.filter(record => record.id !== id);
  
  if (filteredRecords.length === records.length) {
    return false;
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecords));
  return true;
};

// Initialize with sample data if empty
export const initializeWithSampleData = (): void => {
  const records = getAllRecords();
  
  if (records.length === 0) {
    const sampleData: ZakatFormData = {
      penginput: "Admin",
      tanggal: new Date().toISOString().split('T')[0],
      nama: "Ahmad Hidayat",
      alamat: "Jl. Mawar No. 12",
      zakatFitrah: {
        jiwaBeras: 4,
        berasKg: 14,
        jiwaUang: 0,
        uang: 0
      },
      zakatMaal: 500000,
      infaq: {
        beras: 2,
        uang: 100000
      },
      fidyah: {
        beras: 0,
        uang: 0
      }
    };
    
    createRecord(sampleData);
  }
};
