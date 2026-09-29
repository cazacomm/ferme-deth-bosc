# Éléments à récupérer auprès du client

Mis à jour après réception des photos et des vidéos.
Tous les endroits concernés dans le code sont marqués `data-needs="…"`.

## 🔴 Bloquant pour la mise en ligne

| Élément | Où | Marqueur |
|---|---|---|
| Numéro de téléphone | en-tête, points de vente, contact, pied de page | `data-needs="telephone"` |
| Adresse e-mail de contact | contact, professionnels, pied de page | `data-needs="email"` |
| **URL exactes Facebook et Instagram** | section réseaux sociaux, pied de page, contact | `data-needs="reseaux-sociaux"` |
| Raison sociale, SIRET, RCS/TVA, responsable de publication | `mentions-legales.html` | `À compléter` |
| Logo officiel (SVG ou PNG haute définition) | `assets/img/logo.svg` | logo provisoire en place |

Les liens réseaux sociaux sont d'autant plus urgents que le site met
maintenant en avant une section vidéo qui pointe vers eux.

## 🟠 À faire confirmer

Ces points viennent de ce qu'on voit sur les photos du client, pas de son
mail. Ils sont en ligne mais doivent être validés.

- **Sandwichs et traiteur** : le comptoir porte la mention « Sandwichs-Traiteur ». Ajouté en rayon et dans la liste des services d'Orleix. → `data-needs="confirmation"`
- **Dépôt de pain et viennoiserie** : la façade indique « ICI DÉPÔT DE PAIN », le comptoir « Viennoiserie au beurre fin ». Ajouté au rayon Pain.
- **Oignons de Trébons** : une affiche « Notre production / Oignons de Trébons » est visible en magasin. Rien n'est écrit sur le site à ce sujet, mais si c'est bien une de leurs productions, c'est un argument fort à exploiter (spécialité locale reconnue).
- **Horaires des marchés** : le client indique « matin ». Les horaires affichés (8h à 13h) sont une hypothèse à confirmer pour Luz-Saint-Sauveur, Argelès-Gazost et Marcadieu.
- **Adresse exacte de la halle Brauhauban** : emplacement de l'étal dans la halle.
- **L'histoire de la ferme** : rédigée à partir du mail, à faire valider et enrichir (depuis quand ? reprise familiale ? surface cultivée ? quels légumes ?).
- **Les collaborateurs** : la photo d'équipe est en ligne, mais sans les prénoms ni les rôles. Une sous-section « L'équipe » est prévue et annoncée comme « bientôt » sur la page La ferme.

## 🟡 Visuels encore manquants

Les photos du magasin d'Orleix sont en place. Il manque :

| Sujet | Où c'est utilisé | Actuellement |
|---|---|---|
| **L'étal sous la halle Brauhauban** | page Points de vente, carte d'accueil | photo d'une halle couverte, marquée « Photo d'illustration » |
| **Les trois marchés** (Luz, Argelès, Marcadieu) | page Marchés, carte d'accueil | trois visuels génériques, marqués « Illustration » |
| Une vue du champ ou de la serre | page La ferme | remplacé par des extraits vidéo |

⚠️ **Droits d'image.** Quatre visuels de marché et de halle ont été
fournis sous des noms de fichiers du type `images.jpeg`, `image.jpg` :
ils proviennent vraisemblablement d'une recherche web et leurs droits
ne sont pas vérifiés. Ils sont marqués « Illustration » sur le site et
**doivent être remplacés avant toute campagne de communication**. Les
visuels de produits proviennent de Pixabay (licence libre) et ne posent
pas de problème.

## 🎬 Vidéos

Huit extraits de 6 s ont été découpés dans les dix vidéos fournies et
alimentent le bandeau « Retrouvez-nous en vidéo ». Les sources d'origine
restent disponibles en local dans `_sources-videos/`.

Deux vidéos longues n'ont pas été exploitées en entier et pourraient
servir en V2 : la visite complète du magasin (2 min) et les témoignages
clients (1 min), par exemple sur la page La ferme avec un lecteur et du
son.

## ⚙️ Technique (V2)

- **Formulaire de contact** : aucun backend en V1, GitHub Pages est statique. Options : Formspree, Web3Forms, ou un simple `mailto:`. → `data-needs="formulaire-backend"`
- **Nom de domaine** : ajouter le fichier `CNAME` + configuration DNS, puis mettre à jour les balises `canonical`, `og:url`, `robots.txt` et `sitemap.xml` qui pointent aujourd'hui vers l'URL GitHub Pages.
- **Google Business Profile** : à créer ou relier pour les deux points de vente. C'est le plus gros levier de référencement local pour ce type de commerce.
