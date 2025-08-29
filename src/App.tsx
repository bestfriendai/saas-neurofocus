import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';

// Components
import LoadingScreen from '@/components/LoadingScreen';

// Hooks and utilities
import { onAuthStateChanged } from '@/lib/firebase';

// Types
import type { User } from '@/types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Initialize auth state listener
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Transform Firebase user to app user
        const appUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'ADHD Warrior',
          avatar: firebaseUser.photoURL,
          preferences: {
            theme: 'dark',
            notifications: {
              email: true,
              push: true,
              taskReminders: true,
              focusSessionAlerts: true,
              dailyDigest: true,
              weeklyReport: false
            },
            focus: {
              pomodoroLength: 25,
              shortBreakLength: 5,
              longBreakLength: 15,
              sessionsUntilLongBreak: 4,
              autoStartBreaks: false,
              autoStartPomodoros: false,
              soundEnabled: true,
              soundVolume: 0.7
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            dateFormat: 'MM/dd/yyyy',
            weekStartsOn: 1
          },
          subscription: {
            plan: 'free',
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
          },
          createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
          lastLogin: new Date()
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      
      setAuthChecked(true);
      setLoading(false);
    });

    // Demo mode for development - auto-login after 2 seconds
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        if (!authChecked) {
          const demoUser: User = {
            id: 'demo-user',
            email: 'demo@neurofocus.com',
            displayName: 'Alex (Demo)',
            preferences: {
              theme: 'dark',
              notifications: {
                email: false,
                push: true,
                taskReminders: true,
                focusSessionAlerts: true,
                dailyDigest: false,
                weeklyReport: false
              },
              focus: {
                pomodoroLength: 25,
                shortBreakLength: 5,
                longBreakLength: 15,
                sessionsUntilLongBreak: 4,
                autoStartBreaks: false,
                autoStartPomodoros: false,
                soundEnabled: true,
                soundVolume: 0.7
              },
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              dateFormat: 'MM/dd/yyyy',
              weekStartsOn: 1
            },
            subscription: {
              plan: 'premium',
              status: 'active',
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            },
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            lastLogin: new Date()
          };
          
          setUser(demoUser);
          setAuthChecked(true);
          setLoading(false);
        }
      }, 2000);
    }

    return () => unsubscribe();
  }, [authChecked]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Router>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              {/* Public routes */}
              <Route 
                path="/" 
                element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} 
              />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={user ? <Dashboard /> : <Navigate to="/" replace />} 
              />
              
              {/* Catch-all redirect */}
              <Route 
                path="*" 
                element={<Navigate to={user ? "/dashboard" : "/"} replace />} 
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Router>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--popover))',
            color: 'hsl(var(--popover-foreground))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--primary-foreground))',
            },
          },
          error: {
            iconTheme: {
              primary: 'hsl(var(--destructive))',
              secondary: 'hsl(var(--destructive-foreground))',
            },
          },
        }}
      />
    </div>
  );
}

export default App;