---
# Copy this file to private/letters/<something>.md (that folder is git-ignored),
# then run:  npm run doc -- letter <something>
# Or simply:  npm run doc -- new letter <company>[-<role>]
name: Simon_Fontaine_LM_Exemple      # output: out/letters/Simon_Fontaine_LM_Exemple.pdf (overwritten on each run)
lang: fr                              # fr or en
cv: cybersecurity                     # optional: CV variant whose headline is shown
company: Exemple SA                      # optional: leave out for an open application
contact: Madame Dupont, Responsable IT   # optional
address:                                 # optional
  - Rue de l'Exemple 1
  - 1000 Bruxelles
role: Administrateur systèmes junior     # optional: used in the subject line
date: 2026-11-24                         # optional, defaults to today
# subject, greeting, closing, place: optional overrides
---

Je me permets de vous adresser ma candidature au poste d'**administrateur systèmes junior**. Diplômé de l'EPHEC en juin 2026, je cherche mon premier poste en informatique.

Pendant ma formation, j'ai mis en place un environnement Linux avec des conteneurs Docker, des services séparés en zones de sécurité et des sauvegardes de base de données. Vous trouverez le détail sur mon [portfolio](https://www.simonfontaine.com).

Je serais heureux de vous présenter ces projets lors d'un entretien.
