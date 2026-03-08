export interface FunctionCard {
  id: number;
  title: string;
  icon: string;
  color: string;
  description: string;
}

export interface BlogEntry {
  id: number;
  type: 'karma' | 'reflection' | 'goal' | 'grade' | 'reminder' | 'achievement' | 'feedback' | 'event';
  content: string;
  date: string;
  isNew?: boolean;
}

export interface DashboardData {
  currentGrade: string;
  currentKarma: number;
  currentGoal: string;
  userName: string;
}

export interface Subject {
  id: number;
  name: string;
  grade: string;
  teacher: string;
  lastUpdate: string;
}

export interface ReflectionQuestion {
  id: number;
  question: string;
  category: string;
}

export interface Goal {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  deadline: string;
  smartCriteria: {
    specific: boolean;
    measurable: boolean;
    achievable: boolean;
    relevant: boolean;
    timeBound: boolean;
  };
}

export interface KarmaEntry {
  id: number;
  points: number;
  reason: string;
  date: string;
  type: 'positive' | 'negative';
}

export interface Privilege {
  id: number;
  name: string;
  karmaThreshold: number;
  description: string;
}

export interface Sanction {
  id: number;
  name: string;
  karmaThreshold: number;
  description: string;
}

export interface Competence {
  id: number;
  category: string;
  name: string;
  description: string;
  levels: {
    level: number;
    description: string;
    color: string;
  }[];
  selfAssessment: number; // 0-4, 0 = nicht bewertet
  teacherAssessment?: number;
  lastUpdated: string;
}

export interface CompetenceCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  competences: Competence[];
}