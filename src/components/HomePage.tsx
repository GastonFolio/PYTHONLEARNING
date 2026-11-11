import { modules } from '../data/modules';
import type { UserProgress } from '../data/storage';
import { ArrowRight, BookOpen, Code2, Trophy, Zap, Users, Star } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
}

export default function HomePage({ onNavigate, progress }: HomePageProps) {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const stats = [
    { icon: <BookOpen size={24} />, value: `${modules.length}`, label: 'Modules', color: 'text-blue-400' },
    { icon: <Code2 size={24} />, value: `${totalLessons}+`, label: 'Leçons', color: 'text-green-400' },
    { icon: <Trophy size={24} />, value: `${modules.filter(m => m.project).length}`, label: 'Projets', color: 'text-yellow-400' },
    { icon: <Zap size={24} />, value: '100%', label: 'Gratuit', color: 'text-purple-400' },
  ];

  const features = [
    { icon: '🎯', title: 'Apprentissage Progressif', desc: 'Du débutant à l\'avancé, 8 modules complets couvrant tout Python.' },
    { icon: '💻', title: 'Éditeur de Code Intégré', desc: 'Écrivez et exécutez du Python directement dans votre navigateur.' },
    { icon: '✅', title: 'Auto-Correction', desc: 'Validez vos exercices instantanément avec des tests automatiques.' },
    { icon: '🚀', title: 'Projets Guidés', desc: 'Créez des projets pas à pas : calculatrice, jeux, et plus.' },
    { icon: '📊', title: 'Progression Gamifiée', desc: 'XP, niveaux, badges et streaks pour rester motivé.' },
    { icon: '📚', title: 'Contenu Premium', desc: 'Leçons détaillées, exemples commentés, exercices pratiques.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-python-blue/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-python-yellow/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-python-yellow/10 border border-python-yellow/30 mb-8 animate-fade-in">
            <Star size={16} className="text-python-yellow" />
            <span className="text-sm font-medium text-python-yellow">Plateforme d'apprentissage Python 100% gratuite</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl font-black mb-6 animate-slide-up">
            <span className="text-white">Apprenez </span>
            <span className="gradient-text">Python</span>
            <br />
            <span className="text-white text-4xl sm:text-5xl">de zéro à héros</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Une plateforme interactive et moderne pour maîtriser Python. 
            Cours structurés, projets pratiques, et progression gamifiée.
            <span className="text-python-yellow font-semibold"> Tout se passe dans votre navigateur et votre terminal.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => onNavigate('modules')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-python-blue to-python-blue/80 text-white font-bold text-lg hover:shadow-lg hover:shadow-python-blue/30 transition-all hover:-translate-y-0.5"
            >
              Commencer l'apprentissage
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onNavigate('roadmap')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all"
            >
              Voir la roadmap
            </button>
          </div>

          {/* Progress Bar (if returning user) */}
          {completedLessons > 0 && (
            <div className="max-w-md mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Votre progression globale</span>
                  <span className="text-sm font-bold text-python-yellow">{progressPercent}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-python-blue to-python-yellow rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{completedLessons}/{totalLessons} leçons complétées</p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass rounded-xl p-4 text-center card-hover animate-slide-up"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className={`flex justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Parcours <span className="gradient-text">structuré</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              8 modules progressifs couvrant tous les aspects de Python, des fondamentaux aux projets avancés.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => {
              const lessonIds = mod.lessons.map(l => l.id);
              const completed = lessonIds.filter(id => progress.completedLessons.includes(id)).length;
              const pct = lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;
              
              return (
                <button
                  key={mod.id}
                  onClick={() => onNavigate('module-detail', { moduleId: mod.id })}
                  className="glass rounded-2xl p-6 text-left card-hover group animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{mod.icon}</span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${mod.color}20`, color: mod.color }}
                    >
                      {mod.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-python-yellow transition-colors">
                    Module {mod.number} : {mod.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{mod.subtitle}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{mod.lessons.length} leçons</span>
                    <span>~{mod.estimatedHours}h</span>
                  </div>
                  {pct > 0 && (
                    <div className="mt-3">
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: mod.color }}
                        />
                      </div>
                      <span className="text-xs mt-1 inline-block" style={{ color: mod.color }}>{pct}%</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pourquoi <span className="gradient-text">PyMaster</span> ?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass rounded-xl p-6 card-hover">
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Pages Notice */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl p-8 border border-python-blue/30">
            <div className="flex items-start gap-4">
              <Users size={32} className="text-python-blue flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">100% Statique & Gratuit</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  PyMaster fonctionne entièrement dans votre navigateur. Aucun serveur, aucune base de données.
                  Votre progression est sauvegardée localement. Les projets Python sont conçus pour être
                  téléchargés et exécutés sur votre machine avec VS Code et Python installés localement.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['GitHub Pages', 'LocalStorage', 'Python Local', 'VS Code'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-python-blue/10 text-python-blue text-xs font-medium border border-python-blue/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-sm">
            🐍 PyMaster — Plateforme d'apprentissage Python statique
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Compatible GitHub Pages • Aucun backend requis • 100% gratuit
          </p>
        </div>
      </footer>
    </div>
  );
}
