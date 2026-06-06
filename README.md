# tdd-meteo

Conseiller vestimentaire selon la météo — exercice **TDD** + **architecture hexagonale** (ports & adapters) en TypeScript.

> *« Donne-moi une localisation, je te dis quoi porter aujourd'hui. »*

L'utilisateur saisit une latitude/longitude → l'app récupère la météo via [Open-Meteo](https://open-meteo.com/) → le domaine applique des règles vestimentaires → l'UI affiche le conseil.

## Démarrage

```bash
npm install
```

Crée un fichier `.env` à la racine (voir `.env.example`) :

```
VITE_URL_OPEN_METEO=https://api.open-meteo.com/v1/forecast?latitude=%latitude%&longitude=%longitude%&current=temperature_2m,apparent_temperature,wind_speed_10m,precipitation
```

> Les jetons `%latitude%` / `%longitude%` sont remplacés à la volée par l'adapter. Le préfixe `VITE_` est requis pour que la variable soit exposée au navigateur.

Puis :

```bash
npm run dev        # lance l'app (Vite) dans le navigateur
npm test           # lance tous les tests une fois
npm run test:watch # mode watch (idéal en TDD red-green-refactor)
npm run test:cov   # tests + rapport de couverture
npm run typecheck  # vérifie les types sans compiler (tsc --noEmit)
```

## API externe (sans authentification)

[Open-Meteo](https://open-meteo.com/) — endpoint `current`, aucun jeton requis :

```
GET https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m,apparent_temperature,wind_speed_10m,precipitation
```

## Architecture hexagonale

Règle d'or : **les dépendances pointent toujours vers le domaine**. L'extérieur (Open-Meteo, React) dépend du cœur, jamais l'inverse.

```
src/
  domain/                          # cœur métier — AUCUNE dépendance sortante
    conseiller.ts                  #   règles vestimentaires (le QUOI)
    conseiller-meteo.types.ts      #   types du domaine (MeteoData, Localisation)
    errors.ts                      #   MeteoIndisponibleError (erreur métier)
    ports/
      fournisseur-meteo.ts         #   port secondaire (interface)
  app/                             # couche application
    conseiller-tenue.ts            #   use case : orchestre port + domaine (le COMMENT)
  infrastructure/                  # adapter secondaire (driven)
    OpenMeteoProvider.ts           #   implémente le port : fetch + traduction du JSON + erreurs
  ui/                              # adapter primaire (driving)
    main.tsx                       #   composition root : lit l'env, crée l'adapter, l'injecte
    App.tsx
    components/
      FormMeteo.tsx                #   formulaire + états chargement / résultat / erreur
      Layout.tsx
tests/
  InMemoryFournisseurMeteo.ts      #   fake du port (implémente FournisseurMeteo)
```

### Le flux

```
ui (driving) ──▶ app/conseillerTenue ──▶ domain/getMeteoAdvice
                        │
                        ▼
              port FournisseurMeteo ◀── infrastructure/OpenMeteoProvider (driven)
                        ▲
                        └── tests : InMemoryFournisseurMeteo (fake injecté)
```

Le use case et l'UI dépendent du **port** `FournisseurMeteo`, jamais de la classe `OpenMeteoProvider`. Seul `main.tsx` (le composition root) connaît l'adapter concret et le câble.

## Tests

13 tests couvrant chaque couche avec l'outil adapté :

- **domaine / use case** — règles pures, sans réseau.
- **infrastructure** — `fetch` mocké : on teste la traduction du JSON et les modes d'échec (réseau, HTTP non-ok, format invalide).
- **UI** (`FormMeteo`) — Testing Library, le **fake** du port est injecté (zéro réseau) ; les trois états sont couverts (succès, erreur, chargement via une *promesse contrôlée*).

Le cœur métier (`domain` / `app` / `infrastructure`) est à 100 % de branches. Les fichiers de types, les ports et le composition root sont exclus du rapport de couverture (rien d'exécutable à mesurer).

## Ordre TDD suivi

1. Domaine d'abord (règles vestimentaires), sans réseau.
2. Use case, avec un **fake** du port météo (en mémoire).
3. Adapter Open-Meteo réel (traduction + gestion d'erreur), `fetch` mocké.
4. UI en dernier, fake injecté.
