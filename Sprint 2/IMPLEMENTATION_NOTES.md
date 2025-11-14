# Sprint 2 - Garden Decay Implementation

## UC02: Apply Garden Decay

### What was implemented:
- System tracks last login date in localStorage
- Calculates days missed between sessions
- Applies decay at rate of 1 plant per missed day (BR02)
- Shows "Checking decay..." message on app load
- Displays decay notification with streak lost warning
- Resets habit checkboxes for new day
- Maintains minimum garden state (BR03)

### Files modified:
1. `types.ts` - Added lastLoginDate and streak fields
2. `date.ts` - Added calculateDaysBetween function
3. `storage.ts` - Added last login tracking and decay logic
4. `App.tsx` - Implemented decay check on app initialization

### Business Rules implemented:
- **BR01**: Day considered missed when calendar date changes
- **BR02**: One plant removed per missed day
- **BR03**: Garden maintains minimum state (never completely empty)

### Alternative paths covered:
- **A01**: Same day login - no decay applied
- **E01**: First time user - initialize with today's date

### How it works:
1. On app load, system checks last login date
2. Calculates difference between last login and today
3. If days > 0, removes plants from previous garden state
4. Displays notification with last check-in date
5. Resets all habits to unchecked for the new day
6. Saves updated state to localStorage

