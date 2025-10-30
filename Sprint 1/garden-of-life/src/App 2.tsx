import { useState, useEffect } from 'react'
import { HabitList } from './components/HabitList'
import { Garden } from './components/Garden'
import { getInitialState, saveTodaysData } from './lib/storage'
import { getTodayKey } from './lib/date'
import { AppState, HabitId } from './types'
import './App.css'

function App() {
  const [appState, setAppState] = useState<AppState>(getInitialState)

  useEffect(() => {
    saveTodaysData(appState)
  }, [appState])

  const handleToggleHabit = (habitId: string) => {
    const habit = appState.habits.find(h => h.id === habitId)
    if (!habit || habit.completed) {
      return
    }

    setAppState(prevState => {
      const updatedHabits = prevState.habits.map(h =>
        h.id === habitId ? { ...h, completed: true } : h
      )
      
      return {
        ...prevState,
        habits: updatedHabits,
        garden: {
          plants: prevState.garden.plants + 1
        }
      }
    })
  }

  const completedCount = appState.habits.filter(h => h.completed).length
  const totalCount = appState.habits.length

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
