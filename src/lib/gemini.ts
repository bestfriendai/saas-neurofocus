// Gemini AI integration for NeuroFocus
// Provides ADHD-specific productivity insights and recommendations

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Task, FocusSession, ProductivityMetrics, AIInsight, AIRecommendation } from '@/types';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || 'demo-api-key');

// System prompts optimized for ADHD productivity
const SYSTEM_PROMPTS = {
  taskBreakdown: `You are an ADHD productivity expert. Your role is to help break down complex tasks into smaller, manageable chunks that work well with ADHD brains. 

Key principles:
- Break tasks into 5-25 minute chunks
- Make each subtask specific and actionable
- Consider energy levels and executive function challenges
- Suggest appropriate break intervals
- Include dopamine-boosting elements when possible

Respond with structured, practical advice that reduces overwhelm.`,

  focusInsights: `You are an ADHD specialist analyzing focus patterns. Provide insights about:
- Optimal focus times based on patterns
- Energy management strategies
- Distraction mitigation techniques
- Personalized productivity recommendations
- Break timing and types

Be empathetic, practical, and avoid toxic productivity culture. Focus on sustainable strategies.`,

  habitRecommendations: `You are an expert in ADHD-friendly habit formation. Suggest habits that:
- Are small and achievable (2-5 minute habits)
- Stack onto existing routines
- Account for rejection sensitive dysphoria
- Include built-in flexibility
- Have clear, immediate benefits

Avoid overwhelming suggestions. Focus on one habit at a time with clear implementation strategies.`,

  scheduleOptimization: `You are a time management expert specializing in ADHD. Help optimize schedules by:
- Identifying peak energy windows
- Suggesting buffer time between tasks
- Recommending task batching strategies
- Balancing stimulation levels throughout the day
- Including transition time and breaks

Provide realistic, sustainable scheduling advice that works with ADHD patterns.`
};

// Error handling for API calls
const handleGeminiError = (error: any): string => {
  console.error('Gemini AI Error:', error);
  
  if (error.message?.includes('API_KEY_INVALID')) {
    return 'AI service is currently unavailable. Please try again later.';
  }
  
  if (error.message?.includes('QUOTA_EXCEEDED')) {
    return 'AI service limit reached. Please try again tomorrow.';
  }
  
  if (error.message?.includes('SAFETY')) {
    return 'Unable to process request due to safety guidelines.';
  }
  
  return 'AI service temporarily unavailable. Using local insights instead.';
};

// Generate AI-powered task breakdown
export const generateTaskBreakdown = async (
  task: Pick<Task, 'title' | 'description' | 'priority' | 'estimatedDuration'>,
  userContext?: {
    energyLevel: number;
    availableTime: number;
    recentFocus: number;
  }
): Promise<{
  subtasks: string[];
  estimatedTimes: number[];
  recommendations: string[];
}> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `${SYSTEM_PROMPTS.taskBreakdown}

Task to break down:
- Title: ${task.title}
- Description: ${task.description || 'No description provided'}
- Priority: ${task.priority}
- Estimated Duration: ${task.estimatedDuration || 'Unknown'} minutes

User Context:
- Current Energy Level: ${userContext?.energyLevel || 'Unknown'}/5
- Available Time: ${userContext?.availableTime || 'Unknown'} minutes
- Recent Focus Score: ${userContext?.recentFocus || 'Unknown'}/5

Please provide:
1. 3-5 specific, actionable subtasks
2. Estimated time for each subtask (5-25 minutes)
3. 2-3 recommendations for completing this task effectively with ADHD

Format your response as JSON with the structure:
{
  "subtasks": ["specific action 1", "specific action 2", ...],
  "estimatedTimes": [15, 10, 20, ...],
  "recommendations": ["tip 1", "tip 2", "tip 3"]
}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Try to parse JSON response
    try {
      const parsed = JSON.parse(response);
      return parsed;
    } catch (parseError) {
      // Fallback to basic breakdown if JSON parsing fails
      return {
        subtasks: [
          `Start with the easiest part of: ${task.title}`,
          `Main work on: ${task.title}`,
          `Review and finalize: ${task.title}`
        ],
        estimatedTimes: [10, (task.estimatedDuration || 30) - 15, 5],
        recommendations: [
          'Take a 2-minute break between subtasks',
          'Set a timer for each subtask',
          'Celebrate completing each subtask'
        ]
      };
    }
  } catch (error) {
    console.error('Task breakdown generation failed:', error);
    
    // Return fallback breakdown
    return {
      subtasks: [
        `Prepare materials for: ${task.title}`,
        `Work on main part: ${task.title}`,
        `Review and complete: ${task.title}`
      ],
      estimatedTimes: [5, (task.estimatedDuration || 25) - 10, 5],
      recommendations: [
        'Use a timer to stay focused',
        'Take breaks between subtasks',
        'Remove distractions from workspace'
      ]
    };
  }
};

// Analyze focus patterns and generate insights
export const generateFocusInsights = async (
  focusSessions: FocusSession[],
  productivityMetrics: ProductivityMetrics[]
): Promise<AIInsight[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Prepare data summary
    const recentSessions = focusSessions.slice(-20);
    const averageFocusTime = recentSessions.reduce((acc, session) => 
      acc + (session.actualDuration || 0), 0) / recentSessions.length;
    
    const totalDistractions = recentSessions.reduce((acc, session) => 
      acc + session.distractions.length, 0);
    
    const completionRate = recentSessions.filter(session => 
      session.completedSuccessfully).length / recentSessions.length * 100;

    const prompt = `${SYSTEM_PROMPTS.focusInsights}

Focus Session Data (last 20 sessions):
- Average focus time: ${averageFocusTime.toFixed(1)} minutes
- Total distractions: ${totalDistractions}
- Completion rate: ${completionRate.toFixed(1)}%
- Sessions analyzed: ${recentSessions.length}

Recent productivity patterns:
${productivityMetrics.slice(-7).map((metric, i) => 
  `Day ${i + 1}: ${metric.focusTime}m focus, ${metric.tasksCompleted} tasks, ${metric.productivity}/5 rating`
).join('\n')}

Generate 2-3 personalized insights about focus patterns, productivity trends, and actionable recommendations.

Format as JSON array:
[
  {
    "type": "productivity|focus|energy|habit",
    "title": "Insight title",
    "content": "Detailed insight explanation",
    "actionItems": ["specific action 1", "specific action 2"],
    "confidence": 0.8
  }
]`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    try {
      const insights = JSON.parse(response);
      return insights.map((insight: any, index: number) => ({
        id: `ai-insight-${Date.now()}-${index}`,
        userId: 'current-user', // Will be set by calling code
        type: insight.type,
        title: insight.title,
        content: insight.content,
        actionable: insight.actionItems?.length > 0,
        actionItems: insight.actionItems || [],
        confidence: insight.confidence || 0.7,
        createdAt: new Date(),
        isRead: false,
        category: 'ai-generated'
      }));
    } catch (parseError) {
      // Fallback insights
      return [{
        id: `ai-insight-${Date.now()}`,
        userId: 'current-user',
        type: 'focus' as const,
        title: 'Focus Pattern Analysis',
        content: `Based on your recent sessions, you maintain focus for an average of ${averageFocusTime.toFixed(1)} minutes. Consider adjusting your session length to match your natural rhythm.`,
        actionable: true,
        actionItems: ['Try 20-minute focus blocks', 'Take 5-minute breaks between sessions'],
        confidence: 0.7,
        createdAt: new Date(),
        isRead: false,
        category: 'ai-generated'
      }];
    }
  } catch (error) {
    console.error('Focus insights generation failed:', error);
    
    // Return basic insights based on data
    const insights: AIInsight[] = [];
    
    const recentSessions = focusSessions.slice(-10);
    if (recentSessions.length > 0) {
      const avgDuration = recentSessions.reduce((acc, s) => acc + (s.actualDuration || 0), 0) / recentSessions.length;
      
      insights.push({
        id: `fallback-insight-${Date.now()}`,
        userId: 'current-user',
        type: 'focus',
        title: 'Focus Duration Pattern',
        content: `Your average focus session is ${avgDuration.toFixed(0)} minutes. This is ${avgDuration > 25 ? 'above' : 'below'} the typical Pomodoro length.`,
        actionable: true,
        actionItems: avgDuration > 25 
          ? ['Try shorter 20-25 minute sessions', 'Increase break frequency'] 
          : ['Gradually extend sessions by 5 minutes', 'Reduce distractions'],
        confidence: 0.6,
        createdAt: new Date(),
        isRead: false,
        category: 'pattern-analysis'
      });
    }
    
    return insights;
  }
};

// Generate habit recommendations
export const generateHabitRecommendations = async (
  currentHabits: string[],
  productivityGoals: string[],
  userPreferences: {
    morningPerson: boolean;
    preferredSessionLength: number;
    strugglesWithTransitions: boolean;
  }
): Promise<AIRecommendation[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `${SYSTEM_PROMPTS.habitRecommendations}

Current habits: ${currentHabits.join(', ') || 'None specified'}
Productivity goals: ${productivityGoals.join(', ') || 'General productivity improvement'}

User preferences:
- Morning person: ${userPreferences.morningPerson ? 'Yes' : 'No'}
- Preferred session length: ${userPreferences.preferredSessionLength} minutes
- Struggles with transitions: ${userPreferences.strugglesWithTransitions ? 'Yes' : 'No'}

Suggest 2-3 small, ADHD-friendly habits that complement their current routine and support their goals.

Format as JSON array:
[
  {
    "type": "habit",
    "title": "Habit name",
    "description": "Why this habit helps",
    "reasoning": "ADHD-specific explanation",
    "priority": 1-5
  }
]`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    try {
      const recommendations = JSON.parse(response);
      return recommendations.map((rec: any, index: number) => ({
        id: `habit-rec-${Date.now()}-${index}`,
        userId: 'current-user',
        type: 'habit' as const,
        title: rec.title,
        description: rec.description,
        reasoning: rec.reasoning,
        priority: rec.priority || 3,
        createdAt: new Date()
      }));
    } catch (parseError) {
      // Fallback recommendations
      return [{
        id: `fallback-habit-${Date.now()}`,
        userId: 'current-user',
        type: 'habit',
        title: '2-Minute Desk Reset',
        description: 'Clear your workspace at the end of each focus session',
        reasoning: 'Visual clutter is especially distracting for ADHD brains. A quick reset creates a fresh start for the next session.',
        priority: 4,
        createdAt: new Date()
      }];
    }
  } catch (error) {
    console.error('Habit recommendations generation failed:', error);
    
    return [{
      id: `error-fallback-${Date.now()}`,
      userId: 'current-user',
      type: 'habit',
      title: 'Start Small',
      description: 'Begin with a 2-minute morning routine',
      reasoning: 'ADHD brains respond well to tiny, achievable habits that build momentum.',
      priority: 3,
      createdAt: new Date()
    }];
  }
};

// Optimize schedule based on ADHD patterns
export const optimizeSchedule = async (
  tasks: Task[],
  energyPatterns: { hour: number; averageEnergy: number }[],
  preferences: {
    preferredBreakLength: number;
    maxConsecutiveFocusHours: number;
    avoidAfternoonCrash: boolean;
  }
): Promise<{
  optimizedSchedule: Array<{
    startTime: string;
    endTime: string;
    taskId: string;
    taskTitle: string;
    reasoning: string;
  }>;
  recommendations: string[];
}> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const highEnergyHours = energyPatterns
      .filter(p => p.averageEnergy >= 4)
      .map(p => p.hour)
      .sort((a, b) => a - b);
    
    const lowEnergyHours = energyPatterns
      .filter(p => p.averageEnergy <= 2)
      .map(p => p.hour)
      .sort((a, b) => a - b);

    const prompt = `${SYSTEM_PROMPTS.scheduleOptimization}

Tasks to schedule:
${tasks.map(task => 
  `- ${task.title} (${task.priority} priority, ~${task.estimatedDuration || 25}min, ${task.difficulty || 'medium'} difficulty)`
).join('\n')}

Energy patterns:
- High energy hours: ${highEnergyHours.join(', ') || 'Unknown'}
- Low energy hours: ${lowEnergyHours.join(', ') || 'Unknown'}

Preferences:
- Preferred break length: ${preferences.preferredBreakLength} minutes
- Max consecutive focus time: ${preferences.maxConsecutiveFocusHours} hours
- Avoid afternoon crash: ${preferences.avoidAfternoonCrash}

Create an optimized schedule that matches high-priority/difficult tasks with high-energy times.

Format as JSON:
{
  "optimizedSchedule": [
    {
      "startTime": "09:00",
      "endTime": "09:30",
      "taskId": "task-id",
      "taskTitle": "Task name",
      "reasoning": "Why scheduled at this time"
    }
  ],
  "recommendations": ["scheduling tip 1", "scheduling tip 2"]
}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    try {
      return JSON.parse(response);
    } catch (parseError) {
      // Fallback scheduling logic
      const schedule = tasks.slice(0, 3).map((task, index) => {
        const startHour = 9 + (index * 2);
        return {
          startTime: `${startHour.toString().padStart(2, '0')}:00`,
          endTime: `${startHour.toString().padStart(2, '0')}:${(task.estimatedDuration || 30).toString()}`,
          taskId: task.id,
          taskTitle: task.title,
          reasoning: `Scheduled during ${startHour < 12 ? 'morning' : 'afternoon'} productivity window`
        };
      });

      return {
        optimizedSchedule: schedule,
        recommendations: [
          'Schedule high-priority tasks during your peak energy hours',
          'Include buffer time between tasks for transitions',
          'Plan breaks every 90 minutes maximum'
        ]
      };
    }
  } catch (error) {
    console.error('Schedule optimization failed:', error);
    
    return {
      optimizedSchedule: [],
      recommendations: [
        'Use your natural energy rhythms to guide task scheduling',
        'Block similar tasks together to reduce context switching',
        'Always include transition time between different types of work'
      ]
    };
  }
};

// Generate daily productivity summary
export const generateDailySummary = async (
  metrics: ProductivityMetrics
): Promise<{
  summary: string;
  highlights: string[];
  improvements: string[];
  tomorrowFocus: string;
}> => {
  try {
    // Calculate productivity score
    const productivityScore = Math.round(
      (metrics.productivity / 5) * 100
    );

    const prompt = `Analyze this ADHD individual's daily productivity:

Metrics:
- Focus time: ${metrics.focusTime} minutes
- Tasks completed: ${metrics.tasksCompleted}
- Average productivity feeling: ${metrics.productivity}/5
- Distractions: ${metrics.distractions}
- Mood: ${metrics.mood}/5
- Energy: ${metrics.energy}/5

Provide an encouraging, ADHD-friendly summary that:
1. Celebrates wins (no matter how small)
2. Gently addresses challenges
3. Suggests one specific improvement for tomorrow
4. Uses positive, non-judgmental language

Format as JSON:
{
  "summary": "Overall day assessment",
  "highlights": ["positive thing 1", "positive thing 2"],
  "improvements": ["gentle suggestion 1"],
  "tomorrowFocus": "One specific thing to focus on tomorrow"
}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    try {
      return JSON.parse(response);
    } catch (parseError) {
      // Fallback summary
      return {
        summary: `You maintained focus for ${metrics.focusTime} minutes and completed ${metrics.tasksCompleted} tasks today. That's progress worth celebrating!`,
        highlights: [
          metrics.tasksCompleted > 0 ? `Completed ${metrics.tasksCompleted} tasks` : 'Showed up and tried',
          metrics.focusTime > 0 ? `Focused for ${metrics.focusTime} minutes` : 'Made an effort to focus'
        ],
        improvements: [
          metrics.distractions > 10 
            ? 'Try turning off notifications during focus sessions tomorrow'
            : 'Keep up the great focus habits'
        ],
        tomorrowFocus: 'Pick your most important task first thing in the morning'
      };
    }
  } catch (error) {
    console.error('Daily summary generation failed:', error);
    
    return {
      summary: 'Every day you show up is a win. Focus on progress, not perfection.',
      highlights: ['You engaged with your productivity system', 'You\'re building awareness of your patterns'],
      improvements: ['Tomorrow is a fresh start to try again'],
      tomorrowFocus: 'Choose one small, achievable task to start your day'
    };
  }
};

// Demo mode responses (when API key is not available)
export const getDemoInsights = (): AIInsight[] => [
  {
    id: 'demo-insight-1',
    userId: 'demo-user',
    type: 'productivity',
    title: 'Peak Performance Window Detected',
    content: 'Your productivity peaks between 9-11 AM. Consider scheduling your most challenging tasks during this time.',
    actionable: true,
    actionItems: [
      'Block 9-11 AM for high-priority work',
      'Save routine tasks for afternoon',
      'Protect your morning energy'
    ],
    confidence: 0.85,
    createdAt: new Date(),
    isRead: false,
    category: 'demo'
  },
  {
    id: 'demo-insight-2',
    userId: 'demo-user',
    type: 'focus',
    title: 'Optimal Session Length',
    content: 'You maintain focus best in 20-25 minute sessions. Consider adjusting your Pomodoro timer.',
    actionable: true,
    actionItems: [
      'Set timer to 22 minutes',
      'Take 5-minute breaks',
      'Track your natural rhythm'
    ],
    confidence: 0.78,
    createdAt: new Date(),
    isRead: false,
    category: 'demo'
  }
];

export default {
  generateTaskBreakdown,
  generateFocusInsights,
  generateHabitRecommendations,
  optimizeSchedule,
  generateDailySummary,
  getDemoInsights
};