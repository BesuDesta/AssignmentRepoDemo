# Sprint 2 - Garden Decay Feature

## Overview
Implemented UC02 "Apply Garden Decay" which handles user inactivity by reducing garden size based on missed days.

## What's New
- **Decay System**: Plants automatically removed at 1 plant per missed day
- **Last Login Tracking**: System remembers when user last opened app
- **Streak Notifications**: Shows when streak is lost with last check-in date
- **Smart Loading**: Displays "Checking decay..." message during calculation
- **Fresh Start Encouragement**: Motivational message when returning after absence

## How It Works
1. App tracks last login date in localStorage
2. On open, calculates days since last visit
3. If missed days > 0:
   - Removes 1 plant per missed day
   - Shows decay notification
   - Resets all habits to unchecked
   - Updates last login to today

## Key Features
- ⚠️ Decay warning with calendar dates
- 🍂 Wilted garden visual indicator
- 💪 "Start fresh today!" encouragement
- 📅 Last check-in date display
- 🔄 Automatic state persistence

## Testing
See `TEST_CASES.md` for detailed test scenarios

Quick test:
1. Complete some habits (grow plants)
2. Open DevTools > Application > localStorage
3. Change `garden-of-life-last-login` to a past date
4. Refresh page to see decay in action

## Business Rules
- **BR01**: Day is missed when calendar date changes without habit logging
- **BR02**: Decay rate = 1 plant per missed day
- **BR03**: Garden maintains minimum state (never goes below 0)

## Files Modified
- `src/App.tsx` - Main decay logic and UI
- `src/lib/storage.ts` - Last login tracking and decay calculations
- `src/lib/date.ts` - Date difference calculator
- `src/types.ts` - Added lastLoginDate and streak fields

