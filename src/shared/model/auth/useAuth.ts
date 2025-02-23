import { useEffect, useState } from "react";
import { createClient } from "@/shared/utils/supabase/client";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user && !error);
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isCheckingAuth,
  };
};
