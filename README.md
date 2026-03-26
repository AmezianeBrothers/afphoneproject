# AF-PHONE — Site officiel Nîmes 🔵

> Expert en réparation de téléphones — 100 Rue des Mousquetaires, 30000 Nîmes  
> Tél : **07 66 82 97 44**

---

## 🚀 Déploiement sur Lovable (méthode rapide)

### Option A — Import GitHub (recommandé)
1. Poussez ce dossier sur un repo GitHub (public ou privé)
2. Sur [lovable.dev](https://lovable.dev), cliquez **"Import from GitHub"**
3. Sélectionnez votre repo → Lovable détecte automatiquement Vite + React
4. Ajoutez vos variables d'environnement Supabase (voir ci-dessous)
5. Cliquez **Deploy** → votre site est live en 2 minutes ✅

### Option B — Copie manuelle dans l'éditeur Lovable
Collez chaque fichier dans l'arborescence de Lovable dans l'ordre suivant :
1. `index.html`
2. `tailwind.config.ts`
3. `postcss.config.js`
4. `vite.config.ts`
5. `tsconfig.json`
6. `src/index.css`
7. `src/main.tsx`
8. `src/App.tsx`
9. Tous les fichiers `src/components/*.tsx`
10. `src/hooks/useReveal.ts`
11. `src/lib/supabase.ts`

---

## 🗄️ Configuration Supabase (optionnel — pour le formulaire RDV)

1. Créez un projet sur [supabase.com](https://supabase.com) (gratuit)
2. Copiez vos clés depuis **Project Settings → API**
3. Créez un fichier `.env.local` :
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
4. Exécutez le SQL de création des tables (voir `src/lib/supabase.ts`)
5. Dans Lovable : **Settings → Environment Variables** → ajoutez les deux vars

> ⚠️ Sans ces variables, le formulaire de RDV affiche un message d'erreur mais le reste du site fonctionne parfaitement.

---

## 📦 Stack technique

| Technologie | Rôle |
|---|---|
| **React 18 + TypeScript** | Framework UI |
| **Vite 5** | Build ultra-rapide |
| **Tailwind CSS 3** | Styles utilitaires |
| **Lucide React** | Icônes SVG optimisées |
| **Supabase** | Backend RDV + stock |
| **OpenStreetMap** | Carte gratuite & RGPD-friendly |

---

## 🏗️ Architecture des composants

```
src/
├── App.tsx                   ← Assemblage principal
├── index.css                 ← Design system + animations
├── main.tsx                  ← Point d'entrée React
├── hooks/
│   └── useReveal.ts          ← Scroll animations (IntersectionObserver)
├── lib/
│   └── supabase.ts           ← Client Supabase + types + helpers
└── components/
    ├── Navbar.tsx             ← Navigation glassmorphism + menu mobile
    ├── Hero.tsx               ← Section hero avec parallax
    ├── Services.tsx           ← Aperçu des 3 services principaux
    ├── Repairs.tsx            ← Tableau réparations + atouts
    ├── Boutique.tsx           ← Vente téléphones & accessoires
    ├── Reviews.tsx            ← Avis Google clients
    ├── Game.tsx               ← Mini-jeu "Répare le téléphone"
    ├── AppointmentForm.tsx    ← Formulaire RDV → Supabase
    ├── Contact.tsx            ← Carte + horaires + téléphone
    ├── FloatingCTA.tsx        ← Bouton flottant mobile
    └── Footer.tsx             ← Pied de page + liens SEO
```

---

## 🔍 SEO — Checklist

- [x] Balise `<title>` optimisée avec mots-clés locaux
- [x] `<meta description>` avec appel à l'action
- [x] Balise canonique anti-duplicate content
- [x] Open Graph complet (titre, description, locale)
- [x] JSON-LD `LocalBusiness` / `MobilePhoneRepairShop`
- [x] Schéma d'adresse, horaires, téléphone, avis agrégés
- [x] Structure H1 → H2 → H3 sémantique
- [x] `aria-label` sur toutes les sections
- [x] Images lazy-loaded
- [x] Polices Google Fonts en preconnect
- [x] Build Terser → bundle minifié
- [x] Code splitting vendors / icons

---

## 📞 Infos boutique

| | |
|---|---|
| **Nom** | AF-PHONE |
| **Adresse** | 100 Rue des Mousquetaires, 30000 Nîmes |
| **Téléphone** | 07 66 82 97 44 |
| **Lun–Ven** | 09h30 – 19h00 |
| **Samedi** | 09h30 – 18h00 |
| **Dimanche** | Fermé |
