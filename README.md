# La Ferme Deth Bosc, site vitrine

Site statique hébergé sur GitHub Pages.
Producteur de légumes et primeur. Orleix / Tarbes (65).

## Stack

Aucun build, aucune dépendance, aucun CDN. HTML, CSS et JS natifs.
Les seules ressources externes sont les polices Google et la carte Google Maps.

```
index.html               accueil : hero, ouvert aujourd'hui, renvois, vidéos
points-de-vente.html     Orleix et Brauhauban, horaires, itinéraires
marches.html             Luz, Argelès-Gazost, Marcadieu
nos-produits.html        les 7 rayons
la-ferme.html            histoire, galerie, vidéos, réseaux sociaux
professionnels.html      demi-gros, gros, plateaux
contact.html             coordonnées et carte
mentions-legales.html

assets/css/style.css     design system et tous les composants
assets/js/main.js        horaires, ouvert aujourd'hui, menu, apparitions
assets/js/hero-media.js  diaporama photo / vidéo du hero (accueil)
assets/js/reels.js       bandeau vidéo des réseaux sociaux
assets/img/hero/         fonds du hero et bannières de page
assets/img/reels/        vignettes d'attente des extraits vidéo
assets/img/              photos du magasin, classées par section
assets/video/            huit extraits vidéo courts

_sources-photos/         photos d'origine du client (hors dépôt)
_sources-videos/         vidéos d'origine du client (hors dépôt)
```

## Développement local

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Ouvrir `index.html` directement dans le navigateur ne suffit pas.

## Identité

Le client n'a pas de logo. Le nom est posé en typographie (Fraunces),
précédé d'un filet vert. Aucun symbole n'a été inventé.

Les verts sont relevés sur l'enseigne du magasin, échantillonnée à
`#08EE87` sur la photo de façade :

| Jeton | Valeur | Usage |
|---|---|---|
| `--green-flash` | `#1FCE7A` | boutons principaux, accents sur fond sombre |
| `--green-vif` | `#0E7546` | liens et boutons secondaires sur fond clair |
| `--green` | `#1E4A33` | fonds sombres |

Les boutons principaux portent un texte vert très sombre (`--sur-flash`)
sur le vert flash. C'est ce qui permet d'aller aussi clair tout en gardant
un contraste de 7,6:1. En texte blanc on tomberait à 3,3:1.

Il n'y a **aucun formulaire** : le contact passe par le téléphone et
l'e-mail. C'est aussi ce qui permet au site de rester entièrement statique.

## En-tête et pied de page

Ils sont **dupliqués dans chaque fichier .html**, entre des commentaires
`EN-TÊTE COMMUN` et `PIED DE PAGE COMMUN`. C'est le prix du zéro build :
une modification du menu ou du pied de page doit être répercutée sur les
huit pages. Le lien de la page courante porte `class="is-active"` et
`aria-current="page"`.

## Modifier les horaires

Tout part de `assets/js/main.js`, en haut du fichier : les constantes
`LOCATIONS` et `MARKETS`. Elles alimentent **à la fois** le bandeau
« Aujourd'hui », les pastilles ouvert / fermé et les tableaux d'horaires.
Ne pas écrire d'horaires en dur dans le HTML.

Format : `0 = dimanche … 6 = samedi`, créneaux `[["08:30","13:00"],["15:00","19:30"]]`.

Penser à répercuter tout changement dans le bloc `application/ld+json`
en bas de `index.html`, qui alimente la fiche Google.

## Le fond du hero

Le hero enchaîne en fondu les `<figure class="hero__slide">` de
`index.html`. Chaque diapo accepte une photo **ou** une vidéo :

```html
<figure class="hero__slide">
  <video src="assets/video/etal.mp4" poster="assets/img/hero/hero-1.jpg"
         muted loop playsinline preload="metadata"></video>
</figure>
```

Rien à configurer dans `hero-media.js`. Les photos défilent toutes les
6,2 s avec un léger mouvement d'échelle, les vidéos rendent la main
quand elles se terminent.

## Les fichiers d'origine

`_sources-photos/` et `_sources-videos/` contiennent ce que le client a
fourni. Ils sont **exclus du dépôt** (167 Mo) : seules les versions
optimisées sont publiées. Les garder en local permet de refaire un
recadrage ou un extrait sans redemander les fichiers.

## Refaire un visuel

Recadrage « cover » vers une taille cible, avec `sips` (natif macOS) :

```bash
cp _sources-photos/unnamed-20.jpg assets/img/hero/hero-1.jpg
sips --resampleWidth 2000 assets/img/hero/hero-1.jpg
sips -c 1125 2000 assets/img/hero/hero-1.jpg          # -c hauteur largeur
sips -s format jpeg -s formatOptions 74 assets/img/hero/hero-1.jpg
```

`--cropOffset <y> <x>` décale le recadrage quand le centrage automatique
coupe mal.

## Refaire un extrait vidéo

Les huit extraits font 6 s, 540 × 960, sans son, entre 0,5 et 2 Mo.

```bash
ffmpeg -ss 18 -t 6 -i "_sources-videos/<fichier>.mp4" \
  -vf "scale=540:960:force_original_aspect_ratio=increase,crop=540:960" \
  -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p \
  -movflags +faststart -an -y assets/video/reel-3.mp4

ffmpeg -ss 0.3 -i assets/video/reel-3.mp4 -frames:v 1 \
  -vf scale=360:640 -q:v 6 -y assets/img/reels/reel-3.jpg
```

Ajouter ou retirer un extrait se fait dans le HTML
(`<article class="reel">`), il n'y a rien à configurer dans `reels.js`.

### Trois choses à ne pas défaire dans ce bandeau

Elles viennent de bugs réels constatés sur iPhone :

1. le défilement passe par `transform`, **jamais** par `scrollLeft`. Sur
   Safari iOS, la couche de défilement inertiel annule les écritures dans
   `scrollLeft` à chaque frame et le bandeau reste figé ;
2. les bords estompés sont des dégradés posés par-dessus, **pas** un
   `mask-image`. Un masque sur un conteneur qui défile fait disparaître
   tout le contenu sur iOS ;
3. les `<video>` sont en `preload="none"` et **sans** attribut `autoplay`.
   C'est le script qui lance la lecture, avec un plafond de trois vidéos
   simultanées sur mobile et cinq sur ordinateur. Avec `autoplay`, les
   seize éléments se lancent d'un coup et le téléphone s'écroule.

## Grilles

Les groupes de cartes (points de vente, engagements, marchés, offres pro,
bandeau du jour) sont en **deux colonnes jusqu'à 1000 px** et en trois
au-delà. En deux colonnes, une liste impaire met sa dernière carte en
pleine largeur plutôt que de laisser un trou.

## Déploiement

Push sur `main`, GitHub Pages publie la racine du dépôt. Le fichier
`.nojekyll` empêche Jekyll de filtrer les dossiers.

Nom de domaine : ajouter un fichier `CNAME` à la racine, pointer les DNS
vers GitHub Pages, puis mettre à jour les balises `canonical`, `og:url`,
`robots.txt` et `sitemap.xml`.

---
Réalisé par [Caza Comm](https://cazacomm.fr)
