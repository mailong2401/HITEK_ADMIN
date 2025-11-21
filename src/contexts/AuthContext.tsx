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
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('🔐 Initializing auth...');
        
        // Kiểm tra session hiện tại
        const { data: { session }, error } = await Promise.race([
          supabase.auth.getSession(),
          new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)) // 3s timeout
        ]);
        
        if (!mounted) return;

        if (error) {
          console.error('Session error:', error);
          setLoading(false);
          return;
        }

        if (!session) {
          console.log('🚫 No user session found');
          setUser(null);
          setLoading(false);
          return;
        }

        console.log('👤 User session found:', session.user.email);
        await syncUserProfile(session.user);
        
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    // Lắng nghe thay đổi auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('🔄 Auth event:', event);
        
        if (session?.user) {
          console.log('👤 User authenticated:', session.user.email);
          await syncUserProfile(session.user);
        } else {
          console.log('🚫 User signed out');
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Khởi tạo auth với timeout tổng
    const timeoutId = setTimeout(() => {
      if (mounted && loading) {
        console.warn('⚠️ Auth initialization timeout, forcing completion');
        setLoading(false);
      }
    }, 10000); // 10 seconds total timeout

    initializeAuth();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  // Đồng bộ thông tin user từ Supabase với timeout
  const syncUserProfile = async (supabaseUser: any): Promise<void> => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    try {
      console.log('🔄 Syncing user profile for:', supabaseUser.email);

      // Thêm timeout cho sync process
      const syncPromise = new Promise<void>(async (resolve, reject) => {
        try {
          let userData: User;

          // Thử lấy thông tin từ bảng profiles với timeout
          const profilePromise = supabase
            .from('profiles')
            .select('*')
            .eq('id', supabaseUser.id)
            .single();

          const { data: profile, error } = await Promise.race([
            profilePromise,
            new Promise<{data: null, error: any}>((_, reject) => 
              setTimeout(() => reject(new Error('Profile query timeout')), 5000)
            )
          ]);

          if (error || !profile) {
            console.log('📝 No profile found, using auth data');
            // Nếu không có profile, tạo user từ auth data
            userData = {
              id: supabaseUser.id,
              email: supabaseUser.email!,
              name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
              role: supabaseUser.user_metadata?.role || 'user'
            };
          } else {
            console.log('✅ Profile found:', profile.name);
            // Sử dụng thông tin từ profile
            userData = {
              id: profile.id,
              email: profile.email,
              name: profile.name || supabaseUser.email?.split('@')[0] || 'User',
              role: profile.role || 'user'
            };
          }

          setUser(userData);
          console.log('👤 User set:', userData.name);
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      await syncPromise;
      
    } catch (error) {
      console.error('❌ Error syncing user profile:', error);
      // Fallback: sử dụng thông tin cơ bản từ auth
      const fallbackUser = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
        role: supabaseUser.user_metadata?.role || 'user'
      };
      setUser(fallbackUser);
      console.log('🔄 Using fallback user data');
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      setLoading(false);
      console.log('✅ Sync process completed');
    }
  };

  // Đăng nhập
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('🔐 Attempting login for:', email);

      // Demo accounts (cho testing)
      const demoAccounts: Record<string, { password: string; user: User }> = {
        'admin@hitekgroup.vn': {
          password: 'admin123',
          user: {
            id: 'demo-admin',
            email: 'admin@hitekgroup.vn',
            name: 'Admin Hitek',
            role: 'admin'
          }
        },
        'user@hitekgroup.vn': {
          password: 'user123',
          user: {
            id: 'demo-user',
            email: 'user@hitekgroup.vn',
            name: 'User Hitek',
            role: 'user'
          }
        }
      };

      // Kiểm tra demo account
      if (demoAccounts[email] && demoAccounts[email].password === password) {
        console.log('✅ Demo login successful');
        setUser(demoAccounts[email].user);
        setLoading(false);
        return true;
      }

      // Đăng nhập với Supabase với timeout
      const loginPromise = supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      const { data, error } = await Promise.race([
        loginPromise,
        new Promise<{data: null, error: any}>((_, reject) => 
          setTimeout(() => reject(new Error('Login timeout')), 10000)
        )
      ]);

      if (error) {
        console.error('❌ Supabase login error:', error.message);
        setLoading(false);
        return false;
      }

      console.log('✅ Supabase login successful');
      return true;
    } catch (error) {
      console.error('❌ Login error:', error);
      setLoading(false);
      return false;
    }
  };

  // Đăng xuất
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log('🚪 Logging out...');

      // Demo accounts - chỉ cần clear state
      if (user?.id?.startsWith('demo-')) {
        console.log('✅ Demo logout successful');
        setUser(null);
        setLoading(false);
        return;
      }

      // Supabase accounts - sign out với timeout
      const logoutPromise = supabase.auth.signOut();
      
      await Promise.race([
        logoutPromise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Logout timeout')), 5000)
        )
      ]);

      console.log('✅ Supabase logout successful');
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.error('❌ Logout error:', error);
      setUser(null);
      setLoading(false);
    }
  };

  const value: AuthContextType = {
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
