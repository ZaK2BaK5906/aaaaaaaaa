# 🎮 Guide de Test dans FiveM

## 🚀 Premier Test sur FiveM

### 1️⃣ Build l'UI (une seule fois)

```bash
cd ui
npm install
npm run build
```

Ça va créer le dossier **ui_built/** avec ton app buildée.

---

### 2️⃣ Copie dans ton serveur FiveM

Copie tout le dossier `boss_menu_phone` dans :

```
ton_serveur_fivem/
└── resources/
    └── [custom]/
        └── boss_menu_phone/    ← Mets le dossier ici
```

---

### 3️⃣ Ajoute au server.cfg

Ouvre `server.cfg` et ajoute :

```cfg
ensure boss_menu_phone
```

---

### 4️⃣ Configure les grades dans config.lua

Édite `config.lua` et ajuste selon tes jobs :

```lua
Config.BossCheckMode = 'grade_max'  -- Utilise le grade max

Config.BossGrade = {
    ['police'] = 4,      -- Grade 4 = boss police
    ['ambulance'] = 4,   -- Grade 4 = boss ambulance
    -- Ajoute tes autres jobs ici
}
```

---

### 5️⃣ Redémarre ton serveur

Redémarre complètement ton serveur FiveM.

---

### 6️⃣ Teste en jeu !

**1. Connecte-toi au serveur**

**2. Donne-toi le grade boss :**

Dans F8 :
```
setjob [ton_id] police 4
```

Exemple :
```
setjob 1 police 4
```

**3. Ouvre lb-phone**

L'app **"Menu Patron"** devrait apparaître dans ton téléphone ! 📱

**4. Clique dessus**

Tu verras l'interface dans le téléphone lb-phone, pas en plein écran !

---

## 🔄 Mode Développement (Auto-Refresh)

Si tu veux modifier l'UI et voir les changements rapidement :

### Terminal 1 : Lance le watch

```bash
cd ui
npm run watch
```

Ça rebuild automatiquement quand tu modifies un fichier React/CSS.

### Dans FiveM (F8)

À chaque changement, fais :

```
restart boss_menu_phone
```

Ou si t'as pas envie de taper ça tout le temps :

```
refresh
restart boss_menu_phone
```

---

## 🐛 Debugging

### L'app n'apparaît pas ?

**1. Vérifie F8 pour les erreurs**

Cherche les lignes en rouge avec "boss_menu" ou "lb-phone"

**2. Vérifie que le build existe**

```bash
ls ui_built/
```

Tu dois voir : `index.html`, `assets/`, etc.

**3. Vérifie ton grade**

Dans F8 :
```lua
print(ESX.PlayerData.job.name)
print(ESX.PlayerData.job.grade)
```

Ça doit afficher ton job et grade.

**4. Vérifie que lb-phone est started**

Dans F8 :
```
ensure lb-phone
```

---

### L'app est blanche / ne charge pas ?

**1. Check la console F8** pour les erreurs JavaScript

**2. Rebuild l'UI** :
```bash
cd ui
rm -rf ui_built
npm run build
```

**3. Restart** :
```
restart boss_menu_phone
```

---

### L'UI ne se met pas à jour ?

Si tu utilises `npm run watch` :

1. Sauvegarde tes fichiers React
2. Attends 1-2 secondes (le build prend un peu de temps)
3. Dans FiveM F8 : `restart boss_menu_phone`
4. Réouvre le téléphone

---

## 📱 Test des Fonctionnalités

### Test 1 : Voir le dashboard
- Ouvre l'app
- Tu dois voir :
  - Ton solde de société
  - Nombre d'employés
  - Statistiques

### Test 2 : Retirer de l'argent
- Va dans "Finances"
- Clique sur un montant rapide (1K, 5K, etc.)
- Clique "Retirer"
- Vérifie ton argent perso (il augmente)
- Vérifie le solde société (il diminue)

### Test 3 : Gérer les employés
- Va dans "Employés"
- Tu dois voir la liste
- Clique sur un employé
- Change son grade
- Vérifie en jeu avec `/showme` ou autre

---

## 🎨 Personnaliser l'UI

### Changer les couleurs

Édite `ui/src/App.jsx` ou `ui/tailwind.config.js`

Exemple dans `tailwind.config.js` :
```js
colors: {
  primary: {
    500: '#ff0000',  // Rouge au lieu de bleu
  }
}
```

Ensuite :
```bash
npm run build
restart boss_menu_phone
```

---

## ✅ C'est bon si...

- ✅ L'app apparaît dans lb-phone
- ✅ L'interface s'affiche dans le téléphone (pas plein écran)
- ✅ Tu peux naviguer entre les onglets
- ✅ Les données de ta société s'affichent
- ✅ Les transactions fonctionnent
- ✅ Le mode sombre s'active si ton téléphone est en dark mode

---

## 📞 Structure de l'App dans lb-phone

```
📱 Téléphone lb-phone
│
├── 📊 Tableau de bord
│   ├── Solde entreprise
│   ├── Nombre employés
│   └── Actions rapides
│
├── 💰 Finances
│   ├── Retirer argent
│   ├── Déposer argent
│   └── Montants rapides
│
└── 👥 Employés
    ├── Liste employés
    ├── Changer grades
    └── Licencier
```

---

**Bonne chance pour ton test ! 🚀**

Si ça marche pas, envoie-moi les erreurs de F8 ! 💪
