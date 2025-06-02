# 🐾 MyPets - Frontend

Application front-end développée avec **Next.js 14**, **TypeScript**, **Tailwind CSS** et **GraphQL**, pour la gestion d'animaux et de leurs propriétaires.

---

## Technologies principales

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **GraphQL**

---

## Lancer le projet en local

### 1. Cloner le repo

```bash
git clone https://github.com/SoleneMarie/mypets-front.git
cd mypets-front
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier .env.local à la racine :

```
NEXT_PUBLIC_GRAPHQL_API_URL=http://monPortBackend/graphql
```

(A adapter en fonction du port de ton backend Nest.js)

### 4. Lancer le projet

```bash
npm run dev
```

---

## Fonctionnalités principales

- 🔍 Listes paginées des animaux et des propriétaires
- 👤 Affichage détaillé d’un animal avec son propriétaire, d'un propriétaire avec ses animaux
- 📊 Quizz : espèce la plus représentée, animal le plus lourd, etc.
- ⚙️ Composants réutilisables : Header, Footer, Loader, etc.

---

## 📁 Structure du projet

```
/components
  /ui        # Composants génériques (Header, Footer, Loader…)

/public        # Ressources statiques

/src
    /app
        /home       # Page d’accueil
        /animal/[id]  # Détail d’un animal
        /person/[id]  # Détail d’un propriétaire
        global.css # Styles globaux
        layout.tsx   # Layout global de l’app
        not-found.tsx # Page 404 personnalisée
        page.tsx    # Page d’entrée
    /lib
        /graphql    # Requêtes GraphQL
        /utils     # Fonctions utilitaires

.env.example   # Exemple de configuration
.env.local     # Variables d’environnement locales
```

---

## 🔗 Backend associé

Cette application front-end communique avec une API Nest.js (GraphQL) disponible ici :

👉 [Dépôt GitHub – mypets-api](https://github.com/SoleneMarie/mypets-api)

Le backend gère :

- La base de données (MySQL)
- Les entités `Animal` et `Person`
- Les resolvers GraphQL
- Les traductions via My Memory
- Les paginations

## 👩‍💻 Auteur

Projet réalisé dans le cadre d’un exercice technique.  
Codé avec ❤️ par **Solène**.
