function Tabs({ tabs, activeTab, onTabChange, isDark }) {
  return (
    <div className="flex space-x-1 px-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center space-x-2 px-4 py-3 rounded-t-lg font-medium transition-all duration-200
            ${activeTab === tab.id
              ? isDark
                ? 'bg-gray-900 text-white border-t-2 border-primary-500'
                : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-primary-600 border-t-2 border-primary-500'
              : isDark
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }
          `}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className="whitespace-nowrap">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default Tabs
