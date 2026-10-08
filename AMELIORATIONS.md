# Améliorations PyMaster — Rapport de réalisation (oct. 2026)

Objectif demandé : que l'apprenant acquière une **maîtrise totale de Python** —
contenu inspecté et amélioré, navigation vérifiée et corrigée, nouveaux projets
guidés avec code complet, le tout documenté et vérifiable.

> Vérification : `npx tsc --noEmit` ✅ · `npm run build` ✅ (dist 1,18 Mo, gzip 384 Ko)
> Serveur dev : `http://localhost:5173/` ✅ (HTTP 200)

Aucun skill ni installation supplémentaire n'a été nécessaire (stack React/Vite existante suffisante).

---

## 1. Inspection — ce qui était intégré (avant travaux)

| Zone | État constaté |
|---|---|
| 8 modules, 29 leçons, 26 exercices, 37 quiz | Contenu de qualité mais incomplet pour "maîtrise totale" |
| Projets de modules | Plus ou Moins : 3 étapes (superficiel) · Calculatrice : 10 étapes ✅ · **RPG : 0 étape (cassé — affichait juste "exécutez en local")** |
| `src/data/projects.ts` | **Code mort** : 1 projet complet + 2 vides, jamais importé nulle part |
| Navigation | Par état React : **bouton retour navigateur inopérant, refresh = retour à l'accueil** |
| Verrouillage roadmap | Verrou "cosmétique" : contourné via Modules/Accueil (incohérent) |
| Exercices | Réussite **non persistée, +15 XP jamais attribués** (contrairement au README) |
| Quiz | **XP attribués à chaque tentative** (farmable à l'infini) |
| Validation | `code.includes(expected)` sur code brut → **réussi en collant l'attendu dans un commentaire** |
| Profil | Champ nom désynchronisé après un reset |
| Textes | "8 modules" en dur, promesses roadmap (Tkinter, scraping, APIs) non enseignées, compteur "Projets" incomplet |

Sujets manquants vs roadmaps de référence (vérifiés en ligne : roadmap Python 2026, bootcamps) :
**fichiers/CSV/JSON, pathlib, modules/pip/venv, argparse, `__main__`, polymorphisme/dataclasses, projets jeux + automatisation.**

---

## 2. Correctifs navigation & fonctionnalités

| Fichier | Correctif |
|---|---|
| `src/App.tsx` | **Routage par hash** (`#/modules`, `#/module-detail?moduleId=mod-1`…) : retour navigateur, refresh et liens partageables fonctionnent |
| `src/data/storage.ts` | `isModuleUnlocked()` — règle de déverrouillage unique ; `completedExercises` + `completeExercise()` (+15 XP, une seule fois) ; **quiz anti-farm** (seule l'amélioration du meilleur score rapporte ; 100 % = +100 XP) ; 2 nouveaux badges (💻 Codeur, ⌨️ Pro du Clavier → 11 badges) |
| `src/components/RoadmapPage.tsx` | Utilise la règle centralisée ; résumé final réécrit selon le contenu réel |
| `src/components/ModulesPage.tsx` | Verrou cohérent (carte désactivée + 🔒 Verrouillé), texte "chaque module a un projet" corrigé |
| `src/components/HomePage.tsx` | Compteurs dynamiques (`modules.length`), verrou cohérent, compteur Projets = modules + standalone |
| `src/components/Header.tsx` | Nouvel onglet **Projets** (desktop + mobile) |
| `src/components/ProfilePage.tsx` | Champ nom resynchronisé après changement/reset |
| `src/components/ExercisePanel.tsx` | Réussite persistée (reste ✓ après refresh), +15 XP via `completeExercise()` |
| `src/utils/pythonRunner.ts` | `validateCode()` : commentaires retirés avant le test de présence → triche par commentaire impossible |

---

## 3. Contenu amélioré (existant)

- **Projet Plus ou Moins (mod-4) : 3 → 6 étapes** — boucle de jeu, compteur de tentatives, rejouer + record (`modules.ts`, steps `step-4/5/6`).
- **Module 8 POO : +1 leçon `l8-3`** (polymorphisme, duck typing, encapsulation `_`/`__`, `@property`, `@dataclass` + 2 exemples + 1 exercice) **et +2 quiz (`q8-4`, `q8-5`)**.
- **Projet RPG (mod-8) : 0 → 6 étapes** — classe parente, `attaquer` + `max(0,…)`, Guerrier/Mage (`super()`), Archer critiques + soin, `combat()` polymorphe, tournoi. Le projet cassé est maintenant entièrement guidé.

---

## 4. Nouveaux modules (maîtrise totale)

**Module 9 — Fichiers et Données** (`mod-9`, Intermédiaire, 6h) :
`l9-1` open/with/modes/encoding/try-except · `l9-2` csv DictReader/DictWriter/newline/conversions ·
`l9-3` json dump/load + pathlib · 3 exercices · 5 quiz (`q9-1..5`) ·
projet **Analyseur de Dépenses CSV** (6 étapes : création CSV → chargement → agrégation `.get()` → stats `max/key=lambda` → tri/filtrage → rapport.txt).

**Module 10 — Modules, Packages et Environnement** (`mod-10`, Avancé, 5h) :
`l10-1` imports, stdlib (datetime, Counter, defaultdict, statistics) ·
`l10-2` pip/venv/requirements, structure projet, `if __name__ == "__main__"`, créer son module ·
2 exercices · 4 quiz (`q10-1..4`) ·
projet **Organisateur de Fichiers** (6 étapes : iterdir/is_file → table d'extensions → rename → dry-run → Counter+rapport → argparse).

---

## 5. Nouveaux projets guidés (page Projets)

`src/data/projects.ts` **réécrit et branché** (était du code mort) + 2 nouvelles pages :
`src/components/ProjectsPage.tsx` (galerie : niveau, durée, étapes, état terminé) et
`src/components/ProjectDetailPage.tsx` (réutilise `StepByStepProject`, +100 XP via `completeProject`).

| Projet | Niveau | Étapes | Concepts |
|---|---|---|---|
| 🎯 Jeu du Pendu | Débutant | 7 | random, while, strings, set, ASCII art, score, rejouer, `__main__` |
| ⭕ Morpion 2 joueurs | Débutant | 5 | listes 2D, validation, 8 combinaisons, match nul, tournoi |
| 📇 Carnet de Contacts | Interm. | 5 | CRUD, dicts, JSON/pathlib, recherche, menu |
| 🔐 Générateur Mots de Passe | Débutant | 4 | string, random/shuffle, entropie bits, argparse |
| ✂️ Pierre-Papier-Ciseaux | Débutant | 4 | dict de règles, normalisation, stats, tournoi |

Chaque étape : instruction + indice + `starterCode` à trous + `expectedCode` + `validation`.
La galerie rappelle la méthode : essayer soi-même → valider → comparer → **télécharger le .py et l'exécuter en local** (`input`, fichiers, argparse ne vivent qu'en local).

**Total après travaux (v1) : 10 modules · 35 leçons · 32 exercices · 48 quiz · 10 projets guidés (5 de module + 5 standalone), tous avec code complet.**
**Après ajout admin réseaux (v2) : 13 projets guidés (5 de module + 8 standalone).**

---

## 6. Comment vérifier

```bash
npm run dev -- --host          # http://localhost:5173/
npx tsc --noEmit               # 0 erreur
npm run build                  # dist/index.html autonome
```

Parcours de test : Accueil → Modules (🔒 modules verrouillés sauf progression) → mod-1 leçon →
exercice (valider → +15 XP, refresh → reste ✓) → quiz (retenter → XP seulement si meilleur score) →
Projets → Pendu (étapes → téléchargement .py) → Profil (XP/niveau/badges) → Badges (11).
Bouton retour du navigateur et refresh conservent la page (routage `#/`).

## 7. Spécialité Admin Réseaux — 3 projets guidés (v2)

Ajoutés dans `src/data/projects.ts` (`subnetProject`, `portScannerProject`, `netMonitorProject`),
automatiquement visibles dans la galerie Projets (compteur dynamique) avec +100 XP chacun.
Vérification : `tsc` ✅, `build` ✅.

| Projet | Niveau | Étapes | Concepts |
|---|---|---|---|
| 🌐 Calculateur IP & Sous-Réseaux | Intermédiaire | 6 | `ipaddress` (validation, masque/broadcast, hôtes, appartenance, `subnets()`), argparse à sous-commandes → `ipcalc.py` |
| 🔍 Scanner de Ports Multithread | Intermédiaire | 5 | `socket` + `connect_ex` + timeout, plage, table de services + `getservbyport`, `ThreadPoolExecutor`, CLI → `scan.py` |
| 📡 Moniteur Réseau & Alertes | Intermédiaire | 5 | ping multiplateforme (`subprocess`), latence (regex `time=`), journal CSV horodaté, alertes sur changement d'état, supervision temporisée → `monitor.py` |

Prérequis pédagogiques couverts par les modules : conditions/boucles (mod-4), fonctions (mod-5),
erreurs (mod-7), fichiers/CSV/JSON (mod-9), modules/argparse (mod-10).
Note d'usage affichée : scanner uniquement ses propres machines / périmètre autorisé.
Exemples de test locaux : `python ipcalc.py info 192.168.1.0/24` ·
`python scan.py 127.0.0.1 --ports 1-100` · `python monitor.py 127.0.0.1 8.8.8.8 --toutes 10 --duree 60`.

## 8. Limites connues (non traitées, par choix)

- Exécution Python navigateur toujours **simulée** (`pythonRunner.ts`) : `def/for/while`, `input()`, fichiers ne produisent pas de vraie sortie dans l'éditeur intégré — les projets sont conçus pour être exécutés en local (message affiché dans la galerie).
- Pas de tests automatisés ni de lint ; pas de `base` Vite pour GitHub Pages en sous-chemin (à ajuster au déploiement).
- Contenu FR uniquement ; pas de Markdown complet (mini-renderer maison).
