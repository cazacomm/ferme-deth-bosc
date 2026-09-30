# Éléments à récupérer auprès du client

Mis à jour après la livraison des photos de la boutique rénovée,
des photos de Brauhauban et du marché de Luz.

## ✅ Réglé

- Téléphone : **06 51 26 17 73**
- E-mail : **lafermedethbosc@gmail.com**
- Facebook et Instagram : liens en place
- **Photos de la boutique rénovée d’Orleix** : tout le site est repassé dessus
- **Photos de l’étal de Brauhauban**, avec l’enseigne. Le visuel provisoire a disparu.
- **Photo du marché de Luz-Saint-Sauveur** en hiver, avec le barnum « Producteur et Primeur »
- Logo : le client n’en a pas fourni. Le nom est posé en typographie, sans symbole inventé.
- Formulaires de contact : supprimés à la demande du client

## 🔴 Bloquant pour la mise en ligne

| Élément | Où |
|---|---|
| Raison sociale, forme juridique, SIRET, RCS et TVA | `mentions-legales.html` |
| Directeur de la publication | `mentions-legales.html` |

C’est tout ce qui reste de vraiment obligatoire.

## 🟠 Trouvé sur les nouvelles photos, à faire confirmer

Ces éléments sont lisibles sur les photos du client. Rien n’a été publié
à leur sujet sans vérification, sauf mention contraire.

- **Une baseline existe.** Le panneau « Agriculture » du magasin porte :
  *« La Ferme Deth Bosc, Producteur par passion, Commerçant par ascension »*.
  Elle n’est pas encore utilisée sur le site. C’est dommage, elle dit en
  une phrase ce que la page d’accueil met trois paragraphes à expliquer.
- **Une identité visuelle existe aussi.** L’enseigne de Brauhauban porte un
  lettrage peint « La Ferme Deth Bosc » en jaune sur vert foncé, avec des
  feuilles, plus un macaron montagne « Aureilhan ». Le client disait ne pas
  avoir de logo : il y a au moins une charte à récupérer auprès de son
  enseigniste.
- **« Aureilhan » sur l’enseigne de Brauhauban.** Est-ce le siège de
  l’exploitation, ou un troisième point de vente dont on n’a pas parlé ?
- **Œufs plein air et bio** : visibles et étiquetés en magasin, absents du
  mail du client. Ajoutés au rayon crèmerie.
- **Drive fermier, marché fermier, marchés gourmands** : mentionnés sur le
  panneau du magasin. Rien sur le site pour l’instant. Si le drive existe,
  c’est un service à mettre en avant.
- **Sandwichs et traiteur, dépôt de pain, viennoiserie au beurre fin** :
  lisibles sur les comptoirs. Déjà en ligne. → `data-needs="confirmation"`
- **Horaires des marchés** : le client indique « matin ». Les horaires
  affichés (8h à 13h) restent une hypothèse.
- **Adresse exacte de la halle Brauhauban** : emplacement de l’étal.
- **L’histoire de la ferme** : rédigée à partir du mail, à valider.
- **Les collaborateurs** : photo d’équipe en ligne, sans prénoms ni rôles.

## 🟡 Photos encore un peu datées

Le magasin a été rénové, mais trois visuels viennent encore de l’ancienne
série. Le comptoir est le même, ils restent donc justes, mais une photo
récente serait mieux :

| Rayon | Fichier | Source |
|---|---|---|
| Fromage à la coupe | `rayons/fromage.jpg` | ancienne série |
| Pain et viennoiserie | `rayons/pain.jpg` | ancienne série |
| Épicerie | `rayons/epicerie.jpg` | ancienne série |

Manquent aussi : une vue du champ ou de la serre en photo (ce sujet
n’existe qu’en vidéo), et des photos des marchés d’Argelès-Gazost et
de Marcadieu.

## 🎬 Vidéos non exploitées

Deux sources longues pourraient servir : la visite du magasin (2 min) et
les témoignages clients (1 min). Fichiers en local dans `_sources-videos/`.

## ⚙️ Technique

- **Nom de domaine** : ajouter le fichier `CNAME` et la configuration DNS, puis mettre à jour `canonical`, `og:url`, `robots.txt` et `sitemap.xml`.
- **Google Business Profile** : à créer ou relier pour les deux points de vente. Le plus gros levier de référencement local.
