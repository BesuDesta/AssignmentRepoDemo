import { AppState, HabitState, GardenState, HabitId } from '../types';
import { getTodayKey } from './date';

const STORAGE_KEY = 'garden-of-life-data';

export function getStorageKey(): string {
  return `${STORAGE_KEY}-${getTodayKey()}`;
}

export function loadTodaysData(): AppState | null {
  try {
    const data = localStorage.getItem(getStorageKey());
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
    return null;
  }
}

export function saveTodaysData(state: AppState): void {
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
}

export function getDefaultHabits(): HabitState[] {
  return [
    { id: 'drink-water', label: 'Drink Water', completed: false },
    { id: 'exercise', label: 'Exercise', completed: false },
    { id: 'study-30', label: 'Study 30min', completed: false },
    { id: 'sleep-8', label: 'Sleep 8hrs', completed: false },
    { id: 'healthy-meal', label: 'Healthy Meal', completed: false },
  ];
}

export function getInitialState(): AppState {
  const savedData = loadTodaysData();
  
  if (savedData) {
    return savedData;
  }

  return {
    habits: getDefaultHabits(),
    garden: { plants: 0 },
    date: getTodayKey(),
  };
}