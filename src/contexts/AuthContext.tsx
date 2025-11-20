import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra session khi app khởi động
    checkCurrentUser();
    
    // Lắng nghe thay đổi auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session:', session);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking current user:', error);
      setLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      // Thử lấy từ bảng profiles trước
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // Nếu bảng profiles không tồn tại hoặc không có data, tạo user từ auth
      if (error || !data) {
        console.log('No profile found, using auth user data');
        const { data: authData } = await supabase.auth.getUser();
        if (authData.user) {
          const userData: User = {
            id: authData.user.id,
            email: authData.user.email!,
            name: authData.user.user_metadata?.name || authData.user.email!.split('@')[0],
            role: authData.user.user_metadata?.role || 'user'
          };
          setUser(userData);
        }
        return;
      }

      const userData: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role
      };
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Fallback: tạo user từ auth data
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (authData.user) {
          const userData: User = {
            id: authData.user.id,
            email: authData.user.email!,
            name: authData.user.user_metadata?.name || authData.user.email!.split('@')[0],
            role: authData.user.user_metadata?.role || 'user'
          };
          setUser(userData);
        }
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
      }
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login with:', email);
      
      // Tạm thời cho phép login với tài khoản demo
      if (email === 'admin@hitekgroup.vn' && password === 'admin123') {
        console.log('Using demo account');
        const demoUser: User = {
          id: 'demo-1',
          email: 'admin@hitekgroup.vn',
          name: 'Admin Hitek',
          role: 'admin'
        };
        setUser(demoUser);
        return true;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase login error:', error);
        return false;
      }

      console.log('Login successful:', data);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('Logging out...');
      // Nếu là demo user, chỉ cần clear state
      if (user?.id === 'demo-1') {
        setUser(null);
        return;
      }

      // Nếu là supabase user, sign out
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Đảm bảo luôn clear user state ngay cả khi có lỗi
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
