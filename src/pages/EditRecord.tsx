
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ZakatForm from "@/components/ZakatForm";
import { getRecordById } from "@/services/zakatService";
import { ZakatRecord } from "@/types/ZakatTypes";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const EditRecord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: record, isLoading, error } = useQuery({
    queryKey: ['zakatRecord', id],
    queryFn: () => id ? getRecordById(id) : null,
    onError: () => {
      toast.error("Failed to load record");
      navigate("/");
    }
  });
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading record...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !record) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Record Not Found</h2>
          <p className="text-muted-foreground mb-6">The record you're looking for doesn't exist or has been deleted.</p>
          <button 
            onClick={() => navigate("/")}
            className="text-primary hover:text-primary/80"
          >
            Return to home
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <ZakatForm initialData={record} isEdit={true} />
    </Layout>
  );
};

export default EditRecord;
