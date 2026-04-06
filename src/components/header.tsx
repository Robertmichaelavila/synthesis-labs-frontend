'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@/hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGetStarted = () => router.push('/login');
  const handleDashboard = () => {
    router.push('/dashboard');
    setDropdownOpen(false);
  };
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
    router.push('/');
    setDropdownOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-4 flex items-center justify-between">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div>
          <a href="/">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              SYNTHESIS LABS
            </h1>
          </a>
        </div>
        <nav className="hidden lg:block">
          <ul className="flex space-x-12">
            <li><a href="/features" className="text-gray-700 dark:text-gray-300 hover:text-gray-500">FEATURES</a></li>
            <li><a href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-gray-500">PRICING</a></li>
            <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-500">ABOUT</a></li>
            <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-500">SUPPORT</a></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <AccountCircleIcon />
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleDashboard}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <DashboardIcon className="mr-2" style={{ fontSize: 18 }} />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      toggleTheme();
                      setDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {theme === 'dark' ? (
                      <>
                        <LightModeIcon className="mr-2" style={{ fontSize: 18 }} />
                        Modo Claro
                      </>
                    ) : (
                      <>
                        <DarkModeIcon className="mr-2" style={{ fontSize: 18 }} />
                        Modo Escuro
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogoutIcon className="mr-2" style={{ fontSize: 18 }} />
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}