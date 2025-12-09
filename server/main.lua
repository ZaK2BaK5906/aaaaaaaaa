-- Fonction pour obtenir la société du joueur
local function GetPlayerSociety(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    if not xPlayer then return nil end

    local job = xPlayer.getJob()
    if not job or job.grade_name ~= 'boss' then
        return nil
    end

    return 'society_' .. job.name, job
end

-- Callback pour obtenir les données de la société
ESX.RegisterServerCallback('boss_menu_phone:getSocietyData', function(source, cb)
    local societyName, job = GetPlayerSociety(source)

    if not societyName then
        cb({ error = "Vous n'êtes pas patron" })
        return
    end

    TriggerEvent('esx_addonaccount:getSharedAccount', societyName, function(account)
        if account then
            cb({
                money = account.money,
                jobName = job.label,
                jobGrade = job.grade_name,
                societyName = societyName
            })
        else
            cb({
                money = 0,
                jobName = job.label,
                jobGrade = job.grade_name,
                societyName = societyName
            })
        end
    end)
end)

-- Callback pour retirer de l'argent
ESX.RegisterServerCallback('boss_menu_phone:withdrawMoney', function(source, cb, amount)
    local xPlayer = ESX.GetPlayerFromId(source)
    local societyName = GetPlayerSociety(source)

    if not societyName or not xPlayer then
        cb(false, 0)
        return
    end

    amount = tonumber(amount)
    if not amount or amount <= 0 then
        cb(false, 0)
        return
    end

    TriggerEvent('esx_addonaccount:getSharedAccount', societyName, function(account)
        if account and account.money >= amount then
            account.removeMoney(amount)
            xPlayer.addMoney(amount)
            cb(true, account.money)

            -- Log
            print(('[BOSS MENU] %s a retiré $%s de %s'):format(GetPlayerName(source), amount, societyName))
        else
            cb(false, account and account.money or 0)
        end
    end)
end)

-- Callback pour déposer de l'argent
ESX.RegisterServerCallback('boss_menu_phone:depositMoney', function(source, cb, amount)
    local xPlayer = ESX.GetPlayerFromId(source)
    local societyName = GetPlayerSociety(source)

    if not societyName or not xPlayer then
        cb(false, 0)
        return
    end

    amount = tonumber(amount)
    if not amount or amount <= 0 then
        cb(false, 0)
        return
    end

    if xPlayer.getMoney() >= amount then
        TriggerEvent('esx_addonaccount:getSharedAccount', societyName, function(account)
            if account then
                xPlayer.removeMoney(amount)
                account.addMoney(amount)
                cb(true, account.money)

                -- Log
                print(('[BOSS MENU] %s a déposé $%s dans %s'):format(GetPlayerName(source), amount, societyName))
            else
                cb(false, 0)
            end
        end)
    else
        cb(false, 0)
    end
end)

-- Callback pour obtenir la liste des employés
ESX.RegisterServerCallback('boss_menu_phone:getEmployees', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)
    if not xPlayer then
        cb({})
        return
    end

    local job = xPlayer.getJob()
    if job.grade_name ~= 'boss' then
        cb({})
        return
    end

    MySQL.Async.fetchAll('SELECT * FROM users WHERE job = @job', {
        ['@job'] = job.name
    }, function(result)
        local employees = {}

        for i=1, #result do
            local row = result[i]
            table.insert(employees, {
                identifier = row.identifier,
                firstname = row.firstname,
                lastname = row.lastname,
                job = row.job,
                job_grade = row.job_grade,
                phone_number = row.phone_number
            })
        end

        cb(employees)
    end)
end)

-- Callback pour changer le grade d'un employé
ESX.RegisterServerCallback('boss_menu_phone:setJobGrade', function(source, cb, targetIdentifier, newGrade)
    local xPlayer = ESX.GetPlayerFromId(source)
    if not xPlayer then
        cb(false)
        return
    end

    local job = xPlayer.getJob()
    if job.grade_name ~= 'boss' then
        cb(false)
        return
    end

    newGrade = tonumber(newGrade)

    MySQL.Async.execute('UPDATE users SET job_grade = @grade WHERE identifier = @identifier AND job = @job', {
        ['@grade'] = newGrade,
        ['@identifier'] = targetIdentifier,
        ['@job'] = job.name
    }, function(rowsChanged)
        if rowsChanged > 0 then
            -- Mettre à jour le joueur s'il est en ligne
            local xTarget = ESX.GetPlayerFromIdentifier(targetIdentifier)
            if xTarget then
                xTarget.setJob(job.name, newGrade)
            end
            cb(true)
        else
            cb(false)
        end
    end)
end)

-- Callback pour virer un employé
ESX.RegisterServerCallback('boss_menu_phone:fireEmployee', function(source, cb, targetIdentifier)
    local xPlayer = ESX.GetPlayerFromId(source)
    if not xPlayer then
        cb(false)
        return
    end

    local job = xPlayer.getJob()
    if job.grade_name ~= 'boss' then
        cb(false)
        return
    end

    MySQL.Async.execute('UPDATE users SET job = @job, job_grade = @grade WHERE identifier = @identifier', {
        ['@job'] = 'unemployed',
        ['@grade'] = 0,
        ['@identifier'] = targetIdentifier
    }, function(rowsChanged)
        if rowsChanged > 0 then
            -- Mettre à jour le joueur s'il est en ligne
            local xTarget = ESX.GetPlayerFromIdentifier(targetIdentifier)
            if xTarget then
                xTarget.setJob('unemployed', 0)
            end
            cb(true)
        else
            cb(false)
        end
    end)
end)

-- Callback pour embaucher un joueur
ESX.RegisterServerCallback('boss_menu_phone:hireEmployee', function(source, cb, targetId)
    local xPlayer = ESX.GetPlayerFromId(source)
    local xTarget = ESX.GetPlayerFromId(targetId)

    if not xPlayer or not xTarget then
        cb(false)
        return
    end

    local job = xPlayer.getJob()
    if job.grade_name ~= 'boss' then
        cb(false)
        return
    end

    xTarget.setJob(job.name, 0)
    cb(true)

    TriggerClientEvent('esx:showNotification', targetId, 'Vous avez été embauché chez ' .. job.label)
    TriggerClientEvent('esx:showNotification', source, 'Employé embauché avec succès')
end)
