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

    -- Vérifier si le joueur a un grade boss
    local isBossGrade = ESX.PlayerData.job.grade_name == 'boss'

    -- Vérifier le grade minimum si configuré
    local hasMinGrade = true
    if Config.MinGrade[playerJob] then
        hasMinGrade = playerGrade >= Config.MinGrade[playerJob]
    end

    return isBossGrade and hasMinGrade
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
        ui = GetCurrentResourceName() .. "/ui/index.html",
        onOpen = function()
            SetNuiFocus(false, false)
            -- Récupérer les données de la société
            ESX.TriggerServerCallback('boss_menu_phone:getSocietyData', function(data)
                SendNUIMessage({
                    action = 'updateSocietyData',
                    data = data
                })
            end)
        end
    })

    if not success then
        print("^1Erreur lors de l'ajout de l'app boss menu: " .. tostring(err) .. "^0")
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
