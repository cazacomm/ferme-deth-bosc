# -*- coding: utf-8 -*-
"""
Extrait les photos produits des pages PNG du catalogue du client.

Le client envoie son catalogue sous forme d'images : un cadre vert sapin,
un liseré jaune, un en-tête, la photo du produit, le nom et un pavé de
prix. On ne garde que la photo, le reste est refait en HTML dans
promotions.html aux couleurs du site.

    python3 outils/extraire-promos.py _sources-catalogue

Les pages sont attendues sous le nom page_2.png, page_3.png, etc. La
couverture n'est pas traitée : elle est refaite en typographie.
"""
import os
import sys
from PIL import Image


def extraire(chemin, sortie):
    im = Image.open(chemin).convert('RGB')
    L, H = im.size
    p = im.load()
    cadre = p[10, H // 2]                      # vert du cadre, relevé sur le bord

    proche = lambda c, r, tol: all(abs(c[i] - r[i]) < tol for i in range(3))
    pc_ligne = lambda y, x0, x1: (sum(proche(p[x, y], cadre, 28) for x in range(x0, x1, 4))
                                  / len(range(x0, x1, 4)))
    pc_colonne = lambda x, y0, y1: (sum(proche(p[x, y], cadre, 28) for y in range(y0, y1, 4))
                                    / len(range(y0, y1, 4)))

    # Une ligne entièrement de la couleur du cadre sépare la photo du reste.
    haut = next(y for y in range(150, H) if pc_ligne(y, 60, L - 60) < 0.9)
    bas = next(y for y in range(haut + 30, H) if pc_ligne(y, 60, L - 60) > 0.98)
    gauche = next(x for x in range(5, L) if pc_colonne(x, haut + 10, bas - 10) < 0.9)
    droite = next(x for x in range(L - 6, 0, -1) if pc_colonne(x, haut + 10, bas - 10) < 0.9)

    crop = im.crop((gauche, haut + 2, droite, bas - 1)).copy()
    q = crop.load()
    CL, CH = crop.size

    # On rogne ce qui reste : vert du cadre, jaune du liseré, bandes noires.
    def rebut(c):
        r, v, b = c
        return (proche(c, cadre, 40)
                or (r > 170 and v > 170 and b < 130)
                or (r + v + b) < 110)

    ligne_rebut = lambda y, x0, x1: (sum(rebut(q[x, y]) for x in range(x0, x1, 5))
                                     / len(range(x0, x1, 5))) > 0.92
    col_rebut = lambda x, y0, y1: (sum(rebut(q[x, y]) for y in range(y0, y1, 5))
                                   / len(range(y0, y1, 5))) > 0.92

    x0, y0, x1, y1 = 0, 0, CL, CH
    while y0 < y1 and ligne_rebut(y0, x0, x1): y0 += 1
    while y1 > y0 and ligne_rebut(y1 - 1, x0, x1): y1 -= 1
    while x0 < x1 and col_rebut(x0, y0, y1): x0 += 1
    while x1 > x0 and col_rebut(x1 - 1, y0, y1): x1 -= 1

    fin = crop.crop((x0, y0, x1, y1))
    fin.save(sortie, 'JPEG', quality=84, optimize=True)
    return fin.size, os.path.getsize(sortie) // 1024


def main():
    source = sys.argv[1] if len(sys.argv) > 1 else '_sources-catalogue'
    destination = 'assets/img/promos'
    os.makedirs(destination, exist_ok=True)

    pages = sorted(f for f in os.listdir(source)
                   if f.startswith('page_') and f.endswith('.png'))
    if not pages:
        print('Aucune page_N.png trouvée dans %s' % source)
        return

    for i, nom in enumerate(pages, start=1):
        cible = os.path.join(destination, 'produit-%d.jpg' % i)
        taille, poids = extraire(os.path.join(source, nom), cible)
        print('%-34s %dx%d  %d Ko   <- %s' % (cible, taille[0], taille[1], poids, nom))

    print('\nIl reste à mettre à jour, dans promotions.html :')
    print('  les noms, variétés, prix et unités de chaque <article class="promo">')
    print('  les dates dans le h1, le chapeau, la sec-lead et la couverture')
    print('Puis le lastmod de promotions.html dans sitemap.xml.')


if __name__ == '__main__':
    main()
