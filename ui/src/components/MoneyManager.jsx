import { useState } from 'react'
import { fetchNui } from '../utils/fetchNui'

function MoneyManager({ societyData, onBalanceUpdate, isDark }) {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleWithdraw = async () => {
    const value = parseInt(amount)
    if (!value || value <= 0) {
      showMessage('Montant invalide', 'error')
      return
    }

    if (value > societyData?.money) {
      showMessage('Fonds insuffisants', 'error')
      return
    }

    setLoading(true)
    const result = await fetchNui('withdrawMoney', { amount: value })

    if (result?.success) {
      showMessage(`$${value.toLocaleString()} retirés avec succès`, 'success')
      onBalanceUpdate(result.balance)
      setAmount('')
    } else {
      showMessage('Erreur lors du retrait', 'error')
    }

    setLoading(false)
  }

  const handleDeposit = async () => {
    const value = parseInt(amount)
    if (!value || value <= 0) {
      showMessage('Montant invalide', 'error')
      return
    }

    setLoading(true)
    const result = await fetchNui('depositMoney', { amount: value })

    if (result?.success) {
      showMessage(`$${value.toLocaleString()} déposés avec succès`, 'success')
      onBalanceUpdate(result.balance)
      setAmount('')
    } else {
      showMessage('Erreur lors du dépôt', 'error')
    }

    setLoading(false)
  }

  const quickAmounts = [1000, 5000, 10000, 25000, 50000]

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

      {/* Balance Card */}
      <div className={`${isDark ? 'bg-gradient-to-r from-green-600 to-emerald-700' : 'bg-gradient-to-r from-green-500 to-emerald-600'} rounded-2xl p-8 text-white shadow-xl`}>
        <p className="text-green-100 text-sm font-medium uppercase tracking-wide mb-2">
          Solde de l'entreprise
        </p>
        <h2 className="text-5xl font-bold mb-4">
          ${societyData?.money?.toLocaleString() || '0'}
        </h2>
        <div className="flex items-center space-x-2 text-green-100">
          <span className="text-xl">🏢</span>
          <span className="text-sm">{societyData?.jobName}</span>
        </div>
      </div>

      {/* Quick Amounts */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
          Montants rapides
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {quickAmounts.map((quick) => (
            <button
              key={quick}
              onClick={() => setAmount(quick.toString())}
              className={`
                ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
                py-3 px-4 rounded-xl font-semibold transition-all duration-200
                hover:scale-105 active:scale-95
              `}
            >
              ${(quick / 1000).toFixed(0)}K
            </button>
          ))}
        </div>
      </div>

      {/* Transaction Form */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
          Effectuer une transaction
        </h3>

        <div className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Montant
            </label>
            <div className="relative">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className={`
                  w-full pl-10 pr-4 py-4 rounded-xl text-2xl font-bold
                  ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  }
                  border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  transition-all outline-none
                `}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleWithdraw}
              disabled={loading || !amount}
              className={`
                py-4 px-6 rounded-xl font-bold text-white
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
                  <span>💸</span>
                  <span>Retirer</span>
                </>
              )}
            </button>

            <button
              onClick={handleDeposit}
              disabled={loading || !amount}
              className={`
                py-4 px-6 rounded-xl font-bold text-white
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:from-green-600 hover:to-emerald-700
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
                  <span>💰</span>
                  <span>Déposer</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Tips */}
      <div className={`${isDark ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-2xl p-6`}>
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className={`font-bold ${isDark ? 'text-blue-300' : 'text-blue-900'} mb-2`}>
              Conseils
            </h4>
            <ul className={`space-y-1 text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
              <li>• Les retraits viennent du coffre de l'entreprise</li>
              <li>• Les dépôts viennent de votre argent personnel</li>
              <li>• Toutes les transactions sont enregistrées</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoneyManager
