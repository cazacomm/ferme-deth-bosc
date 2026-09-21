# La Ferme Deth Bosc — site vitrine

Site vitrine statique, hébergé sur GitHub Pages.
Producteur de légumes & primeur — Orleix / Tarbes (65).

## Stack

Aucun build, aucune dépendance à installer. HTML + CSS + JS natifs.
Three.js est chargé depuis un CDN via un `importmap`.

```
index.html               page unique (toutes les sections)
mentions-legales.html
assets/css/style.css     design system + toutes les sections
assets/js/main.js        horaires, bandeau "ouvert aujourd'hui", nav, reveals
assets/js/hero3d.js      scène 3D du hero (Three.js, procédurale)
assets/img/              placeholders SVG (à remplacer par les photos)
assets/video/            vidéos client (vide pour l'instant)
```

## Développement local

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Un simple `open index.html` ne suffit pas : les modules ES (hero 3D) exigent un serveur HTTP.

## Modifier les horaires

Tout part de `assets/js/main.js`, en haut du fichier : les constantes
`LOCATIONS` et `MARKETS`. Elles alimentent **à la fois** le bandeau
« Aujourd'hui », les pastilles ouvert/fermé et les tableaux d'horaires.
Ne pas écrire d'horaires en dur dans le HTML.

Format : `0 = dimanche … 6 = samedi`, créneaux `[["08:30","13:00"],["15:00","19:30"]]`.

⚠️ Penser à répercuter tout changement dans le bloc `application/ld+json`
en bas de `index.html` (SEO local / fiche Google).

## Remplacer les images

Chaque placeholder SVG porte son nom, ses dimensions cibles et ce qu'il
attend. Déposer la photo au même endroit puis changer l'extension dans le
HTML (`.svg` → `.jpg`). Format conseillé : JPEG qualité 80, ou WebP.

## Déploiement

Push sur `main` → GitHub Pages publie automatiquement la racine du repo.
Le fichier `.nojekyll` empêche Jekyll de filtrer les dossiers.

Nom de domaine : ajouter un fichier `CNAME` à la racine contenant le
domaine, puis pointer les DNS vers GitHub Pages.

---
Réalisé par [Caza Comm](https://cazacomm.fr)
