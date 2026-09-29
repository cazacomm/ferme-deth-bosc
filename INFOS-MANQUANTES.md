# Éléments à récupérer auprès du client

Mis à jour après réception des coordonnées, des photos et des vidéos.
Les endroits encore en attente sont marqués `data-needs="…"` dans le code.

## ✅ Réglé

- Téléphone : **06 51 26 17 73**
- E-mail : **lafermedethbosc@gmail.com**
- Facebook et Instagram : liens en place dans l’en-tête, la section réseaux sociaux, la page contact et le pied de page
- Photos : le magasin d’Orleix, l’équipe, les marchés, les rayons
- Vidéos : huit extraits dans le bandeau réseaux sociaux
- Logo : le client n’en a pas. Le nom est posé en typographie, avec un filet vert repris de l’enseigne. Aucun symbole inventé.
- Formulaires de contact : supprimés à la demande du client, remplacés par une carte téléphone et e-mail

## 🔴 Bloquant pour la mise en ligne

| Élément | Où |
|---|---|
| Raison sociale, forme juridique, SIRET, RCS et TVA | `mentions-legales.html` |
| Directeur de la publication | `mentions-legales.html` |

C’est tout ce qui reste de vraiment obligatoire.

## 🟠 À faire confirmer

Ces points viennent de ce qu’on voit sur les photos, pas du mail du client.
Ils sont en ligne mais doivent être validés.

- **Sandwichs et traiteur** : le comptoir porte la mention « Sandwichs-Traiteur ». Ajouté en rayon et dans les services d’Orleix. → `data-needs="confirmation"`
- **Dépôt de pain et viennoiserie** : la façade indique « ICI DÉPÔT DE PAIN », le comptoir « Viennoiserie au beurre fin ».
- **Oignons de Trébons** : une affiche « Notre production / Oignons de Trébons » est visible en magasin. Rien n’est écrit à ce sujet sur le site, mais si c’est bien une de leurs productions, c’est un argument fort : c’est une spécialité locale reconnue.
- **Horaires des marchés** : le client indique « matin ». Les horaires affichés (8h à 13h) sont une hypothèse à confirmer pour Luz-Saint-Sauveur, Argelès-Gazost et Marcadieu.
- **Adresse exacte de la halle Brauhauban** : emplacement de l’étal dans la halle.
- **L’histoire de la ferme** : rédigée à partir du mail, à faire valider et enrichir (depuis quand ? reprise familiale ? surface cultivée ? quels légumes ?).
- **Les collaborateurs** : la photo d’équipe est en ligne, sans les prénoms ni les rôles. Une sous-section « L’équipe » est annoncée comme « bientôt » sur la page La ferme.

## 🟡 Confort

- **Une photo de l’étal sous la halle Brauhauban.** Le client n’en a pas. En attendant, la carte utilise un gros plan sur des cageots, sans décor identifiable, ce qui évite de montrer un lieu qui ne serait pas le bon.
- **Une vue du champ ou de la serre en photo.** Ce sujet n’existe aujourd’hui qu’en vidéo.

## 🎬 Vidéos non exploitées

Deux sources longues pourraient servir en V2 : la visite complète du
magasin (2 min) et les témoignages clients (1 min), par exemple sur la
page La ferme avec un lecteur et du son. Les fichiers d’origine sont
en local dans `_sources-videos/`.

## ⚙️ Technique

- **Nom de domaine** : ajouter le fichier `CNAME` et la configuration DNS, puis mettre à jour les balises `canonical`, `og:url`, `robots.txt` et `sitemap.xml`, qui pointent aujourd’hui vers l’URL GitHub Pages.
- **Google Business Profile** : à créer ou relier pour les deux points de vente. C’est le plus gros levier de référencement local pour ce type de commerce.
