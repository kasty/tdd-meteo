# tdd-meteo

Conseiller vestimentaire selon la météo — exercice **TDD** + **architecture hexagonale**.

> *« Donne-moi une localisation, je te dis quoi porter aujourd'hui. »*

## Démarrage

```bash
npm install
npm test          # lance les tests une fois
npm run test:watch  # mode watch (idéal en TDD red-green-refactor)
npm run typecheck   # vérifie les types sans compiler
```

## API externe (sans authentification)

[Open-Meteo](https://open-meteo.com/) :

```
GET https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code
```

## Structure cible (architecture hexagonale)

```
src/
  domain/                    # cœur métier — AUCUNE dépendance vers l'infra
    ports/                   # interfaces (ports secondaires)
  infrastructure/            # adapters (fetch Open-Meteo, traduction du JSON)
  app/                       # use cases — orchestrent ports + domaine
tests/
```

## Ordre TDD conseillé

1. Domaine d'abord (règles vestimentaires), sans réseau.
2. Use case, avec un **fake** du port météo (en mémoire).
3. Adapter Open-Meteo réel en dernier, en test d'intégration séparé.
