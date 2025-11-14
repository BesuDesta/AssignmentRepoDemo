import type { HabitState } from '../types';

interface HabitListProps {
  habits: HabitState[];
  onToggleHabit: (habitId: string) => void;
}

export function HabitList({ habits, onToggleHabit }: HabitListProps) {
  return (
    <div className="habit-list">
      <h2>Daily Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id} className="habit-item">
            <label>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => onToggleHabit(habit.id)}
                data-testid={`habit-${habit.id}`}
              />
              {habit.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}