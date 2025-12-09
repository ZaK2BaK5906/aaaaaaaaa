Config = {}

-- Ressource lb-phone
Config.PhoneResource = 'lb-phone'

-- Identifiant unique de l'app
Config.AppIdentifier = 'boss_menu'

-- Configuration de l'app
Config.App = {
    name = "Menu Patron",
    description = "Gérez votre entreprise",
    developer = "Boss Menu App",
    defaultApp = false,
    size = 256,
    icon = "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/assets/icon.png",
    price = 0
}

-- Mode de vérification boss
-- "grade_name" : Vérifie si grade_name == 'boss'
-- "grade_max"  : Vérifie si le joueur a le grade maximum du job
Config.BossCheckMode = 'grade_max'

-- Grade boss par job (utilisé si BossCheckMode = 'grade_max')
-- Si non spécifié, utilise le grade maximum du job
Config.BossGrade = {
    ['police'] = 4,
    ['ambulance'] = 4,
    -- Ajoute tes jobs et leur grade boss ici
}

-- OU utilise cette config si tu veux vérifier par grade_name
-- Config.BossCheckMode = 'grade_name'
-- Config.BossGradeName = 'boss'
