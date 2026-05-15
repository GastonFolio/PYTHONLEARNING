// LocalStorage-based progression system

export interface UserProgress {
  completedLessons: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;
  completedProjects: string[];
  badges: Badge[];
  totalXP: number;
  streak: number;
  lastVisit: string;
  theme: 'dark' | 'light';
  userName: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
}

const STORAGE_KEY = 'pymaster_progress';

const defaultProgress: UserProgress = {
  completedLessons: [],
  completedQuizzes: [],
  quizScores: {},
  completedProjects: [],
  badges: [],
  totalXP: 0,
  streak: 0,
  lastVisit: new Date().toISOString(),
  theme: 'dark',
  userName: '',
};

export function loadProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Update streak
      const lastVisit = new Date(parsed.lastVisit);
      const today = new Date();
      const diffDays = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        parsed.streak = (parsed.streak || 0) + 1;
      } else if (diffDays > 1) {
        parsed.streak = 1;
      }
      parsed.lastVisit = today.toISOString();
      
      saveProgress(parsed);
      return { ...defaultProgress, ...parsed };
    }
  } catch (e) {
    console.error('Error loading progress:', e);
  }
  return { ...defaultProgress };
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
}

export function completeLesson(lessonId: string): UserProgress {
  const progress = loadProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.totalXP += 25;
    checkAndAwardBadges(progress);
    saveProgress(progress);
  }
  return progress;
}

export function completeQuiz(moduleId: string, score: number): UserProgress {
  const progress = loadProgress();
  if (!progress.completedQuizzes.includes(moduleId)) {
    progress.completedQuizzes.push(moduleId);
  }
  progress.quizScores[moduleId] = Math.max(progress.quizScores[moduleId] || 0, score);
  progress.totalXP += Math.round(score * 50);
  checkAndAwardBadges(progress);
  saveProgress(progress);
  return progress;
}

export function completeProject(projectId: string): UserProgress {
  const progress = loadProgress();
  if (!progress.completedProjects.includes(projectId)) {
    progress.completedProjects.push(projectId);
    progress.totalXP += 100;
    checkAndAwardBadges(progress);
    saveProgress(progress);
  }
  return progress;
}

const BADGE_DEFINITIONS = [
  { id: 'first-lesson', title: 'Premier Pas', description: 'Compléter votre première leçon', icon: '🎯', requirement: (p: UserProgress) => p.completedLessons.length >= 1 },
  { id: 'five-lessons', title: 'Apprenant Assidu', description: 'Compléter 5 leçons', icon: '📚', requirement: (p: UserProgress) => p.completedLessons.length >= 5 },
  { id: 'ten-lessons', title: 'Maître Apprenti', description: 'Compléter 10 leçons', icon: '🏆', requirement: (p: UserProgress) => p.completedLessons.length >= 10 },
  { id: 'first-quiz', title: 'Testeur', description: 'Compléter votre premier quiz', icon: '✅', requirement: (p: UserProgress) => p.completedQuizzes.length >= 1 },
  { id: 'perfect-quiz', title: 'Perfectionniste', description: 'Obtenir 100% à un quiz', icon: '💯', requirement: (p: UserProgress) => Object.values(p.quizScores).some(s => s >= 1) },
  { id: 'first-project', title: 'Bâtisseur', description: 'Compléter votre premier projet', icon: '🚀', requirement: (p: UserProgress) => p.completedProjects.length >= 1 },
  { id: 'xp-500', title: 'Explorateur', description: 'Accumuler 500 XP', icon: '⭐', requirement: (p: UserProgress) => p.totalXP >= 500 },
  { id: 'streak-3', title: 'Régulier', description: '3 jours consécutifs', icon: '🔥', requirement: (p: UserProgress) => p.streak >= 3 },
  { id: 'streak-7', title: 'Inarrêtable', description: '7 jours consécutifs', icon: '💪', requirement: (p: UserProgress) => p.streak >= 7 },
];

function checkAndAwardBadges(progress: UserProgress): void {
  for (const def of BADGE_DEFINITIONS) {
    if (!progress.badges.find(b => b.id === def.id) && def.requirement(progress)) {
      progress.badges.push({
        id: def.id,
        title: def.title,
        description: def.description,
        icon: def.icon,
        earnedAt: new Date().toISOString(),
      });
    }
  }
}

export function resetProgress(): UserProgress {
  const fresh = { ...defaultProgress, lastVisit: new Date().toISOString() };
  saveProgress(fresh);
  return fresh;
}

export function getModuleProgress(_moduleId: string, lessonIds: string[]): number {
  const progress = loadProgress();
  const completed = lessonIds.filter(id => progress.completedLessons.includes(id)).length;
  return lessonIds.length > 0 ? completed / lessonIds.length : 0;
}

export { BADGE_DEFINITIONS };
