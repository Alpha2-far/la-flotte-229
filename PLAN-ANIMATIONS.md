# La Flotte 229 — plan d’animation

L’effet à reprendre est une page qui se découvre au défilement : navigation persistante, titres qui apparaissent, puis images et blocs qui deviennent lisibles en fondu. Pour La Flotte 229, la proposition est de garder cette progression avec des transitions courtes et une légère montée. Les textes, les photos choisies, les proportions et le SEO restent ceux du site actuel.

Ce document est un **plan d’application**. Aucune animation n’a été ajoutée aux fichiers du site pendant l’analyse.

## 1. Source et méthode

Vidéo : `Enregistrement de l’écran 2026-11-23 à 02.57.05.mov`, dans le dossier ABC. Durée de présentation : **37,25 secondes**. Taille : **1440 × 900 px**, incluant le navigateur et le bureau. Lecture et extraction réalisées avec **VLC**, puis comparaison de **97 images**.

Les horodatages des planches sont **indicatifs, avec une marge d’environ une seconde**. Ils servent à retrouver les passages. La capture mélange défilement, chargement et traduction du navigateur : elle ne permet pas de retrouver les courbes exactes ou de mesurer précisément une translation indépendante du scroll. Les durées, déplacements et délais du plan sont donc des **réglages proposés pour notre site**, distincts des observations.

La vidéo montre la version desktop. Les réglages mobile ci-dessous sont une adaptation ; ils ne sont pas mesurés dans cet enregistrement.

## 2. Ce que montre la vidéo

| Passage approximatif | Observation | Certitude | Conséquence pour notre site |
| --- | --- | --- | --- |
| 00:00–00:12 | Navigation visible, mais grande zone blanche ; intervention de la traduction du navigateur. | État visible confirmé, cause et intention indéterminées. | Garder un accueil immédiatement accessible. Aucun écran blanc d’attente de 12 secondes. |
| 00:12–00:15 | L’accueil devient visible, puis sort de l’écran au défilement. Carte photo et panneau de couleur restent assemblés. | Composition confirmée ; ordre et durée de l’animation initiale peu documentés. | Proposer une courte séquence d’accueil, sans séparer la carte Lomé de sa photo. |
| 00:15–00:18 | Titre de présentation d’abord gris, puis noir ; collage visible avec inclinaisons fixes ; texte et boutons apparaissent ensuite. | Fondu et progression confirmés. Rotation animée non confirmée. | Faire apparaître titre, collage, texte et boutons dans cet ordre ; conserver les rotations actuelles. |
| 00:18–00:21 | Introduction des services et première ligne passent du gris / transparent à leur contraste final. Les autres services se révèlent à mesure qu’ils entrent. | Fondu confirmé. Petite montée possible, mais non isolable du scroll. | Une apparition par ligne, avec image puis texte. Léger déplacement proposé : 24 px. |
| 00:21–00:23 | Section d’expérience sur photo sombre, avec un panneau distinct. | Composition confirmée ; mouvement propre du fond non confirmé. | Révéler les engagements sur le fond existant. Garder le fond stable. |
| 00:23–00:25 | Titre de sélection avant les cartes. Les cartes passent d’un état sombre à leur couleur et contraste finaux. | Fondu confirmé ; cascade exacte entre colonnes non mesurable. | Titre d’abord, puis cartes de véhicules ; petit décalage proposé entre les colonnes. |
| 00:26–00:28 | Titre d’équipe visible avant les portraits ; portraits révélés ensuite. | Progression confirmée. | Appliquer ce rythme à notre section « Comment louer », qui remplace les portraits. |
| 00:28–00:30 | Zone d’avis blanche avant l’apparition du titre, de l’image et du témoignage. Des commandes de carrousel existent. | Apparition confirmée ; changement de slide non montré. | Reprendre l’entrée pour notre FAQ. Garder les questions existantes ; aucun carrousel à créer. |
| 00:30–00:31 | Titre et formulaire deviennent opaques sur une photo sombre. | Fondu confirmé. | Animer l’introduction et le panneau entier, sans cascade champ par champ. |
| 00:31–00:37 | Accroche de pied de page et blocs de coordonnées apparaissent. La navigation demeure en haut. | Apparitions et persistance de la navigation confirmées. | Révéler le pied de page par groupes ; garder une navigation persistante. |

Les passages les plus utiles sont dans les planches suivantes :

- [Services : états avant / pendant / après](../design/animations/01-services.jpg).
- [Sélection : titre puis cartes](../design/animations/02-flotte.jpg).
- [Équipe, avis et contact](../design/animations/03-contact.jpg).
- [Accueil et collage](../design/animations/04-accueil-collage.jpg).

Les photos ne justifient pas, à elles seules, un effet de parallaxe. La vidéo ne montre pas non plus de rebond mesurable, de texte révélé lettre par lettre, de menu mobile, ni de comportement précis au survol. Ces effets ne font pas partie de la première application.

## 3. Grammaire d’animation proposée

Une famille principale suffit : **fondu avec légère montée**, puis deux variantes plus discrètes pour les groupes d’images et le formulaire.

| Usage | Desktop | Mobile | Déclenchement |
| --- | --- | --- | --- |
| Titre ou texte | Opacité 0 → 1 ; déplacement vertical 24 px → 0 ; 600 ms | Opacité 0 → 1 ; 12 px → 0 ; 400 ms | Entrée dans la zone visible, une seule fois |
| Image / carte | Opacité 0 → 1 ; 28 px → 0 ; 650 ms | Opacité 0 → 1 ; 16 px → 0 ; 450 ms | Entrée de l’élément, une seule fois |
| Collage | Fondu + déplacement du groupe de 20 px ; 650 ms | Fondu + déplacement du groupe de 12 px ; 450 ms | Entrée du collage |
| Panneau de formulaire | Fondu + 16 px ; 550 ms | Fondu + 8 px ; 400 ms | Entrée du panneau |
| Délais entre éléments voisins | 80–100 ms ; maximum 240 ms | 0–60 ms ; maximum 120 ms | Délais locaux au groupe visible |
| Courbe | `cubic-bezier(0.22, 1, 0.36, 1)` | Même courbe | Décélération douce, sans rebond |

Ces valeurs sont des points de départ à vérifier dans Chrome. Aucun zoom d’entrée n’est nécessaire pour retrouver le fondu de la référence. Le zoom au survol des photos de véhicules existe déjà et peut rester séparé.

La cascade se limite aux éléments qui arrivent ensemble à l’écran. Une longue liste de sept véhicules ne doit pas lancer sept délais successifs dès l’entrée du titre.

## 4. Application section par section

### S01 — Navigation

**Cible :** `.site-header`.

Rendre la barre persistante avec un positionnement sticky en haut de page, un fond blanc et un niveau de superposition suffisant. Garder sa hauteur actuelle : 96 px sur desktop / tablette, 72 px sur mobile. La vidéo ne justifie pas de la cacher au défilement vers le bas, de la réduire ou de la faire rebondir.

Ce changement demande deux ajustements associés :

- Le défilement vers les ancres doit laisser la hauteur de la navigation plus 24 px de marge ; les titres ne doivent pas finir derrière la barre.
- L’introduction des services est déjà sticky sur desktop, à 40 px du haut. Son nouveau décalage doit devenir la hauteur de navigation + 32 px, pour éviter leur recouvrement. Sur les formats où cette introduction est actuellement statique, elle le reste.

Le menu mobile reste celui du site. Son fonctionnement, ses liens et la fermeture par Échap sont conservés.

### S02 — Accueil et carte Lomé

**Cibles :** `.hero-copy .eyebrow`, `.hero-copy h1`, `.hero-description`, `.hero-copy .button`, `.destination-card`.

Proposer cette entrée courte au chargement : surtitre à 0 ms, titre à 80 ms, paragraphe à 160 ms, bouton à 240 ms. Chaque entrée dure environ 550 ms. La carte Lomé apparaît comme un seul bloc à 120 ms, sur 650 ms.

Cette chorégraphie est une adaptation : le début de la vidéo ne permet pas de relever son ordre exact. Elle ne doit attendre ni la traduction du navigateur, ni le chargement complet de toutes les photos du catalogue.

La grande photo améliorée reste celle fournie (`accueil-interieur.webp`). Elle garde son recadrage et sa hauteur. La carte conserve son chevauchement desktop et son empilement mobile. Aucun mouvement continu ou parallaxe n’est ajouté à la grande photo.

En cas d’arrivée directement à `#vehicules` ou `#contact`, l’accueil ne doit pas ramener le visiteur en haut pour jouer sa séquence.

### S03 — Présentation et collage

**Cibles :** `.about .eyebrow`, `.about h2`, `.photo-collage`, `.about .narrow-copy`, `.about .button-group`.

Révéler le titre, puis le collage avec 100 ms de décalage. Le paragraphe et les deux boutons se déclenchent lorsqu’ils deviennent visibles, pas après une attente imposée par tout le haut de la section.

Le collage apparaît comme un groupe. Les quatre inclinaisons existantes restent fixes : −15°, −7°, +6°, +14°. Éviter une animation qui remplacerait leur propriété `transform` et effacerait ces rotations. L’animation portée par le conteneur du collage permet de garder les transformations des photos.

### S04 — Nos services

**Cibles :** `.section-intro`, chaque `.service-row`, son image et `.service-copy`.

L’introduction apparaît une fois. Chaque ligne se déclenche indépendamment : photo à 0 ms, texte à 100 ms sur desktop. Durée proposée : 600–650 ms. Le lien peut apparaître avec le texte ; pas de découpage mot par mot.

Sur mobile, les images et textes sont empilés : déclencher chaque bloc lorsqu’il entre dans l’écran, avec au maximum 60 ms de délai. Une photo de 280 px ne doit pas imposer une attente au titre situé dessous.

Le positionnement sticky de `.section-intro` est conservé sur desktop, avec le décalage corrigé pour la navigation. L’effet de révélation doit porter sur ses enfants, ou sur une couche intérieure, afin de ne pas transformer le conteneur sticky.

Les espaces corrigés dans « Votre séjour à Lomé » et les autres titres restent intacts. Ne pas reconstruire les titres en fragments de texte pour les animer.

### S05 — Engagements

**Cibles :** `.commitment-intro`, `.commitment-panel`, `.commitment-item`.

Faire entrer le titre et le texte à gauche. Révéler le panneau à droite avec 100 ms de décalage. Ses trois engagements peuvent apparaître avec un décalage local de 80 ms, uniquement s’ils sont visibles ensemble.

Ne pas cumuler une opacité sur le panneau et une seconde opacité sur tous ses enfants : cela rendrait le contenu trop sombre pendant la transition. Choisir une entrée du panneau entier pour la première version. Le fond reste fixe et les chiffres de repérage 01 / 02 / 03 restent inchangés.

### S06 — Véhicules

**Cibles :** `.fleet-heading`, `.fleet-toolbar`, chaque `.vehicle-card`, `.fleet-help`.

Titre et introduction apparaissent d’abord. Chaque carte se révèle quand elle entre dans l’écran. Sur trois colonnes : délais de 0 / 80 / 160 ms, remis à zéro à chaque ligne. Sur deux colonnes : 0 / 80 ms. Sur mobile : chaque carte à 0 ms.

Le déclenchement se fait sur la carte, jamais sur toute la section de sept véhicules. Ne pas attendre que la grille entière soit visible.

Les filtres SUV / berlines restent fonctionnels. Une carte déjà révélée ne rejoue pas son entrée à chaque clic. Lorsqu’un filtre rend visible une carte encore en attente, vérifier sa présence dans l’écran et la révéler sans laisser un bloc transparent. Conserver le masquage réel des cartes filtrées, le compteur et l’annonce accessible.

Le survol actuel des images reste à 1,04, sur 500 ms. Limiter les effets de survol aux appareils disposant d’un pointeur précis ; ils ne doivent pas rester actifs après un tap sur téléphone.

### S07 — Comment louer

**Cibles :** `.booking-process h2`, les quatre éléments de `.process-grid`, le bouton WhatsApp.

Reprendre la progression « titre puis portraits » observée, avec nos étapes à la place des portraits : titre, puis étapes espacées de 80 ms sur desktop. Sur mobile, révélation individuelle sans délai accumulé.

Les numéros restent 01 / 02 / 03 / 04. Aucun compteur animé d’expérience n’est ajouté : notre contenu ne présente pas un chiffre de ce type.

### S08 — Questions fréquentes

**Cibles :** l’introduction de `.faq-layout`, puis chaque `details` de `.faq-list`.

Introduction en premier, puis questions en fondu léger. Les réponses fermées restent gérées par les éléments HTML `details` existants. La première réponse conserve son état ouvert.

L’ouverture au clic reste immédiate dans la première version. Le signe + possède déjà une rotation de 200 ms ; conserver cet effet. Une animation de hauteur des réponses serait une amélioration séparée, non documentée par la vidéo.

Les cinq questions et réponses visibles restent identiques à leurs données structurées SEO. Aucun carrousel d’avis n’est créé pour reproduire une section absente de notre site.

### S09 — Contact

**Cibles :** `.contact-intro`, `.contact-links`, `.request-panel`.

Introduction en fondu, puis panneau de formulaire avec 100 ms de décalage sur desktop. Le panneau entre en une fois ; ses champs ne sont pas animés individuellement.

Les champs, valeurs déjà saisies, messages de validation et brouillon WhatsApp restent inchangés. Une prise de focus doit rendre le panneau immédiatement visible, même si son animation n’a pas commencé. Le visiteur ne doit pas taper dans un champ transparent.

### S10 — Pied de page

**Cibles :** `.footer-statement`, les colonnes de `.footer-grid`, `.footer-bottom`.

Accroche et boutons apparaissent comme un groupe. Colonnes révélées avec un décalage de 80 ms lorsqu’elles sont côte à côte. Sur mobile : entrée indépendante de chaque bloc. Les coordonnées et les liens gardent leur place.

## 5. Organisation technique, sans dépendance

Utiliser **CSS pour les transitions** et un petit complément de **JavaScript natif pour les déclencheurs**, dans les fichiers existants. HTML/CSS seuls peuvent jouer une entrée au chargement, mais ne constituent pas un déclenchement au scroll aussi fiable sur tous les navigateurs ciblés. `IntersectionObserver` convient à notre site statique et ne nécessite aucune bibliothèque.

### Fichiers concernés lors de l’application

| Fichier | Modification prévue |
| --- | --- |
| `index.html` | Ajouter des attributs d’animation sur les groupes existants. Ne pas modifier les textes, la FAQ, les liens ou le `<head>` SEO. |
| `styles.css` | Ajouter une rubrique dédiée aux animations, des réglages desktop / mobile et les ajustements sticky / ancres. Garder les dimensions et grilles actuelles. |
| `script.js` | Ajouter une fonction d’initialisation des animations à côté des comportements existants. Ne pas remplacer les gestionnaires des filtres ou du formulaire. |
| `robots.txt`, `sitemap.xml` | Aucun changement nécessaire pour une application qui ne modifie pas le contenu public. |

### Déclenchement proposé

- Un observateur partagé pour les blocs : seuil d’intersection de **10 %**, marge inférieure de **−64 px sur desktop** et **−32 px sur mobile**. Utiliser des pixels pour obtenir une distance verticale prévisible.
- Observer de petits groupes ou des cartes, pas une section entière plus haute que la fenêtre.
- Révéler chaque élément une seule fois, puis arrêter de l’observer.
- Une fonction séparée prépare les éléments d’accueil déjà dans la fenêtre ; elle ne redémarre pas une entrée déjà terminée.
- Les délais sont bornés par groupe et recalculés selon le nombre de colonnes réellement affichées.
- Ne pas installer de boucle de calcul exécutée à chaque mouvement du scroll : les effets retenus n’en ont pas besoin.

### Contenu visible par défaut

L’HTML et le CSS de base doivent afficher tous les contenus. Le JavaScript ne prépare l’état d’attente qu’après avoir confirmé que l’observateur est disponible et correctement installé. Une erreur d’initialisation doit retirer cet état et afficher tous les blocs.

Cette règle évite les sections durablement blanches ou sombres vues dans les captures de la référence. Elle permet aussi la consultation sans JavaScript. La classe de préparation ne doit pas être ajoutée globalement avant les gestionnaires de filtres et de formulaire sans traitement d’erreur.

Prévoir une révélation immédiate lorsqu’un élément en attente reçoit le focus clavier, lors d’une arrivée par ancre et lorsque la page est restaurée depuis l’historique. Ne pas retirer les contrôles en attente de l’ordre de navigation avec `inert` : le focus doit pouvoir provoquer leur affichage.

### Composition des effets

Éviter de remplacer les transformations déjà utilisées par les photos inclinées et les boutons au survol. Porter la révélation sur une couche distincte : conteneur pour le collage, enfant intérieur pour un conteneur sticky, groupe approprié pour les boutons.

Privilégier `opacity` et les déplacements visuels. Ne pas animer les hauteurs, les marges, les colonnes de grille ou les tailles de police. Garder les dimensions réservées aux photos. Ne pas appliquer `will-change` à toutes les cartes en permanence.

## 6. Mobile, clavier et réduction des mouvements

Les déplacements sont divisés environ par deux sur mobile, avec des durées de 400–450 ms. Les cartes empilées se déclenchent individuellement ; aucune cascade de plusieurs secondes. Les textes restent lisibles dans leur ordre normal.

Pour `prefers-reduced-motion: reduce` : afficher directement tous les blocs, supprimer délais, déplacements, animations et transitions de mouvement. La règle actuelle coupe les transitions ; il faudra aussi neutraliser les éventuelles animations et les états de préparation ajoutés. La navigation sticky reste fonctionnelle.

À l’impression, tous les blocs doivent être opaques, sans déplacement ni délai. Les contours de focus, la navigation clavier et les annonces des filtres restent actifs.

## 7. Ordre d’application

1. **Socle et navigation** : enregistrer l’état actuel, préparer les classes et réglages communs, traiter les échecs d’initialisation, la réduction des mouvements, le sticky et les ancres.
2. **Trois sections pilotes** : présentation / collage, services et véhicules. Ce sont les passages où le fondu est le mieux documenté. Vérifier leurs entrées sur desktop et mobile avant d’étendre le système.
3. **Accueil et reste de la page** : séquence courte d’accueil, engagements, étapes, FAQ, contact et pied de page. Réutiliser les familles validées.
4. **Compatibilité des interactions** : filtres, focus, arrivée par ancre, retour arrière, menu mobile, formulaire et lecture sans JavaScript.
5. **Réglage du rythme** : raccourcir les délais si le scroll est rapide. Vérifier qu’aucun contenu arrivé au centre de l’écran ne reste en attente.

La première version s’arrête à ces effets. Un parallaxe, un défilement piloté par bibliothèque, des rotations supplémentaires ou un carrousel demanderaient une décision distincte et ne sont pas nécessaires pour reprendre la vidéo.

## 8. Vérification avant de considérer l’application terminée

- Desktop à 1440 px, tablette à 768 / 1024 px, mobile à 390 px et petit écran à 320 px : aucun débordement horizontal.
- Navigation persistante sans recouvrir les titres ciblés par les ancres ; introduction sticky des services sous la navigation.
- Scroll lent puis rapide jusqu’au pied de page : les blocs apparaissent, gardent leur contraste final et ne disparaissent pas en remontant.
- Arrivée directe sur `#services`, `#vehicules`, `#comment-louer` et `#contact` : les contenus visés sont visibles et accessibles.
- Collage : rotations intactes, aucun écrasement de `transform` ; chevauchement de la carte Lomé conservé.
- Véhicules : 7 cartes en vue « Tous », 4 SUV, 3 berlines ; pas de carte transparente après un changement de filtre.
- Navigation clavier : le focus révèle immédiatement tout groupe encore en attente ; boutons et champs restent utilisables.
- Formulaire : présélection du véhicule, contrôle des dates et préparation WhatsApp fonctionnent comme avant.
- Sans JavaScript, avec réduction des mouvements et à l’impression : tous les contenus nécessaires sont visibles.
- Textes et liens inchangés, espaces des titres mobiles conservés, FAQ structurée identique, métadonnées et sitemap préservés.
- Aucun déplacement de mise en page causé par l’animation ; aucune erreur dans la console.

Le résultat recherché est une découverte progressive du site, avec le rythme de la référence et un accès immédiat aux informations de location.
