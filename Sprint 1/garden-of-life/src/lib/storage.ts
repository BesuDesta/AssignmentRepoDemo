import type { AppState, HabitState } from '../types';
import { getTodayKey } from './date';

const STORAGE_KEY = 'garden-of-life-data';
const LAST_LOGIN_KEY = 'garden-of-life-last-login';

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
    localStorage.setItem(LAST_LOGIN_KEY, getTodayKey());
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
}

export function getLastLoginDate(): string | null {
  try {
    return localStorage.getItem(LAST_LOGIN_KEY);
  } catch (error) {
    console.error('Failed to load last login date:', error);
    return null;
  }
}

export function saveLastLoginDate(date: string): void {
  try {
    localStorage.setItem(LAST_LOGIN_KEY, date);
  } catch (error) {
    console.error('Failed to save last login date:', error);
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
    lastLoginDate: getTodayKey(),
    streak: 0,
  };
}

export function applyDecay(currentPlants: number, daysMissed: number): number {
  // BR02: one plant per missed day
  const plantsToRemove = daysMissed;
  const newPlantCount = Math.max(0, currentPlants - plantsToRemove);
  return newPlantCount;
}

export function loadPreviousGardenState(): { plants: number } | null {
  try {
    const lastLogin = getLastLoginDate();
    if (!lastLogin) return null;

    const key = `${STORAGE_KEY}-${lastLogin}`;
    const data = localStorage.getItem(key);
    if (!data) return null;

    const parsed = JSON.parse(data) as AppState;
    return parsed.garden;
  } catch (error) {
    console.error('Failed to load previous garden state:', error);
    return null;
  }
}

export function loadPreviousAppState(): AppState | null {
  try {
    const lastLogin = getLastLoginDate();
    if (!lastLogin) return null;

    const key = `${STORAGE_KEY}-${lastLogin}`;
    const data = localStorage.getItem(key);
    if (!data) return null;

    return JSON.parse(data) as AppState;
  } catch (error) {
    console.error('Failed to load previous app state:', error);
    return null;
  }
}

export function checkIfAllHabitsCompletedYesterday(): boolean {
  try {
    const previousState = loadPreviousAppState();
    if (!previousState) return false;

    const allCompleted = previousState.habits.every(h => h.completed);
    return allCompleted;
  } catch (error) {
    console.error('Failed to check previous habits:', error);
    return false;
  }
}