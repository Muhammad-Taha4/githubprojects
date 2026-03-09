import React, { createContext, useState, useEffect } from 'react';
import { apiFetch } from '../config/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, check if token exists and fetch user
  useEffect(() => {
    const token = localStorage.getItem('ishine_token');
    if (token) {
      apiFetch('/auth/me')
        .then(data => {
          setUser(data);
          // Set user in localStorage as well for quick access (optional)
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch(() => {
          // Token invalid/expired — clear it
          localStorage.removeItem('ishine_token');
          localStorage.removeItem('user');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('ishine_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Show nothing until auth check is complete
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
        <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Verifying Identity...</p>
      </div>
    </div>
  );

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
