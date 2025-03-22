
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ZakatForm from "@/components/ZakatForm";
import { useQuery } from "@tanstack/react-query";
import { getRecordById } from "@/services/zakatService";
import { toast } from "sonner";

const EditRecord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
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
          initialData={record} 
          isEdit={true}
        />
      </div>
    </Layout>
  );
};

export default EditRecord;
