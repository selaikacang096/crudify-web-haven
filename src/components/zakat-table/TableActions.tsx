
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface TableActionsProps {
  recordId: string;
  onDelete: (id: string) => void;
}

const TableActions: React.FC<TableActionsProps> = ({ recordId, onDelete }) => {
  let navigate;
  
  try {
    navigate = useNavigate();
  } catch (e) {
    // Fallback for usage outside router context
    navigate = (path: string) => {
      console.warn(`Navigation to ${path} not available in this context`);
    };
  }
  
  const handleEditClick = () => {
    try {
      navigate(`/edit/${recordId}`);
    } catch (e) {
      console.warn(`Navigation to /edit/${recordId} failed, likely outside router context`);
    }
  };
  
  return (
    <div className="flex justify-center space-x-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleEditClick}
        className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
      >
        <Edit size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onDelete(recordId)}
        className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

export default TableActions;
