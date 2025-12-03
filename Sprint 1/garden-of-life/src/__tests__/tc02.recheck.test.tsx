import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

describe('TC02 - Re-check Validation', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should prevent unchecking a habit that is already checked', () => {
    render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const completionIndicator = screen.getByTestId('completion-indicator')
    const gardenPlot = screen.getByTestId('garden-plot')

    // Check the habit
    fireEvent.click(drinkWaterCheckbox)
    expect(drinkWaterCheckbox).toBeChecked()
    expect(completionIndicator).toHaveTextContent('Habits completed: 1/5')

    const plantsAfterFirstCheck = gardenPlot.querySelectorAll('.plant')
    expect(plantsAfterFirstCheck).toHaveLength(1)

    // Try to uncheck - should be blocked
    fireEvent.click(drinkWaterCheckbox)

    // Should still be checked
    expect(drinkWaterCheckbox).toBeChecked()
    expect(completionIndicator).toHaveTextContent('Habits completed: 1/5')

    // Plant count should not change
    const plantsAfterRecheck = gardenPlot.querySelectorAll('.plant')
    expect(plantsAfterRecheck).toHaveLength(1)
  })

  it('should block checking the same habit multiple times in a single day', () => {
    render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const gardenPlot = screen.getByTestId('garden-plot')

    // Check the habit once
    fireEvent.click(drinkWaterCheckbox)
    expect(drinkWaterCheckbox).toBeChecked()

    const plantsAfterFirstCheck = gardenPlot.querySelectorAll('.plant')
    expect(plantsAfterFirstCheck).toHaveLength(1)

    // Try to check again
    fireEvent.click(drinkWaterCheckbox)

    // Should still have only 1 plant (no additional plant added)
    const plantsAfterSecondClick = gardenPlot.querySelectorAll('.plant')
    expect(plantsAfterSecondClick).toHaveLength(1)
  })

  it('should allow checking different habits but not the same one twice', () => {
    render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const completionIndicator = screen.getByTestId('completion-indicator')
    const gardenPlot = screen.getByTestId('garden-plot')

    // Check first habit
    fireEvent.click(drinkWaterCheckbox)
    expect(completionIndicator).toHaveTextContent('Habits completed: 1/5')

    // Check second habit - should work
    fireEvent.click(exerciseCheckbox)
    expect(completionIndicator).toHaveTextContent('Habits completed: 2/5')

    let plants = gardenPlot.querySelectorAll('.plant')
    expect(plants).toHaveLength(2)

    // Try to re-check first habit - should be blocked
    fireEvent.click(drinkWaterCheckbox)
    expect(completionIndicator).toHaveTextContent('Habits completed: 2/5')

    plants = gardenPlot.querySelectorAll('.plant')
    expect(plants).toHaveLength(2)

    // Try to re-check second habit - should be blocked
    fireEvent.click(exerciseCheckbox)
    expect(completionIndicator).toHaveTextContent('Habits completed: 2/5')

    plants = gardenPlot.querySelectorAll('.plant')
    expect(plants).toHaveLength(2)
  })

  it('should maintain state in localStorage after re-check attempt', () => {
    render(<App />)

    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')

    // Check the habit
    fireEvent.click(drinkWaterCheckbox)

    // Try to uncheck
    fireEvent.click(drinkWaterCheckbox)

    // Verify localStorage still shows habit as completed
    const todayKey = new Date().toISOString().split('T')[0]
    const storageKey = `garden-of-life-data-${todayKey}`
    const savedData = JSON.parse(localStorage.getItem(storageKey) || '{}')

    expect(savedData.habits[0].completed).toBe(true)
    expect(savedData.garden.plants).toBe(1)
  })
})
