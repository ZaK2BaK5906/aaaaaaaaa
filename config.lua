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

-- Jobs qui peuvent accéder à l'app
Config.BossJobs = {
    'boss', -- Pour les grades boss
}

-- Grades minimums par job (optionnel)
Config.MinGrade = {
    -- ['police'] = 3,
    -- ['ambulance'] = 2,
}
