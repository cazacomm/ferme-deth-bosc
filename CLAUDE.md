# La Ferme Deth Bosc, site vitrine

Contexte complet du projet, pour reprendre le travail sans avoir à
relire l'historique des conversations.

**En ligne :** https://lafermedethbosc.fr/
**Dépôt :** `cazacomm/ferme-deth-bosc` (public, GitHub Pages sur `main`, racine)

---

## 1. Le client

**La Ferme Deth Bosc**, Orleix (65). Conjugaison d'une exploitation
agricole spécialisée dans la culture de légumes et d'une société de
commerce de type primeur. Cœur de métier : la vente au détail de fruits
et légumes. Cible : une clientèle populaire, avec le meilleur rapport
qualité-prix.

**Agence :** Caza Comm, Jérémy Pogut. Le site est livré en versions
successives, le client renvoie ses retours entre chaque.

### Coordonnées (fournies, en ligne)
- Téléphone : 06 51 26 17 73
- E-mail : lafermedethbosc@gmail.com
- Facebook : https://www.facebook.com/laFermeDethBosc/
- Instagram : https://www.instagram.com/lafermedethbosc/

### Points de vente

**Aux Halles de la Ferme Deth Bosc**, 6 ter route de Rabastens, 65800 Orleix
(le client avait écrit « 6800 », il a confirmé 65800). Ouvert 7j/7.
Fruits et légumes, fromage à la coupe, charcuterie, crèmerie, vin, pain,
épicerie, plus dépôt de pain, viennoiserie et sandwichs/traiteur vus sur
les photos.

| Jour | Horaires |
|---|---|
| Lundi | 15h00 à 19h30 |
| Mardi à vendredi | 8h30 à 13h00 et 15h00 à 19h30 |
| Samedi | 8h30 à 19h30 en continu |
| Dimanche | 9h00 à 13h00 |

**Étal sous la halle Brauhauban**, Tarbes. Mardi, mercredi, vendredi,
samedi et dimanche de 8h00 à 13h00. Fruits et légumes uniquement.

**Marchés** (fruits et légumes uniquement) : Luz-Saint-Sauveur le lundi
matin, Argelès-Gazost le mardi matin, Marcadieu (Tarbes) le jeudi matin.
Les horaires 8h à 13h affichés sont une **hypothèse**, le client a seulement
dit « matin ».

### Offre professionnelle
Demi-gros en fruits et légumes. Vente en gros de pomme de terre, en cours
de développement. Projet de plateaux et corbeilles pour événements,
particuliers et professionnels, en cours de lancement.

---

## 2. Consignes du client, dans l'ordre où elles sont arrivées

Elles sont toutes appliquées. Elles valent pour la suite : **ne pas les
défaire**.

### Contenu et rédaction
1. **Aucun tiret cadratin ou demi-cadratin** dans les textes. Le client
   est catégorique : ce n'est pas de la ponctuation française. Les
   traits d'union orthographiques (Luz-Saint-Sauveur, qualité-prix,
   Hautes-Pyrénées) restent évidemment. Les plages horaires s'écrivent
   « 8h30 à 13h00 », jamais avec un tiret.
2. **Textes courts partout.** Garder l'information essentielle,
   supprimer le reste. Pas de description sous un titre quand le titre
   suffit. Pied de page allégé. Le site fait environ 1 200 mots au total,
   c'est la cible.
3. **Pas de formulaire de contact.** Téléphone et e-mail uniquement.

### Design
4. **Un site vitrine n'est pas une page unique.** Plusieurs pages pour
   alléger chacune.
5. **Bords arrondis**, look plus moderne. Les grilles séparées par des
   filets d'un pixel ont été remplacées par de vraies cartes espacées.
6. **Deux cartes par ligne** pour les groupes de widgets, avec la
   dernière en pleine largeur quand le nombre est impair. Appliqué
   jusqu'à 1000 px, trois colonnes au-delà (choix assumé, le 2-colonnes
   sur grand écran rendait vide ; le client peut demander le 2 partout).
7. **Verts plus vifs et plus clairs**, repris de leur enseigne.
8. **Pas de logo inventé.** Le client dit qu'ils n'en ont pas : le nom
   est posé en typographie, avec un filet vert. Aucun symbole dessiné.
   (Voir section 6 : des photos récentes montrent qu'une identité
   visuelle existe pourtant.)

### Rejeté explicitement
9. **La 3D procédurale du hero** (fruits et légumes modélisés) : « on
   dirait des faux fruits ou les fruits d'un jeu vidéo ». Remplacée par
   un diaporama photo/vidéo. **Ne pas y revenir.**
10. **Le petit trait animé de scroll** sous le hero : « c'est des
    signatures d'IA ». Supprimé.
11. **Les étiquettes « Illustration »** sur les photos : retirées, le
    client confirme que toutes les photos sont les siennes ou libres de
    droits.

### Réseaux sociaux
12. Une section **« Retrouvez-nous sur les réseaux sociaux »** avec des extraits courts
    qui défilent lentement en automatique. Le client a lui-même posé la
    question « qu'est-ce qui est le plus fluide ? » : la réponse retenue
    est **des extraits courts, pas les vidéos entières** (les sources
    font 148 Mo, les huit extraits 8 Mo).
13. **Le bandeau vidéo est placé haut sur l'accueil**, juste après le
    bandeau vert « Aujourd'hui » et avant les trois engagements. Raison
    donnée par le client : tout le monde ne descend pas en bas de page,
    et ces vidéos donnent envie de continuer à faire défiler. Titre seul,
    sans surtitre ni sous-titre. **Ne pas le redescendre.**

---

## 3. Ce qui est construit

Site **statique**, sans build, sans dépendance, sans CDN. Seules
ressources externes : les polices Google et la carte Google Maps.

### Les huit pages
```
index.html               accueil : hero, ouvert aujourd'hui, renvois, vidéos
points-de-vente.html     Orleix et Brauhauban, horaires, itinéraires
marches.html             Luz, Argelès-Gazost, Marcadieu
nos-produits.html        les 7 rayons
la-ferme.html            histoire, galerie, vidéos, réseaux sociaux
professionnels.html      demi-gros, gros, plateaux
contact.html             coordonnées et carte
mentions-legales.html
```

### Les trois scripts
- `assets/js/main.js` : horaires, bandeau « ouvert aujourd'hui », menu
  mobile, apparitions au scroll.
- `assets/js/hero-media.js` : diaporama du fond du hero, accepte photos
  et vidéos indifféremment.
- `assets/js/reels.js` : bandeau vidéo des réseaux sociaux.

### Les fonctionnalités qui font le travail commercial
- **Bandeau « Aujourd'hui »** : calcule en direct où ils sont ouverts
  maintenant, avec « ferme dans 40 min ». C'est le principal déclencheur
  de déplacement en magasin. Se rafraîchit chaque minute.
- **Pastilles ouvert/fermé** sur chaque point de vente, en direct.
- **Tableaux d'horaires** avec la ligne du jour surlignée.
- **Bandeau vidéo** réseaux sociaux, huit extraits de 6 s.
- **Bouton d'appel** permanent dans l'en-tête.

### Source unique de vérité pour les horaires
Tout part des constantes `LOCATIONS` et `MARKETS` en haut de
`assets/js/main.js`. Elles alimentent le bandeau du jour, les pastilles
et les tableaux. **Ne jamais écrire d'horaires en dur dans le HTML.**
Répercuter aussi tout changement dans le bloc `application/ld+json` en
bas de `index.html`, qui alimente la fiche Google.

### Médias
14 M de photos, 8 M de vidéo. Les fichiers d'origine du client sont dans
`_sources-photos/` et `_sources-videos/`, **exclus du dépôt** (62 Mo et
148 Mo). Les garder en local permet de refaire un recadrage ou un extrait
sans redemander les fichiers. Les commandes `sips` et `ffmpeg` sont dans
le README.

---

## 4. Pièges techniques à ne pas défaire

Chacun vient d'un bug réel, constaté puis corrigé.

### Le bandeau vidéo a deux mécaniques, volontairement
`reels.js` détecte le tactile et bascule entre deux modes.

- **Ordinateur (`.reels--glisse`)** : la bande glisse en continu par
  `transform`, le conteneur ne défile pas.
- **Tactile (`.reels--scroll`)** : défilement natif, avance discrète
  d'une carte toutes les 3,8 s. **Aucune transformation sur le conteneur
  des vidéos.**

Pourquoi : sur Safari iOS, une `<video>` dans un élément transformé à
chaque frame n'affiche que sa première image. La vidéo tourne, le calque
n'est jamais repeint. C'est l'effet « image figée » signalé par le client.

### Trois autres règles
1. **Ne jamais écrire dans `scrollLeft` à chaque frame.** Sur iOS la
   couche de défilement inertiel annule les écritures et le bandeau
   reste immobile. D'où le `transform` sur ordinateur et l'avance
   discrète sur mobile.
2. **Pas de `mask-image` sur un conteneur qui défile.** Sur iOS tout le
   contenu disparaît. Les bords estompés sont des dégradés posés
   par-dessus.
3. **Pas d'attribut `autoplay` sur les `<video>`.** Les seize éléments
   se lançaient d'un coup et le téléphone s'écroulait. C'est le script
   qui lance la lecture, avec un plafond de trois lectures simultanées
   sur mobile et cinq sur ordinateur, et `preload="none"` donc aucun
   octet de vidéo tant qu'une carte n'est pas visible.

Filet de sécurité : la première interaction avec la page relance les
vidéos qui n'auraient pas démarré, ce qui couvre le mode économie
d'énergie de l'iPhone.

### Le menu mobile
Le burger disparaissait une fois ouvert : ses barres étaient vert foncé
sur le panneau vert foncé. Il passe en crème au-dessus du panneau, porte
un libellé Menu / Fermer, et **un clic dans le vide referme le menu**
(on doit pouvoir ouvrir juste pour voir, puis ressortir).

### En-tête et pied de page dupliqués
Ils sont recopiés dans chacun des huit fichiers, entre des commentaires
`EN-TÊTE COMMUN` et `PIED DE PAGE COMMUN`. C'est le prix du zéro build :
toute modification du menu doit être répercutée partout. Le lien de la
page courante porte `class="is-active"` et `aria-current="page"`.

---

## 5. Identité visuelle

Pas de logo fourni. Le nom est posé en typographie **Fraunces**,
précédé d'un filet vert. Texte courant en **Inter**.

Verts relevés sur l'enseigne du magasin, échantillonnée à `#08EE87` sur
la photo de façade :

| Jeton | Valeur | Usage |
|---|---|---|
| `--green-flash` | `#1FCE7A` | boutons principaux, accents sur fond sombre |
| `--green-vif` | `#0E7546` | liens et boutons secondaires sur fond clair |
| `--green` | `#1E4A33` | fonds sombres |
| `--terra` | `#C4622D` | surtitres, numéros, chiffres clés |
| `--cream` | `#FAF6EF` | fond général |

Les boutons principaux portent un **texte vert très sombre**
(`--sur-flash`, `#0A2417`) sur le vert flash. C'est ce qui permet d'aller
aussi clair tout en gardant 7,6:1 de contraste. En texte blanc on
tomberait à 3,3:1.

Boutons en pilule, cartes à 20 px de rayon.

---

## 6. Ce qui reste à faire

### Bloquant pour une mise en ligne propre
Les **mentions légales** : raison sociale, forme juridique, SIRET, RCS,
TVA, directeur de la publication. C'est le seul vrai blocage.

### À faire confirmer par le client
Tout ceci est lisible sur ses propres photos mais absent de ses mails.
Le détail et l'état de chaque point sont dans `INFOS-MANQUANTES.md`.

- **Une baseline existe** : « Producteur par passion, Commerçant par
  ascension », sur le panneau Agriculture du magasin. Pas encore
  utilisée sur le site, alors qu'elle dit en une phrase ce que la page
  d'accueil met trois paragraphes à expliquer.
- **Une identité visuelle existe aussi** : lettrage peint jaune sur vert
  avec feuilles sur l'enseigne de Brauhauban, plus un macaron montagne
  « Aureilhan ». Le client dit ne pas avoir de logo : il y a au moins une
  charte à récupérer auprès de son enseigniste.
- **« Aureilhan »** sur cette enseigne : siège de l'exploitation, ou
  troisième point de vente dont on n'a pas parlé ?
- **Drive fermier, marché fermier, marchés gourmands** mentionnés sur
  leur panneau. Si le drive existe, c'est un service à mettre en avant.
- Sandwichs et traiteur, dépôt de pain, viennoiserie : déjà en ligne,
  marqués `data-needs="confirmation"`.
- Horaires exacts des marchés.
- Texte de l'histoire de la ferme, rédigé à partir de leur mail.
- Prénoms et rôles de l'équipe (la photo est en ligne, une sous-section
  « L'équipe » est annoncée comme « bientôt »).

### Technique
- ~~Nom de domaine~~ : **fait**. `lafermedethbosc.fr` (apex) avec les
  quatre `A` GitHub Pages et un `CNAME` pour `www`. DNS chez Hostinger
  (`dns-parking.com`), serveurs de noms inchangés. Le fichier `CNAME` est
  à la racine du dépôt : **ne pas le supprimer**, GitHub retirerait le
  domaine. `canonical`, `og:url`, `robots.txt` et `sitemap.xml` pointent
  tous sur le domaine.
- **Google Business Profile** pour les deux points de vente. C'est le
  plus gros levier de référencement local pour ce type de commerce, à
  vendre en même temps que le site.

---

## 7. Historique des versions

| Version | Contenu |
|---|---|
| V1 | Site une page, hero 3D, horaires dynamiques, placeholders SVG |
| V1.1 | 3D remplacée par un diaporama, tirets supprimés, verts plus vifs |
| V1.2 | Passage en 7 pages, correction du menu mobile |
| V1.3 | Vraies photos (36 retenues sur 49), bandeau vidéo réseaux sociaux |
| V1.4 | Coordonnées réelles, vert de l'enseigne, suppression des formulaires |
| V1.5 | Correctif mobile du bandeau, design arrondi, textes allégés |
| V1.6 | Vidéos figées sur iPhone : deux mécaniques de défilement |
| V1.7 | Photos de la boutique rénovée, de Brauhauban et du marché de Luz |
| V1.8 | Bandeau vidéo remonté juste sous le bandeau du jour, en-tête allégé |
| V1.9 | Mise en ligne sur lafermedethbosc.fr |

---

## 8. Méthode de travail établie

- Vérifier visuellement avant de livrer : captures en 390 px et 1440 px
  avec puppeteer-core piloté sur le Chrome installé, serveur local
  `python3 -m http.server`. Un serveur **multi-thread** est nécessaire
  dès qu'il y a plusieurs vidéos, sinon les requêtes se bloquent.
- Les dépôts clients vont dans l'organisation GitHub **cazacomm**, jamais
  sur le compte personnel.
- Un commit par version, message détaillé en français expliquant le
  pourquoi et pas seulement le quoi.
- Signaler honnêtement ce qui n'a pas pu être testé (Safari iOS par
  exemple) plutôt que d'affirmer que c'est corrigé.
