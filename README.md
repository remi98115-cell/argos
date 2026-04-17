# ARGOS — Tableau de bord géopolitique live

Tableau de bord mondial temps réel : carte Leaflet, 20+ chaînes news live (YouTube), webcams OSINT zones de conflit, météo Open-Meteo avec alertes, séismes USGS, flux GDELT, prix crypto/forex, drag-drop des panneaux.

Nommé d'après Argos Panoptes, géant mythologique grec aux 100 yeux — symbole de surveillance permanente.

## Sources live (toutes gratuites, sans API key)

- **Carte** : OpenStreetMap / CartoDB dark
- **Séismes** : USGS Earthquake Hazards (M4.5+ semaine)
- **Catastrophes** : NASA EONET (volcans, incendies, tempêtes)
- **Météo** : Open-Meteo (60+ villes, alertes perturbations)
- **News vidéo** : YouTube Live (France 24, DW, Al Jazeera, Sky News, CNN-News18, etc.)
- **Webcams** : YouTube Live (OSINT aggregators zones de conflit)
- **Articles géopolitiques** : GDELT 2.0 DOC API (via proxy CORS)
- **Marchés** : CoinGecko (crypto) + ExchangeRate-API (forex)

## Lancer en local

```bash
python -m http.server 8765
# puis ouvrir http://localhost:8765
```

## Déploiement

100% statique — déployable sur n'importe quel hébergeur gratuit (Netlify, Vercel, GitHub Pages, Cloudflare Pages). Aucun build requis.

## Architecture

- `index.html` — structure (top-bar, sidebar, dashboard masonry)
- `styles.css` — thème sombre monospace, responsive, multicol masonry
- `data.js` — fetchers live + dataset curé
- `app.js` — logique Leaflet, rendu panneaux, drag-drop, URL state

## Fonctionnalités

- Carte interactive 35 couches (conflits, bases, nucléaire, cyber, séismes, météo…)
- 10+ panneaux dashboard réorganisables par drag (ordre persistant)
- Ajouter/supprimer des panneaux via bouton dédié
- Recherche ⌘K, export CSV/JSON, thème clair/sombre
- Responsive (desktop/tablette/mobile)
