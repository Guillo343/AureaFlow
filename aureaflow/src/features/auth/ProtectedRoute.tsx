import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;

      setSession(data.session);
      setIsLoading(false);
    };

    loadSession();

    // Listener for login + logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!isMounted) return;
        setSession(newSession);
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) return null; // or a loading screen

  // Not logged in -> redirect
  if (!session) return <Navigate to="/login" replace />;

  // Logged in -> render the protected content
  return <Outlet />;
}
