import type { ProjectStep } from './modules';

// Step-by-step Calculator Project - COMPREHENSIVE VERSION
export const calculatorProject: {
  title: string;
  description: string;
  objectives: string[];
  steps: ProjectStep[];
} = {
  title: 'Calculatrice Python Avancée',
  description: 'Créez une calculatrice scientifique complète qui couvre TOUS les concepts Python : imports, fonctions, while/break, try/except, dictionnaires, listes et plus !',
  objectives: [
    'Maîtriser les imports (math, datetime)',
    'Créer des fonctions avec paramètres et return',
    'Utiliser while True avec break pour le menu',
    'Gérer les erreurs avec try/except',
    'Utiliser des dictionnaires pour les opérations',
    'Stocker l\'historique dans une liste',
    'Valider les entrées utilisateur'
  ],
  steps: [
    {
      id: 'calc-step-1',
      title: 'Afficher le menu',
      instruction: 'Créez une fonction afficher_menu() qui affiche les options de la calculatrice.',
      hint: 'Utilisez plusieurs print() pour afficher chaque ligne du menu.',
      starterCode: `def afficher_menu():
    """Affiche le menu de la calculatrice"""
    print("=" * 30)
    print("    🧮 CALCULATRICE PYTHON")
    print("=" * 30)
    # Ajoutez les options ici
    ___
    ___
    ___
    ___
    ___`,
      expectedCode: `def afficher_menu():
    print("=" * 30)
    print("    🧮 CALCULATRICE PYTHON")
    print("=" * 30)
    print("1. Addition (+)")
    print("2. Soustraction (-)")
    print("3. Multiplication (×)")
    print("4. Division (÷)")
    print("5. Quitter")`,
      validation: 'print'
    },
    {
      id: 'calc-step-2',
      title: 'Fonction Addition',
      instruction: 'Créez une fonction additionner(a, b) qui retourne la somme de deux nombres.',
      hint: 'return a + b',
      starterCode: `def additionner(a, b):
    """Retourne la somme de a et b"""
    return ___`,
      expectedCode: `def additionner(a, b):
    return a + b`,
      validation: 'return a + b'
    },
    {
      id: 'calc-step-3',
      title: 'Fonction Soustraction',
      instruction: 'Créez une fonction soustraire(a, b) qui retourne la différence.',
      hint: 'return a - b',
      starterCode: `def soustraire(a, b):
    """Retourne la différence a - b"""
    return ___`,
      expectedCode: `def soustraire(a, b):
    return a - b`,
      validation: 'return a - b'
    },
    {
      id: 'calc-step-4',
      title: 'Fonction Multiplication',
      instruction: 'Créez une fonction multiplier(a, b) qui retourne le produit.',
      hint: 'return a * b',
      starterCode: `def multiplier(a, b):
    """Retourne le produit de a et b"""
    return ___`,
      expectedCode: `def multiplier(a, b):
    return a * b`,
      validation: 'return a * b'
    },
    {
      id: 'calc-step-5',
      title: 'Fonction Division sécurisée',
      instruction: 'Créez une fonction diviser(a, b) qui gère la division par zéro.',
      hint: 'Vérifiez si b == 0 avant de diviser',
      starterCode: `def diviser(a, b):
    """Retourne a/b ou None si division par zéro"""
    if b == 0:
        print("❌ Erreur: Division par zéro impossible!")
        return ___
    return ___`,
      expectedCode: `def diviser(a, b):
    if b == 0:
        print("❌ Erreur: Division par zéro impossible!")
        return None
    return a / b`,
      validation: 'if b == 0'
    },
    {
      id: 'calc-step-6',
      title: 'Demander les nombres',
      instruction: 'Créez une fonction demander_nombres() qui demande 2 nombres à l\'utilisateur.',
      hint: 'Utilisez input() et float() pour convertir',
      starterCode: `def demander_nombres():
    """Demande deux nombres à l'utilisateur"""
    try:
        a = ___(input("Premier nombre: "))
        b = ___(input("Deuxième nombre: "))
        return a, b
    except ValueError:
        print("❌ Veuillez entrer des nombres valides!")
        return None, None`,
      expectedCode: `def demander_nombres():
    try:
        a = float(input("Premier nombre: "))
        b = float(input("Deuxième nombre: "))
        return a, b
    except ValueError:
        print("❌ Veuillez entrer des nombres valides!")
        return None, None`,
      validation: 'float'
    },
    {
      id: 'calc-step-7',
      title: 'Effectuer l\'opération',
      instruction: 'Créez une fonction effectuer_operation(choix, a, b) qui appelle la bonne fonction.',
      hint: 'Utilisez if/elif pour chaque choix',
      starterCode: `def effectuer_operation(choix, a, b):
    """Effectue l'opération selon le choix"""
    if choix == "1":
        resultat = additionner(a, b)
        print(f"✅ {a} + {b} = {resultat}")
    elif choix == "2":
        resultat = ___(a, b)
        print(f"✅ {a} - {b} = {resultat}")
    elif choix == "3":
        resultat = ___(a, b)
        print(f"✅ {a} × {b} = {resultat}")
    elif choix == "4":
        resultat = ___(a, b)
        if resultat is not None:
            print(f"✅ {a} ÷ {b} = {resultat}")`,
      expectedCode: `def effectuer_operation(choix, a, b):
    if choix == "1":
        resultat = additionner(a, b)
        print(f"✅ {a} + {b} = {resultat}")
    elif choix == "2":
        resultat = soustraire(a, b)
        print(f"✅ {a} - {b} = {resultat}")
    elif choix == "3":
        resultat = multiplier(a, b)
        print(f"✅ {a} × {b} = {resultat}")
    elif choix == "4":
        resultat = diviser(a, b)
        if resultat is not None:
            print(f"✅ {a} ÷ {b} = {resultat}")`,
      validation: 'elif choix'
    },
    {
      id: 'calc-step-8',
      title: 'Boucle principale',
      instruction: 'Créez la fonction main() avec la boucle while pour le programme principal.',
      hint: 'Utilisez while True avec break pour sortir',
      starterCode: `def main():
    """Fonction principale de la calculatrice"""
    print("\\n🎉 Bienvenue dans la calculatrice Python!")
    
    while ___:
        afficher_menu()
        choix = input("\\nChoisissez une option (1-5): ")
        
        if choix == "5":
            print("\\n👋 Au revoir!")
            ___
        
        if choix not in ["1", "2", "3", "4"]:
            print("❌ Option invalide!")
            continue
        
        a, b = demander_nombres()
        if a is not None:
            effectuer_operation(choix, a, b)

# Lancer le programme
main()`,
      expectedCode: `def main():
    print("\\n🎉 Bienvenue dans la calculatrice Python!")
    
    while True:
        afficher_menu()
        choix = input("\\nChoisissez une option (1-5): ")
        
        if choix == "5":
            print("\\n👋 Au revoir!")
            break
        
        if choix not in ["1", "2", "3", "4"]:
            print("❌ Option invalide!")
            continue
        
        a, b = demander_nombres()
        if a is not None:
            effectuer_operation(choix, a, b)

main()`,
      validation: 'while True'
    },
    {
      id: 'calc-step-9',
      title: 'Ajouter l\'historique',
      instruction: 'Ajoutez une liste pour stocker l\'historique des calculs.',
      hint: 'Créez une liste globale et ajoutez chaque calcul',
      starterCode: `# Au début du programme
historique = []

def effectuer_operation(choix, a, b):
    """Effectue l'opération et sauvegarde dans l'historique"""
    resultat = None
    operation = ""
    
    if choix == "1":
        resultat = additionner(a, b)
        operation = f"{a} + {b} = {resultat}"
    elif choix == "2":
        resultat = soustraire(a, b)
        operation = f"{a} - {b} = {resultat}"
    # ... autres opérations
    
    if resultat is not None:
        ___.append(operation)
        print(f"✅ {operation}")

def afficher_historique():
    """Affiche l'historique des calculs"""
    if not historique:
        print("📝 Aucun calcul dans l'historique")
    else:
        print("\\n📜 Historique des calculs:")
        for i, calc in enumerate(___, 1):
            print(f"  {i}. {calc}")`,
      expectedCode: `historique = []

def effectuer_operation(choix, a, b):
    resultat = None
    operation = ""
    
    if choix == "1":
        resultat = additionner(a, b)
        operation = f"{a} + {b} = {resultat}"
    
    if resultat is not None:
        historique.append(operation)
        print(f"✅ {operation}")

def afficher_historique():
    if not historique:
        print("📝 Aucun calcul dans l'historique")
    else:
        print("\\n📜 Historique des calculs:")
        for i, calc in enumerate(historique, 1):
            print(f"  {i}. {calc}")`,
      validation: 'historique'
    },
    {
      id: 'calc-step-10',
      title: 'Programme complet',
      instruction: 'Assemblez toutes les parties pour créer le programme final.',
      hint: 'Copiez tout le code et testez-le localement',
      starterCode: `# 🧮 CALCULATRICE PYTHON COMPLÈTE
# Copiez ce code dans un fichier calculatrice.py
# et exécutez-le avec: python calculatrice.py

historique = []

def afficher_menu():
    print("\\n" + "=" * 30)
    print("    🧮 CALCULATRICE PYTHON")
    print("=" * 30)
    print("1. Addition (+)")
    print("2. Soustraction (-)")
    print("3. Multiplication (×)")
    print("4. Division (÷)")
    print("5. Historique")
    print("6. Quitter")

def additionner(a, b):
    return a + b

def soustraire(a, b):
    return a - b

def multiplier(a, b):
    return a * b

def diviser(a, b):
    if b == 0:
        print("❌ Division par zéro!")
        return None
    return a / b

def demander_nombres():
    try:
        a = float(input("Premier nombre: "))
        b = float(input("Deuxième nombre: "))
        return a, b
    except ValueError:
        print("❌ Nombres invalides!")
        return None, None

def main():
    print("\\n🎉 Calculatrice Python")
    
    while True:
        afficher_menu()
        choix = input("\\nOption: ")
        
        if choix == "6":
            print("👋 Au revoir!")
            break
        elif choix == "5":
            print("Historique:", historique)
            continue
        elif choix in ["1", "2", "3", "4"]:
            a, b = demander_nombres()
            if a is not None:
                # Effectuer l'opération...
                pass
        else:
            print("❌ Option invalide!")

main()`,
      expectedCode: `# Calculatrice complète
# Exécutez localement`,
      validation: 'main()'
    }
  ]
};

// Hangman Game Project
export const hangmanProject = {
  title: 'Jeu du Pendu',
  description: 'Créez un jeu du pendu classique avec choix de mots, affichage progressif et comptage des erreurs.',
  objectives: [
    'Gérer une liste de mots',
    'Utiliser des boucles et conditions',
    'Manipuler les chaînes de caractères',
    'Créer une interface en console'
  ],
  steps: [] // Would add similar detailed steps
};

// Contact Manager Project
export const contactManagerProject = {
  title: 'Gestionnaire de Contacts',
  description: 'Créez une application CRUD pour gérer vos contacts avec sauvegarde JSON.',
  objectives: [
    'Utiliser des dictionnaires',
    'Lire et écrire des fichiers JSON',
    'Implémenter les opérations CRUD',
    'Valider les données utilisateur'
  ],
  steps: []
};

export const allProjects = [
  calculatorProject,
  hangmanProject,
  contactManagerProject
];
