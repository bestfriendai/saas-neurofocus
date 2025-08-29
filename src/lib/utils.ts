import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date utilities for ADHD-friendly time management
export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString([], { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  
  return `${hours}h ${mins}m`;
}

export function getTimeFromMinutes(minutes: number): { hours: number; minutes: number } {
  return {
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60
  };
}

export function getMinutesFromTime(hours: number, minutes: number): number {
  return hours * 60 + minutes;
}

// Task management utilities
export function getPriorityColor(priority: 'low' | 'medium' | 'high'): string {
  const colors = {
    low: 'text-green-500 border-green-500',
    medium: 'text-yellow-500 border-yellow-500',
    high: 'text-red-500 border-red-500'
  };
  return colors[priority];
}

export function getStatusColor(status: 'todo' | 'in-progress' | 'completed' | 'cancelled'): string {
  const colors = {
    todo: 'text-gray-500 bg-gray-500/10',
    'in-progress': 'text-blue-500 bg-blue-500/10',
    completed: 'text-green-500 bg-green-500/10',
    cancelled: 'text-red-500 bg-red-500/10'
  };
  return colors[status];
}

export function calculateTaskProgress(task: { subtasks: Array<{ completed: boolean }> }): number {
  if (task.subtasks.length === 0) return 0;
  const completed = task.subtasks.filter(st => st.completed).length;
  return Math.round((completed / task.subtasks.length) * 100);
}

// Focus session utilities
export function calculateFocusScore(
  plannedDuration: number,
  actualDuration: number,
  distractions: number,
  completedSuccessfully: boolean
): number {
  let score = 0;
  
  // Base score for completion
  if (completedSuccessfully) {
    score += 50;
  }
  
  // Duration adherence (max 30 points)
  const durationRatio = actualDuration / plannedDuration;
  if (durationRatio >= 0.8 && durationRatio <= 1.2) {
    score += 30;
  } else if (durationRatio >= 0.6 && durationRatio <= 1.4) {
    score += 20;
  } else {
    score += 10;
  }
  
  // Distraction penalty (max 20 points deducted)
  const distractionPenalty = Math.min(distractions * 5, 20);
  score -= distractionPenalty;
  
  return Math.max(0, Math.min(100, score));
}

// Habit tracking utilities
export function calculateStreak(entries: Array<{ date: Date; completed: boolean }>): number {
  if (entries.length === 0) return 0;
  
  const sortedEntries = entries.sort((a, b) => b.date.getTime() - a.date.getTime());
  let streak = 0;
  
  for (const entry of sortedEntries) {
    if (entry.completed) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function getHabitCompletionRate(entries: Array<{ completed: boolean }>): number {
  if (entries.length === 0) return 0;
  const completed = entries.filter(e => e.completed).length;
  return Math.round((completed / entries.length) * 100);
}

// Energy and mood utilities
export function getEnergyColor(energy: number): string {
  if (energy >= 4) return 'text-green-500';
  if (energy >= 3) return 'text-yellow-500';
  return 'text-red-500';
}

export function getMoodEmoji(mood: 'great' | 'good' | 'okay' | 'poor'): string {
  const emojis = {
    great: '😄',
    good: '🙂',
    okay: '😐',
    poor: '😔'
  };
  return emojis[mood];
}

// Productivity analytics
export function calculateProductivityScore(metrics: {
  focusTime: number;
  tasksCompleted: number;
  averageProductivity: number;
  distractions: number;
}): number {
  const focusScore = Math.min(metrics.focusTime / 240, 1) * 30; // 4 hours = max
  const taskScore = Math.min(metrics.tasksCompleted / 8, 1) * 25; // 8 tasks = max
  const qualityScore = (metrics.averageProductivity / 5) * 30; // 5 = max rating
  const distractionPenalty = Math.min(metrics.distractions / 10, 1) * 15; // max 15 penalty
  
  return Math.round(focusScore + taskScore + qualityScore - distractionPenalty);
}

// Time zone utilities
export function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset();
}

export function convertToUserTimezone(date: Date, userTimezone?: string): Date {
  if (!userTimezone) return date;
  
  // This is a simplified implementation
  // In a real app, you'd use a library like date-fns-tz
  return new Date(date.toLocaleString('en-US', { timeZone: userTimezone }));
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidDuration(duration: number): boolean {
  return duration > 0 && duration <= 480; // Max 8 hours
}

export function isValidTaskTitle(title: string): boolean {
  return title.trim().length >= 2 && title.trim().length <= 100;
}

// Local storage utilities
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
}

// Debounce utility for search and API calls
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout;
  
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

// Random utilities for demos and testing
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Color utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

// ADHD-specific utilities
export function getOptimalTaskDuration(difficulty: 'easy' | 'medium' | 'hard', energy: number): number {
  const baseDurations = {
    easy: 15,
    medium: 25,
    hard: 50
  };
  
  const energyMultiplier = energy / 3; // Normalize to 0.33-1.67 range
  return Math.round(baseDurations[difficulty] * energyMultiplier);
}

export function suggestBreakType(sessionLength: number, currentEnergy: number): 'micro' | 'short' | 'long' {
  if (sessionLength <= 15) return 'micro';
  if (sessionLength <= 45 || currentEnergy >= 4) return 'short';
  return 'long';
}

export function getBreakDuration(type: 'micro' | 'short' | 'long'): number {
  const durations = {
    micro: 2,
    short: 5,
    long: 15
  };
  return durations[type];
}

// Export commonly used constants
export const POMODORO_LENGTH = 25;
export const SHORT_BREAK_LENGTH = 5;
export const LONG_BREAK_LENGTH = 15;
export const SESSIONS_UNTIL_LONG_BREAK = 4;

export const ENERGY_LEVELS = [
  { value: 1, label: 'Very Low', color: 'text-red-500' },
  { value: 2, label: 'Low', color: 'text-red-400' },
  { value: 3, label: 'Medium', color: 'text-yellow-500' },
  { value: 4, label: 'High', color: 'text-green-400' },
  { value: 5, label: 'Very High', color: 'text-green-500' }
];

export const TASK_CATEGORIES = [
  { value: 'work', label: 'Work', color: 'blue' },
  { value: 'personal', label: 'Personal', color: 'green' },
  { value: 'health', label: 'Health', color: 'red' },
  { value: 'learning', label: 'Learning', color: 'purple' },
  { value: 'creative', label: 'Creative', color: 'pink' },
  { value: 'admin', label: 'Admin', color: 'gray' },
  { value: 'social', label: 'Social', color: 'yellow' },
  { value: 'home', label: 'Home', color: 'orange' }
];

export const HABIT_CATEGORIES = [
  { value: 'health', label: 'Health & Wellness', icon: '🏃‍♂️' },
  { value: 'productivity', label: 'Productivity', icon: '⚡' },
  { value: 'learning', label: 'Learning', icon: '📚' },
  { value: 'social', label: 'Social', icon: '👥' },
  { value: 'creative', label: 'Creative', icon: '🎨' },
  { value: 'mindfulness', label: 'Mindfulness', icon: '🧘‍♀️' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'home', label: 'Home', icon: '🏠' }
];

export const FOCUS_TYPES = [
  { value: 'pomodoro', label: 'Pomodoro', duration: 25, description: 'Classic 25-minute focus blocks' },
  { value: 'deep-work', label: 'Deep Work', duration: 90, description: 'Extended focus for complex tasks' },
  { value: 'quick-task', label: 'Quick Task', duration: 10, description: 'Short bursts for simple tasks' }
];

export const TIME_BLOCKS = [
  { value: 'morning', label: 'Morning (6-12)', hours: [6, 7, 8, 9, 10, 11] },
  { value: 'afternoon', label: 'Afternoon (12-18)', hours: [12, 13, 14, 15, 16, 17] },
  { value: 'evening', label: 'Evening (18-24)', hours: [18, 19, 20, 21, 22, 23] },
  { value: 'late', label: 'Late Night (0-6)', hours: [0, 1, 2, 3, 4, 5] }
];