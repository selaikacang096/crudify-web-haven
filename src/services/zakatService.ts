
import { supabase } from "@/integrations/supabase/client";
import { ZakatFormData, ZakatRecord } from "@/types/ZakatTypes";

// Get all records from Supabase
export const getAllRecords = async (): Promise<ZakatRecord[]> => {
  const { data, error } = await supabase
    .from('zakat_records')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error("Error fetching records:", error);
    throw error;
  }

  // Map the database records to our application's format
  return data.map(record => ({
    id: record.id,
    penginput: record.penginput,
    tanggal: record.tanggal,
    nama: record.nama,
    alamat: record.alamat,
    zakatFitrah: {
      jiwaBeras: record.zakat_fitrah_jiwa_beras,
      berasKg: record.zakat_fitrah_beras_kg,
      jiwaUang: record.zakat_fitrah_jiwa_uang,
      uang: record.zakat_fitrah_uang
    },
    zakatMaal: record.zakat_maal,
    infaq: {
      beras: record.infaq_beras,
      uang: record.infaq_uang
    },
    fidyah: {
      beras: record.fidyah_beras,
      uang: record.fidyah_uang
    },
    totalBeras: record.total_beras,
    totalUang: record.total_uang,
    createdAt: record.created_at,
    updatedAt: record.updated_at
  }));
};

// Get a single record by ID
export const getRecordById = async (id: string): Promise<ZakatRecord | null> => {
  const { data, error } = await supabase
    .from('zakat_records')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found
      return null;
    }
    console.error("Error fetching record:", error);
    throw error;
  }

  if (!data) return null;

  return {
    id: data.id,
    penginput: data.penginput,
    tanggal: data.tanggal,
    nama: data.nama,
    alamat: data.alamat,
    zakatFitrah: {
      jiwaBeras: data.zakat_fitrah_jiwa_beras,
      berasKg: data.zakat_fitrah_beras_kg,
      jiwaUang: data.zakat_fitrah_jiwa_uang,
      uang: data.zakat_fitrah_uang
    },
    zakatMaal: data.zakat_maal,
    infaq: {
      beras: data.infaq_beras,
      uang: data.infaq_uang
    },
    fidyah: {
      beras: data.fidyah_beras,
      uang: data.fidyah_uang
    },
    totalBeras: data.total_beras,
    totalUang: data.total_uang,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
};

// Create a new record
export const createRecord = async (formData: ZakatFormData): Promise<ZakatRecord> => {
  // Calculate totals
  const totalBeras = 
    formData.zakatFitrah.berasKg + 
    formData.infaq.beras + 
    formData.fidyah.beras;
  
  const totalUang = 
    formData.zakatFitrah.uang + 
    formData.zakatMaal + 
    formData.infaq.uang + 
    formData.fidyah.uang;

  const { data, error } = await supabase
    .from('zakat_records')
    .insert({
      penginput: formData.penginput,
      tanggal: formData.tanggal,
      nama: formData.nama,
      alamat: formData.alamat,
      zakat_fitrah_jiwa_beras: formData.zakatFitrah.jiwaBeras,
      zakat_fitrah_beras_kg: formData.zakatFitrah.berasKg,
      zakat_fitrah_jiwa_uang: formData.zakatFitrah.jiwaUang,
      zakat_fitrah_uang: formData.zakatFitrah.uang,
      zakat_maal: formData.zakatMaal,
      infaq_beras: formData.infaq.beras,
      infaq_uang: formData.infaq.uang,
      fidyah_beras: formData.fidyah.beras,
      fidyah_uang: formData.fidyah.uang,
      total_beras: totalBeras,
      total_uang: totalUang
    })
    .select()
    .single();
  
  if (error) {
    console.error("Error creating record:", error);
    throw error;
  }

  return {
    id: data.id,
    penginput: data.penginput,
    tanggal: data.tanggal,
    nama: data.nama,
    alamat: data.alamat,
    zakatFitrah: {
      jiwaBeras: data.zakat_fitrah_jiwa_beras,
      berasKg: data.zakat_fitrah_beras_kg,
      jiwaUang: data.zakat_fitrah_jiwa_uang,
      uang: data.zakat_fitrah_uang
    },
    zakatMaal: data.zakat_maal,
    infaq: {
      beras: data.infaq_beras,
      uang: data.infaq_uang
    },
    fidyah: {
      beras: data.fidyah_beras,
      uang: data.fidyah_uang
    },
    totalBeras: data.total_beras,
    totalUang: data.total_uang,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
};

// Update an existing record
export const updateRecord = async (id: string, formData: ZakatFormData): Promise<ZakatRecord | null> => {
  // Calculate totals
  const totalBeras = 
    formData.zakatFitrah.berasKg + 
    formData.infaq.beras + 
    formData.fidyah.beras;
  
  const totalUang = 
    formData.zakatFitrah.uang + 
    formData.zakatMaal + 
    formData.infaq.uang + 
    formData.fidyah.uang;

  const { data, error } = await supabase
    .from('zakat_records')
    .update({
      penginput: formData.penginput,
      tanggal: formData.tanggal,
      nama: formData.nama,
      alamat: formData.alamat,
      zakat_fitrah_jiwa_beras: formData.zakatFitrah.jiwaBeras,
      zakat_fitrah_beras_kg: formData.zakatFitrah.berasKg,
      zakat_fitrah_jiwa_uang: formData.zakatFitrah.jiwaUang,
      zakat_fitrah_uang: formData.zakatFitrah.uang,
      zakat_maal: formData.zakatMaal,
      infaq_beras: formData.infaq.beras,
      infaq_uang: formData.infaq.uang,
      fidyah_beras: formData.fidyah.beras,
      fidyah_uang: formData.fidyah.uang,
      total_beras: totalBeras,
      total_uang: totalUang,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating record:", error);
    throw error;
  }

  return {
    id: data.id,
    penginput: data.penginput,
    tanggal: data.tanggal,
    nama: data.nama,
    alamat: data.alamat,
    zakatFitrah: {
      jiwaBeras: data.zakat_fitrah_jiwa_beras,
      berasKg: data.zakat_fitrah_beras_kg,
      jiwaUang: data.zakat_fitrah_jiwa_uang,
      uang: data.zakat_fitrah_uang
    },
    zakatMaal: data.zakat_maal,
    infaq: {
      beras: data.infaq_beras,
      uang: data.infaq_uang
    },
    fidyah: {
      beras: data.fidyah_beras,
      uang: data.fidyah_uang
    },
    totalBeras: data.total_beras,
    totalUang: data.total_uang,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
};

// Delete a record
export const deleteRecord = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('zakat_records')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
  
  return true;
};

// Initialize with sample data if empty
export const initializeWithSampleData = async (): Promise<void> => {
  const { count, error } = await supabase
    .from('zakat_records')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error("Error checking for records:", error);
    return;
  }
  
  if (count === 0) {
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
    
    await createRecord(sampleData);
  }
};
