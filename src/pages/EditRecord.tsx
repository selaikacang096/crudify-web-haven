
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ZakatForm from "@/components/ZakatForm";
import { getRecordById } from "@/utils/zakatStorage";
import { ZakatRecord } from "@/types/ZakatTypes";
import { toast } from "sonner";

const EditRecord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [record, setRecord] = useState<ZakatRecord | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const recordData = getRecordById(id);
      if (recordData) {
        setRecord(recordData);
      } else {
        toast.error("Record not found");
        navigate("/");
      }
    }
    setLoading(false);
  }, [id, navigate]);
  
  if (loading) {
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
  
  if (!record) {
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
