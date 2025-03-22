
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ZakatTable from "@/components/ZakatTable";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZakatRecord } from "@/types/ZakatTypes";
import { getAllRecords, initializeWithSampleData } from "@/services/zakatService";
import { PlusCircle, BarChart, Table } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const Index: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Load records using React Query
  const { data: records = [], refetch, isLoading, error } = useQuery({
    queryKey: ['zakatRecords'],
    queryFn: getAllRecords,
    meta: {
      onError: () => {
        toast.error("Failed to load records. Please try again later.");
      }
    }
  });
  
  // Initialize sample data if needed
  useEffect(() => {
    initializeWithSampleData().catch(err => {
      console.error("Error initializing sample data:", err);
    });
  }, []);
  
  useEffect(() => {
    // Check for tab param in URL
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && (tabParam === 'dashboard' || tabParam === 'records')) {
      setActiveTab(tabParam);
    }
  }, [location.search]);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL without reloading the page
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', value);
    
    // Preserve other query params except scrollToBottom
    if (searchParams.has('scrollToBottom')) {
      searchParams.delete('scrollToBottom');
    }
    
    navigate(`?${searchParams.toString()}`, { replace: true });
  };
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Zakat Management System</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track zakat contributions efficiently
            </p>
          </div>
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 flex items-center h-10"
          >
            <Link to="/add">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Record
            </Link>
          </Button>
        </div>
        
        <Tabs 
          defaultValue="dashboard" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 sm:grid-cols-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <Table className="h-4 w-4" />
              <span>Records</span>
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center p-6 text-destructive">
              <p>Error loading data. Please try again.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <>
              <TabsContent value="dashboard" className="space-y-4">
                <Dashboard data={records} />
              </TabsContent>
              
              <TabsContent value="records" className="space-y-4">
                <ZakatTable data={records} onDelete={() => refetch()} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
