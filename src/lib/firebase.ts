// Firebase configuration for NeuroFocus
// This is a template - replace with your actual Firebase config

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "neurofocus-demo.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "neurofocus-demo",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "neurofocus-demo.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456789",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);

// Initialize Analytics only in production and in browser
export const analytics = typeof window !== 'undefined' && process.env.NODE_ENV === 'production' 
  ? getAnalytics(app) 
  : null;

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
  // Auth emulator
  if (!auth.config.emulator) {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  }
  
  // Firestore emulator
  if (!db._settings?.host?.includes('localhost')) {
    connectFirestoreEmulator(db, 'localhost', 8080);
  }
  
  // Functions emulator
  if (!functions.app.options.projectId?.includes('demo')) {
    connectFunctionsEmulator(functions, 'localhost', 5001);
  }
  
  // Storage emulator
  if (!storage.app.options.projectId?.includes('demo')) {
    connectStorageEmulator(storage, 'localhost', 9199);
  }
}

export default app;

// Collection references for type safety
export const collections = {
  users: 'users',
  tasks: 'tasks',
  projects: 'projects',
  habits: 'habits',
  focusSessions: 'focusSessions',
  timeBlocks: 'timeBlocks',
  notifications: 'notifications',
  insights: 'insights',
  achievements: 'achievements',
  userAchievements: 'userAchievements',
  productivityMetrics: 'productivityMetrics',
  weeklyReports: 'weeklyReports'
} as const;

// Firestore document paths
export const getDocPath = {
  user: (userId: string) => `${collections.users}/${userId}`,
  task: (userId: string, taskId: string) => `${collections.users}/${userId}/${collections.tasks}/${taskId}`,
  project: (userId: string, projectId: string) => `${collections.users}/${userId}/${collections.projects}/${projectId}`,
  habit: (userId: string, habitId: string) => `${collections.users}/${userId}/${collections.habits}/${habitId}`,
  focusSession: (userId: string, sessionId: string) => `${collections.users}/${userId}/${collections.focusSessions}/${sessionId}`,
  timeBlock: (userId: string, blockId: string) => `${collections.users}/${userId}/${collections.timeBlocks}/${blockId}`,
  notification: (userId: string, notificationId: string) => `${collections.users}/${userId}/${collections.notifications}/${notificationId}`,
  insight: (userId: string, insightId: string) => `${collections.users}/${userId}/${collections.insights}/${insightId}`,
  userAchievement: (userId: string, achievementId: string) => `${collections.users}/${userId}/${collections.userAchievements}/${achievementId}`,
  productivityMetric: (userId: string, date: string) => `${collections.users}/${userId}/${collections.productivityMetrics}/${date}`,
  weeklyReport: (userId: string, weekStart: string) => `${collections.users}/${userId}/${collections.weeklyReports}/${weekStart}`
};

// Firestore collection paths for queries
export const getCollectionPath = {
  userTasks: (userId: string) => `${collections.users}/${userId}/${collections.tasks}`,
  userProjects: (userId: string) => `${collections.users}/${userId}/${collections.projects}`,
  userHabits: (userId: string) => `${collections.users}/${userId}/${collections.habits}`,
  userFocusSessions: (userId: string) => `${collections.users}/${userId}/${collections.focusSessions}`,
  userTimeBlocks: (userId: string) => `${collections.users}/${userId}/${collections.timeBlocks}`,
  userNotifications: (userId: string) => `${collections.users}/${userId}/${collections.notifications}`,
  userInsights: (userId: string) => `${collections.users}/${userId}/${collections.insights}`,
  userAchievements: (userId: string) => `${collections.users}/${userId}/${collections.userAchievements}`,
  userProductivityMetrics: (userId: string) => `${collections.users}/${userId}/${collections.productivityMetrics}`,
  userWeeklyReports: (userId: string) => `${collections.users}/${userId}/${collections.weeklyReports}`
};

// Firebase error handling
export const handleFirebaseError = (error: any): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No user found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'permission-denied':
      return 'You don\'t have permission to perform this action.';
    case 'not-found':
      return 'The requested document was not found.';
    case 'already-exists':
      return 'A document with this ID already exists.';
    case 'resource-exhausted':
      return 'Quota exceeded. Please try again later.';
    case 'unauthenticated':
      return 'You need to be signed in to perform this action.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};

// Firestore timestamp helpers
export const serverTimestamp = () => {
  const { serverTimestamp } = require('firebase/firestore');
  return serverTimestamp();
};

export const timestampToDate = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  if (timestamp?.seconds) {
    return new Date(timestamp.seconds * 1000);
  }
  return new Date(timestamp);
};

// Auth state observer
export const onAuthStateChanged = (callback: (user: any) => void) => {
  const { onAuthStateChanged } = require('firebase/auth');
  return onAuthStateChanged(auth, callback);
};

// Common Firestore operations
export const firestoreOperations = {
  // Get a single document
  getDoc: async (path: string) => {
    const { doc, getDoc } = await import('firebase/firestore');
    const docRef = doc(db, path);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  },

  // Get multiple documents
  getDocs: async (path: string) => {
    const { collection, getDocs } = await import('firebase/firestore');
    const collectionRef = collection(db, path);
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Add a document
  addDoc: async (path: string, data: any) => {
    const { collection, addDoc } = await import('firebase/firestore');
    const collectionRef = collection(db, path);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  },

  // Set a document
  setDoc: async (path: string, data: any) => {
    const { doc, setDoc } = await import('firebase/firestore');
    const docRef = doc(db, path);
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  // Update a document
  updateDoc: async (path: string, data: any) => {
    const { doc, updateDoc } = await import('firebase/firestore');
    const docRef = doc(db, path);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  // Delete a document
  deleteDoc: async (path: string) => {
    const { doc, deleteDoc } = await import('firebase/firestore');
    const docRef = doc(db, path);
    await deleteDoc(docRef);
  },

  // Listen to real-time updates
  onSnapshot: (path: string, callback: (data: any[]) => void) => {
    const { collection, onSnapshot } = require('firebase/firestore');
    const collectionRef = collection(db, path);
    return onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(data);
    });
  }
};