# Boss Menu - Application Téléphone

Application de menu patron pour lb-phone. Permet aux patrons de gérer leur entreprise directement depuis leur téléphone.

## 📱 Fonctionnalités

- ✅ **Tableau de bord** - Vue d'ensemble de l'entreprise
- 💰 **Gestion financière** - Retrait/dépôt d'argent du coffre de l'entreprise
- 👥 **Gestion des employés** - Modifier les grades, embaucher et licencier
- 🎨 **Design moderne** - Interface fluide avec Tailwind CSS
- 🌓 **Mode sombre** - Support automatique du thème du téléphone
- 📱 **Responsive** - Optimisé pour tous les écrans

## 🚀 Installation

### Prérequis

- ESX Legacy
- lb-phone
- ox_lib (optionnel)
- Node.js 18+ (pour le développement UI)

### Étapes

1. Clonez ou téléchargez ce repository dans votre dossier `resources`

2. Installez les dépendances et buildez l'UI :
```bash
cd ui
npm install
npm run build
```

3. Ajoutez la ressource à votre `server.cfg` :
```cfg
ensure boss_menu_phone
```

4. Configurez les jobs dans `config.lua`

5. Redémarrez votre serveur

## ⚙️ Configuration

Éditez `config.lua` pour personnaliser :

```lua
Config.BossJobs = {
    'boss', -- Grade par défaut pour les patrons
}

Config.MinGrade = {
    -- Définir des grades minimums par job
    -- ['police'] = 3,
}
```

## 🛠️ Développement

### Structure du projet

```
boss_menu_phone/
├── client/
│   └── main.lua          # Client-side logic
├── server/
│   └── main.lua          # Server-side logic
├── ui/
│   ├── src/
│   │   ├── components/   # Composants React
│   │   ├── utils/        # Utilitaires
│   │   ├── App.jsx       # App principale
│   │   └── main.jsx      # Point d'entrée
│   ├── package.json
│   └── vite.config.js
├── config.lua            # Configuration
└── fxmanifest.lua
```

### Développement UI

Pour développer l'interface en mode développement :

```bash
cd ui
npm run dev
```

L'interface sera accessible sur `http://localhost:5173` avec hot-reload.

Pour builder pour la production :

```bash
npm run build
```

## 📝 Utilisation

1. Seuls les joueurs avec le grade "boss" peuvent voir l'application
2. L'application apparaît automatiquement dans le téléphone
3. Utilisez les différents onglets pour :
   - 📊 **Dashboard** : Voir les statistiques
   - 💰 **Finances** : Gérer l'argent de l'entreprise
   - 👥 **Employés** : Gérer le personnel

## 🎨 Personnalisation

### Couleurs

Les couleurs peuvent être modifiées dans `ui/tailwind.config.js` :

```js
colors: {
  primary: {
    500: '#0ea5e9', // Couleur principale
    // ...
  }
}
```

### Animations

Les animations sont définies dans `ui/tailwind.config.js` et peuvent être personnalisées.

## 🐛 Dépannage

### L'app n'apparaît pas
- Vérifiez que vous avez le grade "boss"
- Vérifiez que lb-phone est bien démarré
- Consultez les logs F8 pour les erreurs

### Erreurs de build
- Assurez-vous d'avoir Node.js 18+
- Supprimez `node_modules` et réinstallez : `rm -rf node_modules && npm install`

## 📄 License

MIT License - Libre d'utilisation et de modification

## 🙏 Crédits

- lb-phone pour le framework téléphone
- ESX pour le framework serveur
- React + Tailwind CSS pour l'interface

## 💡 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

Fait avec ❤️ pour la communauté FiveM
