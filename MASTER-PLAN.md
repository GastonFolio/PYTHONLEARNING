# Plan Directeur PyMaster — De l'Existant à la Plateforme Complète

> **Contexte :** Application React + TypeScript d'apprentissage Python, statique sur GitHub Pages,
> avec exécution Python dans le navigateur via Pyodide/WASM.
>
> **Objectif final :** Plateforme persistante, multi-utilisateur, avec authentification Google,
> stockage Firestore, tableau de bord enseignant, et intégration Google Classroom.

---

## 📊 Vue d'Ensemble (Roadmap)

```
Phase 0 ─── Fusion UI/UX + Déploiement
   │
   ▼
Phase 1 ─── Firebase Auth + Firestore (Dual-Write)
   │         ├── Auth Google (élèves & profs)
   │         ├── Progression persistante dans Firestore
   │         ├── Fallback localStorage (offline/transition)
   │         └── Règles de sécurité strictes
   │
   ▼
Phase 2 ─── Tableau de Bord Enseignant
   │         ├── Vue classe (liste des élèves)
   │         ├── Détail progression par élève/module
   │         ├── Métriques & alertes
   │         └── Gestion des classes
   │
   ▼
Phase 3 ─── Google Classroom API
   │         ├── Roster sync (annuaire → Firestore)
   │         ├── Note push (Firestore → Classroom)
   │         ├── Création de devoirs
   │         └── Sync manuelle / périodique
   │
   ▼
Phase 4 ─── Optimisations & Mise en Production
             ├── Code splitting (React.lazy)
             ├── Tests E2E
             ├── Audit sécurité
             └── Vérification OAuth Google
```

---

## ✅ Phase 0 — Fusion UI/UX & Déploiement (1-2 jours)

### État
- Branche `ui-ux-improvements` contient **1 commit** en avance sur `main` :
  `c0f3313 feat(ui): comprehensive UI/UX improvements`
- Ce commit regroupe les 16 améliorations (icônes Lucide, navbar flottante,
  Breadcrumb, SkeletonLoader, recherche/filtre, confettis, etc.)
- Le build passe : `npx vite build` → 2594 modules, ~1.14MB

### Sous-tâches

| # | Tâche | Fichiers | Critère de succès |
|---|-------|----------|-------------------|
| 0.1 | **Merge `ui-ux-improvements` → `main`** | — | `main` inclut le commit UI/UX |
| 0.2 | **Vérifier le build sur `main`** | — | `npm run build` → pas d'erreur |
| 0.3 | **Push `main` → déclenche deploy** | `.github/workflows/deploy.yml` | Site déployé sur `gh-pages` |
| 0.4 | **Vérifier le site en production** | — | URL GitHub Pages fonctionnelle |

### Sécurité / Risques
- Aucun (code déjà testé et build vérifié)

### 📦 Livrables
- `main` à jour
- Site GitHub Pages à jour avec le nouveau UI/UX

---

## 🔐 Phase 1 — Firebase Auth + Firestore (5-7 jours)

### Description
Migration du stockage localStorage → dual-write localStorage + Firestore.
Authentification Google obligatoire pour persister les données dans le cloud.
Règles de sécurité Firestore strictes pour isoler les données par utilisateur.

### Architecture

```
┌──────────────┐      ┌──────────────────┐      ┌──────────────┐
│  Navigateur  │ ──►  │  Firebase Auth   │ ──►  │   Google     │
│  (React SPA) │      │  (Google OAuth)  │      │   (SSO)      │
└──────┬───────┘      └──────────────────┘      └──────────────┘
       │
       │  dual-write
       ├──────────────────────────────────────┐
       ▼                                      ▼
┌──────────────┐                     ┌──────────────────┐
│ localStorage │                     │   Firestore DB   │
│ (fallback)   │                     │  (source of truth)│
└──────────────┘                     └──────────────────┘
```

### Sous-tâches

| # | Tâche | Fichiers | Critère de succès |
|---|-------|----------|-------------------|
| 1.1 | **Créer projet Firebase** (console) | — | Projet `pymaster-...` créé |
| 1.2 | **Activer Authentication** (Google provider) | — | Auth Google opérationnel |
| 1.3 | **Ajouter les domaines autorisés** (OAuth) | — | `*.github.io`, localhost autorisés |
| 1.4 | **Configurer Firestore** (mode production) | — | Firestore actif, règles initiales |
| 1.5 | **Installer firebase package** | `package.json` | `npm install firebase` |
| 1.6 | **Écrire `src/lib/firebase.ts`** (config + init) | `src/lib/firebase.ts` | Firebase s'initialise sans erreur |
| 1.7 | **Écrire `src/lib/auth.ts`** (useAuth hook) | `src/lib/auth.ts` | `useAuth()` → `user \| null`, `login()`, `logout()` |
| 1.8 | **Écrire les Firestore Security Rules** | Console Firebase | Règles strictes par UID (voir ci-dessous) |
| 1.9 | **Refactor `src/data/storage.ts`** → dual-write | `src/data/storage.ts` | `saveProgress()` écrit dans les 2 stores ; `loadProgress()` lit Firestore puis localStorage |
| 1.10 | **Ajouter le bouton "Se connecter" dans Header** | `src/components/Header.tsx` | Avatar + nom si connecté, bouton sinon |
| 1.11 | **Créer LoginPage** | `src/components/LoginPage.tsx` | Bouton "Sign in with Google" + animation |
| 1.12 | **Ajouter LoginPage au routeur** | `src/App.tsx` | Page login accessible |
| 1.13 | **Gérer l'état de connexion dans App.tsx** | `src/App.tsx` | Auth state → redirection login si non connecté |
| 1.14 | **Ajouter la détection de rôle** (student/teacher) | `src/lib/auth.ts` | `user.role` basé sur le domain email |
| 1.15 | **Vérifier le build avec Firebase** | — | `npm run build` passe |
| 1.16 | **Mettre à jour GitHub Actions** pour les vars Firebase | `.github/workflows/deploy.yml` | Build injecte `VITE_FIREBASE_*` depuis les secrets |

### Firestore Rules (critiques)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 🔒 Données utilisateur : seul l'utilisateur y accède
    match /users/{userId} {
      allow read, write: if request.auth != null
                        && request.auth.uid == userId;
    }

    // 🔒 Progression : idem
    match /progress/{userId} {
      allow read, write: if request.auth != null
                        && request.auth.uid == userId;
    }

    // 🔒 Classes : lecture pour membres, écriture pour profs
    match /classes/{classId} {
      allow read: if request.auth != null
                  && resource.data.members.hasAny([request.auth.uid]);
      allow write: if request.auth != null
                  && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }

    match /classes/{classId}/students/{studentId} {
      allow read: if request.auth != null
                  && (get(/databases/$(database)/documents/classes/$(classId)).data.teacherId == request.auth.uid
                      || request.auth.uid == studentId);
      allow write: if request.auth != null
                  && request.auth.uid == studentId;
    }
  }
}
```

### Sécurité / Risques

| Risque | Sévérité | Mitigation |
|--------|:--------:|------------|
| Firestore Rules trop permissives | 🔴 Critique | Règles strictes par UID (ci-dessus) |
| Vol de config Firebase | 🟢 Faible | Clés publiques par conception |
| Usurpation d'identité | 🔴 Critique | Token JWT signé Google + vérification UID dans Rules |
| Attaque XSS | 🟢 Faible | Contenu React échappé par défaut |
| Abuse API (flood) | 🟡 Moyen | Firestore Rules + App Check optionnel |
| Données élèves (RGPD) | 🟡 Moyen | Firestore région `europe-west1` ; pas de données sensibles |

### 📦 Livrables
- Authentification Google fonctionnelle
- Progression persistée dans Firestore
- Fallback localStorage
- Règles de sécurité déployées
- Site accessible uniquement aux utilisateurs connectés

---

## 🧑‍🏫 Phase 2 — Tableau de Bord Enseignant (4-5 jours)

### Description
Interface pour les enseignants : vue d'ensemble de la classe,
suivi détaillé par élève, métriques de progression, alertes.

### Maquette conceptuelle

```
┌─────────────────────────────────────────────────────────┐
│ 🔙 Dashboard Enseignant              📅 Classe: 3A     │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 📊 Aperçu de la Classe                              │ │
│ │                                                     │ │
│ │   Moyenne: 68%    Complétion: 72%    Actifs: 28/32 │ │
│ │   ███████████████████████████████████░░░░░ 72%     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🔍 Rechercher un élève...          [Filtrer par...]│ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ 🟢 Alice Martin       68% ████████████░░░░  ▎Détail │ │
│ │ 🟢 Bob Dupont         92% ████████████████░░ ▎Détail │ │
│ │ 🟡 Charlie Lambert    45% ████████░░░░░░░░  ▎Détail │ │
│ │ 🔴 Dylan Petit        22% ████░░░░░░░░░░░░  ▎Détail │ │
│ │ 🟢 Emma Bernard       85% ██████████████░░  ▎Détail │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ⚠️ 3 élèves en difficulté (< 30%)  →  Voir les alertes │
└─────────────────────────────────────────────────────────┘
```

### Sous-tâches

| # | Tâche | Fichiers | Critère de succès |
|---|-------|----------|-------------------|
| 2.1 | **Détection du rôle enseignant** (email @ecole.com ou flag manual) | `src/lib/auth.ts` | `user.role === 'teacher'` |
| 2.2 | **Créer TeacherDashboard page** | `src/components/TeacherDashboard.tsx` | Vue classe avec liste d'élèves |
| 2.3 | **Composant ClassOverview** (stats agrégées) | `src/components/teacher/ClassOverview.tsx` | Moyenne, complétion, actifs |
| 2.4 | **Composant StudentList** (liste avec barres de progression) | `src/components/teacher/StudentList.tsx` | Liste triable, filtrable |
| 2.5 | **Composant StudentDetail** (progression détaillée) | `src/components/teacher/StudentDetail.tsx` | Modules, quiz, XP, badges |
| 2.6 | **Composant AlertsPanel** (élèves en difficulté) | `src/components/teacher/AlertsPanel.tsx` | Seuil < 30% → alerte |
| 2.7 | **Routeur conditionnel** (student view vs teacher view) | `src/App.tsx` | Redirection selon rôle |
| 2.8 | **Requêtes Firestore agrégées** (lecture classe) | `src/lib/firestore.ts` | `getStudentsByClass()`, etc. |
| 2.9 | **Page TeacherSettings** (lien de classe, code invitation) | `src/components/teacher/TeacherSettings.tsx` | Code de classe partageable |
| 2.10 | **Build & test** | — | `npm run build` passe |

### Sécurité / Risques

| Risque | Sévérité | Mitigation |
|--------|:--------:|------------|
| Un étudiant accède au dashboard prof | 🔴 Critique | Firestore Rules + `user.role` vérifié côté serveur |
| Un prof voit les données d'une autre classe | 🟡 Moyen | Rules : `teacherId == request.auth.uid` |
| Injection de code dans le nom d'élève | 🟢 Faible | React échappe tout |

### 📦 Livrables
- Tableau de bord enseignant complet
- Vue classe, détails, alertes
- Code de classe pour les élèves

---

## 🏫 Phase 3 — Google Classroom API (5-7 jours)

### Description
Intégration en profondeur avec Google Classroom : synchronisation
de l'annuaire (roster), remontée des notes (grade push), création
de devoirs à partir des modules PyMaster.

### Architecture de Sync

```
┌─────────────────────┐
│  Google Classroom   │
│  ─── API REST       │
├─────────────────────┤
│ ○ Cours             │──── roster sync (↓)
│ ○ Élèves (roster)   │──── grade push (↑)
│ ○ Travaux            │──── assignment create (←→)
│ ○ Notes              │
└─────────┬───────────┘
          │ HTTPS (OAuth scope)
          ▼
┌─────────────────────┐
│  Firebase (source)  │
│  ─── Firestore      │
├─────────────────────┤
│ ○ teachers/         │
│ ○ classes/          │
│ ○ students/{uid}/   │
│    ├ progress/      │
│    └ grades/        │
└─────────────────────┘
```

### Sous-tâches

| # | Tâche | Fichiers | Critère de succès |
|---|-------|----------|-------------------|
| 3.1 | **Activer Google Classroom API** (GCP Console) | — | API activée |
| 3.2 | **Configurer OAuth consent screen** (Classroom scopes) | Console GCP | Scopes `classroom.courses.readonly`, `classroom.rosters.readonly`, `classroom.coursework.students` |
| 3.3 | **Ajouter scopes Classroom au provider Auth** | `src/lib/auth.ts` | Login demande les scopes Classroom |
| 3.4 | **Créer `src/lib/classroom.ts`** (client API) | `src/lib/classroom.ts` | Fonctions : `listCourses()`, `listStudents()`, `createCourseWork()`, `patchGrade()` |
| 3.5 | **Implémenter Roster Sync** (one-way : Classroom → Firestore) | `src/lib/classroom.ts`, `src/lib/firestore.ts` | Les élèves apparaissent dans Firestore après sync |
| 3.6 | **UI : bouton "Sync Classroom"** dans le dashboard | `src/components/teacher/TeacherDashboard.tsx` | Sync déclenchée manuellement |
| 3.7 | **Implémenter Grade Push** (Firestore → Classroom) | `src/lib/classroom.ts` | Note de quiz poussée dans Classroom |
| 3.8 | **Implémenter Assignment Creation** (module → devoir Classroom) | `src/lib/classroom.ts` | Un module PyMaster devient un devoir Classroom |
| 3.9 | **UI : Paramètres Classroom** dans TeacherSettings | `src/components/teacher/TeacherSettings.tsx` | Lier un cours, configurer sync |
| 3.10 | **Gérer le refresh token** (session persistante) | `src/lib/auth.ts` | Token Classroom valide > 1h |
| 3.11 | **Build & test** | — | Tout le flux fonctionne |

### Sécurité / Risques

| Risque | Sévérité | Mitigation |
|--------|:--------:|------------|
| Scope OAuth trop large → accès à des données non nécessaires | 🟡 Moyen | Demander scopes en lecture seule sauf pour notes |
| Token Classroom volé (XSS) | 🟡 Moyen | Token en mémoire, pas dans localStorage |
| Sync écrase des notes existantes | 🟡 Moyen | Grade push uniquement si `grade !== null` et `grade > lastPushedGrade` |
| Refresh token expiré (après 7 jours) | 🟡 Moyen | L'utilisateur doit re-authentifier |

### ⚠️ Contraintes Google Classroom API

1. **Pas de webhooks** : pas de notifications push → sync manuelle/périodique
2. **Refresh token durée limitée** : ~7 jours sans utilisation → nécessite ré-authentification
3. **Vérification OAuth** : nécessaire > 100 utilisateurs (process ~1-2 semaines)
4. **Domaines autorisés** : le domaine @ecole.com doit être whitelisté par l'admin Workspace
5. **Quotas API** : 1 000 requêtes/100 secondes par projet (suffisant pour une classe)

### 📦 Livrables
- Synchronisation des listes d'élèves depuis Classroom
- Remontée automatique des notes de quiz
- Création de devoirs Classroom depuis les modules
- Interface de configuration

---

## 🚀 Phase 4 — Optimisations & Mise en Production (3-4 jours)

### Description
Préparer l'application pour un usage en conditions réelles dans un
établissement scolaire : performance, sécurité, tests, conformité.

### Sous-tâches

| # | Tâche | Fichiers | Critère de succès |
|---|-------|----------|-------------------|
| 4.1 | **Code splitting** (React.lazy + Suspense) | `src/App.tsx` | Bundle initial < 300KB (vs 1.14MB actuel) |
| 4.2 | **Ajouter un bundle analyzer** pour vérifier | `vite.config.ts` | `rollup-plugin-visualizer` |
| 4.3 | **Écrire les tests critiques** (storage, auth, classroom) | `src/__tests__/` | `npx vitest run` passe |
| 4.4 | **Audit de sécurité** (revoir Rules, XSS, OAuth) | — | Checklist validée |
| 4.5 | **Configurer App Check** (reCAPTCHA) | `src/lib/firebase.ts` | Protection anti-abus API |
| 4.6 | **Soumettre OAuth pour vérification Google** | Console GCP | App "En cours de vérification" |
| 4.7 | **Documentation utilisateur** (README, guide) | `README.md`, `docs/` | Procédure pour enseignant |
| 4.8 | **Test E2E complet** (parcours élève + prof) | — | Scénario complet validé |

### 📦 Livrables
- Application optimisée (code splitting)
- Tests passant
- Audit de sécurité réalisé
- Documentation utilisateur

---

## 📐 Architecture Data Model (Firestore)

```typescript
// users/{userId}
interface UserDoc {
  email: string;
  name: string;
  photoURL?: string;
  role: 'student' | 'teacher';
  classIds: string[];        // Classes auxquelles l'utilisateur appartient
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
}

// progress/{userId}
interface ProgressDoc {
  completedLessons: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;  // { moduleId: score }
  completedProjects: string[];
  badges: Badge[];
  totalXP: number;
  streak: number;
  lastVisit: string;          // ISO date
  updatedAt: Timestamp;       // Dernière sync
}

// classes/{classId}
interface ClassDoc {
  name: string;
  teacherId: string;
  studentIds: string[];
  classroomCourseId?: string; // ID du cours Classroom lié (Phase 3)
  invitationCode: string;     // Code pour rejoindre
  createdAt: Timestamp;
}

// classes/{classId}/students/{studentId}
// → Données agrégées visibles par le prof
interface StudentProgressView {
  totalXP: number;
  completionRate: number;     // % de leçons complétées
  averageQuizScore: number;
  lastActiveAt: Timestamp;
  alerts: string[];           // Alertes actives
}
```

---

## 🗓️ Calendrier Estimé

```
Phase 0 ───── 1-2 jours  ── [   ] Démarrage immédiat
Phase 1 ───── 5-7 jours  ── [   ] Priorité haute
Phase 2 ───── 4-5 jours  ── [   ] Après Phase 1
Phase 3 ───── 5-7 jours  ── [   ] Optionnel
Phase 4 ───── 3-4 jours  ── [   ] Avant production réelle
          ─────────────────
Total ────── 18-25 jours
```

---

## 🧩 Dépendances entre Phases

```
Phase 0 ───────────────────────────────────────────
  │
  ├──► Phase 1 (Firebase) ──► Phase 2 (Dashboard)
  │                              │
  │                              └──► Phase 3 (Classroom API)
  │                                      │
  └──────────────────────────────────────┘
                                         │
                                    Phase 4 (Optimisation)
```

- **Phase 1** dépend de **Phase 0** (pour avoir un build stable)
- **Phase 2** dépend de **Phase 1** (Auth + Firestore nécessaires)
- **Phase 3** dépend de **Phase 2** (Dashboard fournit l'UI de sync)
- **Phase 4** peut démarrer partiellement en parallèle de Phase 2-3

---

## 🔥 Décisions Techniques Clés

| Décision | Choix | Alternative écartée |
|----------|-------|-------------------|
| Backend | Firebase (Auth + Firestore) | Supabase, Google Sheets API, GitHub API |
| Hosting | GitHub Pages (inchangé) | Netlify, Vercel (nécessitent migration) |
| Bundle | singlefile → code splitting | — |
| Auth Provider | Google (seulement) | Email/password, GitHub (inutile ici) |
| Rôle detection | Email domain (@ecole.com) | Flag manuel, custom claim |
| Exécution Python | Pyodide WASM (inchangé) | — |
| State management | useState + props (inchangé) | Redux, Zustand (overkill) |
| Routing | useState (inchangé) | React Router (trop lourd pour 8 pages) |

---

## 🔒 Synthèse Sécurité

```
                   Firewall
                      │
         ┌────────────┴────────────┐
         │    GitHub Pages (static)│
         │    (HTTPS obligatoire)  │
         └────────────┬────────────┘
                      │
         ┌────────────┴────────────┐
         │   Firebase Auth         │ ← Vérifie l'identité (JWT)
         │   (Google OAuth 2.0)    │
         └────────────┬────────────┘
                      │
         ┌────────────┴────────────┐
         │   Firestore Rules       │ ← Vérifie les droits (UID)
         │   (allow read/write     │
         │    if auth.uid == userId)│
         └────────────┬────────────┘
                      │
         ┌────────────┴────────────┐
         │   Google Classroom API  │ ← Scope OAuth limité
         │   (readonly roster,     │
         │    write grades)        │
         └─────────────────────────┘
```

**Principe de défense en profondeur :** Même si une couche est compromise (ex: clé API exposée), les autres couches (Rules, JWT, scopes OAuth) continuent de protéger.

---

## 🤔 Questions en Suspens (à valider avant Phase 1)

1. **Domaine email :** Est-ce que tous les élèves/profs ont un email `@ecole.com` ? Faut-il gérer d'autres domaines ?
2. **Firebase pricing :** Le free tier suffit-il pour une classe de 30 élèves ? (Oui, sauf si utilisation très intensive)
3. **Stockage Europe :** Faut-il configurer Firestore en `europe-west1` pour conformité RGPD ?
4. **Code de classe :** Comment l'enseignant partage-t-il le code de classe avec les élèves ? (oral, email, affichage en classe ?)
5. **Google Classroom déjà utilisé ?** L'établissement utilise-t-il déjà Google Classroom ? Si oui, les cours existent-ils déjà ?
6. **Admin Workspace :** L'admin Google Workspace devra-t-il whitelister l'app ?
7. **Application mobile :** Prévue ? (PWA suffit ?)
8. **Test utilisateur :** Faut-il une phase de test avec de vrais élèves avant la vérification OAuth ?

---

## 🚦 Indicateurs de Succès par Phase

| Phase | Succès mesurable |
|-------|-----------------|
| ✅ Phase 0 | Site GitHub Pages affiche le nouveau UI/UX |
| ✅ Phase 1 | Un élève se connecte avec Google → sa progression est persistée dans Firestore → il la retrouve sur un autre appareil |
| ✅ Phase 2 | Un professeur voit la progression de tous ses élèves et reçoit une alerte pour les élèves < 30% |
| ✅ Phase 3 | Les élèves apparaissent automatiquement depuis Google Classroom ; les notes de quiz remontent dans Classroom |
| ✅ Phase 4 | Bundle < 500KB initial ; tests passent ; vérification OAuth soumise |
