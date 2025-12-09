# 🚀 Guide de Démarrage Rapide

## Développement UI en Local

### 1. Installation des dépendances

```bash
cd ui
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

Ouvre automatiquement `http://localhost:5173` dans ton navigateur.

### 3. Mode développement

En mode dev, l'app charge des données simulées pour que tu puisses tester l'interface sans FiveM.

**Données de test incluses:**
- Solde: $50,000
- Job: Police
- 2 employés fictifs

Tu peux modifier ces données dans `ui/src/utils/fetchNui.js`.

## Build pour FiveM

### Option 1: Script automatique

```bash
chmod +x build.sh
./build.sh
```

### Option 2: Build manuel

```bash
cd ui
npm run build
```

Les fichiers buildés seront dans `ui/dist/` et seront automatiquement chargés par FiveM via `fxmanifest.lua`.

## Installation sur FiveM

### 1. Copier la ressource

Copie tout le dossier dans ton répertoire `resources/`:

```
resources/
└── [custom]/
    └── boss_menu_phone/
```

### 2. Configuration

Édite `config.lua` pour ajuster les paramètres:

```lua
Config.BossJobs = {
    'boss', -- Grade pour les patrons
}

-- Optionnel: Grades minimums par job
Config.MinGrade = {
    ['police'] = 3,  -- Le patron de la police doit avoir grade >= 3
}
```

### 3. Ajouter au server.cfg

```cfg
ensure boss_menu_phone
```

### 4. Redémarrer le serveur

```bash
restart boss_menu_phone
# ou
refresh
ensure boss_menu_phone
```

## Vérification

1. Connecte-toi à ton serveur
2. Donne-toi le grade boss: `/setjob [id] [job] boss`
3. Ouvre ton téléphone (lb-phone)
4. L'app "Menu Patron" devrait apparaître

## Personnalisation

### Couleurs

Modifie `ui/tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#ta_couleur', // Change ici
  }
}
```

### Grades

Modifie `ui/src/components/EmployeeList.jsx`:

```js
const grades = [
  { value: 0, label: 'Ton Grade 1' },
  { value: 1, label: 'Ton Grade 2' },
  // Ajoute tes grades
]
```

## Débogage

### L'app n'apparaît pas

1. Vérifie que lb-phone est démarré
2. Vérifie que tu as le grade "boss"
3. Check la console F8 pour les erreurs
4. Vérifie que le build a été fait

### Erreurs de build

```bash
# Nettoie et réinstalle
cd ui
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Tester les callbacks

Ouvre la console F8 dans FiveM et tape:

```lua
-- Test du callback des données société
TriggerServerEvent('boss_menu_phone:getSocietyData')
```

## Support

Si tu as des problèmes:

1. Vérifie les logs F8
2. Vérifie les logs serveur
3. Assure-toi que ESX et lb-phone fonctionnent
4. Vérifie que MySQL est bien configuré

---

## 🎨 Aperçu des Fonctionnalités

### 📊 Tableau de bord
- Vue d'ensemble de l'entreprise
- Statistiques en temps réel
- Actions rapides

### 💰 Finances
- Retrait d'argent du coffre
- Dépôt d'argent dans le coffre
- Montants rapides (1K, 5K, 10K, 25K, 50K)
- Validation en temps réel

### 👥 Employés
- Liste de tous les employés
- Modification des grades
- Licenciement
- Informations détaillées

### 🌓 Mode Sombre
- S'adapte automatiquement au thème du téléphone
- Transitions fluides

---

**Bon développement ! 🚀**
