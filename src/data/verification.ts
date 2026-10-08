// ============================================================
// VÉRIFICATION DES CONNAISSANCES — examens blancs + certification
// Chaque examen = QCM chronométré (60%) + épreuves pratiques (40%).
// Score >= seuil => réussi (+XP une seule fois, meilleur score gardé).
// ============================================================

import type { QuizQuestion, Exercise } from './modules';

export interface Exam {
  id: string;
  title: string;
  icon: string;
  level: 'Fondations' | 'Intermédiaire' | 'Certification';
  color: string;
  durationMinutes: number;
  passingScore: number;
  xpReward: number;
  description: string;
  objectives: string[];
  questions: QuizQuestion[];
  practical: Exercise[];
}

export const exams: Exam[] = [
  // ========================================================
  // EXAMEN 1 : FONDATIONS (15 QCM + 2 pratiques)
  // ========================================================
  {
    id: 'exam-fondations',
    title: 'Examen Blanc — Fondations',
    icon: '📝',
    level: 'Fondations',
    color: '#10b981',
    durationMinutes: 30,
    passingScore: 70,
    xpReward: 150,
    description:
      'Validez les bases : syntaxe, variables, conditions, boucles, fonctions simples et listes. Le QCM est chronométré (30 min), puis 2 épreuves pratiques.',
    objectives: ['QCM : 15 questions', 'Pratique : 2 exercices', 'Seuil : 70%'],
    questions: [
      {
        id: 'ef-1',
        question: 'Que fait print("Bonjour") ?',
        options: ['Il affiche Bonjour à l\'écran', 'Il enregistre Bonjour dans une variable', 'Il crée un fichier Bonjour', 'Il ne fait rien sans import'],
        correctIndex: 0,
        explanation: 'print() affiche son argument dans la console.',
      },
      {
        id: 'ef-2',
        question: 'Quel est le type de 3.14 en Python ?',
        options: ['int', 'float', 'str', 'decimal'],
        correctIndex: 1,
        explanation: 'Les nombres à virgule sont des float.',
      },
      {
        id: 'ef-3',
        question: 'Que vaut x après : x = 5 ; x += 3 ?',
        options: ['5', '3', '8', '53'],
        correctIndex: 2,
        explanation: 'x += 3 équivaut à x = x + 3, donc 8.',
      },
      {
        id: 'ef-4',
        question: 'Comment écrire un commentaire sur une ligne ?',
        options: ['// commentaire', '# commentaire', '<!-- commentaire -->', '-- commentaire'],
        correctIndex: 1,
        explanation: 'En Python, les commentaires commencent par #.',
      },
      {
        id: 'ef-5',
        question: 'Que teste if age >= 18: ?',
        options: ['Si age vaut exactement 18', 'Si age est supérieur ou égal à 18', 'Si age est différent de 18', 'Si age est inférieur à 18'],
        correctIndex: 1,
        explanation: '>= signifie supérieur ou égal.',
      },
      {
        id: 'ef-6',
        question: 'Quelle est la différence entre = et == ?',
        options: ['Aucune, ils sont interchangeables', '= affecte une variable, == compare deux valeurs', '== affecte, = compare', '= est plus rapide'],
        correctIndex: 1,
        explanation: '= est l\'affectation, == la comparaison d\'égalité.',
      },
      {
        id: 'ef-7',
        question: 'Que produit range(1, 6) ?',
        options: ['1, 2, 3, 4, 5, 6', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4, 5', '6, 5, 4, 3, 2, 1'],
        correctIndex: 1,
        explanation: 'range s\'arrête AVANT la borne de fin : 1 à 5.',
      },
      {
        id: 'ef-8',
        question: 'Que fait break dans une boucle ?',
        options: ['Il saute une itération', 'Il sort immédiatement de la boucle', 'Il redémarre la boucle', 'Il met la boucle en pause'],
        correctIndex: 1,
        explanation: 'break interrompt la boucle ; continue saute une itération.',
      },
      {
        id: 'ef-9',
        question: 'Que contient fruits après fruits.append("cerise") si fruits = ["pomme"] ?',
        options: ['["pomme"]', '["cerise"]', '["pomme", "cerise"]', '["cerise", "pomme"]'],
        correctIndex: 2,
        explanation: 'append() ajoute à la FIN de la liste.',
      },
      {
        id: 'ef-10',
        question: 'Que vaut len([10, 20, 30]) ?',
        options: ['60', '3', '30', 'Erreur'],
        correctIndex: 1,
        explanation: 'len() retourne le nombre d\'éléments : 3.',
      },
      {
        id: 'ef-11',
        question: 'Que retourne la fonction : def f(n): return n * 2 ?',
        options: ['Elle affiche n * 2', 'Elle retourne le double de n', 'Elle modifie n', 'Elle ne fait rien'],
        correctIndex: 1,
        explanation: 'return renvoie la valeur à l\'appelant sans l\'afficher.',
      },
      {
        id: 'ef-12',
        question: 'Que vaut [x * x for x in range(1, 4)] ?',
        options: ['[1, 4, 9]', '[1, 2, 3]', '[2, 4, 6]', '[1, 4, 9, 16]'],
        correctIndex: 0,
        explanation: 'Compréhension : carrés de 1, 2, 3 → [1, 4, 9].',
      },
      {
        id: 'ef-13',
        question: 'Que vaut "python".upper() ?',
        options: ['"python"', '"PYTHON"', '"Python"', 'Erreur : upper n\'existe pas'],
        correctIndex: 1,
        explanation: '.upper() met toute la chaîne en majuscules.',
      },
      {
        id: 'ef-14',
        question: 'Que fait try / except ?',
        options: ['Il accélère le code', 'Il capture les erreurs pour éviter le crash', 'Il teste la mémoire', 'Il importe des modules'],
        correctIndex: 1,
        explanation: 'try/except permet de gérer proprement les exceptions.',
      },
      {
        id: 'ef-15',
        question: 'Que vaut 7 % 3 ?',
        options: ['2', '1', '2.33', '21'],
        correctIndex: 1,
        explanation: '% donne le RESTE : 7 = 2×3 + 1, donc 1.',
      },
    ],
    practical: [
      {
        id: 'ef-p1',
        title: 'Pratique — Prix TTC',
        instruction: 'Créez total_ttc(prix_ht, taux=0.2) qui retourne prix_ht * (1 + taux).',
        starterCode: `def total_ttc(prix_ht, taux=0.2):
    ___`,
        solution: `def total_ttc(prix_ht, taux=0.2):
    return prix_ht * (1 + taux)`,
        hints: ['return prix_ht * (1 + taux)', 'total_ttc(100) vaut 120.0'],
        tests: [{ input: '', expected: 'return prix_ht * (1 + taux)', description: 'Le calcul TTC est présent' }],
        difficulty: 'medium',
      },
      {
        id: 'ef-p2',
        title: 'Pratique — Filtrer les positifs',
        instruction: 'Avec nombres = [-2, 5, -1, 8, 0, 3], créez positifs (compréhension, > 0 uniquement).',
        starterCode: `nombres = [-2, 5, -1, 8, 0, 3]
positifs = ___
print(positifs)`,
        solution: `nombres = [-2, 5, -1, 8, 0, 3]
positifs = [n for n in nombres if n > 0]
print(positifs)`,
        hints: ['[n for n in nombres if n > 0]', 'Résultat : [5, 8, 3]'],
        tests: [{ input: '', expected: 'if n > 0', description: 'Le filtre est présent' }],
        difficulty: 'medium',
      },
    ],
  },
  // ========================================================
  // EXAMEN 2 : INTERMÉDIAIRE (15 QCM + 2 pratiques)
  // ========================================================
  {
    id: 'exam-intermediaire',
    title: 'Examen Blanc — Intermédiaire',
    icon: '🎯',
    level: 'Intermédiaire',
    color: '#f59e0b',
    durationMinutes: 40,
    passingScore: 70,
    xpReward: 200,
    description:
      'Dicts, sets, POO, fichiers, modules, *args, lambda, gestion d\'erreurs fine. 40 minutes, 15 QCM + 2 épreuves pratiques.',
    objectives: ['QCM : 15 questions', 'Pratique : 2 exercices', 'Seuil : 70%'],
    questions: [
      {
        id: 'ei-1',
        question: 'Que retourne {}.get("a", 0) si le dict est vide ?',
        options: ['KeyError', 'None', '0', '""'],
        correctIndex: 2,
        explanation: '.get(clé, défaut) retourne le défaut au lieu de lever KeyError.',
      },
      {
        id: 'ei-2',
        question: 'Que vaut set([1, 2, 2, 3, 3, 3]) ?',
        options: ['[1, 2, 2, 3, 3, 3]', '{1, 2, 3}', '{3}', 'Erreur : doublons interdits à la création'],
        correctIndex: 1,
        explanation: 'Le set élimine les doublons : {1, 2, 3}.',
      },
      {
        id: 'ei-3',
        question: 'Dans une classe, à quoi sert self ?',
        options: ['À rendre la méthode statique', 'À référencer l\'instance courante', 'À importer le parent', 'À rien, c\'est décoratif'],
        correctIndex: 1,
        explanation: 'self désigne l\'instance ; il donne accès à ses attributs.',
      },
      {
        id: 'ei-4',
        question: 'Que fait super().__init__(nom) dans un enfant ?',
        options: ['Il détruit le parent', 'Il appelle le constructeur du parent', 'Il copie la classe', 'Il vérifie le type'],
        correctIndex: 1,
        explanation: 'super() donne accès au parent, dont le __init__ initialise la partie héritée.',
      },
      {
        id: 'ei-5',
        question: 'Que garantit with open(...) as f: ?',
        options: ['Un fichier plus rapide', 'La fermeture automatique du fichier', 'Le chiffrement', 'La lecture seule'],
        correctIndex: 1,
        explanation: 'Le gestionnaire de contexte ferme le fichier même en cas d\'erreur.',
      },
      {
        id: 'ei-6',
        question: 'Quelle est la différence entre les modes "w" et "a" ?',
        options: ['Aucune', '"w" écrase le fichier, "a" ajoute à la fin', '"a" écrase, "w" ajoute', '"w" ne marche que pour le texte'],
        correctIndex: 1,
        explanation: '"w" (write) écrase, "a" (append) ajoute à la fin.',
      },
      {
        id: 'ei-7',
        question: 'Que fait if __name__ == "__main__": ?',
        options: ['Il vérifie la version de Python', 'Il n\'exécute le bloc que si le fichier est lancé directement', 'Il importe le module main', 'Il lance les tests'],
        correctIndex: 1,
        explanation: 'La garde empêche l\'exécution du script lors d\'un import.',
      },
      {
        id: 'ei-8',
        question: 'Que capture def f(*args) ?',
        options: ['Les arguments nommés', 'Un nombre variable d\'arguments positionnels (tuple)', 'Uniquement le premier argument', 'Rien, syntaxe invalide'],
        correctIndex: 1,
        explanation: '*args regroupe les arguments positionnels excédentaires en tuple.',
      },
      {
        id: 'ei-9',
        question: 'Que vaut sorted([3, 1, 2]) ?',
        options: ['[3, 1, 2]', '[1, 2, 3]', '[2, 1, 3]', 'None'],
        correctIndex: 1,
        explanation: 'sorted() retourne une NOUVELLE liste triée.',
      },
      {
        id: 'ei-10',
        question: 'Quelle méthode convertit une liste en chaîne ?',
        options: ['list.join()', '"sep".join(liste)', 'str(liste)', 'concat(liste)'],
        correctIndex: 1,
        explanation: '"-".join(["a","b"]) donne "a-b". str(liste) donne la représentation "[...]".',
      },
      {
        id: 'ei-11',
        question: 'Que se passe-t-il avec d = {"a": 1} ; d["b"] ?',
        options: ['Retourne None', 'Retourne 0', 'Lève KeyError', 'Crée la clé avec None'],
        correctIndex: 2,
        explanation: 'L\'accès direct à une clé absente lève KeyError (utilisez .get()).',
      },
      {
        id: 'ei-12',
        question: 'Que fait @dataclass ?',
        options: ['Il rend la classe abstraite', 'Il génère __init__, __repr__, __eq__ automatiquement', 'Il chiffre les attributs', 'Il interdit l\'héritage'],
        correctIndex: 1,
        explanation: 'Le décorateur génère les méthodes utilitaires à partir des annotations.',
      },
      {
        id: 'ei-13',
        question: 'Que vaut list(zip(["a", "b"], [1, 2])) ?',
        options: ['[("a", 1), ("b", 2)]', '["a", "b", 1, 2]', '[("a", "b"), (1, 2)]', 'Erreur'],
        correctIndex: 0,
        explanation: 'zip() apparie les éléments position par position.',
      },
      {
        id: 'ei-14',
        question: 'Dans except ValueError as e:, que contient e ?',
        options: ['Le type de l\'erreur', 'L\'objet exception (message, détails)', 'La ligne du code', 'Toujours None'],
        correctIndex: 1,
        explanation: 'as e capture l\'instance de l\'exception pour l\'inspecter ou la logger.',
      },
      {
        id: 'ei-15',
        question: 'Que fait Path("a") / "b.txt" avec pathlib ?',
        options: ['Une division', 'Joint les chemins : a/b.txt (multiplateforme)', 'Une erreur de type', 'Une comparaison'],
        correctIndex: 1,
        explanation: 'L\'opérateur / de Path assemble les chemins proprement sur tout OS.',
      },
    ],
    practical: [
      {
        id: 'ei-p1',
        title: 'Pratique — Regrouper par initiale',
        instruction: 'Avec mots = ["pomme", "poire", "banane", "abricot"], groupez-les par première lettre dans un dict via .setdefault().',
        starterCode: `mots = ["pomme", "poire", "banane", "abricot"]
groupes = {}
for mot in mots:
    ___
print(groupes)`,
        solution: `mots = ["pomme", "poire", "banane", "abricot"]
groupes = {}
for mot in mots:
    groupes.setdefault(mot[0], []).append(mot)
print(groupes)`,
        hints: ['setdefault(clé, []) crée la liste si absente', 'Puis .append(mot) dans tous les cas'],
        tests: [{ input: '', expected: '.setdefault(mot[0], [])', description: 'setdefault est utilisé' }],
        difficulty: 'hard',
      },
      {
        id: 'ei-p2',
        title: 'Pratique — Classe Produit',
        instruction: 'Classe Produit(nom, prix_ht, taux=0.2) avec méthode prix_ttc() qui retourne prix_ht * (1 + taux).',
        starterCode: `class Produit:
    def __init__(self, nom, prix_ht, taux=0.2):
        ___
        ___
        ___

    def prix_ttc(self):
        ___`,
        solution: `class Produit:
    def __init__(self, nom, prix_ht, taux=0.2):
        self.nom = nom
        self.prix_ht = prix_ht
        self.taux = taux

    def prix_ttc(self):
        return self.prix_ht * (1 + self.taux)`,
        hints: ['Stockez les 3 attributs avec self.', 'prix_ttc utilise self.prix_ht et self.taux'],
        tests: [
          { input: '', expected: 'self.taux = taux', description: 'Le taux est stocké' },
          { input: '', expected: 'return self.prix_ht * (1 + self.taux)', description: 'Le calcul TTC est implémenté' },
        ],
        difficulty: 'hard',
      },
    ],
  },
  // ========================================================
  // EXAMEN 3 : CERTIFICATION — DÉFI FINAL (10 QCM pièges + 3 pratiques)
  // ========================================================
  {
    id: 'exam-certification',
    title: 'Certification — Défi Final PyMaster',
    icon: '🌟',
    level: 'Certification',
    color: '#8b5cf6',
    durationMinutes: 45,
    passingScore: 80,
    xpReward: 300,
    description:
      'L\'épreuve ultime : 10 questions pièges + 3 épreuves pratiques dont un mini-projet complet. 80% requis pour le badge 🌟 Certifié PyMaster.',
    objectives: ['QCM : 10 questions pièges', 'Pratique : 3 épreuves', 'Seuil : 80% — 1 tentative comptabilisée par jour'],
    questions: [
      {
        id: 'ec-1',
        question: 'Piège : que vaut [[]] * 3 après l.append(1) sur le premier élément ? (l = [[]] * 3 ; l[0].append(1))',
        options: ['[[1], [], []]', '[[1], [1], [1]]', '[[1]]', 'Erreur'],
        correctIndex: 1,
        explanation: '* 3 duplique les RÉFÉRENCES : les 3 sous-listes sont le même objet ! Piège classique.',
      },
      {
        id: 'ec-2',
        question: 'Piège : def f(x=[]): x.append(1); return x — que donne f() appelé 2 fois ?',
        options: ['[1] puis [1]', '[1] puis [1, 1]', 'Erreur', '[1] puis []'],
        correctIndex: 1,
        explanation: 'Le défaut mutable est créé UNE fois : il accumule entre les appels. Utilisez x=None.',
      },
      {
        id: 'ec-3',
        question: 'Piège : a = [1, 2, 3] ; b = a ; b.append(4) — que vaut a ?',
        options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'None'],
        correctIndex: 1,
        explanation: 'b = a copie la référence, pas la liste. Les deux noms voient la même liste.',
      },
      {
        id: 'ec-4',
        question: 'Piège : que vaut (1 == True) en Python ?',
        options: ['False', 'True', 'Erreur de type', 'None'],
        correctIndex: 1,
        explanation: 'True vaut 1 en Python (bool sous-classe de int). D\'où 1 == True → True.',
      },
      {
        id: 'ec-5',
        question: 'Piège : for i in range(3): ... — que vaut i APRÈS la boucle ?',
        options: ['La variable n\'existe plus', '2 (la dernière valeur persiste)', '3', 'None'],
        correctIndex: 1,
        explanation: 'Python n\'a pas de portée de bloc : i fuit et vaut 2 après la boucle.',
      },
      {
        id: 'ec-6',
        question: 'Piège : {"a": 1, "a": 2} — que vaut le dict ?',
        options: ['{"a": 1}', '{"a": 2}', 'Erreur : clé dupliquée', '{"a": [1, 2]}'],
        correctIndex: 1,
        explanation: 'La dernière valeur écrase : {"a": 2}. Les clés sont uniques.',
      },
      {
        id: 'ec-7',
        question: 'Piège : que fait except: (nu, sans type) ?',
        options: ['Rien de spécial, bonne pratique', 'Il capture TOUT y compris KeyboardInterrupt — à éviter', 'Il ne capture rien', 'Erreur de syntaxe'],
        correctIndex: 1,
        explanation: 'Le except nu capture tout, y compris les interruptions système. Précisez toujours le type.',
      },
      {
        id: 'ec-8',
        question: 'Piège : "abc" < "abd" vaut ?',
        options: ['True (comparaison lexicographique)', 'False', 'Erreur : on ne compare pas des str', 'None'],
        correctIndex: 0,
        explanation: 'Les chaînes se comparent caractère par caractère (code Unicode) : "c" < "d" → True.',
      },
      {
        id: 'ec-9',
        question: 'Piège : x = 5 ; y = 5 — x is y vaut ? (CPython, petits entiers)',
        options: ['Toujours False', 'True (cache des petits entiers, mais ne JAMAIS s\'y fier)', 'Erreur', 'None'],
        correctIndex: 1,
        explanation: 'CPython met en cache les petits entiers (-5..256) : même objet. Mais is teste l\'IDENTITÉ : utilisez == pour les valeurs !',
      },
      {
        id: 'ec-10',
        question: 'Piège : que retourne sorted(d) si d = {"b": 1, "a": 2} ?',
        options: ['[1, 2]', '["a", "b"]', '{"a": 2, "b": 1}', 'Erreur'],
        correctIndex: 1,
        explanation: 'sorted() sur un dict trie ses CLÉS : ["a", "b"].',
      },
    ],
    practical: [
      {
        id: 'ec-p1',
        title: 'Pratique — Ligne CSV',
        instruction: 'Créez ligne_csv(nom, age, ville) qui retourne "nom;age;ville" (f-string, séparateur point-virgule).',
        starterCode: `def ligne_csv(nom, age, ville):
    ___`,
        solution: `def ligne_csv(nom, age, ville):
    return f"{nom};{age};{ville}"`,
        hints: ['return f"{nom};{age};{ville}"', 'ligne_csv("Alice", 30, "Lyon") → "Alice;30;Lyon"'],
        tests: [{ input: '', expected: 'return f"{nom};{age};{ville}"', description: 'Le format CSV est exact' }],
        difficulty: 'medium',
      },
      {
        id: 'ec-p2',
        title: 'Pratique — Notes et stats',
        instruction: 'moyenne_classe(notes: dict) retourne (moyenne, meilleur_élève) avec max(notes, key=notes.get). Gérez le dict vide (None, None).',
        starterCode: `def moyenne_classe(notes):
    if not notes:
        return ___
    moyenne = ___
    meilleur = ___
    return moyenne, meilleur`,
        solution: `def moyenne_classe(notes):
    if not notes:
        return None, None
    moyenne = sum(notes.values()) / len(notes)
    meilleur = max(notes, key=notes.get)
    return moyenne, meilleur`,
        hints: ['sum(notes.values()) / len(notes)', 'max(notes, key=notes.get) trouve la clé du max'],
        tests: [
          { input: '', expected: 'sum(notes.values()) / len(notes)', description: 'La moyenne est calculée' },
          { input: '', expected: 'max(notes, key=notes.get)', description: 'Le meilleur est trouvé' },
        ],
        difficulty: 'hard',
      },
      {
        id: 'ec-p3',
        title: 'MINI-PROJET — Gestionnaire de tâches',
        instruction: 'Classe Tache(titre, faite=False) + Gestionnaire avec ajouter(titre), terminer(titre) (passe faite=True, False si absente), restantes() (liste des non faites).',
        starterCode: `class Tache:
    def __init__(self, titre, faite=False):
        self.titre = titre
        self.faite = faite

class Gestionnaire:
    def __init__(self):
        self.taches = []

    def ajouter(self, titre):
        ___

    def terminer(self, titre):
        for t in self.taches:
            if t.titre == titre:
                t.faite = True
                return True
        return ___

    def restantes(self):
        return ___`,
        solution: `class Tache:
    def __init__(self, titre, faite=False):
        self.titre = titre
        self.faite = faite

class Gestionnaire:
    def __init__(self):
        self.taches = []

    def ajouter(self, titre):
        self.taches.append(Tache(titre))

    def terminer(self, titre):
        for t in self.taches:
            if t.titre == titre:
                t.faite = True
                return True
        return False

    def restantes(self):
        return [t.titre for t in self.taches if not t.faite]`,
        hints: ['ajouter enveloppe le titre dans Tache()', 'terminer retourne False si rien trouvé', 'restantes = compréhension filtrée sur not t.faite'],
        tests: [
          { input: '', expected: 'self.taches.append(Tache(titre))', description: 'ajouter() est implémenté' },
          { input: '', expected: 'if not t.faite', description: 'Le filtre restantes() est présent' },
        ],
        difficulty: 'hard',
      },
    ],
  },
];

export function totalExamCount(): number {
  return exams.length;
}
