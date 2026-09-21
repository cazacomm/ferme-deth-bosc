# Éléments à récupérer auprès du client

Tous les endroits concernés dans le code sont marqués `data-needs="…"`
ou par un commentaire `PLACEHOLDER`.

## 🔴 Bloquant pour la mise en ligne

| Élément | Où | Marqueur |
|---|---|---|
| Numéro de téléphone | header, points de vente, contact, footer | `data-needs="telephone"` |
| Adresse e-mail de contact | section contact, footer | `data-needs="email"` |
| Liens Facebook / Instagram (URL exactes) | galerie, footer | `data-needs="reseaux-sociaux"` |
| Raison sociale, SIRET, RCS/TVA, responsable de publication | `mentions-legales.html` | `À compléter` |
| Logo officiel (SVG ou PNG haute définition) | `assets/img/logo.svg` | logo provisoire en place |

## 🟠 Contenu

- **L'histoire de la ferme** — rédigée à partir du mail reçu, à faire valider et enrichir (depuis quand ? reprise familiale ? surface cultivée ? quels légumes ?) → `data-needs="histoire"`
- **Les collaborateurs** — demandés dans le mail, pas encore reçus. Prévoir une sous-section « L'équipe » en V2.
- **Horaires des marchés** — le client indique « matin ». Les horaires affichés (8h–13h) sont une hypothèse **à confirmer** pour Luz-Saint-Sauveur, Argelès-Gazost et Marcadieu.
- **Adresse exacte de la halle Brauhauban** — numéro de rue / emplacement de l'étal.
- **Code postal d'Orleix** — le mail indique « 6800 », corrigé en **65800**. À confirmer.
- **Plateaux & corbeilles** — préciser si l'offre est déjà commandable ou seulement en préparation (le libellé « Bientôt » est en place).

## 🟡 Visuels attendus

Le client a annoncé les photos après le réaménagement du magasin d'Orleix.

| Fichier à remplacer | Sujet | Dimensions mini |
|---|---|---|
| `assets/img/points-de-vente/orleix-1` | Magasin d'Orleix, vue large | 1600 × 1200 |
| `assets/img/points-de-vente/brauhauban-1` | L'étal sous la halle | 1600 × 1200 |
| `assets/img/marches/marche-panorama` | L'étal sur un marché, panoramique | 2400 × 900 |
| `assets/img/rayons/fruits-legumes` | **Photo maîtresse** — étal généreux | 2000 × 1400 |
| `assets/img/rayons/fromage` | Comptoir fromage | 1400 × 1400 |
| `assets/img/rayons/charcuterie` | Vitrine charcuterie | 1400 × 1400 |
| `assets/img/rayons/cremerie` | Crèmerie | 1400 × 1400 |
| `assets/img/rayons/vin` | Rayon vin | 1400 × 1400 |
| `assets/img/rayons/pain` | Pain du jour | 1400 × 1400 |
| `assets/img/rayons/epicerie` | Épicerie | 1400 × 1400 |
| `assets/img/ferme/portrait` | Portrait exploitant(s) en activité | 1200 × 1600 |
| `assets/img/ferme/detail` | Détail : mains, cagette, récolte | 900 × 900 |
| `assets/img/ferme/gal-1` à `gal-4` | Ambiances | 1000 × 1250 |
| `assets/img/og-image` | Vignette de partage, **en .jpg** | 1200 × 630 |
| `assets/video/ferme.mp4` | Vidéo de présentation + image poster | 1920 × 1080 |

## ⚙️ Technique (V2)

- **Formulaire de contact** : aucun backend en V1 (GitHub Pages est statique). Options : Formspree, Web3Forms, ou un simple `mailto:`. → `data-needs="formulaire-backend"`
- **Nom de domaine** : ajouter le fichier `CNAME` + configuration DNS.
- **Google Business Profile** : à créer/relier pour les deux points de vente — le plus gros levier SEO local pour ce type de commerce.
