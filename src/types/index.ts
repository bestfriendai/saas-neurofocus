export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  preferences: UserPreferences;
  subscription: Subscription;
  createdAt: Date;
  lastLogin: Date;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  notifications: NotificationSettings;
  focus: FocusSettings;
  timezone: string;
  dateFormat: string;
  weekStartsOn: 0 | 1; // 0 = Sunday, 1 = Monday
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  taskReminders: boolean;
  focusSessionAlerts: boolean;
  dailyDigest: boolean;
  weeklyReport: boolean;
}

export interface FocusSettings {
  pomodoroLength: number; // minutes
  shortBreakLength: number; // minutes
  longBreakLength: number; // minutes
  sessionsUntilLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
  soundVolume: number;
}

export interface Subscription {
  plan: 'free' | 'premium' | 'team';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  currentPeriodEnd: Date;
  trialEnd?: Date;
  customerId?: string;
  subscriptionId?: string;
}

// Task Management Types
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  category: string;
  tags: string[];
  dueDate?: Date;
  estimatedDuration?: number; // minutes
  actualDuration?: number; // minutes
  subtasks: Subtask[];
  dependencies: string[]; // task IDs
  userId: string;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  isRecurring?: boolean;
  recurringPattern?: RecurringPattern;
  energyLevel: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface RecurringPattern {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  daysOfWeek?: number[];
  dayOfMonth?: number;
  endDate?: Date;
  occurrences?: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  status: 'active' | 'completed' | 'archived';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
  progress: number; // 0-100
}

// Time Management Types
export interface TimeBlock {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  category: string;
  taskId?: string;
  color: string;
  userId: string;
  type: 'focus' | 'break' | 'meeting' | 'buffer';
  isRecurring?: boolean;
  recurringPattern?: RecurringPattern;
}

export interface FocusSession {
  id: string;
  taskId?: string;
  startTime: Date;
  endTime?: Date;
  plannedDuration: number; // minutes
  actualDuration?: number; // minutes
  type: 'pomodoro' | 'deep-work' | 'quick-task';
  completedSuccessfully: boolean;
  distractions: Distraction[];
  notes?: string;
  userId: string;
  mood: 'great' | 'good' | 'okay' | 'poor';
  energyBefore: number; // 1-5
  energyAfter: number; // 1-5
  productivity: number; // 1-5
}

export interface Distraction {
  id: string;
  timestamp: Date;
  type: 'internal' | 'external';
  description?: string;
  severity: 'low' | 'medium' | 'high';
}

// Habit Tracking Types
export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: string;
  frequency: HabitFrequency;
  targetValue?: number;
  unit?: string;
  color: string;
  icon: string;
  userId: string;
  createdAt: Date;
  isActive: boolean;
  streak: number;
  longestStreak: number;
  totalCompletions: number;
}

export interface HabitFrequency {
  type: 'daily' | 'weekly' | 'monthly';
  daysOfWeek?: number[];
  timesPerPeriod?: number;
}

export interface HabitEntry {
  id: string;
  habitId: string;
  date: Date;
  value: number;
  completed: boolean;
  notes?: string;
  mood?: 'great' | 'good' | 'okay' | 'poor';
}

// Analytics Types
export interface ProductivityMetrics {
  userId: string;
  date: Date;
  focusTime: number; // minutes
  tasksCompleted: number;
  tasksCreated: number;
  averageFocusSession: number; // minutes
  distractions: number;
  productivity: number; // 1-5 average
  mood: number; // 1-5 average
  energy: number; // 1-5 average
  habitsCompleted: number;
  habitsTotal: number;
}

export interface WeeklyReport {
  userId: string;
  weekStart: Date;
  weekEnd: Date;
  totalFocusTime: number;
  tasksCompleted: number;
  averageProductivity: number;
  topCategory: string;
  improvements: string[];
  achievements: string[];
  habitsStreak: Record<string, number>;
  generatedAt: Date;
}

// AI Integration Types
export interface AIInsight {
  id: string;
  userId: string;
  type: 'productivity' | 'habit' | 'focus' | 'energy' | 'mood';
  title: string;
  content: string;
  actionable: boolean;
  actionItems?: string[];
  confidence: number; // 0-1
  createdAt: Date;
  isRead: boolean;
  category: string;
}

export interface AIRecommendation {
  id: string;
  userId: string;
  type: 'task' | 'schedule' | 'habit' | 'break';
  title: string;
  description: string;
  reasoning: string;
  priority: number; // 1-5
  accepted?: boolean;
  implementedAt?: Date;
  createdAt: Date;
}

// Calendar Integration Types
export interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  description?: string;
  attendees?: string[];
  source: 'google' | 'outlook' | 'manual';
  externalId?: string;
  userId: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'task' | 'focus' | 'habit' | 'achievement' | 'insight';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
  createdAt: Date;
  scheduledFor?: Date;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: AchievementRequirement;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementRequirement {
  type: 'focus_time' | 'tasks_completed' | 'streak' | 'habit_consistency' | 'productivity_score';
  value: number;
  period?: 'day' | 'week' | 'month' | 'year' | 'all_time';
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  isNew: boolean;
  progress?: number; // 0-1 for partially completed achievements
}

// Export utility types
export type TaskStatus = Task['status'];
export type TaskPriority = Task['priority'];
export type FocusSessionType = FocusSession['type'];
export type NotificationType = Notification['type'];
export type SubscriptionPlan = Subscription['plan'];
export type SubscriptionStatus = Subscription['status'];

// API Response types
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Store state types
export interface AppState {
  user: User | null;
  tasks: Task[];
  projects: Project[];
  habits: Habit[];
  focusSessions: FocusSession[];
  timeBlocks: TimeBlock[];
  notifications: Notification[];
  insights: AIInsight[];
  isLoading: boolean;
  error: string | null;
}

// Component prop types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface FormProps<T = unknown> extends ComponentProps {
  onSubmit: (data: T) => void | Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<T>;
  isLoading?: boolean;
}