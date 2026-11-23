# La Flotte 229 — site statique

Ouvrir **index.html** dans un navigateur. Le site utilise HTML, CSS et un petit fichier JavaScript natif. Aucun framework, paquet à installer, serveur applicatif, compilation ou CDN n’est nécessaire. Les polices, les photos et le favicon sont dans ce dossier.

Pour un aperçu avec une adresse locale, depuis ce dossier :

```sh
python3 -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Modifier

- **index.html** : tous les textes, liens, véhicules et coordonnées. Les commentaires S02 à S10 correspondent au fichier `../REDACTION-SITE.md`.
- **styles.css** : couleurs dans `:root`, proportions, polices et mises en page desktop / tablette / mobile.
- **script.js** : menu mobile, filtres SUV / berlines, présélection du véhicule et brouillon WhatsApp.
- **assets/images** : photos WebP et logo fourni, recadré uniquement pour retirer les marges blanches.
- **favicon.ico**, **favicon.png**, **apple-touch-icon.png** : le logo fourni, placé sur une surface carrée blanche. Aucun autre symbole n’est utilisé.
- **assets/fonts** : polices locales Anton et Inter, sous licences SIL Open Font License.
- **robots.txt**, **sitemap.xml**, **SEO.md** : indexation de `https://laflotte229.bj/` et instructions de publication. Les métadonnées et données structurées sont dans le `<head>` de `index.html`.

La grande photo d’accueil vient de **image copy 36.png**, la version améliorée fournie pendant la réalisation. La carte Lomé utilise la photo de la Mazda 6.

## Fonctionnement

Les liens « Demander ce véhicule » présélectionnent le modèle dans le formulaire. Le formulaire valide les champs et l’ordre des dates, puis ouvre **un brouillon WhatsApp au +229 97 81 61 33**. Le visiteur doit envoyer le message lui-même. Aucune réservation n’est confirmée automatiquement et aucune information du formulaire n’est enregistrée par le site. Sans JavaScript, les sept véhicules, le menu mobile, les questions et un lien WhatsApp direct restent disponibles.

Appels : **+229 01 91 99 61 92**. WhatsApp : **+229 97 81 61 33**. Ces deux numéros ont été confirmés dans la conversation. Le fonctionnement effectif du numéro WhatsApp, notamment son format, reste à vérifier avec l’agence.

Les tarifs restent « sur demande », car les prix du catalogue ne précisent pas l’unité de durée ni les modalités. Les deux Lexus 330 sont distinguées par leur référence de catalogue, en attendant une identification validée. Aucun chiffre d’expérience ou avis client n’a été inventé.

## Avant publication

Compléter avec l’agence l’adresse précise, les horaires du lundi au samedi, les conditions de location, les pièces nécessaires, les tarifs et les informations légales. Les mentions légales et l’information de confidentialité devront correspondre à l’entreprise et à l’hébergement choisis. La liste complète se trouve dans `../REDACTION-SITE.md`.
