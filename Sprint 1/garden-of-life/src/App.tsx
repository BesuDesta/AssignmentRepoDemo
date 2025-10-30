import { useState } from 'react'

function App() {
  const [habits, setHabits] = useState([
    { id: 'drink-water', label: 'Drink Water', completed: false },
    { id: 'exercise', label: 'Exercise', completed: false },
    { id: 'study-30', label: 'Study 30min', completed: false },
    { id: 'sleep-8', label: 'Sleep 8hrs', completed: false },
    { id: 'healthy-meal', label: 'Healthy Meal', completed: false },
  ])
  
  const [plants, setPlants] = useState(0)

  const handleToggleHabit = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId)
    if (!habit) return

    setHabits(prevHabits => 
      prevHabits.map(h =>
        h.id === habitId ? { ...h, completed: !h.completed } : h
      )
    )
    
    if (!habit.completed) {
      setPlants(prev => prev + 1) // Add plant when checking
    } else {
      setPlants(prev => Math.max(0, prev - 1)) // Remove plant when unchecking
    }
  }

  const completedCount = habits.filter(h => h.completed).length

  return (
    <div className="app">
      <header>
        <h1>Garden of Life</h1>
        <p className="completion-indicator" data-testid="completion-indicator">
          Habits completed: {completedCount}/5
        </p>
      </header>
      
      <main>
        <div className="habit-list">
          <h2>Daily Habits</h2>
          <ul>
            {habits.map((habit) => (
              <li key={habit.id}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={habit.completed}
                    onChange={() => handleToggleHabit(habit.id)}
                    data-testid={`habit-${habit.id}`}
                  />
                  {habit.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="garden">
          <h2>Your Garden</h2>
          <div data-testid="garden-plot">
            {plants > 0 ? (
              Array.from({ length: plants }, (_, i) => (
                <span key={i} className="plant" role="img" aria-label="plant">
                  🌱
                </span>
              ))
            ) : (
              <p>Complete habits to grow your garden! 🌱</p>
            )}
          </div>
          <p>Plants grown: {plants}</p>
        </div>
      </main>
    </div>
  )
}

export default App
