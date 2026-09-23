# Portfolio de Simon Fontaine

Portfolio bilingue destiné aux recruteurs. Next.js 15, React 19, TypeScript,
Tailwind CSS 4 et primitives shadcn/ui (Radix). Aucun compte, formulaire serveur,
outil de mesure d’audience ou service publicitaire.

## Développement et validation

Node.js 22.18 ou plus récent, npm et fichiers de polices locaux.

```sh
npm ci
npm run dev
```

```sh
npm run prepare:locales
npm run check:locales
npm run lint
npm run typecheck
npm audit --audit-level=moderate
npm run build
```

La CI vérifie les traductions, le code, les dépendances et le build sans déployer.
Aucune suite de tests automatisés ni installation de navigateur n’est nécessaire.

### Vérification manuelle

- Parcourir les sections, les ancres et le sommaire, à la souris et au clavier.
- Changer de langue depuis la navigation et le footer, y compris depuis une
  section et la page de confidentialité. Vérifier la conservation de l’ancre.
- Vérifier les thèmes clair, sombre et système, puis changer de langue.
- Contrôler la lisibilité sur mobile, tablette et desktop, ainsi que le focus
  visible et la préférence de réduction des animations.
- Télécharger les deux CV et vérifier leur nom, leur contenu et leurs liens.

Le développement utilise `.next` et le build de production `.next-production`
pour qu’un aperçu de développement ne puisse pas écraser les fichiers de production.

L’override PostCSS 8.5.28 corrige la dépendance transitive de Next.js 15 sans
migration majeure. Le réévaluer lors des futures mises à jour de Next.js.

## Structure et design

- `src/components/sections` : contenu rendu sur le serveur.
- Navigation : un seul calcul de progression à partir des positions des six
  sections. Rail fixe de 216 px à partir de 1280 px, sommaire en Sheet en dessous.
- Introduction plein écran, autres sections à hauteur naturelle. Aucun scroll
  snapping. Les ancres restent utilisables sans JavaScript.
- Tokens visuels dans le CSS global : couleurs sémantiques, largeur de contenu,
  espacements fluides et échelle typographique. Les contrôles ont des cibles de
  44 px minimum. Les états actifs ne reposent pas uniquement sur la couleur.
- Réglages complets dans le footer et liens directs de langue dans la navigation,
  visibles aussi sur mobile. Le thème système est le défaut. Une courte
  animation au téléchargement du CV est chargée à la demande, une fois par page.
  `prefers-reduced-motion` supprime cet effet et les transitions de défilement.

Geist est servi localement. Licence SIL OFL dans `src/app/fonts/OFL.txt`.
Les WOFF2 proviennent de la distribution Next.js.

## Contenu et traductions

Les coordonnées, identifiants, technologies et URL sont centralisés dans
`src/data/profile.json`. Le texte éditorial et les libellés sont dans
`messages/fr.json` et `messages/en.json`, y compris confidentialité, erreurs,
métadonnées. Les CV sont des PDF fournis manuellement, indépendants des traductions du site.

Pour ajouter une langue : copier `fr.json` vers `<code>.json`, traduire toutes
les valeurs en conservant les clés et paramètres (`{name}`, `{email}`, etc.),
puis renseigner `locale.name`, `locale.lang`, `locale.direction` et
`locale.openGraph`. Redémarrer le serveur ou reconstruire le site.

Les hooks `predev` et `prebuild` découvrent les dictionnaires et génèrent les
chargeurs, options de langue et images de partage. Les clés absentes,
vides, supplémentaires ou les paramètres incompatibles font échouer le build.
Les routes, métadonnées et entrées du sitemap suivent les langues découvertes.
Le sélecteur segmenté est généré à partir du même registre.

Ne pas modifier directement `src/i18n/generated` ou `public/og`.
Après modification du texte, relancer `npm run prepare:locales` pour actualiser
les assets. Pour retirer une langue, supprimer son dictionnaire et ses assets
générés avant de reconstruire.

## CV et moteurs de recherche

Les deux CV sont créés et remplacés manuellement :

- Français : `documents/Simon_Fontaine_CV_FR.pdf`.
- Anglais : `documents/Simon_Fontaine_CV_EN.pdf`.

Remplacer directement ces fichiers en conservant leur nom, puis reconstruire
et déployer le site pour publier les nouvelles versions. Aucun script ne génère
ni ne modifie les PDF. Les fichiers actuels restent disponibles jusqu’à leur remplacement.
Pour une autre langue, fournir `documents/Simon_Fontaine_CV_<CODE>.pdf`, avec
le code de langue en majuscules. Un PDF absent retourne 404.

Les fichiers sont hors de `public` et inclus explicitement dans le bundle serveur.
Seules les routes GET/HEAD `/api/cv/fr`, `/api/cv/en` et celles des langues
ajoutées les distribuent. Réponses PDF avec nom de téléchargement, revalidation
du cache et `X-Robots-Tag: noindex, nofollow, nosnippet`.

Les moteurs peuvent explorer ces routes pour lire la directive. Aucun PDF dans
le sitemap. Les anciennes URL publiques et l’alias `/api/cv` retournent 404.
Ce dispositif limite l’indexation par les moteurs coopératifs, sans constituer
une protection d’accès. Une URL déjà indexée peut nécessiter un nouveau passage
du moteur ou une demande de retrait dans Search Console.

## Confidentialité

Aucune variable d’environnement n’est requise. Les anciens services Resend,
Turnstile, Redis, Blob, Analytics et Speed Insights ont été supprimés.

| Mécanisme | Déclenchement | Contenu | Durée |
| --- | --- | --- | --- |
| Cookie `NEXT_LOCALE` | Choix explicite d’une langue | Code de langue | Session navigateur |
| Cookie `theme` | Choix explicite du thème | `light`, `dark`, `system` | Session navigateur |
| État en mémoire | Navigation et animation CV | Progression, thème, effet déjà joué | Page chargée |

Les cookies sont first-party, `SameSite=Lax`, `Path=/` et `Secure` sous HTTPS,
sans `Max-Age` ni `Expires`. La restauration de session d’un navigateur peut
prolonger leur présence. Pas de localStorage, de tracking ou d’identifiant visiteur.
Les réglages fonctionnent en mémoire si l’écriture des cookies est bloquée.

Les URL explicites imposent toujours leur langue. `/` utilise une préférence
de session valide, puis la langue compatible du navigateur, puis le français.
La détection seule ne crée aucun cookie. Les ressources et les API restent hors
du routage linguistique. Les liens externes ne sont pas préchargés.

Pas de bannière de consentement : les seuls stockages sont les préférences
temporaires expressément choisies. La page `/fr/privacy` et sa traduction
expliquent leur rôle et les traitements techniques d’hébergement. Cette décision
doit être réévaluée avant tout ajout de tracking, widget externe ou persistance.

Références : [APD, cookies et autres traceurs](https://www.autoriteprotectiondonnees.be/cookies-et-autres-traceurs),
[Google, directives robots HTTP](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

## Avant un déploiement

- Vérifier les intégrations, scripts injectés et paramètres de journalisation du
  projet Vercel. La suppression des packages ne modifie pas le tableau de bord.
- Confirmer la politique et les durées de conservation de l’hébergement, puis
  préciser la notice si la configuration introduit des traitements supplémentaires.
- Vérifier en HTTPS les cookies de session, headers PDF et absence d’analytics.
- Conserver le domaine canonique `https://www.simonfontaine.com` ou mettre à jour
  sa source unique si le domaine change.

La CSP limite connexions, images, polices, formulaires et contenus embarqués.
Elle ne prétend pas être une protection XSS complète : les scripts inline requis
par le rendu statique Next.js restent compatibles, sans nonce dynamique.
Les fichiers non versionnés n’utilisent pas de cache immutable forcé.
