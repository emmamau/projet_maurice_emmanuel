# Projet Pédagogique : Application Pollution (Angular & Node.js API)

Ce projet pédagogique a pour objectif d'introduire la **consommation d'une API REST distante depuis une application Angular moderne** à l'aide des **Observables RxJS** et des **Signals Angular**.

---

## Architecture du Projet

Le dépôt est structuré en deux parties distinctes :

```
├── api/                         # Backend Node.js / TypeScript / Express / Sequelize
│   ├── src/
│   │   ├── config.ts            # Configuration BDD & variables d'environnement
│   │   ├── controllers/
│   │   │   └── pollution.controllers.ts  # Contrôleur GET /api/pollutions
│   │   ├── models/
│   │   │   ├── index.ts         # Initialisation Sequelize & mapping
│   │   │   └── pollutions.model.ts       # Schéma de la table 'pollution'
│   │   ├── routes/
│   │   │   ├── index.ts         # Agrégation des routes
│   │   │   └── pollution.routes.ts       # Définition des routes /api/pollutions
│   │   └── index.ts             # Serveur Express & initialisation DB
│   └── package.json
│
├── front/
│   └── pollution/               # Frontend Angular (Standalone Components & Signals)
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   │   └── pollution-list/   # Composant d'affichage des pollutions
│       │   │   ├── models/
│       │   │   │   └── pollution.model.ts # Interface TypeScript Pollution
│       │   │   ├── services/
│       │   │   │   └── pollution.service.ts # Service d'appel HTTP (Observable)
│       │   │   ├── app.config.ts # Configuration globale (provideHttpClient)
│       │   │   ├── app.ts        # Composant racine
│       │   │   └── app.html      # Vue principale
│       │   └── environments/    # URLs d'API (dev & prod)
│       └── package.json
│
└── render.yaml                  # Blueprint Infrastructure-as-Code pour Render.com
```

---

## 1. Principes Pédagogiques Clés

### A. Côté Frontend Angular

1. **Service HTTP (`PollutionService`)** :
   - Expose une méthode `getPollutions(): Observable<Pollution[]>`.
   - Utilise le client moderne `HttpClient` configuré avec `provideHttpClient(withFetch())`.
   - Retourne un flux asynchrone RxJS (`Observable`).

2. **Composant (`PollutionListComponent`)** :
   - Injecte le service `PollutionService`.
   - Transforme l'Observable en Signal réactif via l'utilitaire officiel `@angular/core/rxjs-interop` :
     ```typescript
     readonly pollutions = toSignal(this.pollutionService.getPollutions(), {
       initialValue: [] as Pollution[]
     });
     ```
   - Avantage pédagogique : suppression des `async pipe` verbeux ou des abonnements manuels (`subscribe`) avec risque de fuite mémoire. Le template consomme directement le signal avec la syntaxe `pollutions()`.

3. **Template Angular** :
   - Utilise le nouveau bloc de contrôle de flux `@if` et `@for` :
     ```html
     @for (p of pollutions(); track p.id) {
       <tr>
         <td>{{ p.ville }}</td>
         <td>{{ p.polluant }}</td>
         <td>{{ p.valeur }} µg/m³</td>
         <td>{{ p.date }}</td>
       </tr>
     }
     ```

### B. Côté API Backend Node.js / TypeScript

1. **Modèle Sequelize (`pollution`)** :
   - Schéma adapté à la table `pollution` avec les champs : `id`, `ville`, `valeur`, `polluant`, `date`, `description`.
   - Création et synchronisation automatique via `sequelize.sync()`.
   - **Génération automatique de données de démonstration** : si la table est vide lors du premier démarrage, un jeu de données initial représentatif de plusieurs villes françaises est automatiquement inséré.

2. **Désactivation temporaire du JWT** :
   - Comme demandé pour cette première séance d'introduction, la vérification des tokens JWT a été retirée des routes pour simplifier la découverte du protocole HTTP GET. Les fichiers dédiés au JWT sont conservés pour être réintroduits lors des prochains cours.

---

## 2. Exécution en Local

### Prérequis
- Node.js (version 20+ recommandée)
- npm

### Étape 1 : Démarrer l'API Backend
```bash
cd api
npm install
npm run dev
```
L'API est accessible sur `http://localhost:3000`. Vous pouvez tester l'endpoint :
`GET http://localhost:3000/api/pollutions`

### Étape 2 : Démarrer le Frontend Angular
Dans un nouveau terminal :
```bash
cd front/pollution
npm install
npm start
```
L'application est accessible sur `http://localhost:4200`.

---

## 3. Déploiement sur Render.com via Blueprint

Le fichier [render.yaml](render.yaml) situé à la racine décrit l'infrastructure complète à déployer :

1. **Une base de données PostgreSQL managée** (`pollution-db`).
2. **Un service Web Node.js** (`pollution-api`) connecté automatiquement à la base PostgreSQL via la variable `DATABASE_URL`.
3. **Un site statique Angular** (`pollution-front`) compilé via `npm run build` et servi avec réécriture d'URL pour le routing SPA.

### Déploiement en 1 clic :
1. Poussez ce dépôt sur votre compte GitHub / GitLab.
2. Rendez-vous sur le tableau de bord [Render.com](https://dashboard.render.com).
3. Cliquez sur **New +** &rarr; **Blueprint**.
4. Sélectionnez votre dépôt : Render détecte automatiquement `render.yaml` et prépare les 3 services.
5. Cliquez sur **Apply** : la base PostgreSQL, l'API et le Frontend Angular sont déployés et opérationnels.

