import { useState, useEffect } from 'react'
import { HabitList } from './components/HabitList'
import { Garden } from './components/Garden'
import { getInitialState, saveTodaysData, getLastLoginDate, saveLastLoginDate, applyDecay, loadPreviousAppState, getDefaultHabits } from './lib/storage'
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
    const previousState = loadPreviousAppState()
    const previousPlants = previousState?.garden?.plants || 0

    // BR02: apply decay (1 plant per missed day)
    const newPlantCount = applyDecay(previousPlants, daysMissed)

    // TC03: Handle streak persistence
    // If exactly 1 day missed and all habits were completed yesterday, continue streak
    // Otherwise reset to 0
    let newStreak = 0
    if (daysMissed === 1 && previousState) {
      const allHabitsCompleted = previousState.habits.every(h => h.completed)
      if (allHabitsCompleted) {
        newStreak = previousState.streak || 0
      }
    }

    const newState: AppState = {
      habits: getDefaultHabits(),
      garden: { plants: newPlantCount },
      date: today,
      lastLoginDate: today,
      streak: newStreak,
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

  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    saveTodaysData(appState)
  }, [appState])

  const handleToggleHabit = (habitId: string) => {
    setAppState(prevState => {
      const habit = prevState.habits.find(h => h.id === habitId)
      if (!habit) {
        return prevState
      }

      // TC02: Prevent re-checking - if already completed, don't allow unchecking
      if (habit.completed) {
        return prevState
      }

      const updatedHabits = prevState.habits.map(h =>
        h.id === habitId ? { ...h, completed: true } : h
      )

      const newPlantCount = prevState.garden.plants + 1
      const completedCount = updatedHabits.filter(h => h.completed).length
      const allCompleted = completedCount === updatedHabits.length

      // TC03: Increment streak when all habits are completed
      const newStreak = allCompleted ? (prevState.streak || 0) + 1 : prevState.streak || 0

      // Show celebration when all habits completed
      if (allCompleted) {
        setShowCelebration(true)
      }

      return {
        ...prevState,
        habits: updatedHabits,
        garden: {
          plants: newPlantCount
        },
        streak: newStreak
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
        <p className="streak-indicator" data-testid="streak-indicator">
          Current Streak: {appState.streak || 0} days
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

        {showCelebration && (
          <div
            style={{
              background: '#d4edda',
              border: '1px solid #28a745',
              borderRadius: '8px',
              padding: '1rem',
              margin: '1rem 0',
              textAlign: 'center',
              color: '#155724'
            }}
            data-testid="celebration-message"
          >
            <p style={{ margin: '0.5rem 0', fontSize: '2rem' }}>🎉</p>
            <p style={{ margin: '0.5rem 0', fontWeight: 'bold', fontSize: '1.2rem' }}>
              Congratulations!
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              You completed all your habits today!
            </p>
            <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>
              Current Streak: {appState.streak} days! 🔥
            </p>
            <button
              onClick={() => setShowCelebration(false)}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Awesome!
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
