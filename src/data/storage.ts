// LocalStorage-based progression system

export interface UserProgress {
  completedLessons: string[];
  completedExercises: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;
  completedProjects: string[];
  completedExams: string[];
  examScores: Record<string, number>;
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
  completedExercises: [],
  completedQuizzes: [],
  quizScores: {},
  completedProjects: [],
  completedExams: [],
  examScores: {},
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
  const previousBest = progress.quizScores[moduleId] || 0;
  progress.quizScores[moduleId] = Math.max(previousBest, score);
  // Anti-farm : on ne récompense que l'amélioration du meilleur score.
  // Un 100% du premier coup rapporte +100 XP (conforme au barème README).
  const gain = Math.round(score * 100) - Math.round(previousBest * 100);
  if (gain > 0) {
    progress.totalXP += gain;
  }
  checkAndAwardBadges(progress);
  saveProgress(progress);
  return progress;
}

export function completeExercise(exerciseId: string): UserProgress {
  const progress = loadProgress();
  if (!progress.completedExercises) {
    progress.completedExercises = [];
  }
  if (!progress.completedExercises.includes(exerciseId)) {
    progress.completedExercises.push(exerciseId);
    progress.totalXP += 15;
    checkAndAwardBadges(progress);
    saveProgress(progress);
  }
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

// ---- Examens : XP uniquement à la première réussite, meilleur score conservé ----
export function completeExam(examId: string, score: number, xpReward: number, passingScore: number): UserProgress {
  const progress = loadProgress();
  if (!progress.completedExams) progress.completedExams = [];
  if (!progress.examScores) progress.examScores = {};
  const previousBest = progress.examScores[examId] || 0;
  progress.examScores[examId] = Math.max(previousBest, score);
  const passed = score >= passingScore;
  if (passed && !progress.completedExams.includes(examId)) {
    progress.completedExams.push(examId);
    progress.totalXP += xpReward;
  }
  checkAndAwardBadges(progress);
  saveProgress(progress);
  return progress;
}

// ---- Entraînement intensif : déverrouillage strictement consécutif ----
// Le palier 0 est ouvert ; un palier N est ouvert si le DERNIER exercice
// du palier N-1 est réussi (la chaîne consécutive le garantit).
export function isPalierUnlocked(
  paliers: { exercises: { id: string }[] }[],
  progress: UserProgress,
  palierIndex: number
): boolean {
  if (palierIndex === 0) return true;
  const prev = paliers[palierIndex - 1];
  if (!prev || prev.exercises.length === 0) return false;
  const lastId = prev.exercises[prev.exercises.length - 1].id;
  return (progress.completedExercises || []).includes(lastId);
}

// Dans un palier ouvert : exo 0 ouvert, exo i ouvert si exo i-1 réussi.
export function isIntensiveExUnlocked(
  palier: { exercises: { id: string }[] },
  progress: UserProgress,
  exIndex: number,
  palierOpen: boolean
): boolean {
  if (!palierOpen) return false;
  if (exIndex === 0) return true;
  const prevId = palier.exercises[exIndex - 1].id;
  return (progress.completedExercises || []).includes(prevId);
}

export function countIntensiveDone(progress: UserProgress, intensiveIds: string[]): number {
  const done = progress.completedExercises || [];
  return intensiveIds.filter(id => done.includes(id)).length;
}

const BADGE_DEFINITIONS = [
  { id: 'first-lesson', title: 'Premier Pas', description: 'Compléter votre première leçon', icon: '🎯', requirement: (p: UserProgress) => p.completedLessons.length >= 1 },
  { id: 'five-lessons', title: 'Apprenant Assidu', description: 'Compléter 5 leçons', icon: '📚', requirement: (p: UserProgress) => p.completedLessons.length >= 5 },
  { id: 'ten-lessons', title: 'Maître Apprenti', description: 'Compléter 10 leçons', icon: '🏆', requirement: (p: UserProgress) => p.completedLessons.length >= 10 },
  { id: 'first-quiz', title: 'Testeur', description: 'Compléter votre premier quiz', icon: '✅', requirement: (p: UserProgress) => p.completedQuizzes.length >= 1 },
  { id: 'perfect-quiz', title: 'Perfectionniste', description: 'Obtenir 100% à un quiz', icon: '💯', requirement: (p: UserProgress) => Object.values(p.quizScores).some(s => s >= 1) },
  { id: 'first-project', title: 'Bâtisseur', description: 'Compléter votre premier projet', icon: '🚀', requirement: (p: UserProgress) => p.completedProjects.length >= 1 },
  { id: 'first-exercise', title: 'Codeur', description: 'Réussir votre premier exercice', icon: '💻', requirement: (p: UserProgress) => (p.completedExercises || []).length >= 1 },
  { id: 'ten-exercises', title: 'Pro du Clavier', description: 'Réussir 10 exercices', icon: '⌨️', requirement: (p: UserProgress) => (p.completedExercises || []).length >= 10 },
  { id: 'xp-500', title: 'Explorateur', description: 'Accumuler 500 XP', icon: '⭐', requirement: (p: UserProgress) => p.totalXP >= 500 },
  { id: 'intensif-10', title: 'Forcené', description: 'Réussir 10 exercices intensifs', icon: '🏋️', requirement: (p: UserProgress) => (p.completedExercises || []).filter(id => id.startsWith('int-')).length >= 10 },
  { id: 'intensif-40', title: 'Machine', description: 'Réussir 40 exercices intensifs', icon: '⚡', requirement: (p: UserProgress) => (p.completedExercises || []).filter(id => id.startsWith('int-')).length >= 40 },
  { id: 'examinateur', title: 'Examiné', description: 'Réussir un examen blanc', icon: '🎓', requirement: (p: UserProgress) => (p.completedExams || []).length >= 1 },
  { id: 'certifie', title: 'Certifié PyMaster', description: 'Réussir le Défi Final (certification)', icon: '🌟', requirement: (p: UserProgress) => (p.completedExams || []).includes('exam-certification') },
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

// Règle de déverrouillage unique (utilisée par Roadmap, Modules et Accueil) :
// le module 1 est toujours ouvert, les suivants se déverrouillent dès que
// le module précédent est commencé (au moins 1 leçon terminée).
export function isModuleUnlocked(
  modules: { lessons: { id: string }[] }[],
  progress: UserProgress,
  index: number
): boolean {
  if (index === 0) return true;
  const prevLessons = modules[index - 1].lessons.map(l => l.id);
  return prevLessons.some(id => progress.completedLessons.includes(id));
}

export { BADGE_DEFINITIONS };
