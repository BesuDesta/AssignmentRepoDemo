import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

describe('TC01 - Checkbox Functionality', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render all 5 habits unchecked initially', () => {
    render(<App />)
    
    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const study30Checkbox = screen.getByTestId('habit-study-30')
    const sleep8Checkbox = screen.getByTestId('habit-sleep-8')
    const healthyMealCheckbox = screen.getByTestId('habit-healthy-meal')
    
    expect(drinkWaterCheckbox).not.toBeChecked()
    expect(exerciseCheckbox).not.toBeChecked()
    expect(study30Checkbox).not.toBeChecked()
    expect(sleep8Checkbox).not.toBeChecked()
    expect(healthyMealCheckbox).not.toBeChecked()
  })

  it('should show completion indicator as 0/5 initially', () => {
    render(<App />)
    
    const completionIndicator = screen.getByTestId('completion-indicator')
    expect(completionIndicator).toHaveTextContent('Habits completed: 0/5')
  })

  it('should show empty garden initially', () => {
    render(<App />)
    
    const gardenPlot = screen.getByTestId('garden-plot')
    expect(gardenPlot).toHaveTextContent('Complete habits to grow your garden! 🌱')
  })

  it('should check habit, update completion indicator, and add plant when clicking unchecked habit', () => {
    render(<App />)
    
    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const completionIndicator = screen.getByTestId('completion-indicator')
    const gardenPlot = screen.getByTestId('garden-plot')
    
    expect(drinkWaterCheckbox).not.toBeChecked()
    expect(completionIndicator).toHaveTextContent('Habits completed: 0/5')
    expect(gardenPlot).toHaveTextContent('Complete habits to grow your garden! 🌱')
    
    fireEvent.click(drinkWaterCheckbox)
    
    expect(drinkWaterCheckbox).toBeChecked()
    expect(completionIndicator).toHaveTextContent('Habits completed: 1/5')
    expect(gardenPlot).toHaveTextContent('🌱')
  })

  it('should not allow checking the same habit twice', () => {
    render(<App />)
    
    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const completionIndicator = screen.getByTestId('completion-indicator')
    const gardenPlot = screen.getByTestId('garden-plot')
    
    fireEvent.click(drinkWaterCheckbox)
    expect(drinkWaterCheckbox).toBeChecked()
    expect(completionIndicator).toHaveTextContent('Habits completed: 1/5')
    
    fireEvent.click(drinkWaterCheckbox)
    expect(drinkWaterCheckbox).toBeChecked()
    expect(completionIndicator).toHaveTextContent('Habits completed: 1/5')
    
    const plants = gardenPlot.querySelectorAll('.plant')
    expect(plants).toHaveLength(1)
  })

  it('should complete multiple habits and show correct plant count', () => {
    render(<App />)
    
    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    const exerciseCheckbox = screen.getByTestId('habit-exercise')
    const completionIndicator = screen.getByTestId('completion-indicator')
    const gardenPlot = screen.getByTestId('garden-plot')
    
    fireEvent.click(drinkWaterCheckbox)
    fireEvent.click(exerciseCheckbox)
    
    expect(drinkWaterCheckbox).toBeChecked()
    expect(exerciseCheckbox).toBeChecked()
    expect(completionIndicator).toHaveTextContent('Habits completed: 2/5')
    
    const plants = gardenPlot.querySelectorAll('.plant')
    expect(plants).toHaveLength(2)
  })

  it('should persist state in localStorage', () => {
    render(<App />)
    
    const drinkWaterCheckbox = screen.getByTestId('habit-drink-water')
    fireEvent.click(drinkWaterCheckbox)
    
    const todayKey = new Date().toISOString().split('T')[0]
    const storageKey = `garden-of-life-data-${todayKey}`
    const savedData = JSON.parse(localStorage.getItem(storageKey) || '{}')
    
    expect(savedData.habits[0].completed).toBe(true)
    expect(savedData.garden.plants).toBe(1)
  })
})