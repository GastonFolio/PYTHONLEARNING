import type { ProjectStep } from './modules';

export interface StandaloneProject {
  id: string;
  title: string;
  icon: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  description: string;
  objectives: string[];
  steps: ProjectStep[];
}

// ============================================================
// PROJET 1 : JEU DU PENDU
// Concepts : random, while, strings, listes, input, f-strings
// ============================================================
export const hangmanProject: StandaloneProject = {
  id: 'pendu',
  title: 'Jeu du Pendu',
  icon: '🎯',
  level: 'Débutant',
  duration: '~2h',
  description:
    'Créez le jeu du pendu classique : un mot secret, 6 vies, des lettres à deviner. Idéal pour pratiquer les boucles, les chaînes et les listes.',
  objectives: [
    'Choisir un mot au hasard avec random',
    'Afficher la progression avec des _',
    'Gérer les vies et les lettres déjà jouées',
    'Détecter victoire et défaite',
  ],
  steps: [
    {
      id: 'pendu-1',
      title: 'Choisir le mot secret',
      instruction:
        'Importez random, créez une liste MOTS et choisissez-en un au hasard avec random.choice().',
      hint: 'secret = random.choice(MOTS)',
      starterCode: `import random

MOTS = ["python", "programmation", "ordinateur", "clavier", "souris", "ecran"]

# Choisissez un mot au hasard
secret = random.___(MOTS)

print("🎯 Mot secret choisi !")
print(f"(Debug : {secret})")  # À retirer à la fin`,
      expectedCode: `secret = random.choice(MOTS)`,
      validation: 'random.choice',
    },
    {
      id: 'pendu-2',
      title: 'Afficher les lettres trouvées',
      instruction:
        'Créez une fonction afficher_progres(secret, trouvees) qui retourne le mot avec les lettres trouvées et des _ pour les autres.',
      hint: 'Compréhension : [lettre if lettre in trouvees else "_" for lettre in secret], puis " ".join(...)',
      starterCode: `def afficher_progres(secret, trouvees):
    """Ex: secret='python', trouvees={'p','o'} -> 'p _ _ _ o _'"""
    lettres = [l if l in ___ else "_" for l in secret]
    return " ".join(lettres)

# Tests
print(afficher_progres("python", set("po")))  # p _ _ _ o _
print(afficher_progres("python", set()))      # _ _ _ _ _ _`,
      expectedCode: `l if l in trouvees else "_"`,
      validation: 'trouvees',
    },
    {
      id: 'pendu-3',
      title: 'Dessiner le pendu',
      instruction:
        'Créez une liste PENDU de 7 dessins ASCII (index = nombre d\'erreurs) et une fonction dessiner(erreurs).',
      hint: 'PENDU = ["...", "..."] puis return PENDU[erreurs]',
      starterCode: `PENDU = [
    "+---+\\n    |\\n    |\\n    |\\n   ===",   # 0 erreur
    "+---+\\nO   |\\n    |\\n    |\\n   ===",   # 1 erreur
    # Ajoutez les étapes 2 à 6 (corps, bras, jambes...)
    "+---+\\nO   |\\n/|\\\\  |\\n    |\\n   ===",  # exemple complet
]

def dessiner(erreurs):
    return PENDU[min(erreurs, len(PENDU) - 1)]

print(dessiner(0))
print(dessiner(2))`,
      expectedCode: `def dessiner(erreurs):`,
      validation: 'def dessiner(',
    },
    {
      id: 'pendu-4',
      title: 'Demander une lettre valide',
      instruction:
        'Écrivez demander_lettre(jouees) : redemande tant que l\'entrée n\'est pas une seule lettre non déjà jouée.',
      hint: 'while True: ... if len(l) != 1 or not l.isalpha(): continue ; if l in jouees: ...',
      starterCode: `def demander_lettre(jouees):
    """Demande une lettre valide non déjà jouée."""
    while True:
        lettre = input("Proposez une lettre : ").lower().strip()
        if len(lettre) != 1 or not lettre.isalpha():
            print("⚠️ Une seule lettre, svp !")
            continue
        if lettre in ___:
            print("⚠️ Déjà jouée, essayez une autre !")
            continue
        return lettre

# Test : jouees = {"a", "e"}
# demander_lettre({"a", "e"})`,
      expectedCode: `if lettre in jouees:`,
      validation: 'in jouees',
    },
    {
      id: 'pendu-5',
      title: 'Boucle principale du jeu',
      instruction:
        'Assemblez : 6 vies, boucle while (vies > 0 et mot incomplet), mise à jour des lettres trouvées / vies.',
      hint: 'if lettre in secret: trouvees.add(lettre) else: vies -= 1 ; jouees.add(lettre) dans tous les cas',
      starterCode: `import random

VIES_MAX = 6
secret = random.choice(MOTS)
trouvees = set()
jouees = set()
vies = VIES_MAX

while vies > 0 and set(secret) != trouvees:
    print("\\n" + dessiner(VIES_MAX - vies))
    print(afficher_progres(secret, trouvees))
    print(f"Vies : {vies} | Jouées : {', '.join(sorted(jouees)) or '—'}")

    lettre = demander_lettre(jouees)
    jouees.add(lettre)
    if lettre in ___:
        trouvees.add(lettre)
        print("✅ Bonne lettre !")
    else:
        vies -= 1
        print("❌ Raté !")`,
      expectedCode: `if lettre in secret:`,
      validation: 'in secret',
    },
    {
      id: 'pendu-6',
      title: 'Victoire, défaite et score',
      instruction:
        'Après la boucle : affichez victoire/défaite, le mot, et un score = vies restantes × 10 + bonus victoire (+50).',
      hint: 'gagne = set(secret) == trouvees ; score = vies * 10 + (50 if gagne else 0)',
      starterCode: `# (suite de la boucle précédente)
if set(secret) == trouvees:
    print(f"\\n🎉 Gagné ! Le mot était : {secret}")
    gagne = ___
else:
    print("\\n" + dessiner(VIES_MAX))
    print(f"💀 Perdu ! Le mot était : {secret}")
    gagne = False

score = vies * 10 + (50 if gagne else 0)
print(f"⭐ Score : {score} points")`,
      expectedCode: `gagne = True`,
      validation: 'gagne = True',
    },
    {
      id: 'pendu-7',
      title: 'Rejouer et programme final',
      instruction:
        'Enveloppez le jeu dans jouer_une_partie() -> score, cumulez le total, et proposez de rejouer. Copiez tout dans pendu.py et lancez avec python pendu.py.',
      hint: 'def jouer_une_partie(): ... return score ; while True: total += ... ; if input != "o": break',
      starterCode: `def jouer_une_partie():
    """Joue une partie complète, retourne le score."""
    # (collez ici le code des étapes 1-6, indenté)
    return score

def main():
    print("🎯 JEU DU PENDU")
    total = 0
    while True:
        total += jouer_une_partie()
        print(f"\\n🏆 Total : {total} points")
        if input("Rejouer ? (o/n) : ").lower() != "o":
            break
    print("👋 À bientôt !")

if ___ == "___":
    main()`,
      expectedCode: `if __name__ == "__main__":`,
      validation: '__main__',
    },
  ],
};

// ============================================================
// PROJET 2 : MORPION (TIC-TAC-TOE) 2 JOUEURS
// Concepts : listes 2D, fonctions, boucles, validation
// ============================================================
export const morpionProject: StandaloneProject = {
  id: 'morpion',
  title: 'Jeu du Morpion',
  icon: '⭕',
  level: 'Débutant',
  duration: '~2h',
  description:
    'Programmez le morpion pour 2 joueurs : grille 3×3, tours alternés, détection de victoire et de match nul.',
  objectives: [
    'Représenter une grille avec une liste de listes',
    'Valider les coups des joueurs',
    'Détecter les 8 combinaisons gagnantes',
    'Alterner les joueurs et gérer le match nul',
  ],
  steps: [
    {
      id: 'morpion-1',
      title: 'Créer et afficher la grille',
      instruction:
        'Créez une grille 3×3 vide (listes de listes) et une fonction afficher(grille) qui la dessine joliment.',
      hint: 'grille = [[" "]*3 for _ in range(3)] ; lignes séparées par "---+---+---"',
      starterCode: `def nouvelle_grille():
    """Retourne une grille 3x3 vide."""
    return [[" " for _ in range(3)] for _ in range(___)]

def afficher(grille):
    for i, ligne in enumerate(grille):
        print(" " + " | ".join(ligne))
        if i < 2:
            print("---+---+---")

g = nouvelle_grille()
afficher(g)`,
      expectedCode: `for _ in range(3)`,
      validation: 'range(3)',
    },
    {
      id: 'morpion-2',
      title: 'Jouer un coup valide',
      instruction:
        'Écrivez demander_coup(grille, joueur) : demande ligne/colonne (1-3), revérifie jusqu\'à un coup libre et dans la grille.',
      hint: 'try: l = int(input(...)) - 1 ... except ValueError ; vérifier 0 <= l < 3 et grille[l][c] == " "',
      starterCode: `def demander_coup(grille, joueur):
    """Demande un coup valide et le joue. Retourne (ligne, colonne)."""
    while True:
        try:
            l = int(input(f"Joueur {joueur} — ligne (1-3) : ")) - 1
            c = int(input(f"Joueur {joueur} — colonne (1-3) : ")) - 1
        except ValueError:
            print("⚠️ Entrez des nombres !")
            continue
        if not (0 <= l < 3 and 0 <= c < 3):
            print("⚠️ Hors grille (1-3) !")
            continue
        if grille[l][c] != " ":
            print("⚠️ Case déjà occupée !")
            continue
        grille[l][c] = ___
        return l, c`,
      expectedCode: `grille[l][c] = joueur`,
      validation: '= joueur',
    },
    {
      id: 'morpion-3',
      title: 'Détecter la victoire',
      instruction:
        'Écrivez gagnant(grille, joueur) : True si le joueur aligne 3 symboles (lignes, colonnes ou diagonales).',
      hint: 'all(grille[i][j] == joueur ...) pour lignes/colonnes ; 2 diagonales',
      starterCode: `def gagnant(grille, joueur):
    """True si joueur a aligné 3 symboles."""
    # Lignes et colonnes
    for i in range(3):
        if all(grille[i][j] == joueur for j in range(3)):
            return True
        if all(grille[j][i] == joueur for j in range(3)):
            return True
    # Diagonales
    if all(grille[i][i] == joueur for i in range(3)):
        return ___
    if all(grille[i][2 - i] == joueur for i in range(3)):
        return True
    return False

# Test
g = [["X","X","X"],[" ","O"," "],[" "," ","O"]]
print(gagnant(g, "X"))  # True
print(gagnant(g, "O"))  # False`,
      expectedCode: `return True`,
      validation: 'return True',
    },
    {
      id: 'morpion-4',
      title: 'Match nul et partie complète',
      instruction:
        'Écrivez jouer_partie() : alterne X/O pendant 9 coups max, stoppe dès victoire ou grille pleine (match nul).',
      hint: 'for tour in range(9): joueur = "X" if tour % 2 == 0 else "O" ; if gagnant(...): return joueur ; return "Nul"',
      starterCode: `def jouer_partie():
    """Joue une partie, retourne 'X', 'O' ou 'Nul'."""
    grille = nouvelle_grille()
    for tour in range(9):
        joueur = "X" if tour % 2 == 0 else "O"
        afficher(grille)
        demander_coup(grille, joueur)
        if gagnant(grille, joueur):
            afficher(grille)
            return ___
    afficher(grille)
    return "Nul"

print("Résultat :", jouer_partie())`,
      expectedCode: `return joueur`,
      validation: 'return joueur',
    },
    {
      id: 'morpion-5',
      title: 'Tournoi avec scores',
      instruction:
        'Ajoutez un compteur de scores (dict) et une boucle de tournoi : X=3pts/victoire, Nul=1pt chacun.',
      hint: 'scores = {"X": 0, "O": 0} ; if resultat == "Nul": ... else: scores[resultat] += 3',
      starterCode: `def tournoi():
    scores = {"X": 0, "O": 0}
    while True:
        resultat = jouer_partie()
        if resultat == "Nul":
            print("\\n🤝 Match nul ! +1 pt chacun")
            scores["X"] += 1
            scores["O"] += ___
        else:
            print(f"\\n🏆 Joueur {resultat} gagne ! +3 pts")
            scores[resultat] += 3
        print(f"Scores → X : {scores['X']} | O : {scores['O']}")
        if input("Rejouer ? (o/n) : ").lower() != "o":
            break

tournoi()`,
      expectedCode: `scores["O"] += 1`,
      validation: '+= 1',
    },
  ],
};

// ============================================================
// PROJET 3 : CARNET DE CONTACTS (JSON)
// Concepts : dicts, listes, JSON, CRUD, recherche, pathlib
// ============================================================
export const contactsProject: StandaloneProject = {
  id: 'contacts',
  title: 'Carnet de Contacts',
  icon: '📇',
  level: 'Intermédiaire',
  duration: '~3h',
  description:
    'Créez une application CRUD complète : ajouter, rechercher, modifier, supprimer des contacts sauvegardés en JSON.',
  objectives: [
    'Modéliser des contacts avec des dictionnaires',
    'Persister avec JSON (charger/sauvegarder)',
    'Implémenter CRUD + recherche insensible à la casse',
    'Construire un menu en boucle avec validation',
  ],
  steps: [
    {
      id: 'contacts-1',
      title: 'Charger / sauvegarder en JSON',
      instruction:
        'Écrivez charger() et sauvegarder(contacts) avec pathlib + json, qui tolèrent l\'absence du fichier.',
      hint: 'if FICHIER.exists(): json.loads(...) ; write_text(json.dumps(..., indent=2, ensure_ascii=False))',
      starterCode: `import json
from pathlib import Path

FICHIER = Path("contacts.json")

def charger():
    """Retourne la liste des contacts (vide si aucun fichier)."""
    if FICHIER.exists():
        return json.loads(FICHIER.read_text(encoding="utf-8"))
    return ___

def sauvegarder(contacts):
    FICHIER.write_text(
        json.dumps(contacts, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

print(charger())  # [] au premier lancement`,
      expectedCode: `return []`,
      validation: 'return []',
    },
    {
      id: 'contacts-2',
      title: 'Ajouter un contact validé',
      instruction:
        'Écrivez ajouter(contacts) : demande nom (obligatoire), téléphone (chiffres/espaces, ≥8 caractères) et ville, puis sauvegarde.',
      hint: 'while not nom.strip(): ... ; tel.replace(" ","").isdigit() and len >= 8',
      starterCode: `def ajouter(contacts):
    nom = input("Nom : ").strip()
    while not nom:
        print("⚠️ Le nom est obligatoire !")
        nom = input("Nom : ").strip()
    tel = input("Téléphone : ").strip()
    while not (tel.replace(" ", "").isdigit() and len(tel.replace(" ", "")) >= 8):
        print("⚠️ Numéro invalide (8 chiffres minimum) !")
        tel = input("Téléphone : ").strip()
    ville = input("Ville : ").strip() or "—"
    contacts.append({"nom": nom, "tel": tel, "ville": ville})
    ___(contacts)
    print(f"✅ {nom} ajouté !")`,
      expectedCode: `sauvegarder(contacts)`,
      validation: 'sauvegarder(',
    },
    {
      id: 'contacts-3',
      title: 'Lister et rechercher',
      instruction:
        'Écrivez lister(contacts) (numéroté, trié par nom) et rechercher(contacts, mot) (nom/ville/tel, insensible à la casse).',
      hint: 'sorted(contacts, key=lambda c: c["nom"].lower()) ; mot in (c["nom"]+c["ville"]+c["tel"]).lower()',
      starterCode: `def lister(contacts):
    if not contacts:
        print("📭 Carnet vide.")
        return
    for i, c in enumerate(sorted(contacts, key=lambda x: x["nom"].lower()), 1):
        print(f"{i}. {c['nom']} — {c['tel']} ({c['ville']})")

def rechercher(contacts, mot):
    mot = mot.lower()
    return [c for c in contacts
            if mot in (c["nom"] + " " + c["ville"] + " " + c["tel"]).__()]`,
      expectedCode: `.lower()`,
      validation: '.lower()',
    },
    {
      id: 'contacts-4',
      title: 'Modifier et supprimer',
      instruction:
        'Écrivez supprimer(contacts, index) et modifier(contacts, index, champ, valeur) avec garde-fous (index valide, champ autorisé).',
      hint: 'if 0 <= index < len(contacts) ; if champ in ("nom","tel","ville") ; sauvegarder après chaque changement',
      starterCode: `CHAMPS = ("nom", "tel", "ville")

def supprimer(contacts, index):
    """Supprime le contact n°index (0-based). Retourne True si OK."""
    if 0 <= index < len(contacts):
        retire = contacts.pop(___)
        sauvegarder(contacts)
        print(f"🗑️ {retire['nom']} supprimé.")
        return True
    print("⚠️ Numéro invalide !")
    return False

def modifier(contacts, index, champ, valeur):
    if not (0 <= index < len(contacts)):
        print("⚠️ Numéro invalide !")
        return False
    if champ not in CHAMPS:
        print(f"⚠️ Champ parmi {CHAMPS} !")
        return False
    contacts[index][champ] = valeur
    sauvegarder(contacts)
    print("✅ Modifié !")
    return True`,
      expectedCode: `contacts.pop(index)`,
      validation: '.pop(index)',
    },
    {
      id: 'contacts-5',
      title: 'Menu principal en boucle',
      instruction:
        'Assemblez le menu (1-6) avec un dict d\'actions : lister, ajouter, rechercher, modifier, supprimer, quitter.',
      hint: 'while True: choix = input(...) ; if choix == "6": break ; elif ...',
      starterCode: `def menu():
    contacts = charger()
    while True:
        print("\\n📇 CARNET — 1:Lister 2:Ajouter 3:Chercher 4:Modifier 5:Supprimer 6:Quitter")
        choix = input("Choix : ").strip()
        if choix == "1":
            lister(contacts)
        elif choix == "2":
            ajouter(contacts)
        elif choix == "3":
            mot = input("Recherche : ")
            trouves = rechercher(contacts, mot)
            print(f"🔍 {len(trouves)} résultat(s)")
            lister(trouves)
        elif choix == "4":
            lister(contacts)
            i = int(input("N° à modifier : ")) - 1
            champ = input("Champ (nom/tel/ville) : ").strip()
            valeur = input("Nouvelle valeur : ").strip()
            modifier(contacts, i, champ, valeur)
        elif choix == "5":
            lister(contacts)
            i = int(input("N° à supprimer : ")) - 1
            supprimer(contacts, i)
        elif choix == "6":
            print("👋 À bientôt !")
            ___
        else:
            print("⚠️ Choix 1-6 !")

if __name__ == "__main__":
    menu()`,
      expectedCode: `break`,
      validation: 'break',
    },
  ],
};

// ============================================================
// PROJET 4 : GÉNÉRATEUR DE MOTS DE PASSE
// Concepts : random/secrets, strings, fonctions, argparse
// ============================================================
export const passwordProject: StandaloneProject = {
  id: 'mots-de-passe',
  title: 'Générateur de Mots de Passe',
  icon: '🔐',
  level: 'Débutant',
  duration: '~1h30',
  description:
    'Générez des mots de passe robustes : lettres, chiffres, symboles, sans ambiguïtés, avec évaluation de force et mode CLI.',
  objectives: [
    'Construire un réservoir de caractères (string module)',
    'Garantir chaque catégorie avec random/secrets',
    'Évaluer la force (entropie en bits)',
    'Ajouter une interface argparse',
  ],
  steps: [
    {
      id: 'mdp-1',
      title: 'Réservoir de caractères',
      instruction:
        'Avec le module string, construisez le réservoir selon les options (majuscules, chiffres, symboles) en excluant les ambigus (l, 1, O, 0).',
      hint: 'string.ascii_lowercase + (ascii_uppercase si ...) ; .replace() pour retirer les ambigus',
      starterCode: `import string

AMBIGUS = "l1IO0"

def reservoir(majuscules=True, chiffres=True, symboles=True):
    pool = string.ascii_lowercase
    if majuscules:
        pool += string.___
    if chiffres:
        pool += string.digits
    if symboles:
        pool += "!@#$%^&*?-_=+"
    for c in AMBIGUS:
        pool = pool.replace(c, "")
    return pool

print("Taille du réservoir :", len(reservoir()))`,
      expectedCode: `string.ascii_uppercase`,
      validation: 'ascii_uppercase',
    },
    {
      id: 'mdp-2',
      title: 'Génération garantie',
      instruction:
        'Écrivez generer(longueur, ...) : force au moins 1 caractère de chaque catégorie activée, complète avec le réservoir, puis mélange.',
      hint: 'obligatoires = [random.choice(cat) ...] ;reste = [choice(pool) ...] ; random.shuffle ; "".join',
      starterCode: `import random

def generer(longueur=16, majuscules=True, chiffres=True, symboles=True):
    cats = [string.ascii_lowercase]
    if majuscules:
        cats.append(string.ascii_uppercase.replace("IO", ""))
    if chiffres:
        cats.append(string.digits.replace("10", ""))
    if symboles:
        cats.append("!@#$%^&*?-_=+")
    if longueur < len(cats):
        raise ValueError("Longueur trop petite pour les catégories !")

    pool = reservoir(majuscules, chiffres, symboles)
    obligatoires = [random.choice(c) for c in cats]
    reste = [random.choice(pool) for _ in range(longueur - len(obligatoires))]
    mdp = obligatoires + reste
    random.___(mdp)  # Mélange indispensable !
    return "".join(mdp)

print(generer())
print(generer(20, symboles=False))`,
      expectedCode: `random.shuffle(mdp)`,
      validation: 'shuffle',
    },
    {
      id: 'mdp-3',
      title: 'Évaluer la force (entropie)',
      instruction:
        'Écrivez force_bits(mdp, taille_pool) = longueur × log2(pool) et qualifiez : <40 faible, <60 moyen, <80 fort, sinon excellent.',
      hint: 'import math : longueur * math.log2(pool) ; paliers if/elif',
      starterCode: `import math

def force_bits(mdp, taille_pool):
    return len(mdp) * math.log2(taille_pool)

def verdict(bits):
    if bits < 40:
        return "🔴 Faible"
    elif bits < 60:
        return "🟠 Moyen"
    elif bits < 80:
        return "🟢 Fort"
    return "💪 Excellent"

mdp = generer(16)
bits = force_bits(mdp, len(reservoir()))
print(f"{mdp}  →  {bits:.0f} bits : {verdict(___)}")`,
      expectedCode: `verdict(bits)`,
      validation: 'verdict(bits)',
    },
    {
      id: 'mdp-4',
      title: 'CLI avec argparse',
      instruction:
        'Ajoutez la ligne de commande : longueur positionnelle, options --sans-majuscules/--sans-chiffres/--sans-symboles/--nombre, affiche mdp + force.',
      hint: 'parser.add_argument("--nombre", type=int, default=5) ; action="store_false" pour les --sans-*',
      starterCode: `import argparse

def main():
    p = argparse.ArgumentParser(description="Génère des mots de passe robustes")
    p.add_argument("longueur", type=int, nargs="?", default=16)
    p.add_argument("--nombre", type=int, default=5)
    p.add_argument("--sans-majuscules", dest="maj", action="store_false")
    p.add_argument("--sans-chiffres", dest="chiffres", action="store_false")
    p.add_argument("--sans-symboles", dest="symboles", action="store_false")
    args = p.parse_args()

    pool = len(reservoir(args.maj, args.chiffres, args.symboles))
    for _ in range(args.nombre):
        mdp = generer(args.longueur, args.maj, args.chiffres, args.symboles)
        print(f"{mdp}  ({force_bits(mdp, pool):.0f} bits)")

if __name__ == "__main__":
    main()

# Usage : python mdp.py 20 --nombre 3 --sans-symboles`,
      expectedCode: `if __name__ == "__main__":`,
      validation: '__main__',
    },
  ],
};

// ============================================================
// PROJET 5 : PIERRE-PAPIER-CISEAUX (TOURNOI)
// Concepts : random, dicts (règles), boucles, scores
// ============================================================
export const ppcProject: StandaloneProject = {
  id: 'pierre-papier-ciseaux',
  title: 'Pierre-Papier-Ciseaux',
  icon: '✂️',
  level: 'Débutant',
  duration: '~1h30',
  description:
    'Le classique revisité : règles via dictionnaire, manches gagnantes, statistiques et mode tournoi contre l\'ordinateur.',
  objectives: [
    'Modéliser les règles avec un dict (qui bat qui)',
    'Normaliser les entrées (p, f, c, noms complets)',
    'Compter manches, égalités et séries',
    'Organiser un tournoi en manches gagnantes',
  ],
  steps: [
    {
      id: 'ppc-1',
      title: 'Règles et normalisation',
      instruction:
        'Créez BAT = {"pierre": "ciseaux", ...} (chaque clé bat sa valeur) et normaliser() qui accepte noms complets et abréviations.',
      hint: 'COUPS = ("pierre","papier","ciseaux") ; ALIAS = {"p":"pierre","f":"papier","c":"ciseaux"} ... attention "c" ambigu → utilisez "pi","pa","ci"',
      starterCode: `COUPS = ("pierre", "papier", "ciseaux")
# Chaque clé BAT sa valeur
BAT = {"pierre": "ciseaux", "ciseaux": "papier", "papier": "pierre"}

ALIAS = {"pi": "pierre", "pa": "papier", "ci": "ciseaux",
         "pierre": "pierre", "papier": "papier", "ciseaux": "ciseaux"}

def normaliser(texte):
    """'  PA ' -> 'papier', 'ci' -> 'ciseaux', 'x' -> None."""
    t = texte.strip().lower()
    return ALIAS.get(t[:2] if len(t) > 2 else t, ALIAS.get(t))

for test in ["Pierre", " pa ", "CI", "x"]:
    print(f"{test!r:10} -> {normaliser(test)}")`,
      expectedCode: `"papier": "pierre"`,
      validation: '"papier": "pierre"',
    },
    {
      id: 'ppc-2',
      title: 'Arbitrer une manche',
      instruction:
        'Écrivez arbitrer(joueur, ordi) -> "joueur" | "ordi" | "nul" en utilisant le dict BAT dans les deux sens.',
      hint: 'if joueur == ordi: nul ; elif BAT[joueur] == ordi: joueur gagne ; else ordi',
      starterCode: `def arbitrer(joueur, ordi):
    if joueur == ordi:
        return "nul"
    if BAT[joueur] == ___:
        return "joueur"
    return "ordi"

# Vérification exhaustive des 9 cas
for j in COUPS:
    for o in COUPS:
        print(f"{j:8} vs {o:8} -> {arbitrer(j, o)}")`,
      expectedCode: `BAT[joueur] == ordi`,
      validation: 'BAT[joueur]',
    },
    {
      id: 'ppc-3',
      title: 'Manche interactive + stats',
      instruction:
        'Écrivez manche() : coup joueur validé, coup ordi aléatoire, affiche le résultat. Puis une boucle qui cumule victoires/défaites/nuls.',
      hint: 'random.choice(COUPS) ; while coup is None: demander ; stats dict incrémenté',
      starterCode: `import random

def manche():
    """Joue une manche, retourne (coup_joueur, coup_ordi, resultat)."""
    coup = None
    while coup is None:
        coup = normaliser(input("Pierre, papier ou ciseaux ? "))
        if coup is None:
            print("⚠️ Coup invalide !")
    ordi = random.choice(COUPS)
    resultat = arbitrer(coup, ordi)
    print(f"Vous : {coup}  |  Ordi : {ordi}  →  {resultat.upper()}")
    return resultat

stats = {"joueur": 0, "ordi": 0, "nul": 0}
for _ in range(5):
    stats[manche()] += ___
print(f"\\n📊 {stats}")`,
      expectedCode: `stats[manche()] += 1`,
      validation: '+= 1',
    },
    {
      id: 'ppc-4',
      title: 'Tournoi en manches gagnantes',
      instruction:
        'Premier à N manches (N=3 par défaut, modifiable) : boucle while, séries de victoires, annonce du champion.',
      hint: 'while j < cible and o < cible: ... ; serie_j remise à 0 quand l\'ordi gagne',
      starterCode: `def tournoi(cible=3):
    j = o = nuls = 0
    serie = 0
    manche_n = 1
    while j < cible and o < cible:
        print(f"\\n--- Manche {manche_n} (premier à {cible}) ---")
        r = manche()
        if r == "joueur":
            j += 1
            serie += 1
            print(f"🔥 Série : {serie} !" if serie >= 2 else "")
        elif r == "ordi":
            o += 1
            serie = 0
        else:
            nuls += 1
        print(f"Score : vous {j} — {o} ordi ({nuls} nuls)")
        manche_n += 1
    print("\\n🏆 CHAMPION : " + ("VOUS !" if j == cible else "L'ORDINATEUR..."))

tournoi()`,
      expectedCode: `while j < cible and o < cible:`,
      validation: 'while j < cible',
    },
  ],
};

// ============================================================
// PROJET 6 (ADMIN RÉSEAUX) : CALCULATEUR IP / SOUS-RÉSEAUX
// Concepts : module ipaddress, try/except, fonctions, argparse
// ============================================================
export const subnetProject: StandaloneProject = {
  id: 'calculateur-ip',
  title: 'Calculateur IP & Sous-Réseaux',
  icon: '🌐',
  level: 'Intermédiaire',
  duration: '~2h',
  description:
    'L\'outil de base de l\'admin réseaux : valider des adresses, décrire un réseau (masque, broadcast, hôtes), tester des appartenances et découper en sous-réseaux.',
  objectives: [
    'Valider des adresses avec ipaddress',
    'Extraire masque, broadcast et plage d\'hôtes',
    'Tester si une IP appartient à un réseau',
    'Découper un réseau en sous-réseaux',
  ],
  steps: [
    {
      id: 'ip-1',
      title: 'Valider une adresse IPv4',
      instruction:
        'Écrivez valider_ip(texte) : retourne True si le texte est une IPv4 valide, False sinon (try/except + ipaddress).',
      hint: 'ipaddress.IPv4Address(texte) lève AddressValueError si invalide',
      starterCode: `import ipaddress

def valider_ip(texte):
    """True si texte est une adresse IPv4 valide."""
    try:
        ipaddress.IPv4Address(texte)
        return ___
    except ipaddress.AddressValueError:
        return False

# Tests
print(valider_ip("192.168.1.10"))   # True
print(valider_ip("300.1.1.1"))      # False
print(valider_ip("hello"))          # False`,
      expectedCode: `return True`,
      validation: 'return True',
    },
    {
      id: 'ip-2',
      title: 'Décrire un réseau',
      instruction:
        'Écrivez decrire_reseau(cidr) qui retourne un dict : adresse réseau, masque, broadcast, nombre d\'adresses et hôtes utilisables.',
      hint: 'ipaddress.IPv4Network(cidr, strict=False) ; .netmask, .broadcast_address, .num_addresses, .num_addresses - 2',
      starterCode: `import ipaddress

def decrire_reseau(cidr):
    net = ipaddress.IPv4Network(cidr, strict=False)
    return {
        "reseau": str(net.network_address),
        "masque": str(net.netmask),
        "broadcast": str(net.broadcast_address),
        "prefixe": net.prefixlen,
        "nb_adresses": net.num_addresses,
        "nb_hotes": max(net.num_addresses - 2, ___),  # - réseau et broadcast
    }

info = decrire_reseau("192.168.1.0/24")
for k, v in info.items():
    print(f"{k:<12}: {v}")`,
      expectedCode: `max(net.num_addresses - 2, 0)`,
      validation: 'num_addresses - 2',
    },
    {
      id: 'ip-3',
      title: 'Lister les hôtes utilisables',
      instruction:
        'Écrivez hotes(cidr, limite=10) : retourne la liste des adresses utilisables (.hosts()), limitée aux N premières + le total.',
      hint: 'list(net.hosts())[:limite] — attention aux gros réseaux (/16 = 65 534 hôtes, ne pas tout afficher)',
      starterCode: `import ipaddress

def hotes(cidr, limite=10):
    net = ipaddress.IPv4Network(cidr, strict=False)
    tous = list(net.hosts())
    return [str(h) for h in tous[:___]], len(tous)

premiers, total = hotes("192.168.1.0/24")
print(f"Total hôtes : {total}")
print("Premiers :", premiers)
print("Dernier  :", hotes("192.168.1.0/24", limite=254)[0][-1])`,
      expectedCode: `tous[:limite]`,
      validation: '[:limite]',
    },
    {
      id: 'ip-4',
      title: 'Tester les appartenances',
      instruction:
        'Écrivez meme_reseau(ip1, ip2, cidr) et classifier(ip, reseaux) qui dit à quel réseau nommé appartient une IP (ou "inconnu").',
      hint: 'ipaddress.IPv4Address(ip) in IPv4Network(cidr) ; boucle sur dict nom -> cidr',
      starterCode: `import ipaddress

def dans_reseau(ip, cidr):
    return ipaddress.IPv4Address(ip) in ipaddress.IPv4Network(cidr, strict=False)

RESEAUX = {"LAN": "192.168.1.0/24", "DMZ": "10.0.0.0/24", "Loopback": "127.0.0.0/8"}

def classifier(ip):
    for nom, cidr in RESEAUX.items():
        if dans_reseau(ip, cidr):
            return ___
    return "Externe/Inconnu"

for ip in ["192.168.1.50", "10.0.0.5", "127.0.0.1", "8.8.8.8"]:
    print(f"{ip:<15} -> {classifier(ip)}")`,
      expectedCode: `return nom`,
      validation: 'return nom',
    },
    {
      id: 'ip-5',
      title: 'Découper en sous-réseaux',
      instruction:
        'Écrivez découper(cidr, nouveau_prefixe) : divise le réseau avec .subnets() et affiche chaque sous-réseau + sa plage.',
      hint: 'net.subnets(new_prefix=N) ; premier hôte = list(s.hosts())[0], dernier = [-1]',
      starterCode: `import ipaddress

def decouper(cidr, nouveau_prefixe):
    net = ipaddress.IPv4Network(cidr, strict=False)
    if nouveau_prefixe <= net.prefixlen:
        raise ValueError("Le nouveau préfixe doit être plus grand !")
    sous = list(net.subnets(new_prefix=___))
    for s in sous:
        h = list(s.hosts())
        print(f"{s}  →  {h[0]} … {h[-1]} ({s.num_addresses - 2} hôtes)")
    return [str(s) for s in sous]

# /24 découpé en 4× /26 (64 adresses chacun)
decouper("192.168.1.0/24", 26)`,
      expectedCode: `new_prefix=nouveau_prefixe`,
      validation: 'new_prefix=',
    },
    {
      id: 'ip-6',
      title: 'CLI admin : ipcalc.py',
      instruction:
        'Assemblez avec argparse : sous-commandes info / hotes / appartient / decoupe. Copiez dans ipcalc.py et testez en local.',
      hint: 'subparsers : p.add_subparsers(dest="cmd") ; parser_info.add_argument("cidr") ... ; if args.cmd == "info": ...',
      starterCode: `import argparse

def main():
    p = argparse.ArgumentParser(description="Calculateur IP pour admins réseaux")
    sp = p.add_subparsers(dest="cmd", required=True)

    pi = sp.add_parser("info", help="Décrit un réseau")
    pi.add_argument("cidr")

    ph = sp.add_parser("hotes", help="Liste les hôtes")
    ph.add_argument("cidr")
    ph.add_argument("--limite", type=int, default=10)

    pa = sp.add_parser("appartient", help="Teste l'appartenance")
    pa.add_argument("ip")
    pa.add_argument("cidr")

    pd = sp.add_parser("decoupe", help="Découpe en sous-réseaux")
    pd.add_argument("cidr")
    pd.add_argument("prefixe", type=int)

    args = p.parse_args()
    if args.cmd == "info":
        for k, v in decrire_reseau(args.cidr).items():
            print(f"{k:<12}: {v}")
    elif args.cmd == "hotes":
        premiers, total = hotes(args.cidr, args.limite)
        print(f"{total} hôtes, premiers : {premiers}")
    elif args.cmd == "appartient":
        print("OUI" if dans_reseau(args.ip, args.cidr) else "NON")
    elif args.cmd == "decoupe":
        decouper(args.cidr, args.prefixe)

if ___ == "___":
    main()

# Usages :
#   python ipcalc.py info 192.168.1.0/24
#   python ipcalc.py hotes 10.0.0.0/24 --limite 5
#   python ipcalc.py appartient 192.168.1.50 192.168.1.0/24
#   python ipcalc.py decoupe 192.168.1.0/24 26`,
      expectedCode: `if __name__ == "__main__":`,
      validation: '__main__',
    },
  ],
};

// ============================================================
// PROJET 7 (ADMIN RÉSEAUX) : SCANNER DE PORTS MULTITHREAD
// Concepts : socket, ThreadPoolExecutor, dict services, argparse
// ============================================================
export const portScannerProject: StandaloneProject = {
  id: 'scanner-ports',
  title: 'Scanner de Ports Multithread',
  icon: '🔍',
  level: 'Intermédiaire',
  duration: '~2h30',
  description:
    'Auditez une machine comme un admin : testez les ports TCP, identifiez les services courants et accélérez avec des threads. Usage : vos propres machines ou périmètre autorisé.',
  objectives: [
    'Tester un port TCP avec socket + timeout',
    'Scanner une plage et lister les ports ouverts',
    'Associer ports et noms de services',
    'Paralléliser avec ThreadPoolExecutor',
  ],
  steps: [
    {
      id: 'scan-1',
      title: 'Tester un port TCP',
      instruction:
        'Écrivez port_ouvert(hote, port, timeout=1.0) : connect_ex() retourne 0 si ouvert. Utilisez with pour fermer le socket.',
      hint: 's = socket.socket() ; s.settimeout(...) ; s.connect_ex((hote, port)) == 0 ; with socket... pour auto-fermeture',
      starterCode: `import socket

def port_ouvert(hote, port, timeout=1.0):
    """True si le port TCP est ouvert sur l'hôte."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(timeout)
        return s.connect_ex((hote, port)) == ___

# Tests en local (ports souvent fermés → False, c'est normal)
print("80 :", port_ouvert("127.0.0.1", 80))
print("22 :", port_ouvert("127.0.0.1", 22))`,
      expectedCode: `== 0`,
      validation: 'connect_ex',
    },
    {
      id: 'scan-2',
      title: 'Scanner une plage de ports',
      instruction:
        'Écrivez scanner(hote, debut, fin) : boucle sur la plage, collecte les ports ouverts, affiche la progression.',
      hint: 'ouverts = [p for p in range(debut, fin+1) if port_ouvert(...)] ; range() exclut la borne haute',
      starterCode: `def scanner(hote, debut, fin, timeout=1.0):
    """Retourne la liste des ports ouverts dans [debut, fin]."""
    ouverts = []
    for port in range(debut, fin + 1):
        if port_ouvert(hote, port, timeout):
            print(f"  ✅ {port} ouvert")
            ouverts.append(port)
    return ouverts

# Petit scan local des 20 premiers ports
print("Ouverts :", scanner("127.0.0.1", 1, 20, timeout=0.3))`,
      expectedCode: `ouverts.append(port)`,
      validation: '.append(port)',
    },
    {
      id: 'scan-3',
      title: 'Nommer les services',
      instruction:
        'Créez SERVICES (port → nom pour les 20 ports courants) et service_de(port) avec repli sur socket.getservbyport().',
      hint: 'SERVICES.get(port) or try: socket.getservbyport(port) except OSError: "inconnu"',
      starterCode: `import socket

SERVICES = {
    21: "FTP", 22: "SSH", 23: "Telnet", 25: "SMTP", 53: "DNS",
    80: "HTTP", 110: "POP3", 143: "IMAP", 443: "HTTPS",
    3306: "MySQL", 5432: "PostgreSQL", 6379: "Redis",
    27017: "MongoDB", 8080: "HTTP-alt",
}

def service_de(port):
    """Nom du service, ou 'inconnu'."""
    if port in SERVICES:
        return SERVICES[port]
    try:
        return socket.getservbyport(port)
    except OSError:
        return ___

for p in [22, 80, 443, 9999]:
    print(f"{p:<6} → {service_de(p)}")`,
      expectedCode: `return "inconnu"`,
      validation: '"inconnu"',
    },
    {
      id: 'scan-4',
      title: 'Accélérer avec des threads',
      instruction:
        'Réécrivez le scan avec ThreadPoolExecutor (ex: 50 threads) : mappe port_ouvert sur la plage — 100× plus rapide.',
      hint: 'with ThreadPoolExecutor(max_workers=50) as ex: resultats = ex.map(lambda p: (p, port_ouvert(...)), ports)',
      starterCode: `from concurrent.futures import ThreadPoolExecutor

def scanner_rapide(hote, debut, fin, threads=50, timeout=0.5):
    ports = list(range(debut, fin + 1))
    with ThreadPoolExecutor(max_workers=threads) as ex:
        resultats = ex.map(lambda p: (p, port_ouvert(hote, p, timeout)), ports)
    ouverts = [p for p, ok in resultats if ___]
    return sorted(ouverts)

import time
t0 = time.time()
print("Ouverts :", scanner_rapide("127.0.0.1", 1, 100))
print(f"⏱️ {time.time() - t0:.1f}s pour 100 ports")`,
      expectedCode: `if ok`,
      validation: 'if ok',
    },
    {
      id: 'scan-5',
      title: 'Rapport + CLI : scan.py',
      instruction:
        'Assemblez : arguments cible/ports/threads/timeout, tableau des ports ouverts + services, sauvegarde du rapport. Copiez dans scan.py.',
      hint: '--ports "1-1024" ou "22,80,443" : parsez avec split ; rapport écrit en .txt',
      starterCode: `import argparse

def parse_ports(texte):
    """'1-100' ou '22,80,443' -> liste de ports."""
    if "-" in texte:
        a, b = texte.split("-")
        return list(range(int(a), int(b) + 1))
    return [int(p) for p in texte.split(",")]

def main():
    p = argparse.ArgumentParser(description="Scanner de ports (usage: parc autorisé)")
    p.add_argument("cible", help="Hôte à scanner")
    p.add_argument("--ports", default="1-1024")
    p.add_argument("--threads", type=int, default=50)
    p.add_argument("--timeout", type=float, default=0.5)
    args = p.parse_args()

    print(f"🔍 Scan de {args.cible} ({args.ports})...")
    ouverts = scanner_rapide(args.cible, min(parse_ports(args.ports)),
                             max(parse_ports(args.ports)),
                             args.threads, args.timeout)
    lignes = [f"{port:<6} {service_de(port)}" for port in ouverts]
    print("\\nPORT   SERVICE\\n" + "\\n".join(lignes) if lignes else "Aucun port ouvert.")
    print(f"\\n✅ {len(ouverts)} port(s) ouvert(s)")

if __name__ == "__main__":
    main()

# Usage : python scan.py 127.0.0.1 --ports 1-100 --threads 50`,
      expectedCode: `if __name__ == "__main__":`,
      validation: '__main__',
    },
  ],
};

// ============================================================
// PROJET 8 (ADMIN RÉSEAUX) : MONITEUR RÉSEAU (PING + LOGS)
// Concepts : subprocess, regex, datetime, CSV, boucle temporisée
// ============================================================
export const netMonitorProject: StandaloneProject = {
  id: 'moniteur-reseau',
  title: 'Moniteur Réseau & Alertes',
  icon: '📡',
  level: 'Intermédiaire',
  duration: '~2h30',
  description:
    'Surveillez vos équipements comme un pro : ping périodique multi-hôtes, mesure de latence, journal CSV et alertes sur changement d\'état.',
  objectives: [
    'Pinger un hôte avec subprocess (Windows + Linux)',
    'Extraire la latence avec une regex',
    'Journaliser les états dans un CSV horodaté',
    'Alerter uniquement sur changement d\'état',
  ],
  steps: [
    {
      id: 'mon-1',
      title: 'Pinger en multiplateforme',
      instruction:
        'Écrivez ping(hote, delai=1) : construit la bonne commande selon l\'OS (ping -n/-c, -w/-W) et retourne True si l\'hôte répond.',
      hint: 'platform.system() == "Windows" ? ["ping","-n","1","-w",...] : ["ping","-c","1","-W",...] ; subprocess.run(..., capture_output=True) ; returncode == 0',
      starterCode: `import platform
import subprocess

def ping(hote, delai=1):
    """True si l'hôte répond au ping."""
    if platform.system() == "Windows":
        cmd = ["ping", "-n", "1", "-w", str(delai * 1000), hote]
    else:
        cmd = ["ping", "-c", "1", "-W", str(delai), hote]
    resultat = subprocess.run(cmd, capture_output=True, text=True)
    return resultat.returncode == ___

print("127.0.0.1 :", ping("127.0.0.1"))
print("8.8.8.8   :", ping("8.8.8.8"))`,
      expectedCode: `== 0`,
      validation: 'returncode',
    },
    {
      id: 'mon-2',
      title: 'Mesurer la latence (regex)',
      instruction:
        'Écrivez latence(hote) : ping + extraction de "time=X ms" / "temps=Xms" via regex, retourne les ms (float) ou None.',
      hint: 're.search(r"time[<=]([0-9.]+)\\s*ms", sortie, re.IGNORECASE) — couvre "time=12.3 ms" et "temps=12ms"',
      starterCode: `import re
import subprocess
import platform

def latence(hote):
    """Latence en ms, ou None si injoignable."""
    opt_n = "-n" if platform.system() == "Windows" else "-c"
    cmd = ["ping", opt_n, "1", hote]
    sortie = subprocess.run(cmd, capture_output=True, text=True).stdout
    m = re.search(r"time[<=]([0-9.]+)\\s*ms", sortie, re.IGNORECASE)
    return float(m.group(1)) if m else ___

print("127.0.0.1 :", latence("127.0.0.1"), "ms")
print("inexistant :", latence("192.0.2.1"))  # IP de test (réservée, injoignable)`,
      expectedCode: `else None`,
      validation: 'None',
    },
    {
      id: 'mon-3',
      title: 'Journaliser en CSV',
      instruction:
        'Écrivez journaliser(fichier, horodatage, resultats) qui ajoute une ligne par hôte : horodatage,hote,etat,latence_ms.',
      hint: 'csv.DictWriter en mode "a", newline="" ; écrire l\'en-tête seulement si le fichier est nouveau/vide',
      starterCode: `import csv
from pathlib import Path
from datetime import datetime

def journaliser(fichier, resultats):
    """resultats = {hote: (etat, latence)} ; ajoute au CSV."""
    fichier = Path(fichier)
    nouveau = not fichier.exists() or fichier.stat().st_size == 0
    with open(fichier, "a", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["horodatage", "hote", "etat", "latence_ms"])
        if nouveau:
            w.___
        moment = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        for hote, (etat, lat) in resultats.items():
            w.writerow({"horodatage": moment, "hote": hote, "etat": etat, "latence_ms": lat or ""})

journaliser("test_log.csv", {"127.0.0.1": ("UP", 0.5)})
print(Path("test_log.csv").read_text(encoding="utf-8"))`,
      expectedCode: `w.writeheader()`,
      validation: 'writeheader',
    },
    {
      id: 'mon-4',
      title: 'Alerter sur changement d\'état',
      instruction:
        'Écrivez cycle(hotes, etats_precedents) : ping chaque hôte, compare avec l\'état précédent, affiche une alerte 🚨 si ça change.',
      hint: 'etat = "UP" if ping(h) else "DOWN" ; if h in precedents and precedents[h] != etat: print("🚨 ...") ; precedents[h] = etat',
      starterCode: `def cycle(hotes, precedents):
    """Un tour de supervision. Retourne {hote: (etat, latence)}."""
    resultats = {}
    for h in hotes:
        en_ligne = ping(h)
        etat = "UP" if en_ligne else "DOWN"
        lat = latence(h) if en_ligne else None
        if h in precedents and precedents[h][0] != ___:
            print(f"🚨 {h} : {precedents[h][0]} → {etat} !")
        elif h not in precedents:
            print(f"🔎 {h} : {etat} ({lat} ms)" if lat else f"🔎 {h} : {etat}")
        precedents[h] = (etat, lat)
        resultats[h] = (etat, lat)
    return resultats

etats = {}
cycle(["127.0.0.1", "192.0.2.1"], etats)
print("--- 2e cycle (pas d'alertes si stable) ---")
cycle(["127.0.0.1", "192.0.2.1"], etats)`,
      expectedCode: `precedents[h][0] != etat`,
      validation: '!= etat',
    },
    {
      id: 'mon-5',
      title: 'Supervision continue : monitor.py',
      instruction:
        'Assemblez : liste d\'hôtes en argument, intervalle --toutes (secondes), --duree optionnelle, journal CSV, résumé final (disponibilité %). Copiez dans monitor.py.',
      hint: 'time.sleep(intervalle) ; tours = duree // intervalle si duree ; dispo = ups/total*100 par hôte',
      starterCode: `import argparse
import time
from collections import Counter

def main():
    p = argparse.ArgumentParser(description="Moniteur réseau avec alertes")
    p.add_argument("hotes", nargs="+", help="Hôtes à surveiller")
    p.add_argument("--toutes", type=int, default=60, help="Intervalle (s)")
    p.add_argument("--duree", type=int, default=0, help="Durée totale (s, 0=infini)")
    p.add_argument("--log", default="supervision.csv")
    args = p.parse_args()

    precedents = {}
    compteur = Counter()
    total_cycles = 0
    print(f"📡 Supervision de {', '.join(args.hotes)} toutes les {args.toutes}s (Ctrl+C pour arrêter)")
    try:
        while True:
            resultats = cycle(args.hotes, precedents)
            journaliser(args.log, resultats)
            for h, (etat, _) in resultats.items():
                compteur[(h, etat)] += 1
            total_cycles += 1
            if args.duree and total_cycles * args.toutes >= args.duree:
                break
            time.sleep(args.toutes)
    except KeyboardInterrupt:
        print("\\n⏹️ Arrêt demandé.")
    print("\\n📊 Disponibilité :")
    for h in args.hotes:
        ups = compteur[(h, "UP")]
        print(f"  {h:<15} : {ups}/{total_cycles} OK ({ups / max(total_cycles, 1) * 100:.0f} %)")

if __name__ == "__main__":
    main()

# Usages :
#   python monitor.py 127.0.0.1 8.8.8.8 --toutes 10 --duree 60
#   python monitor.py box-lan --toutes 30 --log bureau.csv`,
      expectedCode: `if __name__ == "__main__":`,
      validation: '__main__',
    },
  ],
};

export const standaloneProjects: StandaloneProject[] = [
  hangmanProject,
  morpionProject,
  contactsProject,
  passwordProject,
  ppcProject,
  subnetProject,
  portScannerProject,
  netMonitorProject,
];

export function getStandaloneProject(id: string): StandaloneProject | undefined {
  return standaloneProjects.find(p => p.id === id);
}

// Conservé pour compatibilité (ancien nom d'export)
export const allProjects = standaloneProjects;
