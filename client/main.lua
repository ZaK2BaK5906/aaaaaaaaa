local isBoss = false
local playerJob = nil
local playerGrade = 0

-- Fonction pour vérifier si le joueur est patron
local function CheckBossStatus()
    if not ESX or not ESX.PlayerData or not ESX.PlayerData.job then
        return false
    end

    playerJob = ESX.PlayerData.job.name
    playerGrade = ESX.PlayerData.job.grade

    -- Vérifier selon le mode configuré
    local isBossGrade = false

    if Config.BossCheckMode == 'grade_name' then
        -- Vérifier par grade_name
        local gradeName = Config.BossGradeName or 'boss'
        isBossGrade = ESX.PlayerData.job.grade_name == gradeName
    elseif Config.BossCheckMode == 'grade_max' then
        -- Vérifier par grade maximum
        if Config.BossGrade[playerJob] then
            isBossGrade = playerGrade >= Config.BossGrade[playerJob]
        else
            -- Si pas de config spécifique, ne donne pas accès
            isBossGrade = false
        end
    end

    return isBossGrade
end

-- Event quand le job change
RegisterNetEvent('esx:setJob', function(job)
    ESX.PlayerData.job = job
    local wasBoss = isBoss
    isBoss = CheckBossStatus()

    -- Ajouter ou retirer l'app selon le statut
    if isBoss and not wasBoss then
        AddBossApp()
    elseif not isBoss and wasBoss then
        RemoveBossApp()
    end
end)

-- Fonction pour ajouter l'app
function AddBossApp()
    local success, err = exports[Config.PhoneResource]:AddCustomApp({
        identifier = Config.AppIdentifier,
        name = Config.App.name,
        description = Config.App.description,
        developer = Config.App.developer,
        defaultApp = Config.App.defaultApp,
        size = Config.App.size,
        icon = Config.App.icon,
        price = Config.App.price,
        ui = GetCurrentResourceName() .. "/ui_built/index.html"
        -- Pas de onOpen - l'UI charge les données elle-même via les NUI callbacks
    })

    if not success then
        print("^1Erreur lors de l'ajout de l'app boss menu: " .. tostring(err) .. "^0")
    else
        print("^2[Boss Menu] App ajoutée avec succès!^0")
    end
end

-- Fonction pour retirer l'app
function RemoveBossApp()
    local success, err = exports[Config.PhoneResource]:RemoveCustomApp(Config.AppIdentifier)
    if not success then
        print("^1Erreur lors du retrait de l'app boss menu: " .. tostring(err) .. "^0")
    end
end

-- NUI Callbacks
RegisterNUICallback('getBossData', function(data, cb)
    ESX.TriggerServerCallback('boss_menu_phone:getSocietyData', function(societyData)
        cb(societyData)
    end)
end)

RegisterNUICallback('withdrawMoney', function(data, cb)
    ESX.TriggerServerCallback('boss_menu_phone:withdrawMoney', function(success, newBalance)
        cb({ success = success, balance = newBalance })
    end, data.amount)
end)

RegisterNUICallback('depositMoney', function(data, cb)
    ESX.TriggerServerCallback('boss_menu_phone:depositMoney', function(success, newBalance)
        cb({ success = success, balance = newBalance })
    end, data.amount)
end)

RegisterNUICallback('getEmployees', function(data, cb)
    ESX.TriggerServerCallback('boss_menu_phone:getEmployees', function(employees)
        cb(employees)
    end)
end)

RegisterNUICallback('setJobGrade', function(data, cb)
    ESX.TriggerServerCallback('boss_menu_phone:setJobGrade', function(success)
        cb({ success = success })
    end, data.identifier, data.grade)
end)

RegisterNUICallback('fireEmployee', function(data, cb)
    ESX.TriggerServerCallback('boss_menu_phone:fireEmployee', function(success)
        cb({ success = success })
    end, data.identifier)
end)

RegisterNUICallback('hireEmployee', function(data, cb)
    ESX.TriggerServerCallback('boss_menu_phone:hireEmployee', function(success)
        cb({ success = success })
    end, data.target)
end)

-- Initialisation
CreateThread(function()
    while not ESX or not ESX.PlayerData or not ESX.PlayerData.job do
        Wait(100)
    end

    -- Attendre que lb-phone soit chargé
    Wait(1000)

    isBoss = CheckBossStatus()

    if isBoss then
        AddBossApp()
    end
end)
