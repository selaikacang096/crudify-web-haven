
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-9xl font-bold text-muted/30 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          We couldn't find the page you're looking for. The page might have been removed or the URL might be incorrect.
        </p>
        <Button asChild className="flex items-center">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
