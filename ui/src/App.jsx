import { useState, useEffect } from 'react'
import { fetchNui, onNuiEvent } from './utils/fetchNui'
import Dashboard from './components/Dashboard'
import MoneyManager from './components/MoneyManager'
import EmployeeList from './components/EmployeeList'
import Tabs from './components/Tabs'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [societyData, setSocietyData] = useState(null)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  // Charger les données initiales
  useEffect(() => {
    loadData()

    // Écouter les mises à jour depuis le client
    const cleanup = onNuiEvent('updateSocietyData', (data) => {
      setSocietyData(data)
    })

    return cleanup
  }, [])

  // Détecter le thème
  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme')
    setIsDark(theme === 'dark')

    // Observer les changements de thème
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme')
          setIsDark(newTheme === 'dark')
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => observer.disconnect()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const data = await fetchNui('getBossData')
    const employeeData = await fetchNui('getEmployees')

    if (data) setSocietyData(data)
    if (employeeData) setEmployees(employeeData)

    setLoading(false)
  }

  const updateBalance = (newBalance) => {
    setSocietyData(prev => ({ ...prev, money: newBalance }))
  }

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'money', label: 'Finances', icon: '💰' },
    { id: 'employees', label: 'Employés', icon: '👥' },
  ]

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Chargement...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-lg'} border-b shadow-sm sticky top-0 z-10`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Menu Patron
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                {societyData?.jobName || 'Entreprise'}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gradient-to-r from-green-500 to-emerald-600'} shadow-lg`}>
              <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-green-100'} uppercase tracking-wide`}>
                Solde
              </p>
              <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-white'} mt-1`}>
                ${societyData?.money?.toLocaleString() || '0'}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} isDark={isDark} />
      </div>

      {/* Content */}
      <div className="p-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard societyData={societyData} employees={employees} isDark={isDark} />
          )}
          {activeTab === 'money' && (
            <MoneyManager
              societyData={societyData}
              onBalanceUpdate={updateBalance}
              isDark={isDark}
            />
          )}
          {activeTab === 'employees' && (
            <EmployeeList
              employees={employees}
              onUpdate={loadData}
              isDark={isDark}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
