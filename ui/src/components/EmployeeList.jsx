import { useState } from 'react'
import { fetchNui } from '../utils/fetchNui'

function EmployeeList({ employees, onUpdate, isDark }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleGradeChange = async (identifier, newGrade) => {
    setLoading(true)
    const result = await fetchNui('setJobGrade', { identifier, grade: newGrade })

    if (result?.success) {
      showMessage('Grade modifié avec succès', 'success')
      onUpdate()
    } else {
      showMessage('Erreur lors de la modification du grade', 'error')
    }

    setLoading(false)
    setSelectedEmployee(null)
  }

  const handleFire = async (identifier) => {
    if (!confirm('Êtes-vous sûr de vouloir licencier cet employé ?')) {
      return
    }

    setLoading(true)
    const result = await fetchNui('fireEmployee', { identifier })

    if (result?.success) {
      showMessage('Employé licencié avec succès', 'success')
      onUpdate()
    } else {
      showMessage('Erreur lors du licenciement', 'error')
    }

    setLoading(false)
    setSelectedEmployee(null)
  }

  const grades = [
    { value: 0, label: 'Recrue' },
    { value: 1, label: 'Employé' },
    { value: 2, label: 'Manager' },
    { value: 3, label: 'Superviseur' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Message Toast */}
      {message && (
        <div className={`
          fixed top-4 right-4 px-6 py-3 rounded-xl shadow-lg z-50 animate-slide-up
          ${message.type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
          }
        `}>
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className={`${isDark ? 'bg-gradient-to-r from-purple-600 to-pink-700' : 'bg-gradient-to-r from-purple-500 to-pink-600'} rounded-2xl p-6 text-white shadow-xl`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Gestion des employés
            </h2>
            <p className="text-purple-100 text-sm">
              {employees.length} employé{employees.length > 1 ? 's' : ''} dans l'entreprise
            </p>
          </div>
          <div className="text-5xl">
            👥
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {employees.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">👤</div>
              <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Aucun employé
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                Commencez par embaucher du personnel
              </p>
            </div>
          ) : (
            employees.map((employee, index) => (
              <EmployeeCard
                key={employee.identifier}
                employee={employee}
                index={index}
                grades={grades}
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
                handleGradeChange={handleGradeChange}
                handleFire={handleFire}
                loading={loading}
                isDark={isDark}
              />
            ))
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className={`${isDark ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-200'} border rounded-2xl p-6`}>
        <div className="flex items-start space-x-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h4 className={`font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'} mb-2`}>
              Gestion RH
            </h4>
            <ul className={`space-y-1 text-sm ${isDark ? 'text-indigo-200' : 'text-indigo-800'}`}>
              <li>• Modifiez les grades de vos employés</li>
              <li>• Licenciez les employés si nécessaire</li>
              <li>• Les changements sont immédiats</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmployeeCard({
  employee,
  index,
  grades,
  selectedEmployee,
  setSelectedEmployee,
  handleGradeChange,
  handleFire,
  loading,
  isDark
}) {
  const isExpanded = selectedEmployee === employee.identifier
  const currentGrade = grades.find(g => g.value === employee.job_grade) || grades[0]

  return (
    <div
      className={`
        transition-all duration-300 animate-slide-up
        ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Avatar */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
              ${isDark ? 'bg-gradient-to-br from-blue-600 to-indigo-700' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}
              text-white
            `}>
              {employee.firstname?.[0]}{employee.lastname?.[0]}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {employee.firstname} {employee.lastname}
              </h3>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentGrade.label}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  •
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  📱 {employee.phone_number || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={() => setSelectedEmployee(isExpanded ? null : employee.identifier)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }
            `}
          >
            {isExpanded ? '🔼' : '🔽'}
          </button>
        </div>

        {/* Expanded Actions */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4 animate-slide-up">
            {/* Grade Selection */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Modifier le grade
              </label>
              <div className="grid grid-cols-2 gap-2">
                {grades.map((grade) => (
                  <button
                    key={grade.value}
                    onClick={() => handleGradeChange(employee.identifier, grade.value)}
                    disabled={loading || grade.value === employee.job_grade}
                    className={`
                      py-2 px-4 rounded-lg font-medium transition-all duration-200
                      ${grade.value === employee.job_grade
                        ? isDark
                          ? 'bg-primary-600 text-white'
                          : 'bg-primary-500 text-white'
                        : isDark
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {grade.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fire Button */}
            <button
              onClick={() => handleFire(employee.identifier)}
              disabled={loading}
              className={`
                w-full py-3 px-6 rounded-lg font-bold text-white
                bg-gradient-to-r from-red-500 to-pink-600
                hover:from-red-600 hover:to-pink-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 hover:scale-105 active:scale-95
                shadow-lg hover:shadow-xl
                flex items-center justify-center space-x-2
              `}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>🚫</span>
                  <span>Licencier</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeList
