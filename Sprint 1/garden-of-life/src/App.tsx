import { useState, useEffect } from 'react'
import { HabitList } from './components/HabitList'
import { Garden } from './components/Garden'
import { getInitialState, saveTodaysData, getLastLoginDate, saveLastLoginDate, applyDecay, loadPreviousGardenState, getDefaultHabits } from './lib/storage'
import { getTodayKey, calculateDaysBetween } from './lib/date'
import type { AppState } from './types'
import './App.css'

function App() {
  // Initialize state with decay check
  const [appState, setAppState] = useState<AppState>(() => {
    const today = getTodayKey()
    const lastLogin = getLastLoginDate()
    
    // E01: first time user
    if (!lastLogin) {
      saveLastLoginDate(today)
      return getInitialState()
    }

    const daysMissed = calculateDaysBetween(lastLogin, today)
    
    // A01: same day login - no decay
    if (daysMissed === 0) {
      return getInitialState()
    }

    // User missed days - apply decay
    const previousGarden = loadPreviousGardenState()
    const previousPlants = previousGarden?.plants || 0
    
    // BR02: apply decay (1 plant per missed day)
    const newPlantCount = applyDecay(previousPlants, daysMissed)
    
    const newState: AppState = {
      habits: getDefaultHabits(),
      garden: { plants: newPlantCount },
      date: today,
      lastLoginDate: today,
      streak: 0,
    }
    
    saveTodaysData(newState)
    return newState
  })

  const [showDecayMessage, setShowDecayMessage] = useState(() => {
    const lastLogin = getLastLoginDate()
    if (!lastLogin) return false
    const daysMissed = calculateDaysBetween(lastLogin, getTodayKey())
    return daysMissed > 0
  })

  useEffect(() => {
    saveTodaysData(appState)
  }, [appState])

  const handleToggleHabit = (habitId: string) => {
    setAppState(prevState => {
      const habit = prevState.habits.find(h => h.id === habitId)
      if (!habit) {
        return prevState
      }

      const updatedHabits = prevState.habits.map(h =>
        h.id === habitId ? { ...h, completed: !h.completed } : h
      )

      const newPlantCount = habit.completed
        ? Math.max(0, prevState.garden.plants - 1)
        : prevState.garden.plants + 1

      return {
        ...prevState,
        habits: updatedHabits,
        garden: {
          plants: newPlantCount
        }
      }
    })
  }

  const completedCount = appState.habits.filter(h => h.completed).length
  const totalCount = appState.habits.length
  const lastLogin = getLastLoginDate()

  return (
    <div className="app">
      <header>
        <h1>Garden of Life</h1>
        <p>Today: {getTodayKey()}</p>
        <p className="completion-indicator" data-testid="completion-indicator">
          Habits completed: {completedCount}/{totalCount}
        </p>
      </header>
      
      <main>
        {showDecayMessage && lastLogin && (
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            padding: '1rem',
            margin: '1rem 0',
            textAlign: 'center',
            color: '#856404'
          }}>
            <p style={{ margin: '0.5rem 0' }}>
              📅 Today: {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
            <p style={{ margin: '0.5rem 0' }}>⚠️ Streak lost</p>
            <p style={{ margin: '0.5rem 0' }}>
              Last check-in: {new Date(lastLogin).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
            <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>
              Start fresh today! 💪
            </p>
            <button 
              onClick={() => setShowDecayMessage(false)}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Got it!
            </button>
          </div>
        )}
        
        <HabitList 
          habits={appState.habits} 
          onToggleHabit={handleToggleHabit} 
        />
        <Garden garden={appState.garden} />
      </main>
    </div>
  )
}

export default App
