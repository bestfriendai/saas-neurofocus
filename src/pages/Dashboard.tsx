import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Plus, 
  Play, 
  Pause, 
  Target,
  TrendingUp,
  Clock,
  Battery,
  Zap,
  Calendar,
  CheckCircle2,
  Timer,
  Focus,
  Coffee,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Dashboard: React.FC = () => {
  const [focusTimer] = useState({ minutes: 25, seconds: 0, isActive: false });
  const [newTask, setNewTask] = useState('');
  const [energyLevel, setEnergyLevel] = useState(4);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const todayTasks = [
    {
      id: 1,
      title: "Review project requirements",
      priority: "high",
      status: "completed",
      category: "work",
      estimatedDuration: 30,
      completed: true
    },
    {
      id: 2,
      title: "Write API documentation",
      priority: "high",
      status: "in-progress",
      category: "work",
      estimatedDuration: 60,
      completed: false
    },
    {
      id: 3,
      title: "Team standup meeting",
      priority: "medium",
      status: "todo",
      category: "work",
      estimatedDuration: 15,
      completed: false
    },
    {
      id: 4,
      title: "Gym workout",
      priority: "medium",
      status: "todo",
      category: "health",
      estimatedDuration: 45,
      completed: false
    },
    {
      id: 5,
      title: "Read 20 pages",
      priority: "low",
      status: "todo",
      category: "learning",
      estimatedDuration: 25,
      completed: false
    }
  ];

  const todayHabits = [
    { id: 1, name: "Morning meditation", completed: true, streak: 12 },
    { id: 2, name: "Drink 8 glasses of water", completed: false, streak: 8, progress: 3 },
    { id: 3, name: "No social media before noon", completed: true, streak: 5 },
    { id: 4, name: "Write 300 words", completed: false, streak: 15 }
  ];

  const upcomingTimeBlocks = [
    { time: "10:00 AM", title: "Deep work session", duration: "90 min", type: "focus" },
    { time: "11:30 AM", title: "Coffee break", duration: "15 min", type: "break" },
    { time: "2:00 PM", title: "Team meeting", duration: "60 min", type: "meeting" },
    { time: "4:00 PM", title: "Creative work", duration: "45 min", type: "focus" }
  ];

  const getTaskPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      work: 'text-blue-500',
      health: 'text-red-500',
      learning: 'text-purple-500',
      personal: 'text-green-500'
    };
    return colors[category] || 'text-gray-500';
  };

  const getEnergyColor = (level: number) => {
    if (level >= 4) return 'text-green-500';
    if (level >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-focus-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Good morning, Alex!</h1>
                <p className="text-sm text-muted-foreground">Ready to focus and be productive?</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                <Battery className={`w-4 h-4 ${getEnergyColor(energyLevel)}`} />
                <span className="text-sm font-medium">Energy: {energyLevel}/5</span>
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Today
              </Button>
              <Button variant="focus" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Focus Session */}
          <div className="lg:col-span-1">
            <motion.div {...fadeIn}>
              <Card variant="glass" className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Timer className="w-5 h-5 mr-2 text-focus-500" />
                    Focus Session
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Circular Timer */}
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * 0.6}`}
                        className="text-focus-500 transition-all duration-1000 ease-linear"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {String(focusTimer.minutes).padStart(2, '0')}:
                          {String(focusTimer.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-muted-foreground">Pomodoro</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      variant={focusTimer.isActive ? "outline" : "focus"} 
                      className="w-full"
                      size="lg"
                    >
                      {focusTimer.isActive ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Focus
                        </>
                      )}
                    </Button>
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Session 2/4</span>
                      <span>Until long break</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Energy Level */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    Energy Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-lg font-semibold ${getEnergyColor(energyLevel)}`}>
                      {energyLevel}/5
                    </span>
                    <Badge variant={energyLevel >= 4 ? "success" : energyLevel >= 3 ? "warning" : "destructive"}>
                      {energyLevel >= 4 ? "High" : energyLevel >= 3 ? "Medium" : "Low"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => setEnergyLevel(level)}
                        className={`w-full h-3 rounded-full transition-colors ${
                          level <= energyLevel 
                            ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500' 
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-3">
                    {energyLevel >= 4 && "Perfect time for challenging tasks!"}
                    {energyLevel === 3 && "Good for moderate complexity tasks"}
                    {energyLevel <= 2 && "Consider easier tasks or a break"}
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Today's Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">Tasks</span>
                      </div>
                      <span className="font-semibold">2/5</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Focus className="w-4 h-4 text-focus-500 mr-2" />
                        <span className="text-sm">Focus Time</span>
                      </div>
                      <span className="font-semibold">45m</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 mr-2" />
                        <span className="text-sm">Habits</span>
                      </div>
                      <span className="font-semibold">2/4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div {...fadeIn} className="space-y-6">
              {/* Quick Add Task */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="What needs to be done? (Keep it specific and actionable)"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="flex-1"
                      icon={<Plus className="w-4 h-4" />}
                    />
                    <Button variant="focus">
                      Add Task
                    </Button>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                      🔥 High Priority
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                      💼 Work
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                      ⏱️ 25 min
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-green-500" />
                      Today's Tasks
                    </div>
                    <Badge variant="outline">5 tasks</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        className={`p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                          task.completed ? 'bg-green-500/5 border-green-500/20' : 'bg-card'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center space-x-3">
                          <button 
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              task.completed 
                                ? 'bg-green-500 border-green-500' 
                                : 'border-muted-foreground hover:border-focus-500'
                            }`}
                          >
                            {task.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </button>
                          
                          <div className="flex-1">
                            <div className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={getTaskPriorityVariant(task.priority)} size="sm">
                                {task.priority}
                              </Badge>
                              <span className={`text-xs ${getCategoryColor(task.category)}`}>
                                {task.category}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {task.estimatedDuration}m
                              </span>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card variant="focus">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-focus-500" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-focus-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <TrendingUp className="w-3 h-3 text-focus-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Peak Performance Window</p>
                        <p className="text-xs text-muted-foreground">
                          Your highest productivity is typically between 9-11 AM. Schedule important tasks then.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertCircle className="w-3 h-3 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Break Reminder</p>
                        <p className="text-xs text-muted-foreground">
                          You've been focused for 45 minutes. Consider a 5-minute break to maintain concentration.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <motion.div {...fadeIn} className="space-y-6">
              {/* Time Blocking */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                    Time Blocks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingTimeBlocks.map((block, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="text-xs text-muted-foreground w-16 flex-shrink-0">
                          {block.time}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{block.title}</div>
                          <div className="text-xs text-muted-foreground">{block.duration}</div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          block.type === 'focus' ? 'bg-focus-500' :
                          block.type === 'break' ? 'bg-green-500' :
                          'bg-purple-500'
                        }`} />
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Time Block
                  </Button>
                </CardContent>
              </Card>

              {/* Habit Tracker */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-purple-500" />
                    Daily Habits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayHabits.map((habit) => (
                      <div key={habit.id} className="flex items-center space-x-3">
                        <button 
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            habit.completed 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-muted-foreground hover:border-focus-500'
                          }`}
                        >
                          {habit.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </button>
                        
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${habit.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {habit.name}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>🔥 {habit.streak} day streak</span>
                            {habit.progress && (
                              <span>({habit.progress}/8)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Break Suggestions */}
              <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Coffee className="w-5 h-5 mr-2 text-green-500" />
                    Break Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your brain needs a rest! Here are some ADHD-friendly break ideas:
                  </p>
                  
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-left h-auto p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          🚶‍♂️
                        </div>
                        <div>
                          <div className="font-medium text-sm">5-minute walk</div>
                          <div className="text-xs text-muted-foreground">Get your body moving</div>
                        </div>
                      </div>
                    </Button>
                    
                    <Button variant="ghost" className="w-full justify-start text-left h-auto p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                          🧘‍♀️
                        </div>
                        <div>
                          <div className="font-medium text-sm">Deep breathing</div>
                          <div className="text-xs text-muted-foreground">3-minute mindfulness</div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;