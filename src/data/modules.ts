export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  codeExamples: { title: string; code: string; explanation: string }[];
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  title: string;
  instruction: string;
  starterCode: string;
  solution: string;
  hints: string[];
  tests: TestCase[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  estimatedHours: number;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  project?: ProjectInfo;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ProjectInfo {
  title: string;
  description: string;
  objectives: string[];
  steps: ProjectStep[];
}

export interface ProjectStep {
  id: string;
  title: string;
  instruction: string;
  hint: string;
  starterCode: string;
  expectedCode: string;
  validation: string;
}

export const modules: Module[] = [
  // ========================================
  // MODULE 1 : INTRODUCTION À PYTHON
  // ========================================
  {
    id: 'mod-1',
    number: 1,
    title: 'Introduction à Python',
    subtitle: 'Vos premiers pas dans le monde Python',
    description: 'Découvrez Python, installez votre environnement de développement, et écrivez vos premières lignes de code. Ce module pose les bases essentielles pour tout le parcours.',
    icon: '🐍',
    color: '#10b981',
    difficulty: 'Débutant',
    estimatedHours: 4,
    lessons: [
      {
        id: 'l1-1',
        title: 'Qu\'est-ce que Python ?',
        duration: '20 min',
        content: `# Qu'est-ce que Python ?

**Python** est un langage de programmation créé par **Guido van Rossum** en 1991. Son nom vient des Monty Python, le groupe d'humoristes britanniques, et non du serpent !

## 🌟 Pourquoi Python est-il si populaire ?

### 1. Syntaxe simple et lisible
Python ressemble presque à de l'anglais. Comparez :

**En Python :**
\`\`\`python
if age >= 18:
    print("Vous êtes majeur")
\`\`\`

**En Java :**
\`\`\`java
if (age >= 18) {
    System.out.println("Vous êtes majeur");
}
\`\`\`

### 2. Polyvalent
Python est utilisé dans de nombreux domaines :
- 🌐 **Développement Web** (Django, Flask)
- 📊 **Data Science** (Pandas, NumPy)
- 🤖 **Intelligence Artificielle** (TensorFlow, PyTorch)
- 🎮 **Jeux vidéo** (Pygame)
- 🔧 **Automatisation** (Scripts, DevOps)

### 3. Communauté immense
- Plus de 400 000 packages sur PyPI
- Documentation excellente
- Aide facile à trouver

## 📈 Python dans l'industrie

| Entreprise | Utilisation |
|------------|-------------|
| Google | YouTube, IA |
| Netflix | Recommandations |
| Instagram | Backend |
| Spotify | Analyse de données |
| NASA | Calculs scientifiques |

## 🔤 Versions de Python

**Python 2** est obsolète depuis 2020. Utilisez toujours **Python 3** (3.10+ recommandé).

La version actuelle est Python 3.12.`,
        codeExamples: [
          {
            title: 'Votre tout premier programme Python',
            code: `# Ceci est un commentaire - Python l'ignore
# Les commentaires expliquent le code aux humains

# La fonction print() affiche du texte à l'écran
print("Hello, World!")

# On peut afficher plusieurs lignes
print("Bienvenue dans PyMaster!")
print("Vous allez apprendre Python 🐍")

# Afficher des nombres
print(42)
print(3.14159)

# Afficher le résultat d'un calcul
print(10 + 5)
print("Le résultat de 10 + 5 est:", 10 + 5)`,
            explanation: 'print() est la fonction la plus basique de Python. Elle affiche tout ce qu\'on lui donne entre parenthèses. Les textes sont entourés de guillemets, pas les nombres.'
          },
          {
            title: 'Les commentaires en Python',
            code: `# Commentaire sur une seule ligne
# Utilisez # pour expliquer votre code

"""
Commentaire sur
plusieurs lignes
avec trois guillemets
"""

# Bonne pratique : commentez POURQUOI, pas QUOI
# ❌ Mauvais : Ajoute 1 à x
# ✅ Bon : Incrémente le compteur pour la prochaine itération

# Les commentaires n'affectent pas l'exécution
print("Ce code s'exécute")  # Ceci aussi
# print("Ce code est ignoré")`,
            explanation: 'Les commentaires sont essentiels pour rendre votre code compréhensible. Utilisez # pour une ligne, ou triple guillemets pour plusieurs lignes.'
          }
        ],
        exercises: [
          {
            id: 'ex1-1-1',
            title: 'Votre premier print',
            instruction: 'Utilisez print() pour afficher "Bonjour, je suis [votre prénom] et j\'apprends Python !"',
            starterCode: `# Exercice : Affichez votre message de présentation
# Remplacez ___ par votre code

___`,
            solution: `# Solution
print("Bonjour, je suis Alice et j'apprends Python !")`,
            hints: [
              'Utilisez la fonction print()',
              'Le texte doit être entre guillemets',
              'Exemple : print("Mon texte")'
            ],
            tests: [
              { input: '', expected: 'Bonjour', description: 'Le message doit contenir "Bonjour"' },
              { input: '', expected: 'Python', description: 'Le message doit mentionner "Python"' }
            ],
            difficulty: 'easy'
          },
          {
            id: 'ex1-1-2',
            title: 'Plusieurs lignes',
            instruction: 'Affichez votre nom, votre âge et votre ville sur trois lignes séparées.',
            starterCode: `# Affichez 3 informations sur 3 lignes
# Utilisez 3 instructions print()

print("Nom: ___")
___
___`,
            solution: `print("Nom: Alice")
print("Âge: 25")
print("Ville: Paris")`,
            hints: [
              'Vous avez besoin de 3 print()',
              'Chaque print() affiche une nouvelle ligne'
            ],
            tests: [
              { input: '', expected: 'output_lines >= 3', description: 'Doit afficher au moins 3 lignes' }
            ],
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'l1-2',
        title: 'Installation de Python',
        duration: '30 min',
        content: `# Installation de Python

Avant de coder, installons Python sur votre ordinateur !

## 💻 Installation sur Windows

### Étape 1 : Télécharger Python
1. Allez sur [python.org/downloads](https://www.python.org/downloads/)
2. Cliquez sur "Download Python 3.12.x"

### Étape 2 : Installer
1. Lancez le fichier téléchargé
2. **IMPORTANT** : Cochez ✅ "Add Python to PATH"
3. Cliquez sur "Install Now"

### Étape 3 : Vérifier
Ouvrez le terminal (cmd) et tapez :
\`\`\`
python --version
\`\`\`

## 🍎 Installation sur macOS

### Méthode 1 : Site officiel
Même procédure que Windows sur python.org

### Méthode 2 : Homebrew (recommandé)
\`\`\`bash
brew install python
\`\`\`

### Vérifier
\`\`\`bash
python3 --version
\`\`\`

## 🐧 Installation sur Linux

### Ubuntu/Debian
\`\`\`bash
sudo apt update
sudo apt install python3 python3-pip
\`\`\`

### Vérifier
\`\`\`bash
python3 --version
\`\`\`

## 🔧 Installer VS Code (Éditeur recommandé)

1. Téléchargez sur [code.visualstudio.com](https://code.visualstudio.com/)
2. Installez l'extension "Python" de Microsoft
3. Créez un fichier avec l'extension \`.py\`

## 🚀 Premier test dans le terminal

\`\`\`bash
# Lancer l'interpréteur interactif
python3

# Vous verrez >>>
>>> print("Python fonctionne !")
Python fonctionne !
>>> 2 + 2
4
>>> exit()  # Pour quitter
\`\`\``,
        codeExamples: [
          {
            title: 'Tester votre installation',
            code: `# Fichier : test_installation.py
# Enregistrez ce code et exécutez-le

import sys

print("=" * 40)
print("🐍 Test d'installation Python")
print("=" * 40)

print(f"Version Python : {sys.version}")
print(f"Chemin Python  : {sys.executable}")
print()
print("✅ Python est correctement installé !")
print("🎉 Vous êtes prêt à coder !")`,
            explanation: 'Ce script affiche les informations sur votre installation Python. Le module sys contient des informations sur le système.'
          }
        ],
        exercises: []
      },
      {
        id: 'l1-3',
        title: 'Le terminal Python (REPL)',
        duration: '25 min',
        content: `# Le Terminal Python (REPL)

Le **REPL** (Read-Eval-Print Loop) est l'interpréteur interactif de Python. C'est un outil puissant pour tester du code rapidement.

## 🚀 Lancer le REPL

Dans votre terminal :
\`\`\`bash
python3
# ou
python
\`\`\`

Vous verrez :
\`\`\`
Python 3.12.0 (...)
>>> _
\`\`\`

Les \`>>>\` indiquent que Python attend votre commande.

## 💡 Utilisation du REPL

### Comme calculatrice
\`\`\`python
>>> 2 + 2
4
>>> 10 * 5
50
>>> 100 / 3
33.333333333333336
\`\`\`

### Tester du code
\`\`\`python
>>> nom = "Alice"
>>> print(f"Bonjour {nom}")
Bonjour Alice
\`\`\`

### Obtenir de l'aide
\`\`\`python
>>> help(print)  # Documentation de print
>>> dir(str)     # Méthodes des chaînes
\`\`\`

## ⌨️ Raccourcis utiles

| Raccourci | Action |
|-----------|--------|
| ↑ / ↓ | Historique des commandes |
| Ctrl+L | Effacer l'écran |
| Ctrl+C | Annuler la commande |
| exit() | Quitter le REPL |

## 📄 Fichiers .py vs REPL

| REPL | Fichier .py |
|------|-------------|
| Tests rapides | Programmes complets |
| Expérimentation | Code réutilisable |
| Pas de sauvegarde | Sauvegardé sur disque |`,
        codeExamples: [
          {
            title: 'Session REPL typique',
            code: `# Dans le REPL, chaque ligne est exécutée immédiatement
>>> nom = "PyMaster"
>>> version = 1.0
>>> print(f"Bienvenue sur {nom} v{version}")
Bienvenue sur PyMaster v1.0

>>> # Calculons quelque chose
>>> prix = 29.99
>>> quantite = 3
>>> total = prix * quantite
>>> total
89.97

>>> # Python arrondit pour nous
>>> round(total, 2)
89.97

>>> # Quitter proprement
>>> exit()`,
            explanation: 'Le REPL exécute chaque ligne immédiatement et affiche le résultat. C\'est parfait pour apprendre et expérimenter.'
          }
        ],
        exercises: []
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Qui a créé Python ?',
        options: ['Guido van Rossum', 'Linus Torvalds', 'Bill Gates', 'Mark Zuckerberg'],
        correctIndex: 0,
        explanation: 'Guido van Rossum a créé Python en 1991. Il est surnommé le "Benevolent Dictator For Life" (BDFL) de Python.'
      },
      {
        id: 'q1-2',
        question: 'Quelle version de Python devez-vous utiliser ?',
        options: ['Python 1', 'Python 2', 'Python 3', 'Python 4'],
        correctIndex: 2,
        explanation: 'Python 2 est obsolète depuis 2020. Python 3 est la version actuelle et maintenue.'
      },
      {
        id: 'q1-3',
        question: 'Que fait print("Hello") ?',
        options: ['Crée une variable', 'Affiche Hello à l\'écran', 'Crée un fichier', 'Rien'],
        correctIndex: 1,
        explanation: 'print() est une fonction qui affiche son argument à l\'écran (dans la console).'
      },
      {
        id: 'q1-4',
        question: 'Comment écrire un commentaire en Python ?',
        options: ['// commentaire', '/* commentaire */', '# commentaire', '<!-- commentaire -->'],
        correctIndex: 2,
        explanation: 'En Python, les commentaires commencent par #. Les autres syntaxes sont pour d\'autres langages.'
      },
      {
        id: 'q1-5',
        question: 'Que signifie REPL ?',
        options: ['Read-Eval-Print Loop', 'Run-Execute-Process Loop', 'Read-Edit-Print List', 'Rien'],
        correctIndex: 0,
        explanation: 'REPL = Read (lire), Eval (évaluer), Print (afficher), Loop (boucler). C\'est l\'interpréteur interactif.'
      }
    ]
  },

  // ========================================
  // MODULE 2 : VARIABLES ET TYPES DE DONNÉES
  // ========================================
  {
    id: 'mod-2',
    number: 2,
    title: 'Variables et Types de Données',
    subtitle: 'Stocker et manipuler des informations',
    description: 'Maîtrisez les variables, découvrez tous les types de données Python (nombres, chaînes, booléens), et apprenez à les convertir entre eux.',
    icon: '📦',
    color: '#8b5cf6',
    difficulty: 'Débutant',
    estimatedHours: 6,
    lessons: [
      {
        id: 'l2-1',
        title: 'Les Variables',
        duration: '35 min',
        content: `# Les Variables en Python

Une **variable** est comme une boîte étiquetée qui stocke une valeur en mémoire.

## 🎯 Créer une variable

En Python, créer une variable est simple :

\`\`\`python
nom = "Alice"       # Crée une variable "nom" contenant "Alice"
age = 25            # Crée une variable "age" contenant 25
\`\`\`

**Pas besoin** de déclarer le type ! Python le devine automatiquement.

## 📝 Règles de nommage

### ✅ Noms valides
- Commencer par une lettre ou \`_\`
- Contenir lettres, chiffres, \`_\`
- Sensible à la casse (\`nom\` ≠ \`Nom\`)

### ❌ Noms invalides
- Commencer par un chiffre (\`2nom\`)
- Contenir des espaces (\`mon nom\`)
- Utiliser des mots réservés (\`if\`, \`for\`, \`class\`)

### 🎨 Conventions (PEP 8)
| Style | Usage | Exemple |
|-------|-------|---------|
| snake_case | Variables, fonctions | \`mon_age\`, \`calcul_total\` |
| PascalCase | Classes | \`MaClasse\`, \`Utilisateur\` |
| MAJUSCULES | Constantes | \`PI\`, \`MAX_SIZE\` |

## 🔄 Réassignation

Les variables peuvent changer de valeur :
\`\`\`python
score = 0
score = 10      # Maintenant score vaut 10
score = score + 5  # score vaut 15
\`\`\`

## 📍 Assignation multiple

\`\`\`python
# Assigner la même valeur
a = b = c = 0

# Assigner des valeurs différentes
x, y, z = 1, 2, 3

# Échanger deux variables
a, b = b, a
\`\`\``,
        codeExamples: [
          {
            title: 'Créer et utiliser des variables',
            code: `# Création de variables de différents types
prenom = "Marie"          # Chaîne de caractères (str)
age = 28                  # Nombre entier (int)
taille = 1.65             # Nombre décimal (float)
est_etudiante = True      # Booléen (bool)

# Utiliser les variables
print("Prénom:", prenom)
print("Âge:", age, "ans")
print("Taille:", taille, "m")
print("Étudiante:", est_etudiante)

# Calculs avec des variables
annee_naissance = 2024 - age
print("Année de naissance:", annee_naissance)

# Modification d'une variable
age = age + 1  # Un an de plus !
print("Nouvel âge:", age)

# Syntaxe raccourcie
age += 1  # Équivalent à age = age + 1
print("Encore un an:", age)`,
            explanation: 'Les variables stockent des données que vous pouvez réutiliser et modifier. Le signe = assigne une valeur à une variable.'
          },
          {
            title: 'Conventions de nommage',
            code: `# ✅ BONNES PRATIQUES

# snake_case pour les variables
nom_utilisateur = "alice123"
nombre_de_points = 100
est_connecte = True

# MAJUSCULES pour les constantes
PI = 3.14159
VITESSE_LUMIERE = 299792458
MAX_TENTATIVES = 3

# Noms descriptifs
# ❌ Mauvais
x = 100
n = "Alice"

# ✅ Bon
prix_produit = 100
nom_client = "Alice"

# ❌ À éviter (mots réservés Python)
# class = "Math"  # Erreur !
# for = 10        # Erreur !

# ✅ Alternative
classe = "Math"
nombre_for = 10`,
            explanation: 'Suivre les conventions rend votre code plus lisible pour vous et les autres développeurs. PEP 8 est le guide de style officiel de Python.'
          }
        ],
        exercises: [
          {
            id: 'ex2-1-1',
            title: 'Créer des variables',
            instruction: 'Créez trois variables : "nom" avec votre prénom, "age" avec votre âge, et "ville" avec votre ville. Affichez-les avec print().',
            starterCode: `# Créez vos variables ici
nom = ___
age = ___
ville = ___

# Affichez-les
print("Je m'appelle", ___)
print("J'ai", ___, "ans")
print("J'habite à", ___)`,
            solution: `nom = "Alice"
age = 25
ville = "Paris"

print("Je m'appelle", nom)
print("J'ai", age, "ans")
print("J'habite à", ville)`,
            hints: [
              'Les textes sont entre guillemets',
              'Les nombres sont sans guillemets',
              'Utilisez le nom de la variable sans guillemets dans print()'
            ],
            tests: [
              { input: '', expected: 'nom', description: 'Variable nom doit exister' },
              { input: '', expected: 'age', description: 'Variable age doit exister' },
              { input: '', expected: 'ville', description: 'Variable ville doit exister' }
            ],
            difficulty: 'easy'
          },
          {
            id: 'ex2-1-2',
            title: 'Calculs avec variables',
            instruction: 'Créez les variables prix=29.99 et quantite=3. Calculez le total et affichez "Total: X €".',
            starterCode: `# Variables
prix = ___
quantite = ___

# Calcul
total = ___ * ___

# Affichage
print("Total:", ___, "€")`,
            solution: `prix = 29.99
quantite = 3
total = prix * quantite
print("Total:", total, "€")`,
            hints: [
              'prix est un nombre décimal (29.99)',
              'Le total = prix × quantité',
              'Affichez la variable total'
            ],
            tests: [
              { input: '', expected: '89.97', description: 'Le total doit être 89.97' }
            ],
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'l2-2',
        title: 'Types de Données Numériques',
        duration: '40 min',
        content: `# Types Numériques en Python

Python propose plusieurs types pour représenter les nombres.

## 🔢 Entiers (int)

Les entiers sont des nombres sans virgule, positifs ou négatifs.

\`\`\`python
age = 25
temperature = -5
population = 67000000
\`\`\`

### Pas de limite de taille !
\`\`\`python
grand_nombre = 99999999999999999999999999999999
# Python gère automatiquement !
\`\`\`

### Notations spéciales
\`\`\`python
binaire = 0b1010      # 10 en binaire
octal = 0o17          # 15 en octal
hexadecimal = 0xFF    # 255 en hexadécimal
\`\`\`

## 🔢 Nombres à virgule flottante (float)

Les floats représentent les nombres décimaux.

\`\`\`python
prix = 19.99
pi = 3.14159
temperature = -4.5
\`\`\`

### Notation scientifique
\`\`\`python
avogadro = 6.022e23   # 6.022 × 10²³
petit = 1.5e-10       # 0.00000000015
\`\`\`

### ⚠️ Attention aux floats
\`\`\`python
0.1 + 0.2  # = 0.30000000000000004 (pas exactement 0.3)
\`\`\`

## 🔢 Nombres complexes (complex)

Pour les mathématiques avancées :
\`\`\`python
z = 3 + 4j
z.real  # 3.0
z.imag  # 4.0
\`\`\`

## 📊 Vérifier le type

\`\`\`python
type(42)      # <class 'int'>
type(3.14)    # <class 'float'>
type(1+2j)    # <class 'complex'>
\`\`\``,
        codeExamples: [
          {
            title: 'Travailler avec les nombres',
            code: `# Entiers (int)
age = 25
annees_experience = 3
print(f"Âge: {age}, Type: {type(age)}")

# Nombres décimaux (float)
prix = 49.99
taux_tva = 0.20
prix_ttc = prix * (1 + taux_tva)
print(f"Prix TTC: {prix_ttc:.2f} €")

# Grands nombres (lisibilité avec _)
population_mondiale = 8_000_000_000
distance_lune = 384_400  # km
print(f"Population: {population_mondiale:,}")

# Notation scientifique
vitesse_lumiere = 3e8  # 300 000 000 m/s
masse_electron = 9.109e-31  # kg
print(f"Vitesse de la lumière: {vitesse_lumiere:.0f} m/s")

# Vérifier les types
print(f"type(42) = {type(42)}")
print(f"type(3.14) = {type(3.14)}")
print(f"type(42.0) = {type(42.0)}")  # float car .0`,
            explanation: 'Python distingue int (entiers) et float (décimaux). Le type est automatiquement déterminé. Utilisez type() pour vérifier.'
          },
          {
            title: 'Conversions entre types numériques',
            code: `# int → float
entier = 42
decimal = float(entier)
print(f"{entier} → {decimal}")  # 42 → 42.0

# float → int (troncature, pas arrondi !)
prix = 29.99
prix_arrondi = int(prix)
print(f"{prix} → {prix_arrondi}")  # 29.99 → 29

# Pour arrondir correctement
import math
print(f"round(29.99) = {round(29.99)}")     # 30
print(f"math.floor(29.99) = {math.floor(29.99)}")  # 29
print(f"math.ceil(29.99) = {math.ceil(29.99)}")    # 30

# Texte → Nombre
texte_entier = "42"
texte_decimal = "3.14"
nombre1 = int(texte_entier)
nombre2 = float(texte_decimal)
print(f"'{texte_entier}' → {nombre1}")
print(f"'{texte_decimal}' → {nombre2}")

# ⚠️ Erreur si le texte n'est pas un nombre valide
# int("abc")  # ValueError !
# int("3.14") # ValueError ! (utiliser float d'abord)`,
            explanation: 'Les fonctions int(), float() convertissent entre types. int() tronque (ne pas confondre avec arrondir). Attention aux textes invalides.'
          }
        ],
        exercises: [
          {
            id: 'ex2-2-1',
            title: 'Types numériques',
            instruction: 'Créez un int "annee" (2024), un float "prix" (29.99). Affichez leur type avec type().',
            starterCode: `# Créez les variables
annee = ___
prix = ___

# Affichez les types
print("Type de annee:", type(___))
print("Type de prix:", type(___))`,
            solution: `annee = 2024
prix = 29.99
print("Type de annee:", type(annee))
print("Type de prix:", type(prix))`,
            hints: ['Un int n\'a pas de virgule', 'Un float a une virgule ou un .0'],
            tests: [
              { input: '', expected: "int", description: 'annee doit être un int' },
              { input: '', expected: "float", description: 'prix doit être un float' }
            ],
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'l2-3',
        title: 'Chaînes de Caractères (Strings)',
        duration: '45 min',
        content: `# Chaînes de Caractères (str)

Les **strings** (chaînes) représentent du texte en Python.

## ✏️ Créer des chaînes

### Guillemets simples ou doubles
\`\`\`python
nom = 'Alice'
message = "Bonjour !"
# Équivalents !
\`\`\`

### Guillemets dans les chaînes
\`\`\`python
phrase1 = "Il a dit 'Bonjour'"
phrase2 = 'Il a dit "Bonjour"'
phrase3 = "Il a dit \\"Bonjour\\""  # Échappement
\`\`\`

### Chaînes multilignes
\`\`\`python
poeme = """
Roses are red,
Violets are blue,
Python is awesome,
And so are you!
"""
\`\`\`

## 🔧 Caractères spéciaux

| Séquence | Signification |
|----------|---------------|
| \`\\n\` | Nouvelle ligne |
| \`\\t\` | Tabulation |
| \`\\\\\` | Backslash |
| \`\\'\` | Apostrophe |
| \`\\"\` | Guillemet |

## 📏 Longueur et accès

\`\`\`python
texte = "Python"
len(texte)     # 6
texte[0]       # 'P' (premier)
texte[-1]      # 'n' (dernier)
texte[0:3]     # 'Pyt' (slice)
\`\`\`

## 🔗 Concaténation

\`\`\`python
prenom = "Marie"
nom = "Curie"
complet = prenom + " " + nom  # "Marie Curie"
\`\`\``,
        codeExamples: [
          {
            title: 'Manipulation des chaînes',
            code: `# Création de chaînes
prenom = "Alice"
nom = 'Dupont'
message = """Ceci est un
message sur
plusieurs lignes"""

print(prenom)
print(message)

# Longueur
print(f"Le prénom a {len(prenom)} lettres")

# Accès aux caractères (index commence à 0)
print(f"Première lettre: {prenom[0]}")
print(f"Dernière lettre: {prenom[-1]}")

# Slicing (découpage)
mot = "Python"
print(f"mot[0:2] = {mot[0:2]}")    # Py
print(f"mot[2:] = {mot[2:]}")      # thon
print(f"mot[:3] = {mot[:3]}")      # Pyt
print(f"mot[::2] = {mot[::2]}")    # Pto (un sur deux)
print(f"mot[::-1] = {mot[::-1]}")  # nohtyP (inversé)

# Concaténation
salut = "Bonjour " + prenom + " !"
print(salut)

# Répétition
ligne = "-" * 20
print(ligne)`,
            explanation: 'Les chaînes sont indexées à partir de 0. Les index négatifs comptent depuis la fin. Le slicing [début:fin:pas] extrait des sous-chaînes.'
          },
          {
            title: 'Méthodes des chaînes',
            code: `texte = "  Bonjour le Monde  "

# Casse (majuscules/minuscules)
print(texte.upper())      # "  BONJOUR LE MONDE  "
print(texte.lower())      # "  bonjour le monde  "
print(texte.title())      # "  Bonjour Le Monde  "
print(texte.capitalize()) # "  bonjour le monde  "

# Nettoyage des espaces
print(texte.strip())   # "Bonjour le Monde"
print(texte.lstrip())  # "Bonjour le Monde  "
print(texte.rstrip())  # "  Bonjour le Monde"

# Recherche
phrase = "Python est génial, Python est facile"
print(phrase.find("Python"))     # 0 (première occurrence)
print(phrase.rfind("Python"))    # 21 (dernière occurrence)
print(phrase.count("Python"))    # 2 (nombre d'occurrences)
print("génial" in phrase)        # True

# Remplacement
print(phrase.replace("Python", "Java"))

# Division et jonction
mots = phrase.split(" ")  # Liste de mots
print(mots)
rejoint = "-".join(mots)  # Rejoint avec -
print(rejoint)

# Vérifications
print("abc".isalpha())   # True (que des lettres)
print("123".isdigit())   # True (que des chiffres)
print("abc123".isalnum())# True (lettres et chiffres)`,
            explanation: 'Les chaînes ont de nombreuses méthodes built-in. Elles retournent une nouvelle chaîne (les strings sont immuables).'
          },
          {
            title: 'Formatage de chaînes (f-strings)',
            code: `# Les f-strings (Python 3.6+) - RECOMMANDÉ
nom = "Alice"
age = 25
solde = 1234.567

# Insertion de variables
print(f"Je m'appelle {nom} et j'ai {age} ans.")

# Expressions dans les f-strings
print(f"Dans 10 ans, j'aurai {age + 10} ans.")
print(f"Mon nom en majuscules : {nom.upper()}")

# Formatage des nombres
print(f"Solde : {solde:.2f} €")        # 2 décimales
print(f"Solde : {solde:,.2f} €")       # Séparateurs
print(f"Pourcentage : {0.756:.1%}")    # 75.6%

# Alignement
for produit, prix in [("Pommes", 2.50), ("Oranges", 3.00), ("Bananes", 1.80)]:
    print(f"{produit:<10} : {prix:>6.2f} €")

# Padding avec zéros
numero = 42
print(f"Numéro : {numero:05d}")  # 00042

# Ancienne méthode (format)
print("Je m'appelle {} et j'ai {} ans".format(nom, age))

# Très ancienne méthode (%)
print("Je m'appelle %s et j'ai %d ans" % (nom, age))`,
            explanation: 'Les f-strings sont la méthode moderne et recommandée. Elles permettent d\'insérer des variables et expressions directement dans les chaînes.'
          }
        ],
        exercises: [
          {
            id: 'ex2-3-1',
            title: 'Manipulation de chaînes',
            instruction: 'Créez une variable "phrase" contenant "python est genial". Affichez-la en majuscules, puis comptez le nombre de fois que "e" apparaît.',
            starterCode: `phrase = "python est genial"

# Majuscules
print(___.upper())

# Compter les "e"
nombre_e = ___.count("e")
print("Nombre de 'e':", ___)`,
            solution: `phrase = "python est genial"
print(phrase.upper())
nombre_e = phrase.count("e")
print("Nombre de 'e':", nombre_e)`,
            hints: [
              'Utilisez .upper() pour les majuscules',
              'Utilisez .count("e") pour compter'
            ],
            tests: [
              { input: '', expected: 'PYTHON EST GENIAL', description: 'Doit afficher en majuscules' },
              { input: '', expected: '2', description: 'Il y a 2 "e" dans la phrase' }
            ],
            difficulty: 'easy'
          },
          {
            id: 'ex2-3-2',
            title: 'F-strings',
            instruction: 'Créez les variables nom="Alice" et age=25. Utilisez une f-string pour afficher "Alice a 25 ans et aura 35 ans dans 10 ans."',
            starterCode: `nom = "Alice"
age = 25

# Utilisez une f-string avec un calcul
print(f"___")`,
            solution: `nom = "Alice"
age = 25
print(f"{nom} a {age} ans et aura {age + 10} ans dans 10 ans.")`,
            hints: [
              'Les f-strings commencent par f"..."',
              'Insérez des variables avec {variable}',
              'Vous pouvez faire des calculs : {age + 10}'
            ],
            tests: [
              { input: '', expected: 'Alice a 25 ans', description: 'Doit contenir le nom et l\'âge' },
              { input: '', expected: '35 ans', description: 'Doit calculer 25 + 10 = 35' }
            ],
            difficulty: 'medium'
          }
        ]
      },
      {
        id: 'l2-4',
        title: 'Booléens et None',
        duration: '25 min',
        content: `# Booléens et None

## ✅ Booléens (bool)

Les booléens ne peuvent avoir que deux valeurs : **True** ou **False**.

### Création
\`\`\`python
est_majeur = True
a_permis = False
\`\`\`

### Résultat de comparaisons
\`\`\`python
10 > 5      # True
3 == 4      # False
"a" < "b"   # True (ordre alphabétique)
\`\`\`

### Valeurs "falsy" et "truthy"

En contexte booléen, certaines valeurs sont "fausses" :
- \`False\`, \`0\`, \`0.0\`
- \`""\` (chaîne vide)
- \`[]\`, \`()\`, \`{}\` (collections vides)
- \`None\`

Tout le reste est "vrai" !

\`\`\`python
bool(0)      # False
bool(42)     # True
bool("")     # False
bool("Hi")   # True
bool([])     # False
bool([1,2])  # True
\`\`\`

## 🚫 None

\`None\` représente l'**absence de valeur**.

\`\`\`python
resultat = None  # Pas encore de résultat
utilisateur = None  # Pas d'utilisateur connecté

# Vérification
if resultat is None:
    print("Pas de résultat")
\`\`\`

### is vs ==
\`\`\`python
x = None
x is None     # ✅ Correct
x == None     # ⚠️ Fonctionne mais déconseillé
\`\`\``,
        codeExamples: [
          {
            title: 'Booléens en pratique',
            code: `# Booléens directs
est_connecte = True
est_admin = False

print(f"Connecté: {est_connecte}")
print(f"Admin: {est_admin}")

# Résultats de comparaisons
age = 20
est_majeur = age >= 18
print(f"Majeur: {est_majeur}")

# Opérateurs logiques
a_acces = est_connecte and est_majeur
print(f"A accès: {a_acces}")

peut_poster = est_connecte or est_admin
print(f"Peut poster: {peut_poster}")

est_mineur = not est_majeur
print(f"Mineur: {est_mineur}")

# Valeurs truthy/falsy
print("\\n--- Valeurs truthy/falsy ---")
print(f"bool(0) = {bool(0)}")
print(f"bool(42) = {bool(42)}")
print(f"bool('') = {bool('')}")
print(f"bool('texte') = {bool('texte')}")
print(f"bool([]) = {bool([])}")
print(f"bool([1,2,3]) = {bool([1,2,3])}")

# None
resultat = None
if resultat is None:
    print("\\nPas encore de résultat")`,
            explanation: 'Les booléens sont fondamentaux pour la logique. True et False (avec majuscule). None représente l\'absence de valeur.'
          }
        ],
        exercises: [
          {
            id: 'ex2-4-1',
            title: 'Booléens et comparaisons',
            instruction: 'Créez age=17. Créez un booléen est_majeur qui vaut True si age >= 18. Affichez le résultat.',
            starterCode: `age = 17

# Créez le booléen
est_majeur = ___

print("Majeur:", est_majeur)`,
            solution: `age = 17
est_majeur = age >= 18
print("Majeur:", est_majeur)`,
            hints: ['Utilisez >= pour comparer', 'Le résultat sera automatiquement un booléen'],
            tests: [
              { input: '', expected: 'False', description: '17 < 18 donc False' }
            ],
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'l2-5',
        title: 'Conversions de Types',
        duration: '30 min',
        content: `# Conversions de Types (Casting)

Parfois, vous devez convertir un type vers un autre.

## 🔄 Fonctions de conversion

| Fonction | Convertit en |
|----------|--------------|
| \`int()\` | Entier |
| \`float()\` | Décimal |
| \`str()\` | Chaîne |
| \`bool()\` | Booléen |
| \`list()\` | Liste |
| \`tuple()\` | Tuple |
| \`set()\` | Ensemble |

## 📖 Exemples courants

### str → int
\`\`\`python
texte = "42"
nombre = int(texte)  # 42
\`\`\`

### int → str
\`\`\`python
age = 25
message = "J'ai " + str(age) + " ans"
\`\`\`

### float → int (troncature !)
\`\`\`python
prix = 29.99
prix_entier = int(prix)  # 29 (pas 30 !)
\`\`\`

### Avec input()
\`\`\`python
# input() retourne TOUJOURS une chaîne
age_texte = input("Votre âge: ")  # "25"
age = int(age_texte)              # 25
\`\`\`

## ⚠️ Erreurs possibles

\`\`\`python
int("abc")    # ValueError !
int("3.14")   # ValueError ! (float d'abord)
float("xyz")  # ValueError !
\`\`\``,
        codeExamples: [
          {
            title: 'Conversions pratiques',
            code: `# String vers nombres
texte_entier = "42"
texte_decimal = "3.14"

entier = int(texte_entier)
decimal = float(texte_decimal)

print(f"'{texte_entier}' → {entier} (type: {type(entier).__name__})")
print(f"'{texte_decimal}' → {decimal} (type: {type(decimal).__name__})")

# Nombre vers string
age = 25
prix = 19.99

str_age = str(age)
str_prix = str(prix)

print(f"{age} → '{str_age}'")
message = "Prix: " + str_prix + " €"
print(message)

# Float vers int (ATTENTION: troncature)
print(f"\\nint(3.9) = {int(3.9)}")   # 3, pas 4 !
print(f"int(-3.9) = {int(-3.9)}") # -3, pas -4 !

# Pour arrondir correctement
print(f"round(3.9) = {round(3.9)}")  # 4

# Conversion en booléen
print(f"\\nbool(0) = {bool(0)}")
print(f"bool(1) = {bool(1)}")
print(f"bool('') = {bool('')}")
print(f"bool('texte') = {bool('texte')}")

# Simuler input() (normalement interactif)
age_input = "30"  # Comme si l'utilisateur avait tapé 30
age_nombre = int(age_input)
print(f"\\nDans 10 ans: {age_nombre + 10}")`,
            explanation: 'Les conversions sont essentielles, surtout avec input() qui retourne toujours du texte. int() tronque, round() arrondit.'
          }
        ],
        exercises: [
          {
            id: 'ex2-5-1',
            title: 'Conversion et calcul',
            instruction: 'Vous avez prix_texte="29.99" et quantite_texte="3". Convertissez-les en nombres et calculez le total.',
            starterCode: `prix_texte = "29.99"
quantite_texte = "3"

# Convertissez
prix = ___(prix_texte)
quantite = ___(quantite_texte)

# Calculez
total = ___ * ___

print(f"Total: {total} €")`,
            solution: `prix_texte = "29.99"
quantite_texte = "3"
prix = float(prix_texte)
quantite = int(quantite_texte)
total = prix * quantite
print(f"Total: {total} €")`,
            hints: [
              'prix a une virgule → float()',
              'quantite est entier → int()',
              'total = prix × quantité'
            ],
            tests: [
              { input: '', expected: '89.97', description: 'Le total doit être 89.97' }
            ],
            difficulty: 'medium'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Quel est le type de la valeur 3.14 ?',
        options: ['int', 'float', 'str', 'bool'],
        correctIndex: 1,
        explanation: '3.14 est un nombre à virgule flottante, donc son type est float.'
      },
      {
        id: 'q2-2',
        question: 'Que retourne type("42") ?',
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
        correctIndex: 2,
        explanation: '"42" est entre guillemets, c\'est donc une chaîne de caractères (str), pas un nombre.'
      },
      {
        id: 'q2-3',
        question: 'Que vaut int(3.99) ?',
        options: ['3', '4', '3.99', 'Erreur'],
        correctIndex: 0,
        explanation: 'int() tronque le nombre décimal, il ne l\'arrondit pas. 3.99 devient 3.'
      },
      {
        id: 'q2-4',
        question: 'Quel est le résultat de bool("") ?',
        options: ['True', 'False', '"False"', 'Erreur'],
        correctIndex: 1,
        explanation: 'Une chaîne vide est "falsy" en Python, donc bool("") retourne False.'
      },
      {
        id: 'q2-5',
        question: 'Comment vérifier si une variable est None ?',
        options: ['x == None', 'x = None', 'x is None', 'x.isNone()'],
        correctIndex: 2,
        explanation: 'La façon idiomatique de vérifier None en Python est d\'utiliser "is None".'
      },
      {
        id: 'q2-6',
        question: 'Que produit "Python"[1:4] ?',
        options: ['"Pyt"', '"yth"', '"ytho"', '"ython"'],
        correctIndex: 1,
        explanation: 'Le slicing [1:4] prend les caractères des index 1, 2, 3 (4 exclu). "Python"[1:4] = "yth".'
      }
    ]
  },

  // ========================================
  // MODULE 3 : OPÉRATEURS
  // ========================================
  {
    id: 'mod-3',
    number: 3,
    title: 'Opérateurs et Expressions',
    subtitle: 'Calculs et comparaisons',
    description: 'Maîtrisez tous les opérateurs Python : arithmétiques, comparaison, logiques, d\'assignation et plus encore.',
    icon: '➕',
    color: '#f59e0b',
    difficulty: 'Débutant',
    estimatedHours: 4,
    lessons: [
      {
        id: 'l3-1',
        title: 'Opérateurs Arithmétiques',
        duration: '30 min',
        content: `# Opérateurs Arithmétiques

Python supporte toutes les opérations mathématiques de base.

## 🔢 Opérateurs de base

| Opérateur | Nom | Exemple | Résultat |
|-----------|-----|---------|----------|
| \`+\` | Addition | \`5 + 3\` | \`8\` |
| \`-\` | Soustraction | \`5 - 3\` | \`2\` |
| \`*\` | Multiplication | \`5 * 3\` | \`15\` |
| \`/\` | Division | \`7 / 2\` | \`3.5\` |
| \`//\` | Division entière | \`7 // 2\` | \`3\` |
| \`%\` | Modulo (reste) | \`7 % 2\` | \`1\` |
| \`**\` | Puissance | \`2 ** 3\` | \`8\` |

## 📝 Détails importants

### Division (/) vs Division entière (//)
\`\`\`python
10 / 3   # 3.3333... (float)
10 // 3  # 3 (int, partie entière)
\`\`\`

### Modulo (%) - Le reste
\`\`\`python
10 % 3   # 1 (10 = 3×3 + 1)
15 % 5   # 0 (divisible)
\`\`\`

Utile pour :
- Vérifier si pair/impair : \`n % 2 == 0\`
- Cycle : \`index % longueur\`

### Puissance (**)
\`\`\`python
2 ** 3   # 8 (2³)
9 ** 0.5 # 3.0 (racine carrée)
\`\`\`

## 📊 Priorité des opérateurs

1. \`**\` (puissance)
2. \`*\`, \`/\`, \`//\`, \`%\`
3. \`+\`, \`-\`

Utilisez des parenthèses pour clarifier !`,
        codeExamples: [
          {
            title: 'Opérations arithmétiques',
            code: `# Opérations de base
a, b = 17, 5

print(f"{a} + {b} = {a + b}")   # Addition: 22
print(f"{a} - {b} = {a - b}")   # Soustraction: 12
print(f"{a} * {b} = {a * b}")   # Multiplication: 85
print(f"{a} / {b} = {a / b}")   # Division: 3.4

# Division entière et modulo
print(f"\\n{a} // {b} = {a // b}")  # Division entière: 3
print(f"{a} % {b} = {a % b}")     # Modulo (reste): 2
# Vérification: 17 = 5 × 3 + 2

# Puissance
print(f"\\n2 ** 10 = {2 ** 10}")     # 1024
print(f"9 ** 0.5 = {9 ** 0.5}")    # 3.0 (racine carrée)

# Applications pratiques
nombre = 42
est_pair = nombre % 2 == 0
print(f"\\n{nombre} est pair: {est_pair}")

# Conversion heures → minutes
heures = 2.5
minutes = heures * 60
print(f"{heures} heures = {minutes} minutes")

# Prix TTC
prix_ht = 100
tva = 0.20
prix_ttc = prix_ht * (1 + tva)
print(f"Prix TTC: {prix_ttc} €")`,
            explanation: 'La division / donne toujours un float, // donne un int. Le modulo % est très utile pour les tests de divisibilité.'
          }
        ],
        exercises: [
          {
            id: 'ex3-1-1',
            title: 'Calculatrice basique',
            instruction: 'Calculez et affichez : 15 + 7, 20 - 8, 6 * 9, et 100 / 4',
            starterCode: `# Effectuez les calculs
addition = 15 ___ 7
soustraction = 20 ___ 8
multiplication = 6 ___ 9
division = 100 ___ 4

print(f"15 + 7 = {addition}")
print(f"20 - 8 = {soustraction}")
print(f"6 × 9 = {multiplication}")
print(f"100 ÷ 4 = {division}")`,
            solution: `addition = 15 + 7
soustraction = 20 - 8
multiplication = 6 * 9
division = 100 / 4

print(f"15 + 7 = {addition}")
print(f"20 - 8 = {soustraction}")
print(f"6 × 9 = {multiplication}")
print(f"100 ÷ 4 = {division}")`,
            hints: ['+, -, *, / sont les opérateurs', 'division retourne 25.0 (float)'],
            tests: [
              { input: '', expected: '22', description: '15 + 7 = 22' },
              { input: '', expected: '54', description: '6 × 9 = 54' }
            ],
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'l3-2',
        title: 'Opérateurs de Comparaison',
        duration: '25 min',
        content: `# Opérateurs de Comparaison

Ces opérateurs comparent deux valeurs et retournent un booléen (True/False).

## 📊 Les opérateurs

| Opérateur | Signification | Exemple | Résultat |
|-----------|---------------|---------|----------|
| \`==\` | Égal à | \`5 == 5\` | \`True\` |
| \`!=\` | Différent de | \`5 != 3\` | \`True\` |
| \`<\` | Inférieur à | \`3 < 5\` | \`True\` |
| \`>\` | Supérieur à | \`5 > 3\` | \`True\` |
| \`<=\` | Inférieur ou égal | \`5 <= 5\` | \`True\` |
| \`>=\` | Supérieur ou égal | \`5 >= 3\` | \`True\` |

## ⚠️ == vs =

- \`=\` : **Assignation** (donne une valeur)
- \`==\` : **Comparaison** (vérifie l'égalité)

\`\`\`python
x = 5      # Assigne 5 à x
x == 5     # Compare x à 5 → True
\`\`\`

## 🔤 Comparaison de chaînes

Les chaînes sont comparées **lexicographiquement** (ordre alphabétique) :

\`\`\`python
"apple" < "banana"  # True
"a" < "b"           # True
"B" < "a"           # True (majuscules avant minuscules)
\`\`\`

## 🔗 Comparaisons chaînées

Python permet de chaîner les comparaisons :

\`\`\`python
age = 25
18 <= age < 65  # True (adulte actif)
\`\`\``,
        codeExamples: [
          {
            title: 'Comparaisons en action',
            code: `# Comparaisons numériques
a, b = 10, 5

print(f"{a} == {b} : {a == b}")   # False
print(f"{a} != {b} : {a != b}")   # True
print(f"{a} > {b} : {a > b}")     # True
print(f"{a} < {b} : {a < b}")     # False
print(f"{a} >= {b} : {a >= b}")   # True
print(f"{a} <= {b} : {a <= b}")   # False

# Comparaisons chaînées
age = 25
print(f"\\n0 < {age} < 100 : {0 < age < 100}")  # True
print(f"18 <= {age} < 65 : {18 <= age < 65}")  # True

# Comparaisons de chaînes
print(f"\\n'apple' < 'banana' : {'apple' < 'banana'}")  # True
print(f"'Python' == 'python' : {'Python' == 'python'}")  # False

# Cas pratique : validation d'âge
age = 20
est_majeur = age >= 18
peut_voter = est_majeur
peut_conduire = age >= 18
peut_boire_alcool_us = age >= 21

print(f"\\nÂge: {age}")
print(f"Peut voter: {peut_voter}")
print(f"Peut boire (US): {peut_boire_alcool_us}")`,
            explanation: 'Les comparaisons retournent toujours True ou False. Python permet de chaîner les comparaisons de façon naturelle.'
          }
        ],
        exercises: [
          {
            id: 'ex3-2-1',
            title: 'Vérifications d\'âge',
            instruction: 'Créez age=16. Créez des booléens pour vérifier si la personne peut_voter (>=18), peut_conduire (>=16), est_senior (>=65).',
            starterCode: `age = 16

peut_voter = age ___ 18
peut_conduire = age ___ 16
est_senior = age ___ 65

print(f"Peut voter: {peut_voter}")
print(f"Peut conduire: {peut_conduire}")
print(f"Est senior: {est_senior}")`,
            solution: `age = 16
peut_voter = age >= 18
peut_conduire = age >= 16
est_senior = age >= 65

print(f"Peut voter: {peut_voter}")
print(f"Peut conduire: {peut_conduire}")
print(f"Est senior: {est_senior}")`,
            hints: ['Utilisez >= pour "supérieur ou égal"', '16 >= 18 est False', '16 >= 16 est True'],
            tests: [
              { input: '', expected: 'False', description: 'peut_voter doit être False' },
              { input: '', expected: 'True', description: 'peut_conduire doit être True' }
            ],
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'l3-3',
        title: 'Opérateurs Logiques',
        duration: '30 min',
        content: `# Opérateurs Logiques

Les opérateurs logiques combinent des booléens.

## 🔗 Les trois opérateurs

### and - ET logique
Les DEUX conditions doivent être vraies.

| A | B | A and B |
|---|---|---------|
| True | True | **True** |
| True | False | False |
| False | True | False |
| False | False | False |

### or - OU logique
AU MOINS UNE condition doit être vraie.

| A | B | A or B |
|---|---|--------|
| True | True | True |
| True | False | True |
| False | True | True |
| False | False | **False** |

### not - Négation
Inverse le booléen.

| A | not A |
|---|-------|
| True | False |
| False | True |

## 📝 Priorité

\`not\` > \`and\` > \`or\`

Utilisez des parenthèses pour clarifier !

## 💡 Court-circuit (Short-circuit)

Python évalue de gauche à droite et s'arrête dès que possible :

\`\`\`python
True or anything   # True (n'évalue pas anything)
False and anything # False (n'évalue pas anything)
\`\`\``,
        codeExamples: [
          {
            title: 'Opérateurs logiques',
            code: `# Variables de départ
age = 25
a_permis = True
est_sobre = True
est_fatigue = False

# AND - les deux conditions doivent être vraies
peut_conduire = age >= 18 and a_permis and est_sobre
print(f"Peut conduire: {peut_conduire}")  # True

# OR - au moins une condition vraie
a_reduction = age < 18 or age >= 65
print(f"A réduction: {a_reduction}")  # False (25 ans)

# NOT - inverse
devrait_conduire = peut_conduire and not est_fatigue
print(f"Devrait conduire: {devrait_conduire}")  # True

# Combinaisons complexes
acces_vip = (age >= 21 and a_permis) or est_sobre
print(f"Accès VIP: {acces_vip}")  # True

# Exemple pratique : validation formulaire
email = "user@example.com"
mot_de_passe = "secret123"
accepte_conditions = True

formulaire_valide = (
    len(email) > 0 and 
    "@" in email and 
    len(mot_de_passe) >= 8 and 
    accepte_conditions
)
print(f"\\nFormulaire valide: {formulaire_valide}")

# Court-circuit
print("\\n--- Court-circuit ---")
x = 5
# Le second terme n'est jamais évalué
result = (x > 0) or print("Jamais affiché")
print(f"Result: {result}")`,
            explanation: 'and requiert que TOUT soit True. or requiert qu\'AU MOINS UN soit True. not inverse. Le court-circuit optimise l\'évaluation.'
          }
        ],
        exercises: [
          {
            id: 'ex3-3-1',
            title: 'Logique de connexion',
            instruction: 'Un utilisateur peut se connecter s\'il a le bon email ET le bon mot_de_passe. Créez la variable est_connecte.',
            starterCode: `email = "admin@site.com"
mot_de_passe = "secret123"

email_correct = "admin@site.com"
mdp_correct = "secret123"

# Vérifiez les deux conditions avec AND
est_connecte = email == ___ ___ mot_de_passe == ___

print(f"Connecté: {est_connecte}")`,
            solution: `email = "admin@site.com"
mot_de_passe = "secret123"

email_correct = "admin@site.com"
mdp_correct = "secret123"

est_connecte = email == email_correct and mot_de_passe == mdp_correct

print(f"Connecté: {est_connecte}")`,
            hints: ['Comparez email avec email_correct', 'Utilisez and entre les deux comparaisons'],
            tests: [
              { input: '', expected: 'True', description: 'Les deux identifiants sont corrects' }
            ],
            difficulty: 'medium'
          }
        ]
      },
      {
        id: 'l3-4',
        title: 'Opérateurs d\'Assignation',
        duration: '20 min',
        content: `# Opérateurs d'Assignation

Ces opérateurs combinent une opération et une assignation.

## 📝 Opérateurs composés

| Opérateur | Équivalent | Exemple |
|-----------|------------|---------|
| \`+=\` | \`x = x + y\` | \`x += 5\` |
| \`-=\` | \`x = x - y\` | \`x -= 3\` |
| \`*=\` | \`x = x * y\` | \`x *= 2\` |
| \`/=\` | \`x = x / y\` | \`x /= 4\` |
| \`//=\` | \`x = x // y\` | \`x //= 3\` |
| \`%=\` | \`x = x % y\` | \`x %= 2\` |
| \`**=\` | \`x = x ** y\` | \`x **= 2\` |

## 💡 Exemples pratiques

\`\`\`python
score = 0
score += 10    # score = 10
score *= 2     # score = 20
score -= 5     # score = 15
\`\`\`

## 🔤 Avec les chaînes

\`\`\`python
message = "Hello"
message += " World"  # "Hello World"

ligne = "-"
ligne *= 20  # "--------------------"
\`\`\``,
        codeExamples: [
          {
            title: 'Assignation composée',
            code: `# Compteur de score
score = 0
print(f"Score initial: {score}")

score += 100  # Bonus de départ
print(f"Après bonus: {score}")

score *= 2    # Double points !
print(f"Après multiplicateur: {score}")

score -= 50   # Pénalité
print(f"Après pénalité: {score}")

# Avec les chaînes
resultat = "Votre score: "
resultat += str(score)
resultat += " points"
print(resultat)

# Répétition
separateur = "=" * 30
print(separateur)

# Pratique : accumulation dans une boucle
total = 0
for i in range(1, 6):
    total += i
    print(f"Ajout de {i}, total = {total}")

print(f"\\nSomme de 1 à 5 = {total}")`,
            explanation: 'Les opérateurs composés sont des raccourcis pratiques. += est le plus utilisé pour incrémenter ou concaténer.'
          }
        ],
        exercises: []
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Que vaut 17 // 5 ?',
        options: ['3.4', '3', '4', '2'],
        correctIndex: 1,
        explanation: '// est la division entière. 17 ÷ 5 = 3.4, mais // garde seulement la partie entière: 3.'
      },
      {
        id: 'q3-2',
        question: 'Que vaut 17 % 5 ?',
        options: ['3.4', '3', '2', '0'],
        correctIndex: 2,
        explanation: '% donne le reste de la division. 17 = 5 × 3 + 2, donc le reste est 2.'
      },
      {
        id: 'q3-3',
        question: 'Que vaut True and False ?',
        options: ['True', 'False', 'None', 'Erreur'],
        correctIndex: 1,
        explanation: 'and retourne True uniquement si LES DEUX opérandes sont True. Ici False.'
      },
      {
        id: 'q3-4',
        question: 'Que vaut not True or False ?',
        options: ['True', 'False', 'None', 'Erreur'],
        correctIndex: 1,
        explanation: 'not a priorité sur or. not True = False. False or False = False.'
      },
      {
        id: 'q3-5',
        question: 'Après x=5; x+=3, que vaut x ?',
        options: ['5', '3', '8', '15'],
        correctIndex: 2,
        explanation: 'x += 3 est équivalent à x = x + 3. Donc 5 + 3 = 8.'
      }
    ]
  },

  // ========================================
  // MODULE 4 : STRUCTURES DE CONTRÔLE
  // ========================================
  {
    id: 'mod-4',
    number: 4,
    title: 'Structures de Contrôle',
    subtitle: 'Conditions et boucles',
    description: 'Apprenez à contrôler le flux de votre programme avec les conditions (if/elif/else) et les boucles (for/while).',
    icon: '🔀',
    color: '#ec4899',
    difficulty: 'Débutant',
    estimatedHours: 6,
    lessons: [
      {
        id: 'l4-1',
        title: 'Conditions if/elif/else',
        duration: '40 min',
        content: `# Conditions if/elif/else

Les conditions permettent d'exécuter du code **uniquement si** certaines conditions sont remplies.

## 🎯 Syntaxe de base

\`\`\`python
if condition:
    # Code exécuté si condition est True
    instruction1
    instruction2
\`\`\`

## ⚠️ L'indentation est OBLIGATOIRE !

Python utilise l'indentation (4 espaces) pour définir les blocs de code.

\`\`\`python
if age >= 18:
    print("Majeur")     # ✅ Indenté = dans le if
print("Toujours affiché")  # ❌ Non indenté = hors du if
\`\`\`

## 🔀 if / else

\`\`\`python
if condition:
    # Si True
else:
    # Si False
\`\`\`

## 🔀 if / elif / else

\`\`\`python
if condition1:
    # Si condition1 est True
elif condition2:
    # Si condition2 est True
elif condition3:
    # Si condition3 est True
else:
    # Si aucune condition n'est True
\`\`\`

**Important** : Dès qu'une condition est True, les suivantes sont ignorées !`,
        codeExamples: [
          {
            title: 'Conditions simples',
            code: `# Exemple 1 : Simple if
age = 20

if age >= 18:
    print("Vous êtes majeur")
    print("Vous pouvez voter")

# Exemple 2 : if/else
temperature = 35

if temperature >= 30:
    print("🌡️ Il fait chaud !")
else:
    print("🌡️ Température normale")

# Exemple 3 : if/elif/else
note = 15

if note >= 16:
    print("🏆 Mention Très Bien")
elif note >= 14:
    print("🥈 Mention Bien")
elif note >= 12:
    print("🥉 Mention Assez Bien")
elif note >= 10:
    print("✅ Admis")
else:
    print("❌ Non admis")

# Exemple 4 : Conditions imbriquées
age = 25
a_permis = True

if age >= 18:
    print("Vous êtes majeur")
    if a_permis:
        print("Vous pouvez conduire")
    else:
        print("Passez votre permis d'abord !")
else:
    print("Vous êtes mineur")`,
            explanation: 'Les blocs sont définis par l\'indentation. elif permet de tester plusieurs conditions. else capture tous les cas restants.'
          },
          {
            title: 'Conditions avec opérateurs logiques',
            code: `# Combinaison de conditions avec AND
age = 25
a_permis = True
est_sobre = True

if age >= 18 and a_permis and est_sobre:
    print("✅ Vous pouvez conduire")
else:
    print("❌ Vous ne pouvez pas conduire")

# Combinaison avec OR
jour = "samedi"

if jour == "samedi" or jour == "dimanche":
    print("🎉 C'est le weekend !")
else:
    print("💼 C'est un jour de travail")

# Utilisation de NOT
est_connecte = False

if not est_connecte:
    print("Veuillez vous connecter")

# Utilisation de IN pour simplifier
jour = "mardi"
jours_travail = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"]

if jour in jours_travail:
    print(f"{jour.capitalize()} est un jour de travail")
else:
    print(f"{jour.capitalize()} est un jour de repos")

# Vérification de plage avec comparaisons chaînées
heure = 14

if 9 <= heure < 12:
    print("☀️ Matinée")
elif 12 <= heure < 14:
    print("🍽️ Pause déjeuner")
elif 14 <= heure < 18:
    print("☀️ Après-midi")
else:
    print("🌙 Hors horaires de bureau")`,
            explanation: 'Combinez les conditions avec and, or, not. Utilisez "in" pour vérifier l\'appartenance. Les comparaisons chaînées simplifient les plages.'
          }
        ],
        exercises: [
          {
            id: 'ex4-1-1',
            title: 'Système de notation',
            instruction: 'Créez un système de notation : note >= 90 → "A", >= 80 → "B", >= 70 → "C", >= 60 → "D", sinon "F".',
            starterCode: `note = 85

if note >= 90:
    grade = "A"
elif ___:
    grade = "B"
elif ___:
    grade = "C"
elif ___:
    grade = "D"
else:
    grade = "F"

print(f"Note: {note} → Grade: {grade}")`,
            solution: `note = 85

if note >= 90:
    grade = "A"
elif note >= 80:
    grade = "B"
elif note >= 70:
    grade = "C"
elif note >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Note: {note} → Grade: {grade}")`,
            hints: [
              'Chaque elif vérifie une nouvelle condition',
              'Les conditions sont testées dans l\'ordre',
              '85 >= 80 donc grade = "B"'
            ],
            tests: [
              { input: '', expected: 'B', description: '85 doit donner grade B' }
            ],
            difficulty: 'medium'
          }
        ]
      },
      {
        id: 'l4-2',
        title: 'Boucle for',
        duration: '45 min',
        content: `# La Boucle for

La boucle \`for\` permet de **répéter** des instructions pour chaque élément d'une séquence.

## 🔁 Syntaxe de base

\`\`\`python
for element in sequence:
    # Code répété pour chaque élément
    print(element)
\`\`\`

## 📊 Types de séquences

### Listes
\`\`\`python
fruits = ["pomme", "banane", "orange"]
for fruit in fruits:
    print(fruit)
\`\`\`

### Chaînes
\`\`\`python
for lettre in "Python":
    print(lettre)
\`\`\`

### range()
\`\`\`python
for i in range(5):      # 0, 1, 2, 3, 4
for i in range(2, 8):   # 2, 3, 4, 5, 6, 7
for i in range(0, 10, 2): # 0, 2, 4, 6, 8
\`\`\`

## 🎯 range() en détail

| Appel | Résultat |
|-------|----------|
| \`range(5)\` | 0, 1, 2, 3, 4 |
| \`range(1, 6)\` | 1, 2, 3, 4, 5 |
| \`range(0, 10, 2)\` | 0, 2, 4, 6, 8 |
| \`range(10, 0, -1)\` | 10, 9, 8, ..., 1 |

## 🔧 enumerate() - Index + Valeur

\`\`\`python
fruits = ["pomme", "banane"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# 0: pomme
# 1: banane
\`\`\``,
        codeExamples: [
          {
            title: 'Boucles for essentielles',
            code: `# Parcourir une liste
print("🍎 Parcours de liste:")
fruits = ["pomme", "banane", "orange", "fraise"]
for fruit in fruits:
    print(f"  - {fruit}")

# Utiliser range()
print("\\n🔢 Table de multiplication de 7:")
for i in range(1, 11):
    print(f"  7 × {i} = {7 * i}")

# Parcourir une chaîne
print("\\n📝 Lettres de 'Python':")
for lettre in "Python":
    print(f"  {lettre}", end=" ")
print()  # Nouvelle ligne

# enumerate() pour avoir l'index
print("\\n📋 Liste numérotée:")
taches = ["Réviser Python", "Faire les exercices", "Créer un projet"]
for index, tache in enumerate(taches, start=1):
    print(f"  {index}. {tache}")

# Parcours avec range() et index
print("\\n🔄 Accès par index:")
couleurs = ["rouge", "vert", "bleu"]
for i in range(len(couleurs)):
    print(f"  couleurs[{i}] = {couleurs[i]}")

# Compte à rebours
print("\\n🚀 Décollage:")
for i in range(5, 0, -1):
    print(f"  {i}...")
print("  🎉 Décollage !")`,
            explanation: 'for parcourt chaque élément d\'une séquence. range() génère des séquences de nombres. enumerate() donne index + valeur.'
          },
          {
            title: 'Techniques avancées de for',
            code: `# Calculer une somme
nombres = [10, 20, 30, 40, 50]
total = 0
for n in nombres:
    total += n
print(f"Somme: {total}")  # 150

# Filtrer des éléments
print("\\n📊 Nombres pairs de 1 à 10:")
for n in range(1, 11):
    if n % 2 == 0:
        print(f"  {n}", end=" ")
print()

# Boucles imbriquées
print("\\n📐 Table de multiplication:")
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}×{j}={i*j}", end="  ")
    print()

# Parcourir un dictionnaire
print("\\n📚 Dictionnaire:")
etudiant = {"nom": "Alice", "age": 20, "note": 15}
for cle, valeur in etudiant.items():
    print(f"  {cle}: {valeur}")

# zip() - Parcourir plusieurs listes
print("\\n🔗 Avec zip():")
noms = ["Alice", "Bob", "Claire"]
ages = [20, 22, 19]
for nom, age in zip(noms, ages):
    print(f"  {nom} a {age} ans")`,
            explanation: 'Les boucles for peuvent être imbriquées. zip() permet de parcourir plusieurs listes en parallèle. items() itère sur les paires clé-valeur.'
          }
        ],
        exercises: [
          {
            id: 'ex4-2-1',
            title: 'Somme des nombres',
            instruction: 'Calculez la somme des nombres de 1 à 100 avec une boucle for.',
            starterCode: `# Calculez la somme de 1 à 100
total = 0

for i in range(___, ___):
    total ___ i

print(f"La somme de 1 à 100 = {total}")`,
            solution: `total = 0

for i in range(1, 101):
    total += i

print(f"La somme de 1 à 100 = {total}")`,
            hints: [
              'range(1, 101) donne 1 à 100',
              'Utilisez += pour ajouter à total',
              'Le résultat est 5050'
            ],
            tests: [
              { input: '', expected: '5050', description: 'La somme doit être 5050' }
            ],
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'l4-3',
        title: 'Boucle while',
        duration: '35 min',
        content: `# La Boucle while

La boucle \`while\` répète des instructions **tant qu'une condition est vraie**.

## 🔁 Syntaxe

\`\`\`python
while condition:
    # Code répété tant que condition est True
    instructions
\`\`\`

## ⚠️ Attention aux boucles infinies !

Si la condition ne devient jamais False, la boucle tourne indéfiniment.

\`\`\`python
# ❌ BOUCLE INFINIE !
x = 1
while x > 0:    # Toujours True
    print(x)

# ✅ CORRECT
x = 5
while x > 0:
    print(x)
    x -= 1      # x diminue jusqu'à 0
\`\`\`

## 🎯 Quand utiliser while ?

- Quand on ne sait pas combien de répétitions
- Pour attendre une entrée utilisateur
- Pour des jeux/simulations

## 🔧 Contrôle de boucle

- \`break\` — Sort de la boucle immédiatement
- \`continue\` — Passe à l'itération suivante
- \`else\` — Exécuté si la boucle finit normalement (pas de break)`,
        codeExamples: [
          {
            title: 'Boucle while basique',
            code: `# Compte à rebours
print("🚀 Compte à rebours:")
compteur = 5
while compteur > 0:
    print(f"  {compteur}...")
    compteur -= 1
print("  Décollage ! 🎉")

# Deviner un nombre (simulé)
print("\\n🎮 Jeu de devinette:")
secret = 7
tentative = 0
essais = [3, 9, 5, 7]  # Simulation des essais

for guess in essais:
    tentative += 1
    if guess == secret:
        print(f"  ✅ Trouvé en {tentative} essais !")
        break
    elif guess < secret:
        print(f"  {guess} → Plus grand !")
    else:
        print(f"  {guess} → Plus petit !")

# Accumulation jusqu'à une limite
print("\\n💰 Accumulation:")
somme = 0
n = 1
while somme < 100:
    somme += n
    print(f"  Ajout {n}: total = {somme}")
    n += 1
print(f"  → Atteint {somme} après {n-1} itérations")`,
            explanation: 'while continue tant que la condition est True. Assurez-vous toujours que la condition finira par devenir False !'
          },
          {
            title: 'break, continue, else',
            code: `# break - Sortir de la boucle
print("🔍 Recherche avec break:")
nombres = [1, 3, 7, 9, 12, 15, 18]
for n in nombres:
    if n % 2 == 0:  # Premier nombre pair
        print(f"  Premier pair trouvé: {n}")
        break
    print(f"  {n} est impair")

# continue - Passer à l'itération suivante
print("\\n⏭️ Avec continue (ignorer les pairs):")
for n in range(1, 11):
    if n % 2 == 0:
        continue  # Ignore les pairs
    print(f"  {n}", end=" ")
print()

# else sur une boucle (exécuté si pas de break)
print("\\n🔎 Recherche avec else:")
valeur = 15
for n in [1, 2, 3, 4, 5]:
    if n == valeur:
        print(f"  {valeur} trouvé !")
        break
else:  # Pas de break = pas trouvé
    print(f"  {valeur} non trouvé dans la liste")

# Exemple pratique : validation d'entrée
print("\\n✅ Validation (simulée):")
reponses = ["non", "peut-être", "oui"]  # Simulation
for reponse in reponses:
    print(f"  Réponse: {reponse}")
    if reponse.lower() == "oui":
        print("  → Accepté !")
        break
else:
    print("  → Aucune réponse positive")`,
            explanation: 'break sort immédiatement de la boucle. continue passe à l\'itération suivante. else s\'exécute si la boucle finit sans break.'
          }
        ],
        exercises: [
          {
            id: 'ex4-3-1',
            title: 'Factorielle',
            instruction: 'Calculez la factorielle de 5 (5! = 5×4×3×2×1 = 120) avec une boucle while.',
            starterCode: `n = 5
factorielle = 1

while n > 0:
    factorielle ___ n
    n ___ 1

print(f"5! = {factorielle}")`,
            solution: `n = 5
factorielle = 1

while n > 0:
    factorielle *= n
    n -= 1

print(f"5! = {factorielle}")`,
            hints: [
              'Multipliez factorielle par n à chaque tour',
              'Utilisez *= pour multiplier',
              'Décrémentez n avec -= 1'
            ],
            tests: [
              { input: '', expected: '120', description: '5! = 120' }
            ],
            difficulty: 'medium'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Que se passe-t-il si aucune condition n\'est True dans un if/elif sans else ?',
        options: ['Erreur', 'Rien ne s\'exécute', 'Python choisit au hasard', 'La dernière condition s\'exécute'],
        correctIndex: 1,
        explanation: 'Sans else, si aucune condition n\'est True, aucun bloc n\'est exécuté et le programme continue.'
      },
      {
        id: 'q4-2',
        question: 'Que produit range(2, 8, 2) ?',
        options: ['2, 4, 6', '2, 4, 6, 8', '2, 3, 4, 5, 6, 7', '0, 2, 4, 6'],
        correctIndex: 0,
        explanation: 'range(2, 8, 2) commence à 2, s\'arrête avant 8, avec un pas de 2 : 2, 4, 6.'
      },
      {
        id: 'q4-3',
        question: 'Que fait "break" dans une boucle ?',
        options: ['Pause la boucle', 'Sort immédiatement de la boucle', 'Passe à l\'itération suivante', 'Redémarre la boucle'],
        correctIndex: 1,
        explanation: 'break sort immédiatement de la boucle, sans exécuter les itérations restantes.'
      },
      {
        id: 'q4-4',
        question: 'Que fait "continue" dans une boucle ?',
        options: ['Sort de la boucle', 'Passe à l\'itération suivante', 'Répète l\'itération courante', 'Continue après la boucle'],
        correctIndex: 1,
        explanation: 'continue saute le reste du code de l\'itération courante et passe directement à la suivante.'
      }
    ],
    project: {
      title: 'Jeu du Plus ou Moins',
      description: 'Créez un jeu où l\'ordinateur choisit un nombre et le joueur doit le deviner.',
      objectives: [
        'Utiliser les conditions if/elif/else',
        'Utiliser une boucle while',
        'Gérer les entrées utilisateur',
        'Compter les tentatives'
      ],
      steps: [
        {
          id: 'step-1',
          title: 'Étape 1: Générer un nombre secret',
          instruction: 'Importez le module random et générez un nombre entre 1 et 100.',
          hint: 'Utilisez random.randint(1, 100)',
          starterCode: `# Importez le module random
___ random

# Générez un nombre secret entre 1 et 100
secret = random.___(1, 100)

print("J'ai choisi un nombre entre 1 et 100 !")
print(f"(Debug: le nombre est {secret})")  # À retirer plus tard`,
          expectedCode: `import random
secret = random.randint(1, 100)
print("J'ai choisi un nombre entre 1 et 100 !")`,
          validation: 'import random'
        },
        {
          id: 'step-2',
          title: 'Étape 2: Demander un nombre au joueur',
          instruction: 'Utilisez input() pour demander un nombre et convertissez-le en int.',
          hint: 'int(input("Message"))',
          starterCode: `import random
secret = random.randint(1, 100)

# Demandez un nombre au joueur
proposition = ___(___(___))

print(f"Vous avez proposé: {proposition}")`,
          expectedCode: `proposition = int(input("Devinez le nombre: "))`,
          validation: 'input'
        },
        {
          id: 'step-3',
          title: 'Étape 3: Comparer avec le secret',
          instruction: 'Utilisez if/elif/else pour dire si c\'est plus grand, plus petit ou trouvé.',
          hint: 'Comparez proposition avec secret',
          starterCode: `import random
secret = random.randint(1, 100)
proposition = int(input("Devinez: "))

# Comparez et donnez un indice
if proposition ___ secret:
    print("C'est plus petit !")
elif proposition ___ secret:
    print("C'est plus grand !")
else:
    print("🎉 Bravo ! Vous avez trouvé !")`,
          expectedCode: `if proposition > secret:
    print("C'est plus petit !")
elif proposition < secret:
    print("C'est plus grand !")
else:
    print("🎉 Bravo !")`,
          validation: 'if'
        }
      ]
    }
  },

  // ========================================
  // MODULE 5 : FONCTIONS
  // ========================================
  {
    id: 'mod-5',
    number: 5,
    title: 'Fonctions',
    subtitle: 'Créer du code réutilisable',
    description: 'Apprenez à créer vos propres fonctions, comprendre les paramètres, retourner des valeurs, et maîtriser la portée des variables.',
    icon: '⚡',
    color: '#06b6d4',
    difficulty: 'Intermédiaire',
    estimatedHours: 8,
    lessons: [
      {
        id: 'l5-1',
        title: 'Définir une Fonction',
        duration: '40 min',
        content: `# Définir une Fonction

Une **fonction** est un bloc de code réutilisable qui effectue une tâche spécifique.

## 🎯 Pourquoi utiliser des fonctions ?

- ♻️ **Réutilisabilité** — Écrire une fois, utiliser partout
- 📖 **Lisibilité** — Code mieux organisé
- 🐛 **Débogage** — Isoler les problèmes
- 🧩 **Modularité** — Diviser un problème complexe

## 📝 Syntaxe de base

\`\`\`python
def nom_fonction(parametres):
    """Docstring : description de la fonction"""
    # Corps de la fonction
    instructions
    return resultat  # Optionnel
\`\`\`

## 🔑 Éléments clés

- \`def\` — Mot-clé pour définir une fonction
- \`nom_fonction\` — Nom en snake_case
- \`parametres\` — Valeurs en entrée (optionnel)
- \`docstring\` — Documentation (recommandé)
- \`return\` — Valeur renvoyée (optionnel)

## 📞 Appeler une fonction

\`\`\`python
# Définition
def saluer():
    print("Bonjour !")

# Appel
saluer()  # Affiche: Bonjour !
\`\`\``,
        codeExamples: [
          {
            title: 'Fonctions de base',
            code: `# Fonction sans paramètre ni retour
def afficher_bienvenue():
    """Affiche un message de bienvenue"""
    print("=" * 30)
    print("   Bienvenue dans PyMaster!")
    print("=" * 30)

afficher_bienvenue()

# Fonction avec paramètres
def saluer(nom):
    """Salue une personne par son nom"""
    print(f"Bonjour {nom} ! 👋")

saluer("Alice")
saluer("Bob")

# Fonction avec valeur de retour
def calculer_carre(n):
    """Retourne le carré d'un nombre"""
    return n ** 2

resultat = calculer_carre(5)
print(f"Le carré de 5 est {resultat}")

# Utiliser le retour directement
print(f"Le carré de 8 est {calculer_carre(8)}")

# Fonction avec plusieurs paramètres
def calculer_rectangle(longueur, largeur):
    """Calcule l'aire et le périmètre d'un rectangle"""
    aire = longueur * largeur
    perimetre = 2 * (longueur + largeur)
    return aire, perimetre  # Retourne un tuple

a, p = calculer_rectangle(5, 3)
print(f"Rectangle 5×3 : aire={a}, périmètre={p}")`,
            explanation: 'def crée une fonction. Les paramètres reçoivent les valeurs. return renvoie un résultat. Sans return, la fonction retourne None.'
          },
          {
            title: 'Paramètres par défaut',
            code: `# Paramètres avec valeurs par défaut
def saluer(nom, salutation="Bonjour"):
    """Salue avec une salutation personnalisable"""
    print(f"{salutation} {nom} !")

saluer("Alice")              # Utilise "Bonjour"
saluer("Bob", "Salut")       # Utilise "Salut"
saluer("Claire", "Coucou")   # Utilise "Coucou"

# Plusieurs paramètres par défaut
def creer_profil(nom, age=18, ville="Paris", pays="France"):
    """Crée un profil utilisateur"""
    print(f"Nom: {nom}")
    print(f"Âge: {age}")
    print(f"Localisation: {ville}, {pays}")
    print()

creer_profil("Alice")
creer_profil("Bob", 25)
creer_profil("Claire", 22, "Lyon")
creer_profil("David", ville="Marseille")  # Argument nommé

# Attention à l'ordre des paramètres !
# Les paramètres avec défaut DOIVENT être à la fin
def exemple(obligatoire, optionnel="défaut"):  # ✅
    pass

# def exemple(optionnel="défaut", obligatoire):  # ❌ Erreur !
#     pass`,
            explanation: 'Les paramètres avec valeurs par défaut sont optionnels lors de l\'appel. Ils doivent être placés APRÈS les paramètres obligatoires.'
          }
        ],
        exercises: [
          {
            id: 'ex5-1-1',
            title: 'Créer une fonction simple',
            instruction: 'Créez une fonction dire_bonjour(nom) qui affiche "Bonjour [nom] !"',
            starterCode: `# Définissez la fonction
___ dire_bonjour(___):
    ___

# Testez
dire_bonjour("Alice")
dire_bonjour("Bob")`,
            solution: `def dire_bonjour(nom):
    print(f"Bonjour {nom} !")

dire_bonjour("Alice")
dire_bonjour("Bob")`,
            hints: [
              'Utilisez def pour définir',
              'nom est le paramètre',
              'Utilisez f-string ou concaténation'
            ],
            tests: [
              { input: '', expected: 'Bonjour Alice', description: 'Doit afficher le nom' }
            ],
            difficulty: 'easy'
          },
          {
            id: 'ex5-1-2',
            title: 'Fonction avec retour',
            instruction: 'Créez une fonction calculer_moyenne(a, b, c) qui retourne la moyenne de 3 nombres.',
            starterCode: `def calculer_moyenne(a, b, c):
    moyenne = ___
    return ___

# Tests
print(calculer_moyenne(10, 20, 30))  # Doit afficher 20.0
print(calculer_moyenne(5, 5, 5))     # Doit afficher 5.0`,
            solution: `def calculer_moyenne(a, b, c):
    moyenne = (a + b + c) / 3
    return moyenne

print(calculer_moyenne(10, 20, 30))
print(calculer_moyenne(5, 5, 5))`,
            hints: [
              'Moyenne = somme / nombre d\'éléments',
              'Somme = a + b + c',
              'Utilisez return pour renvoyer le résultat'
            ],
            tests: [
              { input: '', expected: '20.0', description: 'moyenne(10,20,30) = 20.0' },
              { input: '', expected: '5.0', description: 'moyenne(5,5,5) = 5.0' }
            ],
            difficulty: 'medium'
          }
        ]
      },
      {
        id: 'l5-2',
        title: '*args et **kwargs',
        duration: '35 min',
        content: `# *args et **kwargs

Ces syntaxes permettent de gérer un nombre variable d'arguments.

## 📦 *args — Arguments positionnels

\`*args\` capture tous les arguments positionnels dans un **tuple**.

\`\`\`python
def somme(*nombres):
    total = 0
    for n in nombres:
        total += n
    return total

somme(1, 2, 3)      # 6
somme(1, 2, 3, 4, 5) # 15
\`\`\`

## 📦 **kwargs — Arguments nommés

\`**kwargs\` capture tous les arguments nommés dans un **dictionnaire**.

\`\`\`python
def afficher_infos(**infos):
    for cle, valeur in infos.items():
        print(f"{cle}: {valeur}")

afficher_infos(nom="Alice", age=25, ville="Paris")
\`\`\`

## 🔀 Ordre des paramètres

\`\`\`python
def fonction(pos1, pos2, *args, defaut=10, **kwargs):
    # pos1, pos2 : obligatoires
    # *args : extras positionnels
    # defaut : avec valeur par défaut
    # **kwargs : extras nommés
    pass
\`\`\``,
        codeExamples: [
          {
            title: '*args en pratique',
            code: `# Somme de n'importe combien de nombres
def somme(*nombres):
    """Calcule la somme de tous les arguments"""
    print(f"Reçu: {nombres}")  # C'est un tuple
    total = 0
    for n in nombres:
        total += n
    return total

print(somme(1, 2, 3))
print(somme(10, 20, 30, 40, 50))
print(somme(5))
print(somme())  # 0

# Combinaison avec paramètres normaux
def presenter(nom, *competences):
    """Présente une personne avec ses compétences"""
    print(f"\\n{nom} sait:")
    for comp in competences:
        print(f"  - {comp}")

presenter("Alice", "Python", "JavaScript", "SQL")
presenter("Bob", "Java")

# Utiliser une liste avec *
notes = [15, 18, 12, 16, 14]
moyenne = somme(*notes) / len(notes)
print(f"\\nMoyenne des notes: {moyenne}")`,
            explanation: '*args crée un tuple avec tous les arguments positionnels supplémentaires. Le nom "args" est une convention, c\'est le * qui compte.'
          },
          {
            title: '**kwargs en pratique',
            code: `# Configuration flexible
def configurer_app(**options):
    """Configure une application avec des options"""
    print("Configuration:")
    for option, valeur in options.items():
        print(f"  {option} = {valeur}")

configurer_app(debug=True, port=8080, host="localhost")
configurer_app(theme="dark", langue="fr")

# Création de dictionnaire
def creer_utilisateur(nom, email, **extras):
    """Crée un utilisateur avec des champs optionnels"""
    utilisateur = {
        "nom": nom,
        "email": email
    }
    utilisateur.update(extras)  # Ajoute les extras
    return utilisateur

user = creer_utilisateur(
    "Alice", 
    "alice@example.com",
    age=25,
    ville="Paris",
    premium=True
)
print(f"\\nUtilisateur créé: {user}")

# Combiner *args et **kwargs
def super_fonction(*args, **kwargs):
    """Accepte n'importe quels arguments"""
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

super_fonction(1, 2, 3, nom="Alice", age=25)`,
            explanation: '**kwargs crée un dictionnaire avec les arguments nommés. Très utile pour des fonctions configurables.'
          }
        ],
        exercises: [
          {
            id: 'ex5-2-1',
            title: 'Fonction multiplication',
            instruction: 'Créez une fonction multiplier(*nombres) qui retourne le produit de tous les arguments.',
            starterCode: `def multiplier(*nombres):
    resultat = 1
    for n in ___:
        resultat ___ n
    return ___

# Tests
print(multiplier(2, 3, 4))   # 24
print(multiplier(5, 5))      # 25
print(multiplier(10))        # 10`,
            solution: `def multiplier(*nombres):
    resultat = 1
    for n in nombres:
        resultat *= n
    return resultat

print(multiplier(2, 3, 4))
print(multiplier(5, 5))
print(multiplier(10))`,
            hints: [
              'nombres est un tuple',
              'Multipliez avec *=',
              'Initialisez à 1 (élément neutre de la multiplication)'
            ],
            tests: [
              { input: '', expected: '24', description: '2×3×4 = 24' }
            ],
            difficulty: 'medium'
          }
        ]
      },
      {
        id: 'l5-3',
        title: 'Fonctions Lambda',
        duration: '25 min',
        content: `# Fonctions Lambda

Les **lambda** sont des fonctions anonymes (sans nom) sur une seule ligne.

## 📝 Syntaxe

\`\`\`python
lambda parametres: expression
\`\`\`

Équivalent à :
\`\`\`python
def fonction(parametres):
    return expression
\`\`\`

## 💡 Exemples simples

\`\`\`python
# Carré d'un nombre
carre = lambda x: x ** 2
carre(5)  # 25

# Addition
addition = lambda a, b: a + b
addition(3, 4)  # 7
\`\`\`

## 🎯 Cas d'utilisation

Les lambda sont surtout utiles avec :
- \`sorted()\` et \`sort()\`
- \`filter()\`
- \`map()\`

\`\`\`python
# Trier par critère
eleves = [("Alice", 15), ("Bob", 18), ("Claire", 12)]
eleves.sort(key=lambda e: e[1])  # Trie par note
\`\`\``,
        codeExamples: [
          {
            title: 'Lambda avec sorted() et filter()',
            code: `# Trier des tuples par un élément spécifique
eleves = [
    ("Alice", 85),
    ("Bob", 92),
    ("Claire", 78),
    ("David", 88)
]

# Trier par note (index 1)
par_note = sorted(eleves, key=lambda e: e[1], reverse=True)
print("Par note (décroissant):")
for nom, note in par_note:
    print(f"  {nom}: {note}")

# Trier par nom (index 0)
par_nom = sorted(eleves, key=lambda e: e[0])
print("\\nPar nom (alphabétique):")
for nom, note in par_nom:
    print(f"  {nom}: {note}")

# Filtrer avec filter()
nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
pairs = list(filter(lambda x: x % 2 == 0, nombres))
print(f"\\nNombres pairs: {pairs}")

# Transformer avec map()
carres = list(map(lambda x: x ** 2, nombres))
print(f"Carrés: {carres}")

# Combinaison
grands_carres = list(filter(lambda x: x > 50, map(lambda x: x**2, nombres)))
print(f"Carrés > 50: {grands_carres}")`,
            explanation: 'lambda crée une fonction anonyme courte. Idéal pour les fonctions de tri, filtrage et transformation.'
          }
        ],
        exercises: []
      },
      {
        id: 'l5-4',
        title: 'Portée des Variables',
        duration: '30 min',
        content: `# Portée des Variables (Scope)

La **portée** détermine où une variable est accessible.

## 🏠 Variable locale

Définie dans une fonction, accessible uniquement dans cette fonction.

\`\`\`python
def ma_fonction():
    x = 10  # Variable locale
    print(x)

ma_fonction()  # 10
print(x)  # ❌ Erreur ! x n'existe pas ici
\`\`\`

## 🌍 Variable globale

Définie hors de toute fonction, accessible partout.

\`\`\`python
y = 20  # Variable globale

def ma_fonction():
    print(y)  # ✅ Accessible

ma_fonction()  # 20
print(y)       # 20
\`\`\`

## 🔄 Modifier une variable globale

\`\`\`python
compteur = 0

def incrementer():
    global compteur  # Déclare qu'on modifie la globale
    compteur += 1

incrementer()
print(compteur)  # 1
\`\`\`

## ⚠️ Bonnes pratiques

- Évitez les variables globales
- Préférez passer les valeurs en paramètres
- Utilisez return pour renvoyer les résultats`,
        codeExamples: [
          {
            title: 'Portée des variables illustrée',
            code: `# Variable globale
message_global = "Je suis globale"

def fonction_exemple():
    # Variable locale
    message_local = "Je suis locale"
    
    # Accès à la globale (lecture)
    print(f"Dans la fonction:")
    print(f"  Globale: {message_global}")
    print(f"  Locale: {message_local}")

fonction_exemple()

print(f"\\nHors de la fonction:")
print(f"  Globale: {message_global}")
# print(message_local)  # ❌ Erreur !

# Modifier une globale (à éviter !)
compteur = 0

def incrementer_mauvais():
    # compteur += 1  # ❌ Erreur ! Python pense que c'est local
    pass

def incrementer_avec_global():
    global compteur
    compteur += 1
    print(f"Compteur = {compteur}")

incrementer_avec_global()
incrementer_avec_global()

# ✅ MEILLEURE APPROCHE : paramètres et return
def incrementer_propre(valeur):
    """Incrémente et retourne la nouvelle valeur"""
    return valeur + 1

compteur2 = 0
compteur2 = incrementer_propre(compteur2)
compteur2 = incrementer_propre(compteur2)
print(f"\\nCompteur propre: {compteur2}")`,
            explanation: 'Les variables locales sont isolées dans leur fonction. Évitez global, utilisez plutôt les paramètres et return.'
          }
        ],
        exercises: []
      },
      {
        id: 'l5-5',
        title: 'Modules et Imports',
        duration: '45 min',
        content: `# Modules et Imports

Un **module** est un fichier Python contenant du code réutilisable. Python possède une bibliothèque standard riche avec des centaines de modules prêts à l'emploi !

## 📦 Qu'est-ce qu'un module ?

- Un fichier \`.py\` contenant des fonctions, classes, variables
- Permet d'organiser et réutiliser du code
- La bibliothèque standard contient +200 modules

## 🔧 Syntaxes d'import

### 1. Import complet du module
\`\`\`python
import math
print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.14159...
\`\`\`

### 2. Import avec alias (raccourci)
\`\`\`python
import math as m
print(m.sqrt(16))  # Plus court !
\`\`\`

### 3. Import d'éléments spécifiques
\`\`\`python
from math import sqrt, pi
print(sqrt(16))  # Pas besoin de "math."
print(pi)
\`\`\`

### 4. Import de tout (⚠️ déconseillé)
\`\`\`python
from math import *  # Importe TOUT
# Risque de conflits de noms !
\`\`\`

## 📚 Modules standard utiles

| Module | Description | Exemple |
|--------|-------------|---------|
| \`math\` | Fonctions mathématiques | sqrt, sin, cos, pi |
| \`random\` | Génération aléatoire | randint, choice, shuffle |
| \`datetime\` | Date et heure | now, strftime |
| \`os\` | Système d'exploitation | listdir, path |
| \`json\` | Manipulation JSON | load, dump |
| \`re\` | Expressions régulières | search, match |

## 🎯 Bonnes pratiques

1. **Imports en haut du fichier** — Toujours !
2. **Ordre des imports** — stdlib, puis tiers, puis locaux
3. **Évitez import *** — Préférez les imports explicites
4. **Utilisez des alias standards** — np pour numpy, pd pour pandas`,
        codeExamples: [
          {
            title: 'Le module math',
            code: `import math

# Constantes
print(f"π = {math.pi}")
print(f"e = {math.e}")

# Fonctions de base
print(f"√144 = {math.sqrt(144)}")
print(f"2^10 = {math.pow(2, 10)}")
print(f"|−5| = {math.fabs(-5)}")

# Arrondis
print(f"floor(3.7) = {math.floor(3.7)}")  # 3
print(f"ceil(3.2) = {math.ceil(3.2)}")    # 4

# Factorielle et combinatoire
print(f"5! = {math.factorial(5)}")  # 120

# Trigonométrie (en radians)
angle = math.radians(45)  # Convertir degrés → radians
print(f"sin(45°) = {math.sin(angle):.4f}")
print(f"cos(45°) = {math.cos(angle):.4f}")`,
            explanation: 'Le module math fournit toutes les fonctions mathématiques. Les fonctions trigonométriques utilisent des radians, pas des degrés !'
          },
          {
            title: 'Le module random',
            code: `import random

# Nombre entier aléatoire
de = random.randint(1, 6)
print(f"🎲 Lancer de dé : {de}")

# Nombre décimal entre 0 et 1
x = random.random()
print(f"Nombre aléatoire : {x:.4f}")

# Choisir un élément au hasard
fruits = ["🍎", "🍌", "🍊", "🍇", "🍓"]
choix = random.choice(fruits)
print(f"Fruit choisi : {choix}")

# Mélanger une liste (modifie en place)
cartes = ["A", "2", "3", "4", "5"]
random.shuffle(cartes)
print(f"Cartes mélangées : {cartes}")

# Échantillon sans remise
loterie = random.sample(range(1, 50), 6)
print(f"Numéros loterie : {sorted(loterie)}")

# Pour des résultats reproductibles (tests)
random.seed(42)
print(random.randint(1, 100))  # Toujours pareil`,
            explanation: 'random est essentiel pour les jeux, simulations, et tests. seed() permet d\'avoir des résultats reproductibles.'
          },
          {
            title: 'Le module datetime',
            code: `from datetime import datetime, date, timedelta

# Date et heure actuelles
maintenant = datetime.now()
print(f"Maintenant : {maintenant}")

# Formater la date
print(f"Date : {maintenant.strftime('%d/%m/%Y')}")
print(f"Heure : {maintenant.strftime('%H:%M:%S')}")
print(f"Jour : {maintenant.strftime('%A')}")  # En anglais

# Créer une date spécifique
noel = date(2024, 12, 25)
print(f"Noël : {noel}")

# Calculs avec les dates
demain = date.today() + timedelta(days=1)
print(f"Demain : {demain}")

dans_une_semaine = datetime.now() + timedelta(weeks=1)
print(f"Dans 1 semaine : {dans_une_semaine.strftime('%d/%m/%Y')}")

# Différence entre deux dates
date1 = date(2024, 1, 1)
date2 = date(2024, 12, 31)
diff = date2 - date1
print(f"Jours dans 2024 : {diff.days}")`,
            explanation: 'datetime gère dates et heures. strftime() formate les dates. timedelta permet les calculs de durée.'
          },
          {
            title: 'Créer son propre module',
            code: `# ===== Fichier: mon_module.py =====
"""
Mon module personnalisé
Contient des fonctions utilitaires
"""

PI = 3.14159

def aire_cercle(rayon):
    """Calcule l'aire d'un cercle"""
    return PI * rayon ** 2

def perimetre_cercle(rayon):
    """Calcule le périmètre d'un cercle"""
    return 2 * PI * rayon

def saluer(nom):
    """Salue une personne"""
    return f"Bonjour {nom} !"


# ===== Fichier: main.py =====
# Importer notre module personnalisé
import mon_module

# Utiliser les fonctions
print(mon_module.aire_cercle(5))
print(mon_module.saluer("Alice"))

# Ou import spécifique
from mon_module import aire_cercle, PI
print(f"π = {PI}")
print(f"Aire = {aire_cercle(10)}")`,
            explanation: 'Vous pouvez créer vos propres modules en créant des fichiers .py. Ils peuvent ensuite être importés depuis d\'autres fichiers.'
          }
        ],
        exercises: [
          {
            id: 'ex5-5-1',
            title: 'Utiliser le module math',
            instruction: 'Importez math et calculez la racine carrée de 256, puis affichez π arrondi à 4 décimales.',
            starterCode: `# Importez le module math
___ math

# Calculez √256
racine = math.___(256)
print(f"√256 = {racine}")

# Affichez π avec 4 décimales
print(f"π = {math.___:.4f}")`,
            solution: `import math
racine = math.sqrt(256)
print(f"√256 = {racine}")
print(f"π = {math.pi:.4f}")`,
            hints: [
              'import math pour importer le module',
              'math.sqrt() pour la racine carrée',
              'math.pi pour la constante π'
            ],
            tests: [
              { input: '', expected: '16', description: '√256 = 16' },
              { input: '', expected: '3.1415', description: 'π arrondi' }
            ],
            difficulty: 'easy'
          },
          {
            id: 'ex5-5-2',
            title: 'Générateur de mot de passe',
            instruction: 'Utilisez random pour créer une fonction generer_mdp(longueur) qui génère un mot de passe aléatoire.',
            starterCode: `import random
import string

def generer_mdp(longueur):
    """Génère un mot de passe aléatoire"""
    # string.ascii_letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    # string.digits = '0123456789'
    caracteres = string.ascii_letters + string.digits + "!@#$%"
    
    mdp = ""
    for _ in range(___):
        mdp += random.___(caracteres)
    return mdp

# Test
print(generer_mdp(12))`,
            solution: `import random
import string

def generer_mdp(longueur):
    caracteres = string.ascii_letters + string.digits + "!@#$%"
    mdp = ""
    for _ in range(longueur):
        mdp += random.choice(caracteres)
    return mdp

print(generer_mdp(12))`,
            hints: [
              'range(longueur) pour répéter',
              'random.choice() choisit un caractère au hasard',
              '_ est utilisé quand on n\'a pas besoin de la variable'
            ],
            tests: [
              { input: '', expected: 'random', description: 'Doit utiliser random' }
            ],
            difficulty: 'medium'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Que retourne une fonction sans instruction return ?',
        options: ['0', 'False', 'None', 'Une erreur'],
        correctIndex: 2,
        explanation: 'En Python, une fonction sans return explicite retourne automatiquement None.'
      },
      {
        id: 'q5-2',
        question: 'Que fait *args dans une définition de fonction ?',
        options: ['Multiplie les arguments', 'Crée une liste', 'Capture les arguments positionnels dans un tuple', 'Oblige à passer tous les arguments'],
        correctIndex: 2,
        explanation: '*args capture tous les arguments positionnels supplémentaires dans un tuple.'
      },
      {
        id: 'q5-3',
        question: 'Quelle est la sortie de : (lambda x: x*2)(5) ?',
        options: ['x*2', '10', '25', 'Erreur'],
        correctIndex: 1,
        explanation: 'Cette lambda multiplie son argument par 2. (5)*2 = 10.'
      },
      {
        id: 'q5-4',
        question: 'Comment modifier une variable globale dans une fonction ?',
        options: ['Impossible', 'Avec global variable', 'Automatiquement', 'Avec local variable'],
        correctIndex: 1,
        explanation: 'Pour modifier une variable globale, il faut la déclarer avec "global nom_variable" dans la fonction.'
      },
      {
        id: 'q5-5',
        question: 'Quelle est la bonne façon d\'importer uniquement sqrt du module math ?',
        options: ['import math.sqrt', 'from math import sqrt', 'import sqrt from math', 'using math.sqrt'],
        correctIndex: 1,
        explanation: 'La syntaxe Python pour importer un élément spécifique est : from module import element.'
      },
      {
        id: 'q5-6',
        question: 'Que fait random.choice(liste) ?',
        options: ['Trie la liste', 'Retourne un élément au hasard', 'Mélange la liste', 'Retourne le premier élément'],
        correctIndex: 1,
        explanation: 'random.choice() retourne un élément choisi aléatoirement dans la séquence donnée.'
      }
    ],
    project: {
      title: 'Calculatrice Python Avancée',
      description: 'Créez une calculatrice scientifique complète en ligne de commande. Ce projet couvre TOUS les concepts Python : imports, fonctions, boucles while, break, try/except, dictionnaires, listes, et plus encore !',
      objectives: [
        'Maîtriser les imports (math, datetime)',
        'Créer des fonctions avec paramètres et return',
        'Utiliser while True avec break pour le menu',
        'Gérer les erreurs avec try/except',
        'Utiliser des dictionnaires pour les opérations',
        'Stocker l\'historique dans une liste',
        'Formater l\'affichage avec f-strings',
        'Valider les entrées utilisateur'
      ],
      steps: [
        {
          id: 'calc-1',
          title: 'Étape 1: Les imports - Le module math',
          instruction: `En Python, "import" permet d'utiliser des modules externes.

Le module "math" fournit des fonctions mathématiques avancées :
- math.sqrt(x) : racine carrée
- math.pow(x, y) : puissance
- math.pi : la constante π (3.14159...)
- math.factorial(n) : factorielle

Écrivez les imports nécessaires pour notre calculatrice.`,
          hint: 'Utilisez "import math" pour importer le module math entier',
          starterCode: `# ============================================
# 🧮 CALCULATRICE PYTHON AVANCÉE
# ============================================
# Les imports se placent TOUJOURS en haut du fichier
# Ils permettent d'utiliser des fonctions externes

# Importez le module math pour les fonctions avancées
___ math

# Importez datetime pour horodater l'historique  
from ___ import datetime

# Test des imports
print(f"π = {math.pi}")
print(f"√16 = {math.sqrt(16)}")
print(f"Date: {datetime.now()}")`,
          expectedCode: `import math
from datetime import datetime`,
          validation: 'import math'
        },
        {
          id: 'calc-2',
          title: 'Étape 2: Les opérations de base (fonctions)',
          instruction: `Créez les 4 fonctions d'opérations de base.

Chaque fonction :
- Prend 2 paramètres (a et b)
- Retourne le résultat avec return
- A une docstring qui explique ce qu'elle fait

La division doit gérer le cas b=0 avec une condition if.`,
          hint: 'Pour la division, vérifiez if b == 0 avant de diviser',
          starterCode: `import math
from datetime import datetime

# ============================================
# OPÉRATIONS DE BASE
# ============================================

def additionner(a, b):
    """Retourne la somme de a et b"""
    return ___ + ___

def soustraire(a, b):
    """Retourne la différence a - b"""
    return ___ - ___

def multiplier(a, b):
    """Retourne le produit de a et b"""
    return ___ * ___

def diviser(a, b):
    """Retourne a/b, gère la division par zéro"""
    if b == 0:
        return None  # Signale une erreur
    return ___ / ___

# Tests
print(f"5 + 3 = {additionner(5, 3)}")
print(f"10 - 4 = {soustraire(10, 4)}")
print(f"6 × 7 = {multiplier(6, 7)}")
print(f"15 ÷ 3 = {diviser(15, 3)}")
print(f"10 ÷ 0 = {diviser(10, 0)}")`,
          expectedCode: `def additionner(a, b):
    return a + b

def soustraire(a, b):
    return a - b

def multiplier(a, b):
    return a * b

def diviser(a, b):
    if b == 0:
        return None
    return a / b`,
          validation: 'return a + b'
        },
        {
          id: 'calc-3',
          title: 'Étape 3: Opérations avancées avec math',
          instruction: `Ajoutez des opérations scientifiques en utilisant le module math.

Fonctions à créer :
- puissance(base, exposant) : utilise math.pow() ou **
- racine_carree(n) : utilise math.sqrt(), vérifie n >= 0
- modulo(a, b) : reste de la division (a % b)
- factorielle(n) : utilise math.factorial(), vérifie n >= 0`,
          hint: 'math.sqrt() pour racine carrée, math.factorial() pour factorielle',
          starterCode: `import math
from datetime import datetime

# [Fonctions de base déjà créées...]

# ============================================
# OPÉRATIONS AVANCÉES (avec le module math)
# ============================================

def puissance(base, exposant):
    """Calcule base^exposant"""
    return math.___(base, exposant)
    # Alternative: return base ** exposant

def racine_carree(n):
    """Calcule √n, retourne None si n < 0"""
    if n < 0:
        return ___  # Impossible pour les réels
    return math.___(n)

def modulo(a, b):
    """Retourne le reste de a ÷ b"""
    if b == 0:
        return None
    return a ___ b  # Opérateur modulo

def factorielle(n):
    """Calcule n! = n × (n-1) × ... × 1"""
    if n < 0:
        return None
    return math.___(int(n))

# Tests
print(f"2^10 = {puissance(2, 10)}")
print(f"√144 = {racine_carree(144)}")
print(f"17 mod 5 = {modulo(17, 5)}")
print(f"5! = {factorielle(5)}")`,
          expectedCode: `def puissance(base, exposant):
    return math.pow(base, exposant)

def racine_carree(n):
    if n < 0:
        return None
    return math.sqrt(n)

def modulo(a, b):
    if b == 0:
        return None
    return a % b

def factorielle(n):
    if n < 0:
        return None
    return math.factorial(int(n))`,
          validation: 'math.sqrt'
        },
        {
          id: 'calc-4',
          title: 'Étape 4: Dictionnaire des opérations',
          instruction: `Un dictionnaire peut stocker des fonctions comme valeurs !

Créez un dictionnaire "operations" qui associe :
- Le nom de l'opération (clé)
- La fonction correspondante (valeur)
- Le symbole pour l'affichage
- Le nombre d'arguments requis

Cela permet d'appeler une fonction dynamiquement avec operations[choix]["fonction"](a, b)`,
          hint: 'Les fonctions sont des objets en Python, on peut les stocker sans les ()',
          starterCode: `import math
from datetime import datetime

# [Fonctions déjà créées...]

# ============================================
# DICTIONNAIRE DES OPÉRATIONS
# ============================================
# Les fonctions sont des objets ! On peut les stocker
# dans un dictionnaire pour les appeler dynamiquement.

operations = {
    "1": {
        "nom": "Addition",
        "symbole": "+",
        "fonction": ___,  # La fonction additionner
        "args": 2
    },
    "2": {
        "nom": "Soustraction",
        "symbole": "-",
        "fonction": ___,
        "args": 2
    },
    "3": {
        "nom": "Multiplication",
        "symbole": "×",
        "fonction": ___,
        "args": 2
    },
    "4": {
        "nom": "Division",
        "symbole": "÷",
        "fonction": ___,
        "args": 2
    },
    "5": {
        "nom": "Puissance",
        "symbole": "^",
        "fonction": ___,
        "args": 2
    },
    "6": {
        "nom": "Racine carrée",
        "symbole": "√",
        "fonction": ___,
        "args": 1  # Un seul argument !
    },
    "7": {
        "nom": "Modulo",
        "symbole": "mod",
        "fonction": ___,
        "args": 2
    },
    "8": {
        "nom": "Factorielle",
        "symbole": "!",
        "fonction": ___,
        "args": 1
    }
}

# Test: appel dynamique d'une fonction
op = operations["1"]
resultat = op["fonction"](5, 3)
print(f"{op['nom']}: 5 {op['symbole']} 3 = {resultat}")`,
          expectedCode: `operations = {
    "1": {"fonction": additionner},
    "2": {"fonction": soustraire},
    "3": {"fonction": multiplier},
    "4": {"fonction": diviser},
    "5": {"fonction": puissance},
    "6": {"fonction": racine_carree},
    "7": {"fonction": modulo},
    "8": {"fonction": factorielle}
}`,
          validation: 'fonction'
        },
        {
          id: 'calc-5',
          title: 'Étape 5: L\'historique (liste)',
          instruction: `Utilisez une liste pour stocker l'historique des calculs.

Chaque entrée sera un dictionnaire contenant :
- L'opération effectuée
- Le résultat
- L'horodatage (avec datetime)

Créez aussi une fonction pour afficher l'historique.`,
          hint: 'historique.append({...}) pour ajouter, enumerate() pour numéroter',
          starterCode: `import math
from datetime import datetime

# [Code précédent...]

# ============================================
# HISTORIQUE DES CALCULS (liste)
# ============================================

# Liste vide pour stocker les calculs
historique = ___

def ajouter_historique(operation, resultat):
    """Ajoute un calcul à l'historique"""
    entree = {
        "operation": operation,
        "resultat": resultat,
        "date": datetime.now().strftime("%H:%M:%S")
    }
    historique.___(entree)

def afficher_historique():
    """Affiche tout l'historique"""
    if not historique:  # Liste vide = False
        print("📭 Aucun calcul dans l'historique")
        return
    
    print("\\n📜 HISTORIQUE DES CALCULS")
    print("=" * 40)
    # enumerate donne l'index ET la valeur
    for i, calc in ___(historique, start=1):
        print(f"{i}. [{calc['date']}] {calc['operation']} = {calc['resultat']}")
    print("=" * 40)

# Test
ajouter_historique("5 + 3", 8)
ajouter_historique("10 × 4", 40)
afficher_historique()`,
          expectedCode: `historique = []

def ajouter_historique(operation, resultat):
    entree = {
        "operation": operation,
        "resultat": resultat,
        "date": datetime.now().strftime("%H:%M:%S")
    }
    historique.append(entree)

def afficher_historique():
    for i, calc in enumerate(historique, start=1):
        print(f"{i}. {calc}")`,
          validation: 'historique.append'
        },
        {
          id: 'calc-6',
          title: 'Étape 6: Validation des entrées (try/except)',
          instruction: `Les utilisateurs peuvent entrer n'importe quoi !

Utilisez try/except pour :
- Convertir l'entrée en nombre (float)
- Capturer ValueError si ce n'est pas un nombre
- Redemander tant que l'entrée est invalide (while)

C'est la gestion d'erreurs en Python !`,
          hint: 'try: float(input(...)) except ValueError: print("Erreur")',
          starterCode: `import math
from datetime import datetime

# [Code précédent...]

# ============================================
# VALIDATION DES ENTRÉES (try/except)
# ============================================

def demander_nombre(message):
    """
    Demande un nombre à l'utilisateur.
    Continue à demander tant que l'entrée est invalide.
    """
    while True:  # Boucle infinie jusqu'à break
        ___:  # Essayer de convertir
            valeur = ___(input(message))
            return valeur  # Sort de la fonction
        ___ ValueError:  # Si la conversion échoue
            print("❌ Veuillez entrer un nombre valide!")
            # La boucle continue automatiquement

def demander_entier_positif(message):
    """Demande un entier >= 0 (pour factorielle, racine)"""
    while True:
        try:
            valeur = float(input(message))
            if valeur < 0:
                print("❌ Le nombre doit être positif!")
                ___  # Retour au début de la boucle
            return valeur
        except ValueError:
            print("❌ Veuillez entrer un nombre valide!")

# Test
nombre = demander_nombre("Entrez un nombre: ")
print(f"Vous avez entré: {nombre}")`,
          expectedCode: `def demander_nombre(message):
    while True:
        try:
            valeur = float(input(message))
            return valeur
        except ValueError:
            print("Erreur!")

def demander_entier_positif(message):
    while True:
        try:
            valeur = float(input(message))
            if valeur < 0:
                continue
            return valeur
        except ValueError:
            print("Erreur!")`,
          validation: 'except ValueError'
        },
        {
          id: 'calc-7',
          title: 'Étape 7: Le menu (affichage formaté)',
          instruction: `Créez une fonction qui affiche un menu élégant.

Utilisez :
- Les f-strings pour le formatage
- La multiplication de chaînes ("=" * 30)
- Une boucle for pour lister les opérations

Le menu doit afficher toutes les opérations du dictionnaire.`,
          hint: 'Parcourez operations.items() pour avoir clé ET valeur',
          starterCode: `import math
from datetime import datetime

# [Code précédent...]

# ============================================
# AFFICHAGE DU MENU
# ============================================

def afficher_menu():
    """Affiche le menu principal de la calculatrice"""
    print("\\n" + "=" * 40)
    print("    🧮 CALCULATRICE PYTHON AVANCÉE")
    print("=" * 40)
    
    # Parcourir le dictionnaire des opérations
    for cle, op in operations.___():
        print(f"  {cle}. {op['nom']} ({op['symbole']})")
    
    print("-" * 40)
    print("  H. Afficher l'historique")
    print("  C. Effacer l'historique")
    print("  Q. Quitter")
    print("=" * 40)

def effacer_historique():
    """Vide l'historique"""
    global historique  # Pour modifier la variable globale
    historique = []
    print("🗑️ Historique effacé!")

# Test
afficher_menu()`,
          expectedCode: `def afficher_menu():
    print("CALCULATRICE")
    for cle, op in operations.items():
        print(f"{cle}. {op['nom']}")`,
          validation: 'operations.items()'
        },
        {
          id: 'calc-8',
          title: 'Étape 8: Exécuter une opération',
          instruction: `Créez une fonction qui exécute l'opération choisie.

Elle doit :
1. Récupérer la fonction depuis le dictionnaire
2. Demander les nombres nécessaires (1 ou 2 selon args)
3. Appeler la fonction avec les bons arguments
4. Gérer le résultat None (erreur)
5. Ajouter à l'historique si succès`,
          hint: 'Vérifiez op["args"] pour savoir combien de nombres demander',
          starterCode: `import math
from datetime import datetime

# [Code précédent...]

# ============================================
# EXÉCUTION D'UNE OPÉRATION
# ============================================

def executer_operation(choix):
    """Exécute l'opération correspondant au choix"""
    
    # Récupérer l'opération depuis le dictionnaire
    op = operations[choix]
    nom = op["nom"]
    symbole = op["symbole"]
    fonction = op["fonction"]
    nb_args = op["args"]
    
    print(f"\\n📐 {nom}")
    
    # Demander les nombres selon le nombre d'arguments
    if nb_args == 1:
        # Opérations à 1 argument (racine, factorielle)
        a = demander_entier_positif("Nombre: ")
        resultat = ___(a)  # Appel avec 1 arg
        operation_str = f"{symbole}{a}"
    else:
        # Opérations à 2 arguments
        a = demander_nombre("Premier nombre: ")
        b = demander_nombre("Deuxième nombre: ")
        resultat = ___(a, b)  # Appel avec 2 args
        operation_str = f"{a} {symbole} {b}"
    
    # Vérifier si l'opération a réussi
    if resultat is ___:
        print("❌ Opération impossible!")
        return
    
    # Afficher et sauvegarder le résultat
    print(f"✅ {operation_str} = {resultat}")
    ajouter_historique(operation_str, resultat)

# Test
executer_operation("1")  # Addition`,
          expectedCode: `def executer_operation(choix):
    op = operations[choix]
    fonction = op["fonction"]
    if op["args"] == 1:
        a = demander_nombre("Nombre: ")
        resultat = fonction(a)
    else:
        a = demander_nombre("Premier: ")
        b = demander_nombre("Deuxième: ")
        resultat = fonction(a, b)
    
    if resultat is None:
        print("Erreur!")`,
          validation: 'resultat is None'
        },
        {
          id: 'calc-9',
          title: 'Étape 9: La boucle principale (while True + break)',
          instruction: `La boucle principale utilise "while True" avec "break" pour sortir.

Structure :
1. while True : boucle infinie
2. Afficher le menu
3. Demander le choix
4. Si "Q" : break (sortir)
5. Si choix valide : exécuter
6. Si choix invalide : continue (recommencer)

C'est le cœur de tout programme interactif !`,
          hint: 'break sort de la boucle, continue saute à l\'itération suivante',
          starterCode: `import math
from datetime import datetime

# [Tout le code précédent...]

# ============================================
# BOUCLE PRINCIPALE (while True + break)
# ============================================

def main():
    """Fonction principale - Point d'entrée du programme"""
    
    print("\\n🎉 Bienvenue dans la Calculatrice Python!")
    print("💡 Ce programme démontre tous les concepts Python.")
    
    # Boucle infinie - on sort avec break
    while ___:
        afficher_menu()
        
        # Demander le choix (sans conversion, c'est du texte)
        choix = input("\\nVotre choix: ").strip().upper()
        
        # Option Quitter
        if choix == "Q":
            print("\\n👋 Merci d'avoir utilisé la calculatrice!")
            print("📊 Total des calculs effectués:", len(historique))
            ___  # Sort de la boucle while
        
        # Option Historique
        elif choix == "H":
            afficher_historique()
            ___  # Retour au menu
        
        # Option Effacer
        elif choix == "C":
            effacer_historique()
            continue
        
        # Vérifier si c'est une opération valide
        elif choix in operations:
            executer_operation(choix)
        
        # Choix invalide
        else:
            print("❌ Option invalide! Réessayez.")
            continue  # Retour au menu
    
    print("\\n🐍 Programme terminé. À bientôt!")

# Point d'entrée du programme
if __name__ == "__main__":
    main()`,
          expectedCode: `def main():
    while True:
        afficher_menu()
        choix = input("Choix: ")
        
        if choix == "Q":
            break
        elif choix == "H":
            afficher_historique()
            continue
        elif choix in operations:
            executer_operation(choix)`,
          validation: 'while True'
        },
        {
          id: 'calc-10',
          title: 'Étape 10: Code complet final',
          instruction: `Félicitations ! Voici le code complet de la calculatrice.

Ce projet utilise TOUS les concepts Python :
✅ import (math, datetime)
✅ Fonctions avec paramètres et return
✅ Dictionnaires (operations)
✅ Listes (historique)
✅ while True avec break et continue
✅ try/except pour la gestion d'erreurs
✅ if/elif/else pour les conditions
✅ for avec enumerate() pour les boucles
✅ f-strings pour le formatage
✅ Docstrings pour la documentation

Copiez ce code et exécutez-le sur votre machine !`,
          hint: 'Enregistrez dans calculatrice.py et lancez avec: python calculatrice.py',
          starterCode: `# ================================================
# 🧮 CALCULATRICE PYTHON AVANCÉE - CODE COMPLET
# ================================================
# Ce programme démontre tous les concepts Python :
# - imports, fonctions, dictionnaires, listes
# - while/break/continue, try/except, if/elif/else
# ================================================

# === IMPORTS ===
import math
from datetime import datetime

# === HISTORIQUE (liste globale) ===
historique = []

# === OPÉRATIONS DE BASE ===
def additionner(a, b):
    """Retourne a + b"""
    return a + b

def soustraire(a, b):
    """Retourne a - b"""
    return a - b

def multiplier(a, b):
    """Retourne a × b"""
    return a * b

def diviser(a, b):
    """Retourne a ÷ b (None si b=0)"""
    if b == 0:
        return None
    return a / b

# === OPÉRATIONS AVANCÉES ===
def puissance(base, exp):
    """Retourne base^exp"""
    return math.pow(base, exp)

def racine_carree(n):
    """Retourne √n (None si n<0)"""
    if n < 0:
        return None
    return math.sqrt(n)

def modulo(a, b):
    """Retourne a mod b"""
    if b == 0:
        return None
    return a % b

def factorielle(n):
    """Retourne n!"""
    if n < 0:
        return None
    return math.factorial(int(n))

# === DICTIONNAIRE DES OPÉRATIONS ===
operations = {
    "1": {"nom": "Addition", "symbole": "+", "fonction": additionner, "args": 2},
    "2": {"nom": "Soustraction", "symbole": "-", "fonction": soustraire, "args": 2},
    "3": {"nom": "Multiplication", "symbole": "×", "fonction": multiplier, "args": 2},
    "4": {"nom": "Division", "symbole": "÷", "fonction": diviser, "args": 2},
    "5": {"nom": "Puissance", "symbole": "^", "fonction": puissance, "args": 2},
    "6": {"nom": "Racine carrée", "symbole": "√", "fonction": racine_carree, "args": 1},
    "7": {"nom": "Modulo", "symbole": "mod", "fonction": modulo, "args": 2},
    "8": {"nom": "Factorielle", "symbole": "!", "fonction": factorielle, "args": 1},
}

# === FONCTIONS UTILITAIRES ===
def demander_nombre(msg):
    while True:
        try:
            return float(input(msg))
        except ValueError:
            print("❌ Nombre invalide!")

def ajouter_historique(op, res):
    historique.append({
        "operation": op,
        "resultat": res,
        "date": datetime.now().strftime("%H:%M:%S")
    })

def afficher_historique():
    if not historique:
        print("📭 Historique vide")
        return
    print("\\n📜 HISTORIQUE")
    for i, h in enumerate(historique, 1):
        print(f"  {i}. [{h['date']}] {h['operation']} = {h['resultat']}")

def afficher_menu():
    print("\\n" + "=" * 35)
    print("   🧮 CALCULATRICE PYTHON")
    print("=" * 35)
    for k, v in operations.items():
        print(f"  {k}. {v['nom']} ({v['symbole']})")
    print("-" * 35)
    print("  H. Historique | C. Effacer | Q. Quitter")

def executer_operation(choix):
    op = operations[choix]
    if op["args"] == 1:
        a = demander_nombre("Nombre: ")
        res = op["fonction"](a)
        op_str = f"{op['symbole']}{a}"
    else:
        a = demander_nombre("Premier nombre: ")
        b = demander_nombre("Deuxième nombre: ")
        res = op["fonction"](a, b)
        op_str = f"{a} {op['symbole']} {b}"
    
    if res is None:
        print("❌ Impossible!")
    else:
        print(f"✅ {op_str} = {res}")
        ajouter_historique(op_str, res)

# === PROGRAMME PRINCIPAL ===
def main():
    print("\\n🎉 Calculatrice Python Avancée")
    
    while True:
        afficher_menu()
        choix = input("\\nChoix: ").strip().upper()
        
        if choix == "Q":
            print(f"\\n👋 Au revoir! ({len(historique)} calculs)")
            break
        elif choix == "H":
            afficher_historique()
        elif choix == "C":
            historique.clear()
            print("🗑️ Effacé!")
        elif choix in operations:
            executer_operation(choix)
        else:
            print("❌ Option invalide!")

if __name__ == "__main__":
    main()`,
          expectedCode: `# Calculatrice Python Avancée
if __name__ == "__main__":
    main()`,
          validation: '__name__'
        }
      ]
    }
  },

  // ========================================
  // MODULE 6 : STRUCTURES DE DONNÉES
  // ========================================
  {
    id: 'mod-6',
    number: 6,
    title: 'Structures de Données',
    subtitle: 'Listes, Tuples, Sets, Dictionnaires',
    description: 'Maîtrisez toutes les structures de données de Python : listes, tuples, ensembles et dictionnaires. Apprenez quand utiliser chacune.',
    icon: '📊',
    color: '#f97316',
    difficulty: 'Intermédiaire',
    estimatedHours: 10,
    lessons: [
      {
        id: 'l6-1',
        title: 'Les Listes (list)',
        duration: '50 min',
        content: `# Les Listes (list)

Les **listes** sont les structures de données les plus utilisées en Python.

## 📋 Caractéristiques

- ✅ **Ordonnées** — Les éléments ont un ordre
- ✅ **Modifiables** — On peut ajouter/supprimer/modifier
- ✅ **Indexées** — Accès par position (0, 1, 2...)
- ✅ **Acceptent les doublons** — [1, 1, 2, 2]
- ✅ **Hétérogènes** — Types différents OK

## 🛠️ Création

\`\`\`python
# Liste vide
vide = []
vide = list()

# Liste avec éléments
nombres = [1, 2, 3, 4, 5]
mixte = [1, "deux", 3.0, True]
\`\`\`

## 🔍 Accès aux éléments

\`\`\`python
fruits = ["pomme", "banane", "orange"]
fruits[0]   # "pomme" (premier)
fruits[-1]  # "orange" (dernier)
fruits[1:3] # ["banane", "orange"] (slice)
\`\`\`

## 📝 Méthodes principales

| Méthode | Description |
|---------|-------------|
| \`append(x)\` | Ajoute x à la fin |
| \`insert(i, x)\` | Insère x à l'index i |
| \`remove(x)\` | Supprime la première occurrence de x |
| \`pop(i)\` | Supprime et retourne l'élément à l'index i |
| \`sort()\` | Trie la liste |
| \`reverse()\` | Inverse l'ordre |
| \`index(x)\` | Retourne l'index de x |
| \`count(x)\` | Compte les occurrences de x |`,
        codeExamples: [
          {
            title: 'Manipulation de listes',
            code: `# Création
fruits = ["pomme", "banane", "orange"]
print(f"Liste: {fruits}")
print(f"Longueur: {len(fruits)}")

# Accès
print(f"\\nPremier: {fruits[0]}")
print(f"Dernier: {fruits[-1]}")
print(f"Slice [1:]: {fruits[1:]}")

# Modification
fruits[0] = "poire"
print(f"\\nAprès modification: {fruits}")

# Ajout
fruits.append("fraise")
print(f"Après append: {fruits}")

fruits.insert(1, "kiwi")
print(f"Après insert(1, 'kiwi'): {fruits}")

# Suppression
fruits.remove("banane")
print(f"Après remove('banane'): {fruits}")

dernier = fruits.pop()
print(f"pop() a retiré: {dernier}")
print(f"Liste maintenant: {fruits}")

# Recherche
if "poire" in fruits:
    index = fruits.index("poire")
    print(f"\\n'poire' trouvée à l'index {index}")

# Tri
nombres = [3, 1, 4, 1, 5, 9, 2, 6]
nombres.sort()
print(f"\\nTrié: {nombres}")
nombres.sort(reverse=True)
print(f"Trié décroissant: {nombres}")`,
            explanation: 'Les listes sont mutables (modifiables). append ajoute à la fin, insert à une position. pop retourne et supprime.'
          },
          {
            title: 'List comprehension',
            code: `# Méthode classique
carres_classique = []
for i in range(1, 6):
    carres_classique.append(i ** 2)
print(f"Classique: {carres_classique}")

# List comprehension - Plus élégant !
carres = [i ** 2 for i in range(1, 6)]
print(f"Comprehension: {carres}")

# Avec condition
pairs = [x for x in range(10) if x % 2 == 0]
print(f"Pairs: {pairs}")

# Transformation de chaînes
mots = ["hello", "world", "python"]
majuscules = [mot.upper() for mot in mots]
print(f"Majuscules: {majuscules}")

# Filtrer et transformer
nombres = [1, -2, 3, -4, 5, -6]
positifs_doubles = [n * 2 for n in nombres if n > 0]
print(f"Positifs doublés: {positifs_doubles}")

# Matrice avec comprehension imbriquée
matrice = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(f"\\nMatrice:")
for ligne in matrice:
    print(f"  {ligne}")

# Aplatir une matrice
plat = [element for ligne in matrice for element in ligne]
print(f"Aplatie: {plat}")`,
            explanation: 'Les list comprehensions sont une façon "Pythonic" de créer des listes. [expression for item in iterable if condition]'
          }
        ],
        exercises: [
          {
            id: 'ex6-1-1',
            title: 'Filtrer une liste',
            instruction: 'Créez une list comprehension qui garde seulement les nombres supérieurs à 5.',
            starterCode: `nombres = [1, 8, 3, 10, 4, 12, 2, 9]

# List comprehension pour garder > 5
grands = [___ for ___ in ___ if ___]

print(grands)  # [8, 10, 12, 9]`,
            solution: `nombres = [1, 8, 3, 10, 4, 12, 2, 9]
grands = [n for n in nombres if n > 5]
print(grands)`,
            hints: [
              'n parcourt les nombres',
              'Condition: n > 5',
              'Expression: n (on garde le nombre tel quel)'
            ],
            tests: [
              { input: '', expected: '[8, 10, 12, 9]', description: 'Doit filtrer > 5' }
            ],
            difficulty: 'medium'
          }
        ]
      },
      {
        id: 'l6-2',
        title: 'Les Tuples (tuple)',
        duration: '35 min',
        content: `# Les Tuples (tuple)

Les **tuples** sont comme des listes, mais **immuables** (non modifiables).

## 📋 Caractéristiques

- ✅ **Ordonnés** — Les éléments ont un ordre
- ❌ **Immuables** — On ne peut PAS modifier
- ✅ **Indexés** — Accès par position
- ✅ **Acceptent les doublons**
- ✅ **Plus rapides** que les listes

## 🛠️ Création

\`\`\`python
# Tuple vide
vide = ()
vide = tuple()

# Tuple avec éléments
coords = (10, 20)
couleurs = ("rouge", "vert", "bleu")

# ⚠️ Tuple d'un élément : VIRGULE obligatoire !
un_element = (42,)  # ✅ Tuple
pas_tuple = (42)    # ❌ Juste un int
\`\`\`

## 🎯 Quand utiliser un tuple ?

- Données constantes (coordonnées, RGB...)
- Clés de dictionnaire
- Retour multiple de fonctions
- Protection contre les modifications

## 🔄 Unpacking

\`\`\`python
point = (10, 20, 30)
x, y, z = point  # Unpacking
\`\`\``,
        codeExamples: [
          {
            title: 'Tuples en pratique',
            code: `# Création de tuples
point = (10, 20)
couleur_rgb = (255, 128, 0)
etudiant = ("Alice", 25, "Paris")

print(f"Point: {point}")
print(f"Type: {type(point)}")

# Accès (comme les listes)
print(f"\\nPremier élément: {point[0]}")
print(f"Dernier: {etudiant[-1]}")

# ❌ Les tuples sont immuables
# point[0] = 15  # TypeError !

# Unpacking (déballage)
x, y = point
print(f"\\nUnpacking: x={x}, y={y}")

nom, age, ville = etudiant
print(f"Nom: {nom}, Âge: {age}, Ville: {ville}")

# Unpacking avec *
premiers, *reste = (1, 2, 3, 4, 5)
print(f"\\nPremier: {premiers}, Reste: {reste}")

*debut, dernier = (1, 2, 3, 4, 5)
print(f"Début: {debut}, Dernier: {dernier}")

# Tuple d'un élément
singleton = (42,)  # Virgule obligatoire !
pas_tuple = (42)   # C'est juste un int

print(f"\\ntype((42,)) = {type(singleton)}")
print(f"type((42)) = {type(pas_tuple)}")

# Fonctions retournant des tuples
def min_max(liste):
    return min(liste), max(liste)

nombres = [5, 2, 8, 1, 9]
minimum, maximum = min_max(nombres)
print(f"\\nMin: {minimum}, Max: {maximum}")`,
            explanation: 'Les tuples sont immuables et donc "hashables". Parfaits pour les données qui ne doivent pas changer. Le unpacking est très pratique.'
          },
          {
            title: 'Tuples vs Listes',
            code: `# Tuples comme clés de dictionnaire (listes : impossible !)
localisation = {
    (48.8566, 2.3522): "Paris",
    (51.5074, -0.1278): "Londres",
    (40.7128, -74.0060): "New York"
}

coords = (48.8566, 2.3522)
print(f"Coordonnées {coords} → {localisation[coords]}")

# Retour multiple de fonction
def divmod_custom(a, b):
    """Retourne quotient et reste"""
    quotient = a // b
    reste = a % b
    return quotient, reste  # Retourne un tuple

q, r = divmod_custom(17, 5)
print(f"\\n17 ÷ 5 = {q} reste {r}")

# Échange de variables (utilise les tuples implicitement)
a, b = 5, 10
print(f"\\nAvant: a={a}, b={b}")
a, b = b, a  # Échange !
print(f"Après: a={a}, b={b}")

# Named tuples (tuples nommés) - Plus lisible
from collections import namedtuple

Personne = namedtuple("Personne", ["nom", "age", "ville"])
alice = Personne("Alice", 25, "Paris")

print(f"\\nNamed tuple: {alice}")
print(f"Nom: {alice.nom}")
print(f"Âge: {alice.age}")`,
            explanation: 'Les tuples sont préférables aux listes quand les données sont constantes. Ils peuvent servir de clés de dictionnaire.'
          }
        ],
        exercises: [
          {
            id: 'ex6-2-1',
            title: 'Unpacking de tuple',
            instruction: 'Créez un tuple personne = ("Marie", 30, "Lyon") et utilisez l\'unpacking pour extraire nom, age, ville.',
            starterCode: `personne = ("Marie", 30, "Lyon")

# Unpacking
___, ___, ___ = personne

print(f"Nom: {nom}")
print(f"Âge: {age}")
print(f"Ville: {ville}")`,
            solution: `personne = ("Marie", 30, "Lyon")
nom, age, ville = personne
print(f"Nom: {nom}")
print(f"Âge: {age}")
print(f"Ville: {ville}")`,
            hints: [
              'Assignez les 3 variables en une ligne',
              'L\'ordre doit correspondre au tuple'
            ],
            tests: [
              { input: '', expected: 'Marie', description: 'Doit extraire le nom' }
            ],
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'l6-3',
        title: 'Les Ensembles (set)',
        duration: '35 min',
        content: `# Les Ensembles (set)

Les **sets** sont des collections **non ordonnées** d'éléments **uniques**.

## 📋 Caractéristiques

- ❌ **Non ordonnés** — Pas d'index
- ✅ **Modifiables** — Ajout/suppression possibles
- ✅ **Éléments uniques** — Pas de doublons !
- ✅ **Opérations ensemblistes** — Union, intersection...

## 🛠️ Création

\`\`\`python
# Set vide
vide = set()  # Pas {} qui crée un dict !

# Set avec éléments
nombres = {1, 2, 3, 4, 5}
lettres = set("hello")  # {'h', 'e', 'l', 'o'}
\`\`\`

## 🔧 Méthodes

| Méthode | Description |
|---------|-------------|
| \`add(x)\` | Ajoute x |
| \`remove(x)\` | Supprime x (erreur si absent) |
| \`discard(x)\` | Supprime x (pas d'erreur si absent) |
| \`union()\` | Tous les éléments des deux sets |
| \`intersection()\` | Éléments communs |
| \`difference()\` | Éléments dans un mais pas l'autre |

## 🎯 Cas d'utilisation

- Éliminer les doublons
- Test d'appartenance rapide
- Opérations mathématiques sur des ensembles`,
        codeExamples: [
          {
            title: 'Opérations sur les sets',
            code: `# Création et élimination des doublons
liste_doublons = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
ensemble = set(liste_doublons)
print(f"Avec doublons: {liste_doublons}")
print(f"Sans doublons: {ensemble}")

# Ajout et suppression
fruits = {"pomme", "banane", "orange"}
fruits.add("fraise")
fruits.add("pomme")  # Ignoré, déjà présent
print(f"\\nAprès ajouts: {fruits}")

fruits.remove("banane")
# fruits.remove("kiwi")  # KeyError si absent
fruits.discard("kiwi")   # Pas d'erreur si absent
print(f"Après suppressions: {fruits}")

# Test d'appartenance (très rapide !)
print(f"\\n'pomme' in fruits: {'pomme' in fruits}")
print(f"'kiwi' in fruits: {'kiwi' in fruits}")

# Opérations ensemblistes
python_fans = {"Alice", "Bob", "Claire", "David"}
java_fans = {"Bob", "David", "Eve", "Frank"}

print(f"\\nPython fans: {python_fans}")
print(f"Java fans: {java_fans}")

# Union (tous)
tous = python_fans | java_fans  # ou .union()
print(f"Tous les fans: {tous}")

# Intersection (communs)
les_deux = python_fans & java_fans  # ou .intersection()
print(f"Fans des deux: {les_deux}")

# Différence
python_only = python_fans - java_fans  # ou .difference()
print(f"Python seulement: {python_only}")

# Différence symétrique (l'un ou l'autre, pas les deux)
exclusifs = python_fans ^ java_fans
print(f"L'un ou l'autre: {exclusifs}")`,
            explanation: 'Les sets éliminent automatiquement les doublons. Les opérations |, &, -, ^ sont les équivalents de union, intersection, difference.'
          }
        ],
        exercises: [
          {
            id: 'ex6-3-1',
            title: 'Éliminer les doublons',
            instruction: 'Utilisez un set pour éliminer les doublons de la liste [1, 2, 2, 3, 3, 3, 4, 4].',
            starterCode: `nombres = [1, 2, 2, 3, 3, 3, 4, 4]

# Convertir en set pour éliminer les doublons
sans_doublons = ___(nombres)

print(f"Avec doublons: {nombres}")
print(f"Sans doublons: {sans_doublons}")`,
            solution: `nombres = [1, 2, 2, 3, 3, 3, 4, 4]
sans_doublons = set(nombres)
print(f"Avec doublons: {nombres}")
print(f"Sans doublons: {sans_doublons}")`,
            hints: ['Utilisez set() pour convertir'],
            tests: [
              { input: '', expected: '{1, 2, 3, 4}', description: 'Doit éliminer les doublons' }
            ],
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'l6-4',
        title: 'Les Dictionnaires (dict)',
        duration: '50 min',
        content: `# Les Dictionnaires (dict)

Les **dictionnaires** stockent des paires **clé-valeur**.

## 📋 Caractéristiques

- ✅ **Paires clé-valeur**
- ✅ **Clés uniques** — Une clé = une valeur
- ✅ **Modifiables**
- ✅ **Ordonnés** (Python 3.7+)
- ✅ **Accès rapide** par clé

## 🛠️ Création

\`\`\`python
# Dict vide
vide = {}
vide = dict()

# Dict avec données
personne = {"nom": "Alice", "age": 25}
\`\`\`

## 🔍 Accès

\`\`\`python
personne["nom"]     # "Alice"
personne.get("age") # 25
personne.get("x", 0) # 0 (valeur par défaut)
\`\`\`

## 📝 Méthodes principales

| Méthode | Description |
|---------|-------------|
| \`keys()\` | Retourne les clés |
| \`values()\` | Retourne les valeurs |
| \`items()\` | Retourne les paires (clé, valeur) |
| \`get(clé, défaut)\` | Accès sécurisé |
| \`update(dict)\` | Fusionne deux dicts |
| \`pop(clé)\` | Supprime et retourne |`,
        codeExamples: [
          {
            title: 'Manipulation de dictionnaires',
            code: `# Création
etudiant = {
    "nom": "Alice",
    "age": 20,
    "notes": [15, 18, 12, 16],
    "ville": "Paris"
}

print("Étudiant:", etudiant)

# Accès
print(f"\\nNom: {etudiant['nom']}")
print(f"Notes: {etudiant['notes']}")

# Accès sécurisé avec get()
print(f"Email: {etudiant.get('email', 'Non renseigné')}")

# Modification
etudiant["age"] = 21
etudiant["email"] = "alice@example.com"
print(f"\\nAprès modification: {etudiant}")

# Suppression
del etudiant["ville"]
dernier = etudiant.pop("email")
print(f"Email supprimé: {dernier}")

# Parcours
print("\\n--- Parcours ---")
for cle in etudiant.keys():
    print(f"Clé: {cle}")

print()
for valeur in etudiant.values():
    print(f"Valeur: {valeur}")

print()
for cle, valeur in etudiant.items():
    print(f"{cle}: {valeur}")

# Vérification de clé
if "nom" in etudiant:
    print(f"\\nLe nom existe: {etudiant['nom']}")`,
            explanation: 'Les dictionnaires sont parfaits pour les données structurées. Utilisez get() pour éviter les KeyError.'
          },
          {
            title: 'Dict comprehension et opérations avancées',
            code: `# Dict comprehension
carres = {x: x**2 for x in range(1, 6)}
print(f"Carrés: {carres}")

# Filtrer un dict
notes = {"Alice": 15, "Bob": 8, "Claire": 18, "David": 11}
admis = {nom: note for nom, note in notes.items() if note >= 10}
print(f"Admis: {admis}")

# Inverser clés/valeurs
inverse = {v: k for k, v in notes.items()}
print(f"Inverse: {inverse}")

# Fusionner des dicts
default = {"theme": "light", "langue": "fr", "notifications": True}
user = {"theme": "dark", "premium": True}

# Méthode 1: update (modifie en place)
config = default.copy()
config.update(user)
print(f"\\nConfig 1: {config}")

# Méthode 2: Unpacking ** (Python 3.5+)
config2 = {**default, **user}
print(f"Config 2: {config2}")

# Méthode 3: Union | (Python 3.9+)
# config3 = default | user

# Compter les occurrences
texte = "abracadabra"
compteur = {}
for lettre in texte:
    compteur[lettre] = compteur.get(lettre, 0) + 1
print(f"\\nCompteur: {compteur}")

# Avec Counter (plus simple)
from collections import Counter
compteur2 = Counter(texte)
print(f"Counter: {dict(compteur2)}")`,
            explanation: 'Les dict comprehensions créent des dicts efficacement. Counter est idéal pour compter des occurrences.'
          }
        ],
        exercises: [
          {
            id: 'ex6-4-1',
            title: 'Créer un dictionnaire',
            instruction: 'Créez un dictionnaire "livre" avec clés: titre, auteur, pages. Affichez chaque paire clé-valeur.',
            starterCode: `livre = {
    "titre": "___",
    "auteur": "___",
    "pages": ___
}

# Parcourez et affichez
for ___, ___ in livre.___():
    print(f"{___}: {___}")`,
            solution: `livre = {
    "titre": "Python pour tous",
    "auteur": "Guido van Rossum",
    "pages": 350
}

for cle, valeur in livre.items():
    print(f"{cle}: {valeur}")`,
            hints: [
              'Utilisez .items() pour les paires',
              'Le for récupère cle, valeur à chaque tour'
            ],
            tests: [
              { input: '', expected: 'titre', description: 'Doit afficher les clés' }
            ],
            difficulty: 'easy'
          }
        ]
      },
      {
        id: 'l6-5',
        title: 'Comparaison des Structures',
        duration: '25 min',
        content: `# Comparaison des Structures de Données

## 📊 Tableau récapitulatif

| Caractéristique | Liste | Tuple | Set | Dict |
|-----------------|-------|-------|-----|------|
| **Syntaxe** | \`[]\` | \`()\` | \`{}\` | \`{k:v}\` |
| **Ordonné** | ✅ | ✅ | ❌ | ✅* |
| **Modifiable** | ✅ | ❌ | ✅ | ✅ |
| **Doublons** | ✅ | ✅ | ❌ | Clés ❌ |
| **Indexé** | ✅ | ✅ | ❌ | Par clé |

*Ordonné depuis Python 3.7

## 🎯 Quand utiliser quoi ?

### Liste
- Collection ordonnée modifiable
- Quand l'ordre compte
- Quand les doublons sont OK

### Tuple
- Données constantes
- Clés de dictionnaire
- Retour multiple de fonctions
- Performance (plus rapide)

### Set
- Éliminer les doublons
- Test d'appartenance rapide
- Opérations ensemblistes

### Dictionnaire
- Associations clé-valeur
- Accès rapide par clé
- Données structurées`,
        codeExamples: [
          {
            title: 'Choisir la bonne structure',
            code: `# LISTE - Collection ordonnée et modifiable
todos = ["Acheter du pain", "Réviser Python", "Sport"]
todos.append("Cuisiner")
print(f"Liste de tâches: {todos}")

# TUPLE - Données constantes
JOURS = ("Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi")
# JOURS[0] = "Monday"  # Erreur ! Immuable
print(f"Jours de travail: {JOURS}")

# SET - Pas de doublons, opérations ensemblistes
competences_alice = {"Python", "SQL", "Docker"}
competences_bob = {"Python", "Java", "AWS"}
communes = competences_alice & competences_bob
print(f"Compétences communes: {communes}")

# DICT - Données structurées avec clés
produit = {
    "nom": "Laptop",
    "prix": 999.99,
    "stock": 50,
    "categories": ["Électronique", "Informatique"]
}
print(f"Produit: {produit['nom']} à {produit['prix']}€")

# Conversion entre types
liste = [1, 2, 2, 3, 3, 3]
ensemble = set(liste)       # Élimine doublons
liste2 = list(ensemble)     # Revient en liste
tuple1 = tuple(ensemble)    # En tuple

print(f"\\nListe: {liste}")
print(f"Set: {ensemble}")
print(f"Retour liste: {liste2}")
print(f"Tuple: {tuple1}")`,
            explanation: 'Chaque structure a ses forces. Le choix dépend de vos besoins : ordre, unicité, mutabilité, accès par clé.'
          }
        ],
        exercises: []
      }
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'Quelle structure n\'accepte PAS les doublons ?',
        options: ['Liste', 'Tuple', 'Set', 'Dictionnaire (valeurs)'],
        correctIndex: 2,
        explanation: 'Les sets (ensembles) éliminent automatiquement les doublons. Les clés de dict sont aussi uniques.'
      },
      {
        id: 'q6-2',
        question: 'Comment créer un tuple d\'un seul élément ?',
        options: ['(42)', '(42,)', '[42]', '{42}'],
        correctIndex: 1,
        explanation: 'Un tuple d\'un élément nécessite une virgule : (42,). Sans virgule, (42) est juste un entier entre parenthèses.'
      },
      {
        id: 'q6-3',
        question: 'Quelle méthode accède à une clé de dict sans erreur si absente ?',
        options: ['dict[clé]', 'dict.get(clé)', 'dict.access(clé)', 'dict.find(clé)'],
        correctIndex: 1,
        explanation: 'dict.get(clé) retourne None si la clé n\'existe pas (ou une valeur par défaut). dict[clé] lève une KeyError.'
      },
      {
        id: 'q6-4',
        question: 'Que fait l\'opérateur | entre deux sets ?',
        options: ['Intersection', 'Union', 'Différence', 'Division'],
        correctIndex: 1,
        explanation: 'L\'opérateur | fait l\'union de deux sets (tous les éléments des deux).'
      },
      {
        id: 'q6-5',
        question: 'Quelle list comprehension filtre les pairs ?',
        options: ['[x for x in range(10)]', '[x for x if x%2==0]', '[x for x in range(10) if x%2==0]', '[x%2 for x in range(10)]'],
        correctIndex: 2,
        explanation: 'La syntaxe est [expression for item in iterable if condition]. Ici on garde x si x%2==0 (pair).'
      }
    ]
  },

  // ========================================
  // MODULE 7 : GESTION DES ERREURS
  // ========================================
  {
    id: 'mod-7',
    number: 7,
    title: 'Gestion des Erreurs',
    subtitle: 'try, except, finally',
    description: 'Apprenez à gérer les erreurs proprement avec try/except, créer vos propres exceptions, et écrire du code robuste.',
    icon: '🛡️',
    color: '#ef4444',
    difficulty: 'Intermédiaire',
    estimatedHours: 5,
    lessons: [
      {
        id: 'l7-1',
        title: 'try / except',
        duration: '40 min',
        content: `# Gestion des Exceptions

Les **exceptions** sont des erreurs qui surviennent pendant l'exécution.

## ⚠️ Sans gestion d'erreurs

\`\`\`python
nombre = int(input("Entrez un nombre: "))
# Si l'utilisateur tape "abc" → CRASH !
\`\`\`

## ✅ Avec try/except

\`\`\`python
try:
    nombre = int(input("Entrez un nombre: "))
except ValueError:
    print("Ce n'est pas un nombre valide !")
\`\`\`

## 🔧 Syntaxe complète

\`\`\`python
try:
    # Code qui peut lever une exception
except TypeErreur:
    # Code si cette erreur survient
except AutreErreur:
    # Code si cette autre erreur survient
else:
    # Code si AUCUNE erreur
finally:
    # Code TOUJOURS exécuté
\`\`\`

## 📋 Exceptions courantes

| Exception | Cause |
|-----------|-------|
| \`ValueError\` | Mauvaise valeur |
| \`TypeError\` | Mauvais type |
| \`ZeroDivisionError\` | Division par zéro |
| \`IndexError\` | Index hors limites |
| \`KeyError\` | Clé de dict absente |
| \`FileNotFoundError\` | Fichier introuvable |`,
        codeExamples: [
          {
            title: 'Gestion d\'erreurs basique',
            code: `# Sans gestion (commenté car crasherait)
# resultat = 10 / 0  # ZeroDivisionError !

# Avec try/except
print("=== Division sécurisée ===")
try:
    a = 10
    b = 0
    resultat = a / b
    print(f"Résultat: {resultat}")
except ZeroDivisionError:
    print("❌ Erreur: Division par zéro impossible !")
print("Le programme continue...\\n")

# Gérer plusieurs types d'erreurs
print("=== Conversion sécurisée ===")
valeurs = ["42", "3.14", "abc", "100"]

for v in valeurs:
    try:
        nombre = int(v)
        print(f"✅ '{v}' → {nombre}")
    except ValueError:
        try:
            nombre = float(v)
            print(f"⚠️ '{v}' → {nombre} (float)")
        except ValueError:
            print(f"❌ '{v}' n'est pas un nombre")

# Capturer l'exception pour voir le message
print("\\n=== Message d'erreur ===")
try:
    liste = [1, 2, 3]
    element = liste[10]
except IndexError as e:
    print(f"Erreur capturée: {e}")
    print(f"Type: {type(e).__name__}")`,
            explanation: 'try/except capture les erreurs et permet de les gérer proprement. Le programme ne crash plus.'
          },
          {
            title: 'else et finally',
            code: `# else s'exécute si PAS d'erreur
# finally s'exécute TOUJOURS

def diviser_securise(a, b):
    try:
        resultat = a / b
    except ZeroDivisionError:
        print("❌ Division par zéro !")
        return None
    except TypeError:
        print("❌ Types incompatibles !")
        return None
    else:
        print("✅ Calcul réussi !")
        return resultat
    finally:
        print("📝 Fin de la fonction (toujours)")

print("Test 1: 10 / 2")
print(f"Résultat: {diviser_securise(10, 2)}")

print("\\nTest 2: 10 / 0")
print(f"Résultat: {diviser_securise(10, 0)}")

print("\\nTest 3: '10' / 2")
print(f"Résultat: {diviser_securise('10', 2)}")

# Cas pratique : lecture de fichier
print("\\n=== Lecture de fichier ===")
try:
    with open("fichier_inexistant.txt", "r") as f:
        contenu = f.read()
except FileNotFoundError:
    print("❌ Fichier non trouvé")
except PermissionError:
    print("❌ Permission refusée")
else:
    print(f"Contenu: {contenu}")
finally:
    print("📝 Tentative de lecture terminée")`,
            explanation: 'else s\'exécute uniquement si aucune exception. finally s\'exécute toujours, utile pour nettoyer les ressources.'
          }
        ],
        exercises: [
          {
            id: 'ex7-1-1',
            title: 'Conversion sécurisée',
            instruction: 'Créez une fonction convertir_en_int(texte) qui retourne l\'entier ou None si impossible.',
            starterCode: `def convertir_en_int(texte):
    try:
        return ___(texte)
    except ___:
        return ___

# Tests
print(convertir_en_int("42"))    # 42
print(convertir_en_int("abc"))   # None
print(convertir_en_int("3.14"))  # None`,
            solution: `def convertir_en_int(texte):
    try:
        return int(texte)
    except ValueError:
        return None

print(convertir_en_int("42"))
print(convertir_en_int("abc"))
print(convertir_en_int("3.14"))`,
            hints: [
              'Utilisez int() pour convertir',
              'ValueError est l\'exception pour une mauvaise valeur',
              'Retournez None en cas d\'erreur'
            ],
            tests: [
              { input: '', expected: '42', description: '"42" doit donner 42' },
              { input: '', expected: 'None', description: '"abc" doit donner None' }
            ],
            difficulty: 'medium'
          }
        ]
      },
      {
        id: 'l7-2',
        title: 'Lever des Exceptions',
        duration: '30 min',
        content: `# Lever des Exceptions

Vous pouvez lever vos propres exceptions avec \`raise\`.

## 🚀 raise

\`\`\`python
def diviser(a, b):
    if b == 0:
        raise ValueError("Le diviseur ne peut pas être zéro")
    return a / b
\`\`\`

## 🛠️ Créer des exceptions personnalisées

\`\`\`python
class MonErreur(Exception):
    """Exception personnalisée"""
    pass

raise MonErreur("Quelque chose a mal tourné")
\`\`\`

## 🎯 Bonnes pratiques

- Levez des exceptions pour les cas "exceptionnels"
- Utilisez des types d'exceptions appropriés
- Fournissez des messages clairs
- Créez des exceptions personnalisées si nécessaire`,
        codeExamples: [
          {
            title: 'Lever et créer des exceptions',
            code: `# Lever une exception standard
def valider_age(age):
    if age < 0:
        raise ValueError("L'âge ne peut pas être négatif")
    if age > 150:
        raise ValueError("L'âge semble irréaliste")
    return f"Âge valide: {age}"

# Test
try:
    print(valider_age(25))
    print(valider_age(-5))
except ValueError as e:
    print(f"❌ Erreur: {e}")

# Exception personnalisée
class SoldeInsuffisantError(Exception):
    """Exception levée quand le solde est insuffisant"""
    def __init__(self, solde, montant):
        self.solde = solde
        self.montant = montant
        super().__init__(f"Solde insuffisant: {solde}€ < {montant}€")

class CompteBancaire:
    def __init__(self, solde=0):
        self.solde = solde
    
    def retirer(self, montant):
        if montant > self.solde:
            raise SoldeInsuffisantError(self.solde, montant)
        self.solde -= montant
        return f"Retrait de {montant}€. Nouveau solde: {self.solde}€"

# Test
print("\\n=== Compte bancaire ===")
compte = CompteBancaire(100)
try:
    print(compte.retirer(30))
    print(compte.retirer(50))
    print(compte.retirer(100))  # Va échouer
except SoldeInsuffisantError as e:
    print(f"❌ {e}")
    print(f"   Solde actuel: {e.solde}€")
    print(f"   Montant demandé: {e.montant}€")`,
            explanation: 'raise lève une exception. Créez des exceptions personnalisées pour des erreurs métier spécifiques.'
          }
        ],
        exercises: []
      }
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'Quelle clause s\'exécute TOUJOURS, qu\'il y ait erreur ou non ?',
        options: ['try', 'except', 'else', 'finally'],
        correctIndex: 3,
        explanation: 'finally s\'exécute toujours, que le try réussisse ou qu\'une exception soit levée.'
      },
      {
        id: 'q7-2',
        question: 'Comment lever une exception ValueError ?',
        options: ['throw ValueError', 'raise ValueError', 'error ValueError', 'except ValueError'],
        correctIndex: 1,
        explanation: 'En Python, on utilise "raise" pour lever une exception, pas "throw".'
      },
      {
        id: 'q7-3',
        question: 'Quelle exception pour une clé de dictionnaire inexistante ?',
        options: ['ValueError', 'IndexError', 'KeyError', 'TypeError'],
        correctIndex: 2,
        explanation: 'KeyError est levée quand on accède à une clé inexistante dans un dictionnaire.'
      }
    ]
  },

  // ========================================
  // MODULE 8 : POO
  // ========================================
  {
    id: 'mod-8',
    number: 8,
    title: 'Programmation Orientée Objet',
    subtitle: 'Classes, objets, héritage',
    description: 'Maîtrisez la POO en Python : créez des classes, comprenez l\'héritage, le polymorphisme, et les méthodes spéciales.',
    icon: '🏗️',
    color: '#8b5cf6',
    difficulty: 'Avancé',
    estimatedHours: 12,
    lessons: [
      {
        id: 'l8-1',
        title: 'Classes et Objets',
        duration: '50 min',
        content: `# Classes et Objets

La **Programmation Orientée Objet (POO)** organise le code autour d'**objets** qui combinent données et comportements.

## 🎯 Concepts clés

- **Classe** — Un plan/modèle pour créer des objets
- **Objet** — Une instance d'une classe
- **Attribut** — Une variable appartenant à un objet
- **Méthode** — Une fonction appartenant à une classe

## 📝 Syntaxe de base

\`\`\`python
class NomClasse:
    def __init__(self, parametres):
        self.attribut = parametres
    
    def methode(self):
        # Code de la méthode
        pass
\`\`\`

## 🔑 self

\`self\` est une référence à l'objet lui-même. Il doit être le premier paramètre de chaque méthode.

## 🏗️ __init__

Le constructeur \`__init__\` est appelé automatiquement lors de la création d'un objet.`,
        codeExamples: [
          {
            title: 'Première classe',
            code: `class Personne:
    """Représente une personne avec nom et âge"""
    
    def __init__(self, nom, age):
        """Constructeur - initialise les attributs"""
        self.nom = nom      # Attribut d'instance
        self.age = age
    
    def se_presenter(self):
        """Méthode qui affiche une présentation"""
        print(f"Bonjour, je suis {self.nom} et j'ai {self.age} ans.")
    
    def anniversaire(self):
        """Méthode qui incrémente l'âge"""
        self.age += 1
        print(f"🎂 {self.nom} a maintenant {self.age} ans !")

# Créer des objets (instances)
alice = Personne("Alice", 25)
bob = Personne("Bob", 30)

# Utiliser les méthodes
alice.se_presenter()
bob.se_presenter()

# Accéder aux attributs
print(f"\\nÂge d'Alice: {alice.age}")

# Modifier via une méthode
alice.anniversaire()

# Modifier directement un attribut
bob.age = 31
print(f"Nouvel âge de Bob: {bob.age}")`,
            explanation: '__init__ est le constructeur. self réfère à l\'instance actuelle. Chaque objet a ses propres attributs.'
          },
          {
            title: 'Méthodes spéciales (dunder methods)',
            code: `class Point:
    """Représente un point en 2D"""
    
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        """Représentation lisible (pour print)"""
        return f"Point({self.x}, {self.y})"
    
    def __repr__(self):
        """Représentation technique (pour debug)"""
        return f"Point(x={self.x}, y={self.y})"
    
    def __eq__(self, autre):
        """Comparaison d'égalité (==)"""
        return self.x == autre.x and self.y == autre.y
    
    def __add__(self, autre):
        """Addition (+)"""
        return Point(self.x + autre.x, self.y + autre.y)
    
    def __len__(self):
        """Pour len() - distance à l'origine (arrondie)"""
        import math
        return int(math.sqrt(self.x**2 + self.y**2))

# Tests
p1 = Point(3, 4)
p2 = Point(1, 2)

print(f"p1 = {p1}")           # __str__
print(f"p2 = {p2}")
print(f"p1 == p2: {p1 == p2}")  # __eq__

p3 = p1 + p2                   # __add__
print(f"p1 + p2 = {p3}")

print(f"Distance de p1: {len(p1)}")  # __len__

# Comparaison avec un point identique
p4 = Point(3, 4)
print(f"p1 == p4: {p1 == p4}")`,
            explanation: 'Les méthodes __dunder__ personnalisent le comportement des opérateurs et fonctions built-in.'
          }
        ],
        exercises: [
          {
            id: 'ex8-1-1',
            title: 'Classe Rectangle',
            instruction: 'Créez une classe Rectangle avec largeur, hauteur, et méthodes aire() et perimetre().',
            starterCode: `class Rectangle:
    def __init__(self, largeur, hauteur):
        self.___ = largeur
        self.___ = hauteur
    
    def aire(self):
        return ___ * ___
    
    def perimetre(self):
        return 2 * (___ + ___)

# Tests
r = Rectangle(5, 3)
print(f"Aire: {r.aire()}")        # 15
print(f"Périmètre: {r.perimetre()}")  # 16`,
            solution: `class Rectangle:
    def __init__(self, largeur, hauteur):
        self.largeur = largeur
        self.hauteur = hauteur
    
    def aire(self):
        return self.largeur * self.hauteur
    
    def perimetre(self):
        return 2 * (self.largeur + self.hauteur)

r = Rectangle(5, 3)
print(f"Aire: {r.aire()}")
print(f"Périmètre: {r.perimetre()}")`,
            hints: [
              'self.attribut pour stocker',
              'aire = largeur × hauteur',
              'périmètre = 2 × (l + h)'
            ],
            tests: [
              { input: '', expected: '15', description: 'Aire de 5×3 = 15' },
              { input: '', expected: '16', description: 'Périmètre de 5×3 = 16' }
            ],
            difficulty: 'medium'
          }
        ]
      },
      {
        id: 'l8-2',
        title: 'Héritage',
        duration: '45 min',
        content: `# Héritage

L'**héritage** permet à une classe enfant de récupérer les attributs et méthodes d'une classe parente.

## 📝 Syntaxe

\`\`\`python
class ClasseParente:
    def methode(self):
        pass

class ClasseEnfant(ClasseParente):
    def nouvelle_methode(self):
        pass
\`\`\`

## 🔧 super()

\`super()\` permet d'appeler les méthodes de la classe parente.

\`\`\`python
class Enfant(Parent):
    def __init__(self, args):
        super().__init__(args)  # Appel du constructeur parent
\`\`\`

## 🎯 Concepts

- **Surcharge (override)** — Redéfinir une méthode
- **Extension** — Ajouter de nouvelles méthodes
- **Polymorphisme** — Même interface, comportements différents`,
        codeExamples: [
          {
            title: 'Héritage en pratique',
            code: `class Animal:
    """Classe parente pour tous les animaux"""
    
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age
    
    def parler(self):
        return "..."
    
    def __str__(self):
        return f"{self.nom} ({self.age} ans)"

class Chien(Animal):
    """Un chien est un animal"""
    
    def __init__(self, nom, age, race):
        super().__init__(nom, age)  # Appel parent
        self.race = race
    
    def parler(self):  # Surcharge
        return "Wouf ! 🐕"
    
    def chercher(self):  # Nouvelle méthode
        return f"{self.nom} rapporte la balle !"

class Chat(Animal):
    def __init__(self, nom, age, couleur):
        super().__init__(nom, age)
        self.couleur = couleur
    
    def parler(self):
        return "Miaou ! 🐱"

# Créer des instances
rex = Chien("Rex", 5, "Berger Allemand")
minou = Chat("Minou", 3, "Noir")

# Polymorphisme en action
animaux = [rex, minou]
for animal in animaux:
    print(f"{animal}: {animal.parler()}")

# Méthode spécifique au chien
print(f"\\n{rex.chercher()}")

# Vérifier l'héritage
print(f"\\nRex est un Animal: {isinstance(rex, Animal)}")
print(f"Rex est un Chien: {isinstance(rex, Chien)}")
print(f"Rex est un Chat: {isinstance(rex, Chat)}")`,
            explanation: 'L\'héritage permet de réutiliser du code. super() appelle la version parente. Override redéfinit une méthode.'
          }
        ],
        exercises: []
      }
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'Que représente "self" dans une méthode ?',
        options: ['La classe', 'L\'instance courante', 'Le module', 'Le constructeur'],
        correctIndex: 1,
        explanation: 'self est une référence à l\'instance (objet) courante de la classe.'
      },
      {
        id: 'q8-2',
        question: 'Comment appeler le constructeur de la classe parente ?',
        options: ['parent.__init__()', 'super().__init__()', 'base.__init__()', 'this.__init__()'],
        correctIndex: 1,
        explanation: 'super() retourne un objet proxy de la classe parente, permettant d\'appeler ses méthodes.'
      },
      {
        id: 'q8-3',
        question: 'Quelle méthode spéciale est utilisée pour print(objet) ?',
        options: ['__repr__', '__str__', '__print__', '__display__'],
        correctIndex: 1,
        explanation: '__str__ retourne la représentation "lisible" d\'un objet pour print() et str().'
      }
    ],
    project: {
      title: 'Système de Jeu RPG',
      description: 'Créez un système de personnages avec héritage pour un jeu de rôle.',
      objectives: [
        'Créer une classe parente Personnage',
        'Créer des classes enfants (Guerrier, Mage, Archer)',
        'Implémenter des méthodes communes et spécifiques',
        'Utiliser le polymorphisme'
      ],
      steps: []
    }
  }
];

// Types are already exported with their definitions
