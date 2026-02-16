import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

type Profile = {
  id: string;
  role: string;
  name?: string;
  onboarding_done?: boolean;
  access_released?: boolean;
};

type ProfileContextType = {
  user: Profile | null;
  isLoading: boolean;
};

const ProfileContext = createContext<ProfileContextType>({
  user: null,
  isLoading: true,
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("id, role, name, onboarding_done, access_released")
        .eq("id", session.user.id)
        .single();

      if (!mounted) return;

      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        if (!session) {
          setUser(null);
          return;
        }

        const { data } = await supabase
          .from("users")
          .select("id, role, name, onboarding_done, access_released")
          .eq("id", session.user.id)
          .single();

        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ user, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  return useContext(ProfileContext);
}


