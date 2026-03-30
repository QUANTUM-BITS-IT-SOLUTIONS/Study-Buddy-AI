import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (email: string, password: string, displayName: string) => Promise<{ error?: string }>;
  logout: () => void;
  updateDisplayName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'rag_tutor_auth';
const USERS_KEY = 'rag_tutor_users';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({
          ...parsed,
          createdAt: new Date(parsed.createdAt),
        });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): Record<string, { password: string; displayName: string; createdAt: string }> => {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : {};
  };

  const saveUsers = (users: Record<string, { password: string; displayName: string; createdAt: string }>) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getUsers();
    const userRecord = users[email.toLowerCase()];

    if (!userRecord) {
      return { error: 'No account found with this email. Please sign up first.' };
    }

    if (userRecord.password !== password) {
      return { error: 'Incorrect password. Please try again.' };
    }

    const loggedInUser: User = {
      id: email.toLowerCase().replace(/[^a-z0-9]/g, ''),
      email: email.toLowerCase(),
      displayName: userRecord.displayName,
      createdAt: new Date(userRecord.createdAt),
    };

    setUser(loggedInUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));

    return {};
  };

  const signup = async (email: string, password: string, displayName: string): Promise<{ error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getUsers();
    const emailLower = email.toLowerCase();

    if (users[emailLower]) {
      return { error: 'An account with this email already exists. Please log in instead.' };
    }

    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters long.' };
    }

    const now = new Date();
    users[emailLower] = {
      password,
      displayName,
      createdAt: now.toISOString(),
    };
    saveUsers(users);

    const newUser: User = {
      id: emailLower.replace(/[^a-z0-9]/g, ''),
      email: emailLower,
      displayName,
      createdAt: now,
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

    return {};
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateDisplayName = (name: string) => {
    if (!user) return;

    const users = getUsers();
    if (users[user.email]) {
      users[user.email].displayName = name;
      saveUsers(users);
    }

    const updatedUser = { ...user, displayName: name };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateDisplayName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
