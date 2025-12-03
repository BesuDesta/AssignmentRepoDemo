import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

describe('TC04 - Garden Data & Progress Persists After Refresh', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should persist habit completion after unmount and remount', () => {
    // Initial render
    const { unmount } = render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')

    // Complete 3 habits
    fireEvent.click(drinkWaterCheckbox)
    fireEvent.click(exerciseCheckbox)
    fireEvent.click(study30Checkbox)

    // Unmount (simulates closing the app)
    unmount()

    // Remount (simulates reopening the app)
    render(<App />)

    // Verify habits are still checked
    const drinkWaterCheckboxAfter = screen.getByTestId('habit-drink-water')
    const exerciseCheckboxAfter = screen.getByTestId('habit-exercise')
    const study30CheckboxAfter = screen.getByTestId('habit-study-30')
    const sleep8CheckboxAfter = screen.getByTestId('habit-sleep-8')
    const healthyMealCheckboxAfter = screen.getByTestId('habit-healthy-meal')

    expect(drinkWaterCheckboxAfter).toBeChecked()
    expect(exerciseCheckboxAfter).toBeChecked()
    expect(study30CheckboxAfter).toBeChecked()
    expect(sleep8CheckboxAfter).not.toBeChecked()
    expect(healthyMealCheckboxAfter).not.toBeChecked()
  })

  it('should persist garden plants after unmount and remount', () => {
    // Initial render
    const { unmount } = render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')

    // Complete 3 habits (should add 3 plants)
    fireEvent.click(drinkWaterCheckbox)
    fireEvent.click(exerciseCheckbox)
    fireEvent.click(study30Checkbox)

    let gardenPlot = screen.getByTestId('garden-plot')
    let plants = gardenPlot.querySelectorAll('.plant')
    expect(plants).toHaveLength(3)

    // Unmount
    unmount()

    // Remount
    render(<App />)

    // Verify plants persisted
    gardenPlot = screen.getByTestId('garden-plot')
    plants = gardenPlot.querySelectorAll('.plant')
    expect(plants).toHaveLength(3)
  })

  it('should persist completion indicator after unmount and remount', () => {
    // Initial render
    const { unmount } = render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')

    // Complete 3 habits
    fireEvent.click(drinkWaterCheckbox)
    fireEvent.click(exerciseCheckbox)
    fireEvent.click(study30Checkbox)

    let completionIndicator = screen.getByTestId('completion-indicator')
    expect(completionIndicator).toHaveTextContent('Habits completed: 3/5')

    // Unmount
    unmount()

    // Remount
    render(<App />)

    // Verify completion indicator persisted
    completionIndicator = screen.getByTestId('completion-indicator')
    expect(completionIndicator).toHaveTextContent('Habits completed: 3/5')
  })

  it('should persist streak after unmount and remount', () => {
    // Initial render
    const { unmount } = render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')
    const sleep8Checkbox = screen.getByTestId('habit-sleep-8')
    const healthyMealCheckbox = screen.getByTestId('habit-healthy-meal')

    // Complete all habits to get streak of 1
    fireEvent.click(drinkWaterCheckbox)
    fireEvent.click(exerciseCheckbox)
    fireEvent.click(study30Checkbox)
    fireEvent.click(sleep8Checkbox)
    fireEvent.click(healthyMealCheckbox)

    let streakIndicator = screen.getByTestId('streak-indicator')
    expect(streakIndicator).toHaveTextContent('Current Streak: 1 days')

    // Unmount
    unmount()

    // Remount
    render(<App />)

    // Verify streak persisted
    streakIndicator = screen.getByTestId('streak-indicator')
    expect(streakIndicator).toHaveTextContent('Current Streak: 1 days')
  })

  it('should restore all data accurately from localStorage', () => {
    // Initial render
    const { unmount } = render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')

    // Complete 3 habits
    fireEvent.click(drinkWaterCheckbox)
    fireEvent.click(exerciseCheckbox)
    fireEvent.click(study30Checkbox)

    // Verify initial state
    let completionIndicator = screen.getByTestId('completion-indicator')
    let gardenPlot = screen.getByTestId('garden-plot')
    let plants = gardenPlot.querySelectorAll('.plant')
    let streakIndicator = screen.getByTestId('streak-indicator')

    expect(completionIndicator).toHaveTextContent('Habits completed: 3/5')
    expect(plants).toHaveLength(3)
    expect(streakIndicator).toHaveTextContent('Current Streak: 0 days')

    // Unmount
    unmount()

    // Clear the component tree
    cleanup()

    // Remount
    render(<App />)

    // Verify all data restored accurately
    completionIndicator = screen.getByTestId('completion-indicator')
    gardenPlot = screen.getByTestId('garden-plot')
    plants = gardenPlot.querySelectorAll('.plant')
    streakIndicator = screen.getByTestId('streak-indicator')

    expect(completionIndicator).toHaveTextContent('Habits completed: 3/5')
    expect(plants).toHaveLength(3)
    expect(streakIndicator).toHaveTextContent('Current Streak: 0 days')

    // Verify checkboxes
    const drinkWaterCheckboxAfter = screen.getByTestId('habit-drink-water')
    const exerciseCheckboxAfter = screen.getByTestId('habit-exercise')
    const study30CheckboxAfter = screen.getByTestId('habit-study-30')
    const sleep8CheckboxAfter = screen.getByTestId('habit-sleep-8')
    const healthyMealCheckboxAfter = screen.getByTestId('habit-healthy-meal')

    expect(drinkWaterCheckboxAfter).toBeChecked()
    expect(exerciseCheckboxAfter).toBeChecked()
    expect(study30CheckboxAfter).toBeChecked()
    expect(sleep8CheckboxAfter).not.toBeChecked()
    expect(healthyMealCheckboxAfter).not.toBeChecked()
  })

  it('should handle multiple refresh cycles', () => {
    // First render
    let result = render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    fireEvent.click(drinkWaterCheckbox)

    result.unmount()

    // Second render - add more habits
    result = render(<App />)

    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    fireEvent.click(exerciseCheckbox)

    result.unmount()

    // Third render - verify all persisted
    render(<App />)

    const drinkWaterCheckboxFinal = screen.getByTestId('habit-drink-water')
    const exerciseCheckboxFinal = screen.getByTestId('habit-exercise')
    const completionIndicator = screen.getByTestId('completion-indicator')
    const gardenPlot = screen.getByTestId('garden-plot')
    const plants = gardenPlot.querySelectorAll('.plant')

    expect(drinkWaterCheckboxFinal).toBeChecked()
    expect(exerciseCheckboxFinal).toBeChecked()
    expect(completionIndicator).toHaveTextContent('Habits completed: 2/5')
    expect(plants).toHaveLength(2)
  })
})
