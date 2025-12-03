import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

describe('TC03 - Streak Validation', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should show initial streak as 0', () => {
    render(<App />)

    const streakIndicator = screen.getByTestId('streak-indicator')
    expect(streakIndicator).toHaveTextContent('Current Streak: 0 days')
  })

  it('should not increment streak until all habits are completed', () => {
    render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')
    const sleep8Checkbox = screen.getByTestId('habit-sleep-8')
    const streakIndicator = screen.getByTestId('streak-indicator')

    // Complete 4 out of 5 habits
    fireEvent.click(drinkWaterCheckbox)
    expect(streakIndicator).toHaveTextContent('Current Streak: 0 days')

    fireEvent.click(exerciseCheckbox)
    expect(streakIndicator).toHaveTextContent('Current Streak: 0 days')

    fireEvent.click(study30Checkbox)
    expect(streakIndicator).toHaveTextContent('Current Streak: 0 days')

    fireEvent.click(sleep8Checkbox)
    expect(streakIndicator).toHaveTextContent('Current Streak: 0 days')

    // Verify completion indicator shows 4/5
    const completionIndicator = screen.getByTestId('completion-indicator')
    expect(completionIndicator).toHaveTextContent('Habits completed: 4/5')
  })

  it('should increment streak to 1 when all 5 habits are completed', () => {
    render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')
    const sleep8Checkbox = screen.getByTestId('habit-sleep-8')
    const healthyMealCheckbox = screen.getByTestId('habit-healthy-meal')
    const streakIndicator = screen.getByTestId('streak-indicator')

    // Complete first 4 habits
    fireEvent.click(drinkWaterCheckbox)
    fireEvent.click(exerciseCheckbox)
    fireEvent.click(study30Checkbox)
    fireEvent.click(sleep8Checkbox)

    // Streak should still be 0
    expect(streakIndicator).toHaveTextContent('Current Streak: 0 days')

    // Complete the last habit
    fireEvent.click(healthyMealCheckbox)

    // Now streak should be 1
    expect(streakIndicator).toHaveTextContent('Current Streak: 1 days')
  })

  it('should show celebration message when all habits are completed', () => {
    render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')
    const sleep8Checkbox = screen.getByTestId('habit-sleep-8')
    const healthyMealCheckbox = screen.getByTestId('habit-healthy-meal')

    // Complete all habits
    fireEvent.click(drinkWaterCheckbox)
    fireEvent.click(exerciseCheckbox)
    fireEvent.click(study30Checkbox)
    fireEvent.click(sleep8Checkbox)
    fireEvent.click(healthyMealCheckbox)

    // Check for celebration message
    const celebrationMessage = screen.getByTestId('celebration-message')
    expect(celebrationMessage).toBeInTheDocument()
    expect(celebrationMessage).toHaveTextContent('Congratulations!')
    expect(celebrationMessage).toHaveTextContent('You completed all your habits today!')
    expect(celebrationMessage).toHaveTextContent('Current Streak: 1 days!')
  })

  it('should save streak to localStorage when all habits completed', () => {
    render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')
    const sleep8Checkbox = screen.getByTestId('habit-sleep-8')
    const healthyMealCheckbox = screen.getByTestId('habit-healthy-meal')

    // Complete all habits
    fireEvent.click(drinkWaterCheckbox)
    fireEvent.click(exerciseCheckbox)
    fireEvent.click(study30Checkbox)
    fireEvent.click(sleep8Checkbox)
    fireEvent.click(healthyMealCheckbox)

    // Check localStorage
    const todayKey = new Date().toISOString().split('T')[0]
    const storageKey = `garden-of-life-data-${todayKey}`
    const savedData = JSON.parse(localStorage.getItem(storageKey) || '{}')

    expect(savedData.streak).toBe(1)
    expect(savedData.habits.every((h: { completed: boolean }) => h.completed)).toBe(true)
  })

  it('should dismiss celebration message when button clicked', () => {
    render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')
    const sleep8Checkbox = screen.getByTestId('habit-sleep-8')
    const healthyMealCheckbox = screen.getByTestId('habit-healthy-meal')

    // Complete all habits
    fireEvent.click(drinkWaterCheckbox)
    fireEvent.click(exerciseCheckbox)
    fireEvent.click(study30Checkbox)
    fireEvent.click(sleep8Checkbox)
    fireEvent.click(healthyMealCheckbox)

    // Celebration message should appear
    const celebrationMessage = screen.getByTestId('celebration-message')
    expect(celebrationMessage).toBeInTheDocument()

    // Click dismiss button
    const dismissButton = screen.getByText('Awesome!')
    fireEvent.click(dismissButton)

    // Celebration message should be gone
    expect(screen.queryByTestId('celebration-message')).not.toBeInTheDocument()
  })
})
