import React, { useEffect, useState } from "react";
import { useSiteAuth } from "../contexts/SiteAuthContext";
import SitePasswordForm from "../components/SitePasswordForm";
import ContentBrowser from "../components/ContentBrowser";
import Footer from "../components/Footer";
import { Video, Loader2 } from "lucide-react";

const Landing: React.FC = () => {
  const { authenticated, login, loading, error, logout } = useSiteAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  // Debug logs
  useEffect(() => {
    console.log("Landing component rendering");
    console.log("Authentication state:", authenticated);
    console.log("Loading state:", loading);
  }, [authenticated, loading]);

  const handleLogin = async (password: string) => {
    console.log("Login attempt initiated with password:", password);
    setIsAuthenticating(true);
    
    try {
      const success = await login(password);
      console.log("Login result:", success);
      
      if (!success) {
        console.log("Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Determine what to render based on authentication state
  const renderContent = () => {
    // If authenticated, show content browser
    if (authenticated) {
      console.log("Rendering ContentBrowser");
      return <ContentBrowser onLogout={logout} />;
    }
    
    // If not authenticated, show login form
    console.log("Rendering login form");
    return (
      <div className="flex-grow flex flex-col items-center justify-center bg-neutral-50">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-white rounded-full p-4">
                <Video className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-2">SyncView</h1>
            <p className="text-neutral-600">Private, secure two-person video sync platform</p>
          </div>
          
          <SitePasswordForm
            onSubmit={handleLogin}
            loading={loading || isAuthenticating}
            error={error}
          />
        </div>
        
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {renderContent()}
    </div>
  );
};

export default Landing;