// ============================================================
// ENTRAÎNEMENT INTENSIF — 7 paliers consécutifs, 80 exercices
// Règle : l'exercice N+1 se déverrouille quand N est réussi.
// Un palier se déverrouille quand le précédent est terminé.
// Les tests sont compatibles avec le simulateur intégré
// (sortie print OU motif présent dans le code, commentaires exclus).
// Pour une vraie exécution : copiez le code dans VS Code + python.
// ============================================================

import type { Exercise } from './modules';

export interface IntensivePalier {
  id: string;
  number: number;
  title: string;
  icon: string;
  color: string;
  description: string;
  objectives: string[];
  moduleRef: string;
  exercises: Exercise[];
}

export const intensivePaliers: IntensivePalier[] = [
  // ========================================================
  // PALIER 1 : SYNTAXE, PRINT, VARIABLES, TYPES (12 exos)
  // ========================================================
  {
    id: 'palier-1',
    number: 1,
    title: 'Bases et Affichages',
    icon: '🖨️',
    color: '#10b981',
    description:
      'print(), variables, types de base, opérations simples. Le socle absolu : chaque exercice prend 2 à 5 minutes.',
    objectives: ['print()', 'variables', 'int / float / str / bool', 'concaténation', 'calculs simples'],
    moduleRef: 'Modules 1 et 2',
    exercises: [
      {
        id: 'int-1-1',
        title: 'Premier print',
        instruction: 'Affichez exactement : Bonjour Python !',
        starterCode: `# Affichez le message demandé
___`,
        solution: `print("Bonjour Python !")`,
        hints: ['Utilisez la fonction print()', 'Le texte va entre guillemets : print("...")'],
        tests: [{ input: '', expected: 'Bonjour Python', description: 'Doit afficher "Bonjour Python"' }],
        difficulty: 'easy',
      },
      {
        id: 'int-1-2',
        title: 'Trois lignes',
        instruction: 'Affichez sur 3 lignes : votre nom, votre âge et votre ville, chaque ligne avec son étiquette (Nom: / Age: / Ville:).',
        starterCode: `print("Nom: Alice")
___
___`,
        solution: `print("Nom: Alice")
print("Age: 25")
print("Ville: Paris")`,
        hints: ['Il faut 3 instructions print()', 'Chaque print() = une nouvelle ligne'],
        tests: [
          { input: '', expected: 'Nom:', description: 'Ligne Nom: présente' },
          { input: '', expected: 'Ville:', description: 'Ligne Ville: présente' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-1-3',
        title: 'Variables puis f-string',
        instruction: 'Créez nom = "Alice" et age = 25, puis affichez "Alice a 25 ans" avec une f-string.',
        starterCode: `nom = ___
age = ___

print(___)`,
        solution: `nom = "Alice"
age = 25

print(f"{nom} a {age} ans")`,
        hints: ['nom = "Alice" puis age = 25', 'f-string : print(f"{nom} a {age} ans")'],
        tests: [
          { input: '', expected: 'Alice a 25 ans', description: 'Doit afficher "Alice a 25 ans"' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-1-4',
        title: 'Les 4 types',
        instruction: 'Créez 4 variables : entier = 10, decimal = 3.5, texte = "Python", actif = True. Affichez les 3 premières avec print().',
        starterCode: `entier = ___
decimal = ___
texte = ___
actif = ___

print(entier)
print(decimal)
print(texte)`,
        solution: `entier = 10
decimal = 3.5
texte = "Python"
actif = True

print(entier)
print(decimal)
print(texte)`,
        hints: ['10 sans guillemets, 3.5 avec point, "Python" entre guillemets, True avec majuscule', 'Affichez avec print(entier) etc.'],
        tests: [
          { input: '', expected: 'Python', description: 'Le texte Python est affiché' },
          { input: '', expected: 'True', description: 'Le booléen True est présent dans le code' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-1-5',
        title: 'Concaténation',
        instruction: 'Avec prenom = "Jean" et nom = "Dupont", affichez "Jean Dupont" en concaténant avec + et un espace.',
        starterCode: `prenom = "Jean"
nom = "Dupont"

print(___)`,
        solution: `prenom = "Jean"
nom = "Dupont"

print(prenom + " " + nom)`,
        hints: ['Le + colle deux chaînes', 'N\'oubliez pas l\'espace " " entre les deux'],
        tests: [{ input: '', expected: 'Jean Dupont', description: 'Doit afficher "Jean Dupont"' }],
        difficulty: 'easy',
      },
      {
        id: 'int-1-6',
        title: 'Addition et multiplication',
        instruction: 'Avec a = 15 et b = 7, affichez la somme puis le produit.',
        starterCode: `a = 15
b = 7

print(___)
print(___)`,
        solution: `a = 15
b = 7

print(a + b)
print(a * b)`,
        hints: ['print(a + b) donne 22', 'print(a * b) donne 105'],
        tests: [
          { input: '', expected: '22', description: 'La somme 22 est affichée' },
          { input: '', expected: '105', description: 'Le produit 105 est affiché' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-1-7',
        title: 'Soustraction et division',
        instruction: 'Avec prix = 100 et reduction = 20, affichez le prix soldé puis le prix divisé en 4 fois.',
        starterCode: `prix = 100
reduction = 20

print(___)
print(___)`,
        solution: `prix = 100
reduction = 20

print(prix - reduction)
print(prix / 4)`,
        hints: ['prix - reduction = 80', 'prix / 4 = 25.0'],
        tests: [
          { input: '', expected: '80', description: 'Le prix soldé 80 est affiché' },
          { input: '', expected: '25', description: 'Le quart du prix est affiché' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-1-8',
        title: 'Conversion de type',
        instruction: 'n_texte vaut "42". Convertissez-le en entier avec int() dans la variable n, puis affichez le double de n.',
        starterCode: `n_texte = "42"
n = ___
print(n * 2)`,
        solution: `n_texte = "42"
n = int(n_texte)
print(n * 2)`,
        hints: ['int() convertit une chaîne en entier', 'n = int(n_texte) puis print(n * 2) affiche 84 en vrai Python (testez en local)'],
        tests: [{ input: '', expected: 'int(n_texte)', description: 'La conversion int(n_texte) est présente' }],
        difficulty: 'medium',
      },
      {
        id: 'int-1-9',
        title: 'F-string avec calcul',
        instruction: 'Avec prix = 50 et quantite = 3, affichez "Total : 150 euros" via une f-string qui calcule prix * quantite.',
        starterCode: `prix = 50
quantite = 3

print(___)`,
        solution: `prix = 50
quantite = 3

print(f"Total : {prix * quantite} euros")`,
        hints: ['On peut calculer dans les accolades : {prix * quantite}', 'N\'oubliez pas le f devant la chaîne'],
        tests: [{ input: '', expected: 'Total : 150 euros', description: 'Doit afficher "Total : 150 euros"' }],
        difficulty: 'medium',
      },
      {
        id: 'int-1-10',
        title: 'Print multi-valeurs',
        instruction: 'Affichez prénom, nom et âge en UN seul print() séparés par des virgules : print("Alice", "Dupont", 30).',
        starterCode: `print(___)`,
        solution: `print("Alice", "Dupont", 30)`,
        hints: ['print() accepte plusieurs valeurs séparées par des virgules', 'Elles sont affichées séparées par des espaces'],
        tests: [{ input: '', expected: 'Alice Dupont 30', description: 'Doit afficher "Alice Dupont 30"' }],
        difficulty: 'easy',
      },
      {
        id: 'int-1-11',
        title: 'Commentaire + version',
        instruction: 'Ajoutez un commentaire décrivant le programme (ligne avec #), puis affichez "Version 1.0" en plus de "Programme OK".',
        starterCode: `# Ajoutez votre commentaire sur la ligne suivante :
___
print("Programme OK")
___`,
        solution: `# Mon premier programme documenté
print("Programme OK")
print("Version 1.0")`,
        hints: ['Un commentaire commence par # (il est ignoré à l\'exécution)', 'Ajoutez print("Version 1.0") en 3e ligne'],
        tests: [
          { input: '', expected: 'Programme OK', description: 'Doit afficher "Programme OK"' },
          { input: '', expected: 'Version 1.0', description: 'Doit afficher la version' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-1-12',
        title: 'DÉFI — Carte de visite',
        instruction: 'Affichez une carte de visite sur 4 lignes : "=== MA CARTE ===", "Nom : Alice", "Langage : Python", "Niveau : débutant".',
        starterCode: `print("=== MA CARTE ===")
___
___
___`,
        solution: `print("=== MA CARTE ===")
print("Nom : Alice")
print("Langage : Python")
print("Niveau : débutant")`,
        hints: ['4 instructions print(), une par ligne', 'Recopiez exactement les textes demandés'],
        tests: [
          { input: '', expected: 'MA CARTE', description: 'Le titre est affiché' },
          { input: '', expected: 'Langage : Python', description: 'Le langage est affiché' },
        ],
        difficulty: 'medium',
      },
    ],
  },
  // ========================================================
  // PALIER 2 : CONDITIONS (12 exos)
  // ========================================================
  {
    id: 'palier-2',
    number: 2,
    title: 'Conditions et Logique',
    icon: '🔀',
    color: '#3b82f6',
    description:
      'if / elif / else, comparaisons, opérateurs logiques and / or / not. Validation par motifs de code : testez aussi en local avec python.',
    objectives: ['if / elif / else', '==, !=, <, >, <=, >=', 'and / or / not', '% pour la parité'],
    moduleRef: 'Modules 3 et 4',
    exercises: [
      {
        id: 'int-2-1',
        title: 'Majeur ou mineur',
        instruction: 'Complétez : si age >= 18 affichez "Majeur", sinon affichez "Mineur".',
        starterCode: `age = 20
___
    print("Majeur")
___
    print("Mineur")`,
        solution: `age = 20
if age >= 18:
    print("Majeur")
else:
    print("Mineur")`,
        hints: ['if age >= 18: puis else:', 'Les deux-points : sont obligatoires'],
        tests: [
          { input: '', expected: 'if age >= 18', description: 'La condition if age >= 18 est présente' },
          { input: '', expected: 'else:', description: 'La clause else: est présente' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-2-2',
        title: 'Mention au bac',
        instruction: 'note = 14. Avec if / elif / else affichez "Bien" si note >= 14, "Assez bien" si note >= 12, sinon "Passable".',
        starterCode: `note = 14
___
    print("Bien")
___
    print("Assez bien")
___
    print("Passable")`,
        solution: `note = 14
if note >= 14:
    print("Bien")
elif note >= 12:
    print("Assez bien")
else:
    print("Passable")`,
        hints: ['elif = "sinon si"', 'Ordre : if, puis elif, puis else'],
        tests: [
          { input: '', expected: 'elif note >= 12', description: 'La clause elif est présente' },
          { input: '', expected: 'else:', description: 'La clause else: est présente' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-2-3',
        title: 'Pair ou impair',
        instruction: 'n = 7. Si n % 2 == 0 affichez "Pair", sinon "Impair".',
        starterCode: `n = 7
___
    print("Pair")
___
    print("Impair")`,
        solution: `n = 7
if n % 2 == 0:
    print("Pair")
else:
    print("Impair")`,
        hints: ['% donne le reste de la division', 'Un nombre pair a un reste de 0'],
        tests: [{ input: '', expected: 'n % 2 == 0', description: 'Le test de parité est présent' }],
        difficulty: 'easy',
      },
      {
        id: 'int-2-4',
        title: 'Maximum de 2 nombres',
        instruction: 'a = 12, b = 27. Affichez le plus grand avec if / else.',
        starterCode: `a = 12
b = 27
___
    print(a)
___
    print(b)`,
        solution: `a = 12
b = 27
if a > b:
    print(a)
else:
    print(b)`,
        hints: ['Comparez avec a > b', 'Le else affiche b'],
        tests: [{ input: '', expected: 'if a > b', description: 'La comparaison est présente' }],
        difficulty: 'easy',
      },
      {
        id: 'int-2-5',
        title: 'Mot de passe',
        instruction: 'Si mdp == "python123", affichez "Accès autorisé", sinon "Accès refusé".',
        starterCode: `mdp = "python123"
___
    print("Accès autorisé")
___
    print("Accès refusé")`,
        solution: `mdp = "python123"
if mdp == "python123":
    print("Accès autorisé")
else:
    print("Accès refusé")`,
        hints: ['== compare deux valeurs (ne pas confondre avec =)', 'Les chaînes se comparent avec =='],
        tests: [{ input: '', expected: 'mdp == "python123"', description: 'La comparaison du mot de passe est présente' }],
        difficulty: 'easy',
      },
      {
        id: 'int-2-6',
        title: 'Opérateur and',
        instruction: 'Accès au club : age >= 18 ET carte == True. Affichez "Bienvenue" ou "Refusé".',
        starterCode: `age = 20
carte = True
___
    print("Bienvenue")
___
    print("Refusé")`,
        solution: `age = 20
carte = True
if age >= 18 and carte == True:
    print("Bienvenue")
else:
    print("Refusé")`,
        hints: ['and exige que les DEUX conditions soient vraies', 'Structure : if cond1 and cond2:'],
        tests: [{ input: '', expected: 'and', description: 'L\'opérateur and est présent' }],
        difficulty: 'medium',
      },
      {
        id: 'int-2-7',
        title: 'Opérateur or',
        instruction: 'Réduction si etudiant == True OU age < 12. Affichez "Réduction" ou "Plein tarif".',
        starterCode: `etudiant = False
age = 10
___
    print("Réduction")
___
    print("Plein tarif")`,
        solution: `etudiant = False
age = 10
if etudiant == True or age < 12:
    print("Réduction")
else:
    print("Plein tarif")`,
        hints: ['or exige qu\'AU MOINS une condition soit vraie', 'Ici age < 12 suffit'],
        tests: [{ input: '', expected: 'or', description: 'L\'opérateur or est présent' }],
        difficulty: 'medium',
      },
      {
        id: 'int-2-8',
        title: 'Opérateur not',
        instruction: 'Si ce n\'est PAS le week-end (not week_end), affichez "Au travail", sinon "Repos".',
        starterCode: `week_end = False
___
    print("Au travail")
___
    print("Repos")`,
        solution: `week_end = False
if not week_end:
    print("Au travail")
else:
    print("Repos")`,
        hints: ['not inverse un booléen', 'not False vaut True'],
        tests: [{ input: '', expected: 'not week_end', description: 'La négation not est présente' }],
        difficulty: 'medium',
      },
      {
        id: 'int-2-9',
        title: 'Remise commerciale',
        instruction: 'montant = 250. Remise 10% si montant >= 200, 5% si montant >= 100, sinon 0%. Affichez le montant final.',
        starterCode: `montant = 250
___
    final = montant * 0.9
___
    final = montant * 0.95
___
    final = montant
print(final)`,
        solution: `montant = 250
if montant >= 200:
    final = montant * 0.9
elif montant >= 100:
    final = montant * 0.95
else:
    final = montant
print(final)`,
        hints: ['Testez du plus grand seuil au plus petit', '-10% = multiplier par 0.9'],
        tests: [
          { input: '', expected: 'elif montant >= 100', description: 'Le palier elif est présent' },
          { input: '', expected: 'montant * 0.9', description: 'Le calcul -10% est présent' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-2-10',
        title: 'FizzBuzz (condition)',
        instruction: 'n = 15. Si divisible par 3 ET par 5 affichez "FizzBuzz", si par 3 "Fizz", si par 5 "Buzz", sinon le nombre.',
        starterCode: `n = 15
___
    print("FizzBuzz")
___
    print("Fizz")
___
    print("Buzz")
___
    print(n)`,
        solution: `n = 15
if n % 3 == 0 and n % 5 == 0:
    print("FizzBuzz")
elif n % 3 == 0:
    print("Fizz")
elif n % 5 == 0:
    print("Buzz")
else:
    print(n)`,
        hints: ['Le cas FizzBuzz DOIT être testé en premier', 'n % 3 == 0 teste la divisibilité par 3'],
        tests: [
          { input: '', expected: 'n % 3 == 0 and n % 5 == 0', description: 'Le cas combiné est testé en premier' },
          { input: '', expected: 'elif', description: 'elif est utilisé' },
        ],
        difficulty: 'hard',
      },
      {
        id: 'int-2-11',
        title: 'Année bissextile',
        instruction: 'annee = 2024. Bissextile si divisible par 400, ou par 4 mais pas par 100. Affichez "Bissextile" ou "Non bissextile".',
        starterCode: `annee = 2024
___
    print("Bissextile")
___
    print("Non bissextile")`,
        solution: `annee = 2024
if annee % 400 == 0 or (annee % 4 == 0 and annee % 100 != 0):
    print("Bissextile")
else:
    print("Non bissextile")`,
        hints: ['2000 était bissextile (% 400), 1900 non (% 100)', 'Combinez or et and avec des parenthèses'],
        tests: [{ input: '', expected: 'annee % 400 == 0', description: 'Le cas divisible par 400 est géré' }],
        difficulty: 'hard',
      },
      {
        id: 'int-2-12',
        title: 'DÉFI — Catégorie sportive',
        instruction: 'age = 16. "Poussin" si < 10, "Junior" si < 18, "Senior" si < 35, sinon "Vétéran". Affichez la catégorie.',
        starterCode: `age = 16
___
    print("Poussin")
___
    print("Junior")
___
    print("Senior")
___
    print("Vétéran")`,
        solution: `age = 16
if age < 10:
    print("Poussin")
elif age < 18:
    print("Junior")
elif age < 35:
    print("Senior")
else:
    print("Vétéran")`,
        hints: ['Enchaînez if / elif / elif / else', 'Avec 16 ans, le résultat est "Junior" (vérifiez en local)'],
        tests: [
          { input: '', expected: 'elif age < 18', description: 'Le palier Junior est présent' },
          { input: '', expected: 'elif age < 35', description: 'Le palier Senior est présent' },
        ],
        difficulty: 'medium',
      },
    ],
  },
  // ========================================================
  // PALIER 3 : BOUCLES (12 exos)
  // ========================================================
  {
    id: 'palier-3',
    number: 3,
    title: 'Boucles for et while',
    icon: '🔁',
    color: '#f59e0b',
    description:
      'for, while, range(), break, continue, accumulateurs. Le cœur de l\'automatisation. Exécutez chaque solution en local pour voir les boucles vivre.',
    objectives: ['for + range()', 'while', 'break / continue', 'compteurs et accumulateurs'],
    moduleRef: 'Module 4',
    exercises: [
      {
        id: 'int-3-1',
        title: 'For de 1 à 5',
        instruction: 'Affichez les nombres de 1 à 5 avec for et range().',
        starterCode: `___
    print(i)`,
        solution: `for i in range(1, 6):
    print(i)`,
        hints: ['for i in range(1, 6):', 'range(1, 6) donne 1, 2, 3, 4, 5 (le 6 est exclu)'],
        tests: [{ input: '', expected: 'for i in range(1, 6)', description: 'La boucle for + range est présente' }],
        difficulty: 'easy',
      },
      {
        id: 'int-3-2',
        title: 'Somme de 1 à 100',
        instruction: 'Calculez la somme des nombres de 1 à 100 avec un accumulateur total.',
        starterCode: `total = 0
___
    total += i
print(total)`,
        solution: `total = 0
for i in range(1, 101):
    total += i
print(total)`,
        hints: ['total += i ajoute i au total', 'Le résultat est 5050 (vérifiez en local)'],
        tests: [
          { input: '', expected: 'for i in range(1, 101)', description: 'La boucle est présente' },
          { input: '', expected: 'total += i', description: 'L\'accumulateur est présent' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-3-3',
        title: 'Compte à rebours while',
        instruction: 'Avec n = 5, affichez 5 4 3 2 1 puis "Décollage !" avec while.',
        starterCode: `n = 5
___
    print(n)
    n -= 1
print("Décollage !")`,
        solution: `n = 5
while n > 0:
    print(n)
    n -= 1
print("Décollage !")`,
        hints: ['while n > 0:', 'N\'oubliez pas n -= 1 sinon boucle infinie !'],
        tests: [
          { input: '', expected: 'while n > 0', description: 'La boucle while est présente' },
          { input: '', expected: 'n -= 1', description: 'Le décrément est présent' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-3-4',
        title: 'Table de multiplication',
        instruction: 'Affichez la table de 7 (7x1 ... 7x10) avec for et une f-string.',
        starterCode: `n = 7
___
    print(f"{n} x {i} = {n * i}")`,
        solution: `n = 7
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")`,
        hints: ['for i in range(1, 11):', 'Le calcul se fait dans les accolades de la f-string'],
        tests: [{ input: '', expected: 'for i in range(1, 11)', description: 'La boucle sur 1..10 est présente' }],
        difficulty: 'easy',
      },
      {
        id: 'int-3-5',
        title: 'Break : premier multiple',
        instruction: 'Trouvez le premier nombre entre 1 et 50 divisible par 7 ET par 5 (break dès trouvé), affichez-le.',
        starterCode: `for i in range(1, 51):
    if i % 7 == 0 and i % 5 == 0:
        print(i)
        ___`,
        solution: `for i in range(1, 51):
    if i % 7 == 0 and i % 5 == 0:
        print(i)
        break`,
        hints: ['break sort immédiatement de la boucle', 'Le premier trouvé est 35'],
        tests: [{ input: '', expected: 'break', description: 'break est présent' }],
        difficulty: 'medium',
      },
      {
        id: 'int-3-6',
        title: 'Continue : sauter les pairs',
        instruction: 'Affichez les nombres impairs de 1 à 10 en sautant les pairs avec continue.',
        starterCode: `for i in range(1, 11):
    if i % 2 == 0:
        ___
    print(i)`,
        solution: `for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i)`,
        hints: ['continue saute directement à l\'itération suivante', 'Les pairs sont donc ignorés par print'],
        tests: [{ input: '', expected: 'continue', description: 'continue est présent' }],
        difficulty: 'medium',
      },
      {
        id: 'int-3-7',
        title: 'Boucler sur une liste',
        instruction: 'Pour chaque fruit de ["pomme", "banane", "cerise"], affichez "J\'aime la pomme" etc.',
        starterCode: `fruits = ["pomme", "banane", "cerise"]
___
    print(f"J'aime la {fruit}")`,
        solution: `fruits = ["pomme", "banane", "cerise"]
for fruit in fruits:
    print(f"J'aime la {fruit}")`,
        hints: ['for fruit in fruits:', 'La variable fruit prend chaque valeur tour à tour'],
        tests: [{ input: '', expected: 'for fruit in fruits', description: 'La boucle sur la liste est présente' }],
        difficulty: 'easy',
      },
      {
        id: 'int-3-8',
        title: 'Range avec un pas',
        instruction: 'Affichez les nombres pairs de 0 à 20 avec range() à 3 arguments (pas de 2).',
        starterCode: `___
    print(i)`,
        solution: `for i in range(0, 21, 2):
    print(i)`,
        hints: ['range(début, fin, pas)', 'range(0, 21, 2) donne 0, 2, 4 ... 20'],
        tests: [{ input: '', expected: 'range(0, 21, 2)', description: 'range avec pas de 2 présent' }],
        difficulty: 'medium',
      },
      {
        id: 'int-3-9',
        title: 'Pyramide d\'étoiles',
        instruction: 'Affichez une pyramide de 5 lignes : *, **, ***, ****, ***** (multiplication de chaîne).',
        starterCode: `for i in range(1, 6):
    print(___)`,
        solution: `for i in range(1, 6):
    print("*" * i)`,
        hints: ['"*" * 3 donne "***"', '"*" * i avec i qui grandit'],
        tests: [{ input: '', expected: '"*" * i', description: 'La multiplication de chaîne est présente' }],
        difficulty: 'medium',
      },
      {
        id: 'int-3-10',
        title: 'Compter les voyelles',
        instruction: 'Comptez les voyelles de mot = "programmation" avec for + in "aeiouy". Affichez le compteur.',
        starterCode: `mot = "programmation"
compteur = 0
___
    if lettre in "aeiouy":
        compteur += 1
print(compteur)`,
        solution: `mot = "programmation"
compteur = 0
for lettre in mot:
    if lettre in "aeiouy":
        compteur += 1
print(compteur)`,
        hints: ['for lettre in mot parcourt chaque caractère', 'in teste l\'appartenance : lettre in "aeiouy"'],
        tests: [
          { input: '', expected: 'for lettre in mot', description: 'Le parcours du mot est présent' },
          { input: '', expected: 'compteur += 1', description: 'Le compteur est incrémenté' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-3-11',
        title: 'Devinette avec while',
        instruction: 'secret = 7. Tant que proposition != secret : affichez un indice. Utilisez while et break quand c\'est trouvé.',
        starterCode: `secret = 7
proposition = 0
___
    proposition += 1
    if proposition == secret:
        print("Gagné !")
        ___`,
        solution: `secret = 7
proposition = 0
while proposition != secret:
    proposition += 1
    if proposition == secret:
        print("Gagné !")
        break`,
        hints: ['while proposition != secret:', 'break sort de la boucle à la victoire'],
        tests: [
          { input: '', expected: 'while proposition != secret', description: 'La condition while est présente' },
          { input: '', expected: 'break', description: 'break est présent' },
        ],
        difficulty: 'hard',
      },
      {
        id: 'int-3-12',
        title: 'DÉFI — Nombres premiers',
        instruction: 'Affichez les nombres premiers jusqu\'à 20. Un nombre est premier si aucun diviseur entre 2 et n-1 ne le divise.',
        starterCode: `for n in range(2, 21):
    premier = True
    for d in range(2, n):
        if n % d == 0:
            premier = False
            ___
    if premier:
        print(n)`,
        solution: `for n in range(2, 21):
    premier = True
    for d in range(2, n):
        if n % d == 0:
            premier = False
            break
    if premier:
        print(n)`,
        hints: ['Boucle imbriquée : pour chaque n, testez tous les d', 'break dès qu\'un diviseur est trouvé'],
        tests: [
          { input: '', expected: 'break', description: 'break stoppe le test des diviseurs' },
          { input: '', expected: 'n % d == 0', description: 'Le test de divisibilité est présent' },
        ],
        difficulty: 'hard',
      },
    ],
  },
  // ========================================================
  // PALIER 4 : FONCTIONS (12 exos)
  // ========================================================
  {
    id: 'palier-4',
    number: 4,
    title: 'Fonctions',
    icon: '🧩',
    color: '#8b5cf6',
    description:
      'def, paramètres, return, valeurs par défaut, *args, lambda. Écrivez des fonctions réutilisables comme un pro.',
    objectives: ['def + return', 'paramètres et défauts', '*args', 'lambda', 'récursivité'],
    moduleRef: 'Module 5',
    exercises: [
      {
        id: 'int-4-1',
        title: 'Première fonction',
        instruction: 'Créez dire_bonjour(nom) qui affiche "Bonjour Alice !" quand on l\'appelle avec "Alice".',
        starterCode: `___ dire_bonjour(nom):
    print(f"Bonjour {nom} !")

dire_bonjour("Alice")`,
        solution: `def dire_bonjour(nom):
    print(f"Bonjour {nom} !")

dire_bonjour("Alice")`,
        hints: ['def pour définir, puis le nom et les paramètres', 'def dire_bonjour(nom):'],
        tests: [{ input: '', expected: 'def dire_bonjour(nom)', description: 'La définition de fonction est présente' }],
        difficulty: 'easy',
      },
      {
        id: 'int-4-2',
        title: 'Fonction avec return',
        instruction: 'Créez carre(n) qui RETOURNE n * n. Affichez ensuite carre(9).',
        starterCode: `def carre(n):
    ___

print(carre(9))`,
        solution: `def carre(n):
    return n * n

print(carre(9))`,
        hints: ['return renvoie une valeur à l\'appelant', 'return n * n (81 pour 9, vérifiez en local)'],
        tests: [{ input: '', expected: 'return n * n', description: 'Le return est présent' }],
        difficulty: 'easy',
      },
      {
        id: 'int-4-3',
        title: 'Moyenne de 3 nombres',
        instruction: 'Créez moyenne(a, b, c) qui retourne (a + b + c) / 3.',
        starterCode: `def moyenne(a, b, c):
    m = ___
    return ___`,
        solution: `def moyenne(a, b, c):
    m = (a + b + c) / 3
    return m`,
        hints: ['m = (a + b + c) / 3', 'Puis return m'],
        tests: [{ input: '', expected: '(a + b + c) / 3', description: 'Le calcul de la moyenne est présent' }],
        difficulty: 'easy',
      },
      {
        id: 'int-4-4',
        title: 'Est pair (booléen)',
        instruction: 'Créez est_pair(n) qui retourne True si n est pair, False sinon.',
        starterCode: `def est_pair(n):
    if n % 2 == 0:
        return ___
    ___
        return ___`,
        solution: `def est_pair(n):
    if n % 2 == 0:
        return True
    else:
        return False`,
        hints: ['return True dans le if, return False dans le else', 'Version courte : return n % 2 == 0'],
        tests: [{ input: '', expected: 'return True', description: 'Retourne True' }],
        difficulty: 'medium',
      },
      {
        id: 'int-4-5',
        title: 'Paramètre par défaut',
        instruction: 'Créez saluer(nom, formule="Bonjour") qui affiche "{formule} {nom} !". Testez avec et sans formule.',
        starterCode: `def saluer(nom, ___):
    print(f"{formule} {nom} !")

saluer("Alice")
saluer("Bob", "Salut")`,
        solution: `def saluer(nom, formule="Bonjour"):
    print(f"{formule} {nom} !")

saluer("Alice")
saluer("Bob", "Salut")`,
        hints: ['formule="Bonjour" donne une valeur par défaut', 'Sans 2e argument, la valeur par défaut est utilisée'],
        tests: [{ input: '', expected: 'formule="Bonjour"', description: 'Le paramètre par défaut est présent' }],
        difficulty: 'medium',
      },
      {
        id: 'int-4-6',
        title: 'Plusieurs return',
        instruction: 'Créez signe(n) : retourne "positif" si n > 0, "négatif" si n < 0, "zéro" sinon.',
        starterCode: `def signe(n):
    ___
        return "positif"
    ___
        return "négatif"
    ___
        return "zéro"`,
        solution: `def signe(n):
    if n > 0:
        return "positif"
    elif n < 0:
        return "négatif"
    else:
        return "zéro"`,
        hints: ['if / elif / else avec un return chacun', 'Dès qu\'un return est atteint, la fonction s\'arrête'],
        tests: [
          { input: '', expected: 'if n > 0', description: 'Le cas positif est testé' },
          { input: '', expected: 'elif n < 0', description: 'Le cas négatif est testé' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-4-7',
        title: '*args : somme variable',
        instruction: 'Créez somme_tous(*nombres) qui retourne la somme d\'autant de nombres qu\'on veut.',
        starterCode: `def somme_tous(*nombres):
    total = 0
    for n in nombres:
        total += n
    ___`,
        solution: `def somme_tous(*nombres):
    total = 0
    for n in nombres:
        total += n
    return total`,
        hints: ['*nombres regroupe les arguments en tuple', 'On boucle dessus comme sur une liste'],
        tests: [{ input: '', expected: 'return total', description: 'Le total est retourné' }],
        difficulty: 'medium',
      },
      {
        id: 'int-4-8',
        title: 'Fonction qui appelle une fonction',
        instruction: 'prix_ttc(prix_ht) utilise tva(montant) = montant * 0.2. prix_ttc retourne prix_ht + tva(prix_ht).',
        starterCode: `def tva(montant):
    return montant * 0.2

def prix_ttc(prix_ht):
    return ___`,
        solution: `def tva(montant):
    return montant * 0.2

def prix_ttc(prix_ht):
    return prix_ht + tva(prix_ht)`,
        hints: ['Appelez tva() à l\'intérieur de prix_ttc()', 'return prix_ht + tva(prix_ht)'],
        tests: [{ input: '', expected: 'prix_ht + tva(prix_ht)', description: 'L\'appel imbriqué est présent' }],
        difficulty: 'medium',
      },
      {
        id: 'int-4-9',
        title: 'Lambda express',
        instruction: 'Créez en UNE ligne : double = lambda x: x * 2. Puis affichez double(21).',
        starterCode: `double = ___
print(double(21))`,
        solution: `double = lambda x: x * 2
print(double(21))`,
        hints: ['lambda x: x * 2 crée une fonction anonyme', 'double(21) vaut 42'],
        tests: [{ input: '', expected: 'lambda x: x * 2', description: 'La lambda est présente' }],
        difficulty: 'medium',
      },
      {
        id: 'int-4-10',
        title: 'Docstring',
        instruction: 'Ajoutez une docstring à aire_rectangle(l, L) qui retourne l * L.',
        starterCode: `def aire_rectangle(l, L):
    ___
    return l * L`,
        solution: `def aire_rectangle(l, L):
    """Retourne l'aire d'un rectangle de largeur l et longueur L."""
    return l * L`,
        hints: ['Une docstring est une chaîne en première ligne du corps', 'Avec des triples guillemets """..."""'],
        tests: [{ input: '', expected: '"""', description: 'La docstring est présente' }],
        difficulty: 'easy',
      },
      {
        id: 'int-4-11',
        title: 'Portée des variables',
        instruction: 'Utilisez global pour que incremente() modifie vraiment le compteur global. Affichez le compteur.',
        starterCode: `compteur = 0

def incremente():
    ___
    compteur += 1

incremente()
incremente()
print(compteur)`,
        solution: `compteur = 0

def incremente():
    global compteur
    compteur += 1

incremente()
incremente()
print(compteur)`,
        hints: ['global compteur en première ligne de la fonction', 'Sans global, la modification resterait locale'],
        tests: [{ input: '', expected: 'global compteur', description: 'La déclaration global est présente' }],
        difficulty: 'hard',
      },
      {
        id: 'int-4-12',
        title: 'DÉFI — Factorielle récursive',
        instruction: 'Créez factorielle(n) récursive : si n <= 1 retourne 1, sinon retourne n * factorielle(n - 1).',
        starterCode: `def factorielle(n):
    if n <= 1:
        return 1
    return ___`,
        solution: `def factorielle(n):
    if n <= 1:
        return 1
    return n * factorielle(n - 1)`,
        hints: ['La fonction s\'appelle elle-même', 'return n * factorielle(n - 1) — factorielle(5) = 120'],
        tests: [{ input: '', expected: 'n * factorielle(n - 1)', description: 'L\'appel récursif est présent' }],
        difficulty: 'hard',
      },
    ],
  },
  // ========================================================
  // PALIER 5 : COLLECTIONS (12 exos)
  // ========================================================
  {
    id: 'palier-5',
    number: 5,
    title: 'Listes, Tuples, Sets, Dicts',
    icon: '📦',
    color: '#06b6d4',
    description:
      'Les 4 structures de données + compréhensions. 80% du Python quotidien se joue ici.',
    objectives: ['listes et méthodes', 'tuples', 'sets', 'dicts', 'compréhensions'],
    moduleRef: 'Module 6',
    exercises: [
      {
        id: 'int-5-1',
        title: 'Créer et afficher une liste',
        instruction: 'Créez courses = ["pommes", "lait", "pain"] et affichez-la.',
        starterCode: `courses = ___
print(courses)`,
        solution: `courses = ["pommes", "lait", "pain"]
print(courses)`,
        hints: ['Une liste utilise des crochets [...]', 'Les éléments sont séparés par des virgules'],
        tests: [{ input: '', expected: 'courses = ["pommes", "lait", "pain"]', description: 'La liste est créée' }],
        difficulty: 'easy',
      },
      {
        id: 'int-5-2',
        title: 'Accéder par indice',
        instruction: 'Avec couleurs = ["rouge", "vert", "bleu"], affichez le premier puis le dernier élément.',
        starterCode: `couleurs = ["rouge", "vert", "bleu"]
print(___)
print(___)`,
        solution: `couleurs = ["rouge", "vert", "bleu"]
print(couleurs[0])
print(couleurs[-1])`,
        hints: ['L\'indice 0 = premier élément', 'L\'indice -1 = dernier élément'],
        tests: [
          { input: '', expected: 'couleurs[0]', description: 'Accès au premier élément' },
          { input: '', expected: 'couleurs[-1]', description: 'Accès au dernier élément' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-5-3',
        title: 'append et len',
        instruction: 'Ajoutez "cerise" à fruits avec append(), puis affichez la liste.',
        starterCode: `fruits = ["pomme", "banane"]
___
print(fruits)`,
        solution: `fruits = ["pomme", "banane"]
fruits.append("cerise")
print(fruits)`,
        hints: ['liste.append(x) ajoute x à la fin', 'La liste devient ["pomme", "banane", "cerise"]'],
        tests: [{ input: '', expected: 'fruits.append("cerise")', description: 'append est utilisé' }],
        difficulty: 'easy',
      },
      {
        id: 'int-5-4',
        title: 'Slicing',
        instruction: 'Avec nombres = [0,1,2,3,4,5,6,7,8,9], extrayez les 3 premiers et les 3 derniers avec du slicing.',
        starterCode: `nombres = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
debut = ___
fin = ___`,
        solution: `nombres = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
debut = nombres[:3]
fin = nombres[-3:]`,
        hints: ['[:3] = les 3 premiers', '[-3:] = les 3 derniers'],
        tests: [
          { input: '', expected: 'nombres[:3]', description: 'Slice du début présent' },
          { input: '', expected: 'nombres[-3:]', description: 'Slice de fin présent' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-5-5',
        title: 'Tuple immuable',
        instruction: 'Créez point = (10, 20), puis déballez-le en x, y et affichez x + y.',
        starterCode: `point = ___
x, y = ___
print(x + y)`,
        solution: `point = (10, 20)
x, y = point
print(x + y)`,
        hints: ['Un tuple utilise des parenthèses (...)', 'x, y = point déballe les deux valeurs (x + y = 30)'],
        tests: [
          { input: '', expected: 'point = (10, 20)', description: 'Le tuple est créé' },
          { input: '', expected: 'x, y = point', description: 'Le déballage est présent' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-5-6',
        title: 'Set : dédupliquer',
        instruction: 'Avec brutes = [1,2,2,3,3,3], créez uniques = set(brutes) et affichez-le.',
        starterCode: `brutes = [1, 2, 2, 3, 3, 3]
uniques = ___
print(uniques)`,
        solution: `brutes = [1, 2, 2, 3, 3, 3]
uniques = set(brutes)
print(uniques)`,
        hints: ['set() élimine les doublons', 'uniques vaut {1, 2, 3}'],
        tests: [{ input: '', expected: 'set(brutes)', description: 'La conversion en set est présente' }],
        difficulty: 'easy',
      },
      {
        id: 'int-5-7',
        title: 'Opérations sur sets',
        instruction: 'Calculez l\'intersection (&) et l\'union (|) de A = {1,2,3} et B = {3,4,5}.',
        starterCode: `A = {1, 2, 3}
B = {3, 4, 5}
inter = ___
union = ___`,
        solution: `A = {1, 2, 3}
B = {3, 4, 5}
inter = A & B
union = A | B`,
        hints: ['& = éléments communs ({3})', '| = tous les éléments ({1,2,3,4,5})'],
        tests: [
          { input: '', expected: 'A & B', description: 'L\'intersection est calculée' },
          { input: '', expected: 'A | B', description: 'L\'union est calculée' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-5-8',
        title: 'Dictionnaire de base',
        instruction: 'Créez perso = {"nom": "Alice", "age": 30}, puis affichez perso["nom"].',
        starterCode: `perso = ___
print(___)`,
        solution: `perso = {"nom": "Alice", "age": 30}
print(perso["nom"])`,
        hints: ['Un dict associe des clés à des valeurs avec :', 'perso["nom"] vaut "Alice"'],
        tests: [
          { input: '', expected: '"nom": "Alice"', description: 'La clé nom est présente' },
          { input: '', expected: 'perso["nom"]', description: 'L\'accès par clé est présent' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-5-9',
        title: 'Dict : get et ajout',
        instruction: 'Avec stock = {"pommes": 12}, ajoutez "poires" = 8, puis affichez stock.get("bananes", 0).',
        starterCode: `stock = {"pommes": 12}
___
print(___)`,
        solution: `stock = {"pommes": 12}
stock["poires"] = 8
print(stock.get("bananes", 0))`,
        hints: ['stock["poires"] = 8 ajoute la clé', '.get(clé, défaut) évite les KeyError'],
        tests: [
          { input: '', expected: 'stock["poires"] = 8', description: 'L\'ajout est présent' },
          { input: '', expected: '.get("bananes", 0)', description: '.get avec défaut est présent' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-5-10',
        title: 'Boucler sur un dict',
        instruction: 'Pour chaque clé, valeur de prix = {"pain": 1.2, "lait": 0.9}, affichez "pain : 1.2" etc. avec .items().',
        starterCode: `prix = {"pain": 1.2, "lait": 0.9}
___
    print(f"{produit} : {tarif}")`,
        solution: `prix = {"pain": 1.2, "lait": 0.9}
for produit, tarif in prix.items():
    print(f"{produit} : {tarif}")`,
        hints: ['for k, v in dict.items():', 'k reçoit la clé, v la valeur'],
        tests: [{ input: '', expected: '.items()', description: '.items() est utilisé' }],
        difficulty: 'medium',
      },
      {
        id: 'int-5-11',
        title: 'Compréhension de liste',
        instruction: 'En UNE ligne, créez carres = [x*x for x in range(1, 6)] (soit [1,4,9,16,25]).',
        starterCode: `carres = ___
print(carres)`,
        solution: `carres = [x * x for x in range(1, 6)]
print(carres)`,
        hints: ['[expression for x in ...]', 'Ici l\'expression est x * x'],
        tests: [{ input: '', expected: 'for x in range(1, 6)', description: 'La compréhension est présente' }],
        difficulty: 'medium',
      },
      {
        id: 'int-5-12',
        title: 'DÉFI — Compteur de mots',
        instruction: 'Comptez les occurrences de chaque mot de phrase = "le chat et le chien et le chat" avec un dict et .get().',
        starterCode: `phrase = "le chat et le chien et le chat"
compte = {}
for mot in phrase.split():
    compte[mot] = ___
print(compte)`,
        solution: `phrase = "le chat et le chien et le chat"
compte = {}
for mot in phrase.split():
    compte[mot] = compte.get(mot, 0) + 1
print(compte)`,
        hints: ['.split() découpe la phrase en mots', 'compte.get(mot, 0) + 1 : 0 si nouveau, +1 sinon'],
        tests: [{ input: '', expected: 'compte.get(mot, 0) + 1', description: 'Le comptage avec .get est présent' }],
        difficulty: 'hard',
      },
    ],
  },
  // ========================================================
  // PALIER 6 : STRINGS, FICHIERS, ERREURS (10 exos)
  // ========================================================
  {
    id: 'palier-6',
    number: 6,
    title: 'Textes, Fichiers, Erreurs',
    icon: '📄',
    color: '#ec4899',
    description:
      'Méthodes de chaînes, lecture/écriture de fichiers, CSV/JSON, try/except. Les exercices fichiers se testent en local avec python.',
    objectives: ['méthodes str', 'open / with', 'CSV / JSON', 'try / except'],
    moduleRef: 'Modules 7 et 9',
    exercises: [
      {
        id: 'int-6-1',
        title: 'upper et lower',
        instruction: 'Avec msg = "Python", affichez sa version MAJUSCULES puis minuscules.',
        starterCode: `msg = "Python"
print(___)
print(___)`,
        solution: `msg = "Python"
print(msg.upper())
print(msg.lower())`,
        hints: ['.upper() met en majuscules', '.lower() met en minuscules'],
        tests: [
          { input: '', expected: 'msg.upper()', description: '.upper() est présent' },
          { input: '', expected: 'msg.lower()', description: '.lower() est présent' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-6-2',
        title: 'split et join',
        instruction: 'Découpez "pomme,banane,cerise" sur les virgules avec split(), puis recollez avec " - ".join().',
        starterCode: `texte = "pomme,banane,cerise"
morceaux = ___
print(___)`,
        solution: `texte = "pomme,banane,cerise"
morceaux = texte.split(",")
print(" - ".join(morceaux))`,
        hints: ['.split(",") donne ["pomme", "banane", "cerise"]', '" - ".join(liste) recolle avec des tirets'],
        tests: [
          { input: '', expected: '.split(",")', description: 'split est présent' },
          { input: '', expected: '" - ".join(morceaux)', description: 'join est présent' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-6-3',
        title: 'strip et replace',
        instruction: 'Nettoyez s = "  bonjour  " avec strip(), puis remplacez "o" par "0" avec replace().',
        starterCode: `s = "  bonjour  "
propre = ___
print(___)`,
        solution: `s = "  bonjour  "
propre = s.strip()
print(propre.replace("o", "0"))`,
        hints: ['.strip() enlève les espaces aux bords', '.replace("o", "0") remplace chaque o'],
        tests: [
          { input: '', expected: '.strip()', description: 'strip est présent' },
          { input: '', expected: '.replace("o", "0")', description: 'replace est présent' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-6-4',
        title: 'Recherche dans un texte',
        instruction: 'Vérifiez si "python" est dans phrase (in), et si email se termine par ".com" (endswith). Affichez les deux booléens.',
        starterCode: `phrase = "J'apprends python"
email = "contact@site.com"
print(___)
print(___)`,
        solution: `phrase = "J'apprends python"
email = "contact@site.com"
print("python" in phrase)
print(email.endswith(".com"))`,
        hints: ['in teste la présence d\'une sous-chaîne', '.endswith() teste la fin'],
        tests: [
          { input: '', expected: '"python" in phrase', description: 'Le test in est présent' },
          { input: '', expected: '.endswith(".com")', description: 'endswith est présent' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-6-5',
        title: 'try / except division',
        instruction: 'Protégez 10 / 0 : en cas de ZeroDivisionError, affichez "Division impossible". (À exécuter en local pour le vrai comportement.)',
        starterCode: `___
    print(10 / 0)
___
    print("Division impossible")`,
        solution: `try:
    print(10 / 0)
except ZeroDivisionError:
    print("Division impossible")`,
        hints: ['try: puis le code risqué', 'except ZeroDivisionError: puis le plan B'],
        tests: [
          { input: '', expected: 'try:', description: 'try est présent' },
          { input: '', expected: 'except ZeroDivisionError', description: 'except ciblé présent' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-6-6',
        title: 'Conversion protégée',
        instruction: 'Créez convertir(texte) : retourne int(texte), ou -1 si ValueError. Testez avec "42" et "abc".',
        starterCode: `def convertir(texte):
    ___
        return int(texte)
    ___
        return -1`,
        solution: `def convertir(texte):
    try:
        return int(texte)
    except ValueError:
        return -1`,
        hints: ['int("abc") lève ValueError', 'Le except retourne une valeur de secours'],
        tests: [
          { input: '', expected: 'return int(texte)', description: 'La conversion est tentée' },
          { input: '', expected: 'except ValueError', description: 'ValueError est capturée' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-6-7',
        title: 'Écrire un fichier',
        instruction: 'Écrivez "ligne1" et "ligne2" dans notes.txt en mode "w" avec open() et un with. (Exécutez en local : python script.py puis vérifiez le fichier.)',
        starterCode: `___ open(___, ___, encoding="utf-8") as f:
    f.write("ligne1\\n")
    f.write("ligne2\\n")`,
        solution: `with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("ligne1\\n")
    f.write("ligne2\\n")`,
        hints: ['with open(...) as f: — le fichier est fermé automatiquement', 'Mode "w" = écriture, encoding="utf-8" pour les accents'],
        tests: [
          { input: '', expected: 'with', description: 'Le gestionnaire with est présent' },
          { input: '', expected: '"w"', description: 'Le mode écriture est présent' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-6-8',
        title: 'Lire un fichier',
        instruction: 'Lisez notes.txt en mode "r" avec with, affichez son contenu avec .read(). (En local après l\'exercice précédent.)',
        starterCode: `___ open("notes.txt", "r", encoding="utf-8") as f:
    contenu = ___
    print(contenu)`,
        solution: `with open("notes.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
    print(contenu)`,
        hints: ['Mode "r" = lecture', 'f.read() retourne tout le contenu d\'un coup'],
        tests: [
          { input: '', expected: 'open("notes.txt", "r"', description: 'L\'ouverture en lecture est présente' },
          { input: '', expected: 'f.read()', description: 'La lecture est présente' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-6-9',
        title: 'JSON : sauvegarder et relire',
        instruction: 'Sauvez {"nom": "Alice", "score": 95} dans score.json avec json.dump(), puis relisez avec json.load(). (En local.)',
        starterCode: `import json

donnees = {"nom": "Alice", "score": 95}
with open("score.json", "w", encoding="utf-8") as f:
    ___

with open("score.json", "r", encoding="utf-8") as f:
    relues = ___
print(relues)`,
        solution: `import json

donnees = {"nom": "Alice", "score": 95}
with open("score.json", "w", encoding="utf-8") as f:
    json.dump(donnees, f)

with open("score.json", "r", encoding="utf-8") as f:
    relues = json.load(f)
print(relues)`,
        hints: ['json.dump(obj, f) écrit, json.load(f) lit', 'Le dict survit au voyage fichier'],
        tests: [
          { input: '', expected: 'json.dump(donnees, f)', description: 'json.dump est présent' },
          { input: '', expected: 'json.load(f)', description: 'json.load est présent' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-6-10',
        title: 'DÉFI — Journal d\'erreurs',
        instruction: 'Créez log_erreur(message) qui AJOUTE ("a") la ligne "[ERREUR] message" à journal.txt avec with. Appelez-la 2 fois. (En local.)',
        starterCode: `def log_erreur(message):
    with open("journal.txt", ___, encoding="utf-8") as f:
        f.write(___)

log_erreur("Fichier introuvable")
log_erreur("Timeout réseau")`,
        solution: `def log_erreur(message):
    with open("journal.txt", "a", encoding="utf-8") as f:
        f.write(f"[ERREUR] {message}\\n")

log_erreur("Fichier introuvable")
log_erreur("Timeout réseau")`,
        hints: ['Mode "a" = ajout à la fin (append)', 'f-string pour le préfixe [ERREUR]'],
        tests: [
          { input: '', expected: '"a"', description: 'Le mode ajout est présent' },
          { input: '', expected: 'f"[ERREUR] {message}', description: 'Le format du log est présent' },
        ],
        difficulty: 'hard',
      },
    ],
  },
  // ========================================================
  // PALIER 7 : POO ET MODULES (10 exos)
  // ========================================================
  {
    id: 'palier-7',
    number: 7,
    title: 'POO et Modules',
    icon: '🏛️',
    color: '#ef4444',
    description:
      'Classes, __init__, héritage, dataclasses, imports, __main__. Le niveau avancé qui ouvre vers les vrais projets.',
    objectives: ['class + __init__', 'méthodes', 'héritage', 'dataclass', 'imports + __main__'],
    moduleRef: 'Modules 8 et 10',
    exercises: [
      {
        id: 'int-7-1',
        title: 'Première classe',
        instruction: 'Créez la classe Chien avec un attribut nom défini dans __init__, puis rex = Chien("Rex"). Affichez rex.nom.',
        starterCode: `class Chien:
    def __init__(self, nom):
        ___

rex = ___
print(rex.nom)`,
        solution: `class Chien:
    def __init__(self, nom):
        self.nom = nom

rex = Chien("Rex")
print(rex.nom)`,
        hints: ['self.nom = nom stocke l\'attribut', 'Chien("Rex") appelle __init__ automatiquement'],
        tests: [
          { input: '', expected: 'self.nom = nom', description: 'L\'attribut est stocké' },
          { input: '', expected: 'Chien("Rex")', description: 'L\'instance est créée' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-7-2',
        title: 'Méthode de classe',
        instruction: 'Ajoutez aboyer() à Chien qui affiche "Rex aboie : Ouaf !". Appelez rex.aboyer().',
        starterCode: `class Chien:
    def __init__(self, nom):
        self.nom = nom

    def aboyer(self):
        print(___)

rex = Chien("Rex")
rex.aboyer()`,
        solution: `class Chien:
    def __init__(self, nom):
        self.nom = nom

    def aboyer(self):
        print(f"{self.nom} aboie : Ouaf !")

rex = Chien("Rex")
rex.aboyer()`,
        hints: ['self donne accès aux attributs dans les méthodes', 'f"{self.nom} aboie : Ouaf !"'],
        tests: [{ input: '', expected: 'aboie : Ouaf !', description: 'Le message avec le nom est affiché' }],
        difficulty: 'medium',
      },
      {
        id: 'int-7-3',
        title: 'Compteur d\'instances',
        instruction: 'Ajoutez un attribut DE CLASSE nb_chiens incrémenté à chaque __init__. Créez 2 chiens.',
        starterCode: `class Chien:
    nb_chiens = 0

    def __init__(self, nom):
        self.nom = nom
        ___

medor = Chien("Médor")
rex = Chien("Rex")
print(Chien.nb_chiens)`,
        solution: `class Chien:
    nb_chiens = 0

    def __init__(self, nom):
        self.nom = nom
        Chien.nb_chiens += 1

medor = Chien("Médor")
rex = Chien("Rex")
print(Chien.nb_chiens)`,
        hints: ['Chien.nb_chiens accède à l\'attribut de classe', '+= 1 à chaque construction'],
        tests: [{ input: '', expected: 'Chien.nb_chiens += 1', description: 'Le compteur de classe est incrémenté' }],
        difficulty: 'medium',
      },
      {
        id: 'int-7-4',
        title: 'Héritage',
        instruction: 'Créez Chat(Animal) qui hérite de Animal(nom) et ajoute miauler(). Utilisez super().__init__.',
        starterCode: `class Animal:
    def __init__(self, nom):
        self.nom = nom

class Chat(Animal):
    def __init__(self, nom, couleur):
        ___
        self.couleur = couleur

    def miauler(self):
        print(f"{self.nom} miaule !")`,
        solution: `class Animal:
    def __init__(self, nom):
        self.nom = nom

class Chat(Animal):
    def __init__(self, nom, couleur):
        super().__init__(nom)
        self.couleur = couleur

    def miauler(self):
        print(f"{self.nom} miaule !")`,
        hints: ['class Chat(Animal): déclare l\'héritage', 'super().__init__(nom) appelle le parent'],
        tests: [
          { input: '', expected: 'class Chat(Animal)', description: 'L\'héritage est déclaré' },
          { input: '', expected: 'super().__init__(nom)', description: 'super() est utilisé' },
        ],
        difficulty: 'hard',
      },
      {
        id: 'int-7-5',
        title: 'Dataclass',
        instruction: 'Convertissez Livre en @dataclass avec titre: str, pages: int, lu: bool = False. Créez un livre.',
        starterCode: `from dataclasses import dataclass

___
class Livre:
    titre: str
    pages: int
    lu: bool = ___

livre = Livre("Dune", 800)
print(livre)`,
        solution: `from dataclasses import dataclass

@dataclass
class Livre:
    titre: str
    pages: int
    lu: bool = False

livre = Livre("Dune", 800)
print(livre)`,
        hints: ['@dataclass génère __init__ et __repr__ automatiquement', 'lu: bool = False donne un défaut'],
        tests: [
          { input: '', expected: '@dataclass', description: 'Le décorateur est présent' },
          { input: '', expected: 'lu: bool = False', description: 'Le champ avec défaut est présent' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-7-6',
        title: 'Imports ciblés',
        instruction: 'Importez choice et randint depuis random, pi depuis math. Tirez un dé (1-6) et affichez-le avec pi.',
        starterCode: `___ choice, randint ___ random
___ pi ___ math

de = ___
print("Dé :", de)
print("Pi :", pi)`,
        solution: `from random import choice, randint
from math import pi

de = randint(1, 6)
print("Dé :", de)
print("Pi :", pi)`,
        hints: ['from module import nom1, nom2', 'randint(1, 6) simule un dé'],
        tests: [
          { input: '', expected: 'from random import choice, randint', description: 'L\'import random est présent' },
          { input: '', expected: 'from math import pi', description: 'L\'import math est présent' },
        ],
        difficulty: 'easy',
      },
      {
        id: 'int-7-7',
        title: 'Collections utiles',
        instruction: 'Utilisez Counter pour compter les lettres de "abracadabra" et defaultdict pour grouper des mots par initiale.',
        starterCode: `from collections import Counter, defaultdict

print(Counter("abracadabra"))

groupes = defaultdict(___)
for mot in ["pomme", "poire", "banane"]:
    groupes[mot[0]].append(mot)
print(dict(groupes))`,
        solution: `from collections import Counter, defaultdict

print(Counter("abracadabra"))

groupes = defaultdict(list)
for mot in ["pomme", "poire", "banane"]:
    groupes[mot[0]].append(mot)
print(dict(groupes))`,
        hints: ['Counter compte chaque élément', 'defaultdict(list) crée une liste vide pour chaque nouvelle clé'],
        tests: [
          { input: '', expected: 'Counter("abracadabra")', description: 'Counter est utilisé' },
          { input: '', expected: 'defaultdict(list)', description: 'defaultdict est utilisé' },
        ],
        difficulty: 'hard',
      },
      {
        id: 'int-7-8',
        title: 'Garde __main__',
        instruction: 'Ajoutez la garde if __name__ == "__main__": qui appelle main(). Sans elle, l\'import exécuterait le script !',
        starterCode: `def main():
    print("Programme lancé")

___:
    main()`,
        solution: `def main():
    print("Programme lancé")

if __name__ == "__main__":
    main()`,
        hints: ['if __name__ == "__main__":', 'Le code ne tourne que si le fichier est exécuté directement'],
        tests: [{ input: '', expected: 'if __name__ == "__main__":', description: 'La garde __main__ est présente' }],
        difficulty: 'medium',
      },
      {
        id: 'int-7-9',
        title: 'pathlib moderne',
        instruction: 'Avec Path, construisez le chemin dossier / "data.txt", puis affichez son suffixe et son nom.',
        starterCode: `from pathlib import Path

dossier = Path("mon_projet")
fichier = ___
print(fichier.suffix)
print(___)`,
        solution: `from pathlib import Path

dossier = Path("mon_projet")
fichier = dossier / "data.txt"
print(fichier.suffix)
print(fichier.name)`,
        hints: ['/ assemble les chemins avec Path (multiplateforme)', '.suffix = ".txt", .name = "data.txt"'],
        tests: [
          { input: '', expected: 'dossier / "data.txt"', description: 'La jointure Path est présente' },
          { input: '', expected: 'fichier.suffix', description: '.suffix est utilisé' },
        ],
        difficulty: 'medium',
      },
      {
        id: 'int-7-10',
        title: 'DÉFI — Compte bancaire',
        instruction: 'Classe Compte(titulaire, solde=0) avec deposer(m), retirer(m) (refus si insuffisant, retourne bool), et __str__ "Alice : 100€".',
        starterCode: `class Compte:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self.solde = solde

    def deposer(self, m):
        ___

    def retirer(self, m):
        if m > self.solde:
            return ___
        self.solde -= m
        return ___

    def __str__(self):
        return ___`,
        solution: `class Compte:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self.solde = solde

    def deposer(self, m):
        self.solde += m

    def retirer(self, m):
        if m > self.solde:
            return False
        self.solde -= m
        return True

    def __str__(self):
        return f"{self.titulaire} : {self.solde}€"`,
        hints: ['deposer ajoute au solde', 'retirer vérifie avant de soustraire', '__str__ définit l\'affichage avec print()'],
        tests: [
          { input: '', expected: 'self.solde += m', description: 'deposer est implémenté' },
          { input: '', expected: 'return False', description: 'Le refus est géré' },
          { input: '', expected: 'def __str__(self)', description: '__str__ est défini' },
        ],
        difficulty: 'hard',
      },
    ],
  },
];

// ---- Helpers ----
export function allIntensiveExercises(): Exercise[] {
  return intensivePaliers.flatMap(p => p.exercises);
}

export function totalIntensiveCount(): number {
  return intensivePaliers.reduce((acc, p) => acc + p.exercises.length, 0);
}
