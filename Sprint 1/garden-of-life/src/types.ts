export type HabitId = 'drink-water' | 'exercise' | 'study-30' | 'sleep-8' | 'healthy-meal';

export interface HabitState {
  id: HabitId;
  label: string;
  completed: boolean;
}

export interface GardenState {
  plants: number;
}

export interface AppState {
  habits: HabitState[];
  garden: GardenState;
  date: string;
  lastLoginDate?: string;
  streak?: number;
}