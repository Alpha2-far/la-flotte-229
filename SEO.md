# SEO de La Flotte 229

Configuration appliquée pour **https://laflotte229.bj/**. Les modifications de `index.html` sont limitées à son `<head>` : le corps de la page, ses textes, ses images affichées, son CSS et son JavaScript sont conservés.

## Ce qui est en place

- Titre et description existants conservés : location de voitures à Calavi et Cotonou.
- Langue française existante conservée et précisée dans les données structurées.
- URL canonique : `https://laflotte229.bj/`.
- Directive d’indexation et autorisation des grands aperçus d’image.
- Open Graph et carte de partage avec grande image : nom du site, URL, descriptions, image, dimensions et description de l’image.
- Image de partage `assets/images/social-cover.jpg`, 1200 × 630 px, composée de la photo améliorée et du logo fournis. Elle ne remplace aucune image affichée dans la page.
- JSON-LD Schema.org : agence de location (`AutoRental`, sous-type de `LocalBusiness`), site (`WebSite`), accueil (`WebPage`), services de location et questions fréquentes (`FAQPage`).
- Coordonnées confirmées, implantation à Abomey-Calavi, zones mentionnées, liens vers les réseaux sociaux et contacts téléphone / WhatsApp.
- Les cinq questions et réponses structurées reprennent exactement la FAQ existante. Ce balisage ne garantit pas un résultat enrichi FAQ dans Google, dont l’affichage est réservé à certaines catégories de sites.
- `robots.txt` autorise l’exploration et indique le sitemap.
- `sitemap.xml` déclare l’unique page publique et sa photo principale. Les ancres des sections ne sont pas déclarées comme des pages indépendantes.
- Les polices et les images restent locales. Aucun script de suivi ou service externe supplémentaire n’est chargé.

Les prix, avis, notes, coordonnées GPS, adresse de rue et horaires complets ne sont pas ajoutés aux données structurées : ils n’ont pas été confirmés. L’adresse structurée contient uniquement Abomey-Calavi et le pays BJ. Elle pourra être complétée avec l’adresse exacte pour améliorer les informations locales et l’éligibilité aux fonctionnalités correspondantes.

Les expressions locales sont celles déjà présentes dans le titre, la description et le contenu : location de voitures à Calavi / Cotonou, avec ou sans chauffeur, demi-journée, longue durée et séjours à Lomé. Aucun texte caché ni bourrage de mots-clés n’est ajouté.

## Mise en ligne

1. Publier **tout le contenu de `Site` à la racine** de `https://laflotte229.bj/`, y compris les fichiers `robots.txt`, `sitemap.xml` et le dossier `assets`.
2. Vérifier que la page, les fichiers SEO et l’image de partage répondent en HTTPS. Le site n’a pas été déployé pendant cette modification.
3. Configurer une redirection permanente de HTTP vers HTTPS et, si `www` est utilisé, de `www.laflotte229.bj` vers `laflotte229.bj`. Rediriger aussi `/index.html` vers `/` au niveau de l’hébergement.
4. Vérifier le domaine dans Google Search Console, puis soumettre `https://laflotte229.bj/sitemap.xml`. La propriété n’a pas été créée et le sitemap n’a pas été soumis dans cette session.
5. Relier la fiche Google Business Profile de l’agence à cette adresse publique, avec les mêmes nom et numéros. Compléter la fiche avec l’adresse et les horaires validés par l’agence. Aucune fiche n’a été modifiée.
6. À chaque modification du contenu, actualiser la date `lastmod` du sitemap. Si la FAQ change, mettre ses données JSON-LD à jour pour rester cohérent avec les réponses visibles.

Les fonctions d’analyse locale prévues par le skill n’étaient pas disponibles dans cette session. Aucun audit de concurrents, volume de recherche ou classement SEO n’est présenté. Les données locales viennent du brief et des confirmations dans la conversation.
