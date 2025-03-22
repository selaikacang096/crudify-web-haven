
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ZakatForm from "@/components/ZakatForm";
import { useZakatForm } from "@/hooks/useZakatForm";
import { getRecordById, updateRecord } from "@/services/zakatService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const EditRecord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { formData, setFormData, resetForm } = useZakatForm();
  
  const { data: record, isLoading, error } = useQuery({
    queryKey: ['zakatRecord', id],
    queryFn: () => getRecordById(id as string),
    enabled: !!id,
    meta: {
      onError: () => {
        toast.error("Failed to load record data");
      }
    }
  });
  
  useEffect(() => {
    if (record) {
      setFormData({
        penginput: record.penginput,
        tanggal: record.tanggal,
        nama: record.nama,
        alamat: record.alamat,
        zakatFitrah: { ...record.zakatFitrah },
        zakatMaal: record.zakatMaal,
        infaq: { ...record.infaq },
        fidyah: { ...record.fidyah },
      });
    }
  }, [record, setFormData]);
  
  const handleSubmit = async (data: typeof formData) => {
    if (!id) return;
    
    try {
      const updated = await updateRecord(id, data);
      if (updated) {
        toast.success("Record updated successfully");
        navigate('/?tab=records', { replace: true });
      }
    } catch (error) {
      console.error("Error updating record:", error);
      toast.error("Failed to update record");
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }
  
  if (error || !id) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Record</h2>
          <p className="mb-6">The record you're trying to edit could not be found or an error occurred.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Back to Home
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Zakat Record</h1>
        <ZakatForm 
          initialData={formData} 
          onSubmit={handleSubmit} 
          onReset={resetForm}
          isEdit={true}
        />
      </div>
    </Layout>
  );
};

export default EditRecord;
