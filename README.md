
# 🌿 ToDo-List App - Focus & Productivity

Une application de gestion de tâches et de dossiers pensée pour la productivité, avec une interface minimaliste, apaisante et sans distraction.

## ✨ Fonctionnalités Principales

* **Mode Focus par défaut** : Les tâches terminées ou abandonnées sont masquées pour garder l'esprit clair sur ce qu'il reste à accomplir.
* **Architecture de l'information (Simple / Complet)** : Chaque tâche affiche l'essentiel par défaut (Titre, Date d'échéance, 2 dossiers). Un clic permet de révéler les détails et la description complète.
* **Gestion des Dossiers** : Organisez vos tâches via des dossiers personnalisés (Titre, Description, Code couleur).
* **Filtres et Tris** : Triez vos tâches par date de création, échéance ou nom, et filtrez-les par statut ou par dossier spécifique.
* **Statistiques en temps réel** : Suivi du nombre total de tâches et des tâches actives directement depuis le Header.

## 🛠️ Stack Technique

* **React.js** (Hooks, Context API)
* **CSS3** (Variables CSS, Flexbox, approche brutaliste et minimaliste)
* **JSON** (Données mockées pour simuler une base de données)

## 🚀 Installation & Lancement

1. Cloner le dépôt sur votre machine :
   ```bash
   git clone https://github.com/julesfuselier/ToDoApp-React.git
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer l'environnement de développement :
   ```bash
   npm start
   ```
   L'application sera accessible sur `http://localhost:3000`.

## 📂 Structure du projet

Le projet suit une architecture modulaire, où chaque composant possède son propre dossier contenant sa logique (`.js`) et son style (`.css`), garantissant une excellente maintenabilité.
