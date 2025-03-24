
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ZakatTable from "@/components/ZakatTable";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZakatRecord } from "@/types/ZakatTypes";
import { getAllRecords, initializeWithSampleData } from "@/services/zakatService";
import { PlusCircle, BarChart, Table, LayoutList } from "lucide-react";
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
    if (tabParam && (tabParam === 'dashboard' || tabParam === 'records' || tabParam === 'cards')) {
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
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border/60">
          <div>
            <h1 className="protocol-heading text-3xl">Zakat Management System</h1>
            <p className="protocol-subheading">
              Manage and track zakat contributions efficiently
            </p>
          </div>
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 flex items-center h-10 px-4 gap-2"
          >
            <Link to="/add">
              <PlusCircle className="h-5 w-5" />
              Input Data Baru
            </Link>
          </Button>
        </div>
        
        <Tabs 
          defaultValue="dashboard" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 py-2.5">
              <BarChart className="h-4 w-4" />
              <span>Rekapan</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2 py-2.5">
              <Table className="h-4 w-4" />
              <span>Tabel</span>
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-60 w-full bg-card/50 rounded-lg border border-border/30">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Loading data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-60 w-full bg-destructive/5 rounded-lg border border-destructive/30 p-6">
              <p className="text-destructive font-medium mb-4">Error loading data. Please try again.</p>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <>
              <TabsContent value="dashboard" className="space-y-6 mt-2">
                <Dashboard data={records} />
              </TabsContent>
              
              <TabsContent value="records" className="space-y-6 mt-2">
                <div className="protocol-card p-1">
                  <ZakatTable data={records} onDelete={() => refetch()} />
                </div>
              </TabsContent>
              
              <TabsContent value="cards" className="space-y-6 mt-2">
                <Button 
                  asChild
                  variant="outline" 
                  className="mb-4"
                >
                  <Link to="/list">View Full Card List</Link>
                </Button>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
