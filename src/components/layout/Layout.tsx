import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement actual logout
    navigate("/");
  };

  const handleSearch = (query: string) => {
    console.log("Search:", query);
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={handleLogout} onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Toaster />
    </div>
  );
};
