function Dashboard({ societyData, employees, isDark }) {
  const stats = [
    {
      label: 'Solde de l\'entreprise',
      value: `$${societyData?.money?.toLocaleString() || '0'}`,
      icon: '💵',
      color: isDark ? 'from-green-600 to-emerald-700' : 'from-green-500 to-emerald-600',
      bgColor: isDark ? 'bg-gray-800' : 'bg-white'
    },
    {
      label: 'Nombre d\'employés',
      value: employees?.length || 0,
      icon: '👥',
      color: isDark ? 'from-blue-600 to-indigo-700' : 'from-blue-500 to-indigo-600',
      bgColor: isDark ? 'bg-gray-800' : 'bg-white'
    },
    {
      label: 'Entreprise',
      value: societyData?.jobName || '-',
      icon: '🏢',
      color: isDark ? 'from-purple-600 to-pink-700' : 'from-purple-500 to-pink-600',
      bgColor: isDark ? 'bg-gray-800' : 'bg-white'
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Card */}
      <div className={`${isDark ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} rounded-2xl p-6 text-white shadow-xl`}>
        <h2 className="text-2xl font-bold mb-2">
          Bienvenue, Patron ! 👋
        </h2>
        <p className="text-blue-100 text-sm">
          Gérez votre entreprise {societyData?.jobName} depuis votre téléphone
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`text-3xl p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wide`}>
              {stat.label}
            </p>
            <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-2`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
          <span className="mr-2">⚡</span>
          Actions rapides
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <QuickActionButton
            icon="💰"
            label="Gérer finances"
            isDark={isDark}
          />
          <QuickActionButton
            icon="👥"
            label="Voir employés"
            isDark={isDark}
          />
          <QuickActionButton
            icon="📊"
            label="Statistiques"
            isDark={isDark}
          />
          <QuickActionButton
            icon="⚙️"
            label="Paramètres"
            isDark={isDark}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
          <span className="mr-2">📋</span>
          Activité récente
        </h3>
        <div className="space-y-3">
          <ActivityItem
            icon="💵"
            text="Consultation du solde de l'entreprise"
            time="Il y a quelques instants"
            isDark={isDark}
          />
          <ActivityItem
            icon="📱"
            text="Ouverture de l'application"
            time="Il y a quelques instants"
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  )
}

function QuickActionButton({ icon, label, isDark }) {
  return (
    <button className={`
      ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
      p-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95
      flex flex-col items-center space-y-2 font-medium
    `}>
      <span className="text-2xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  )
}

function ActivityItem({ icon, text, time, isDark }) {
  return (
    <div className={`flex items-start space-x-3 p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {text}
        </p>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
          {time}
        </p>
      </div>
    </div>
  )
}

export default Dashboard
