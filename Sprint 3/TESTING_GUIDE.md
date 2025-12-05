# Quick Testing Guide - Sprint 3 Features

## Setup
1. Navigate to: `Sprint 1/garden-of-life/`
2. Run: `npm install` (if first time)
3. Run: `npm run dev`
4. Open: http://localhost:5173 (or shown URL)
5. Open Browser DevTools (F12) for localStorage inspection

## Test Scenario 1: Streak Validation (TC03)
1. Start with a clean state (clear localStorage if needed)
2. Observe streak counter shows "Current Streak: 0 days"
3. Click 4 out of 5 habit checkboxes
4. Verify completion indicator shows "Habits completed: 4/5"
5. Verify streak counter still shows "0 days"
6. Click the 5th and final habit checkbox
7. Observe celebration modal appears

**Expected Result:**
- Streak increments to "Current Streak: 1 days"
- Celebration modal displays with "Congratulations!"
- Modal shows "You completed all your habits today!"
- Modal displays "Current Streak: 1 days!"
- "Awesome!" button is present to dismiss
- Garden shows 5 plants

## Test Scenario 2: Data Persistence After Refresh (TC04)
1. Complete 3 out of 5 habits (check 3 checkboxes)
2. Note current state: 3/5 completed, 3 plants, streak = 0
3. Press F5 or Ctrl+R to refresh the page
4. Wait for page to reload completely

**Expected Result:**
- Same 3 checkboxes remain checked
- Garden still displays 3 plants
- Completion indicator shows "Habits completed: 3/5"
- Streak counter shows same value as before refresh
- All visual elements render correctly

## Test Scenario 3: Complete Session Persistence
1. Complete all 5 habits to achieve streak of 1
2. Verify celebration appears and streak = 1
3. Dismiss celebration message
4. Close the browser tab completely
5. Open a new tab and navigate back to the app
6. Wait for app to load

**Expected:**
- All 5 checkboxes are still checked
- Garden displays 5 plants
- Completion indicator shows "Habits completed: 5/5"
- Streak counter shows "Current Streak: 1 days"
- Celebration does NOT re-appear (already dismissed)

## Test Scenario 4: Multiple Refresh Cycles
1. Check 1st habit, verify 1 plant appears
2. Refresh page, verify 1 habit checked, 1 plant
3. Check 2nd habit, verify 2 plants total
4. Refresh page, verify 2 habits checked, 2 plants
5. Complete remaining 3 habits
6. Refresh page again

**Expected:**
- All 5 habits remain checked after refresh
- All 5 plants persist
- Streak shows 1 day
- Data integrity maintained across multiple cycles

## Test Scenario 5: localStorage Inspection
1. Complete 2 habits
2. Open DevTools > Application > Local Storage
3. Find key: `garden-of-life-data-2025-12-05` (today's date)
4. Inspect the JSON data

**Expected:**
- `habits` array shows 2 items with `completed: true`
- `garden.plants` equals 2
- `streak` field is present
- `date` matches today's date
- Data structure matches AppState interface

## Verify Business Rules

### BR01 - Streak Only Increments on Full Completion:
- ✓ Complete 4/5 habits, verify streak stays at 0
- ✓ Complete the 5th habit, verify streak increments to 1
- ✓ Partial completion does not trigger celebration

### BR02 - Streak Counter Increments by 1:
- ✓ Initial streak is 0
- ✓ After completing all habits, streak becomes 1
- ✓ Streak value persists after refresh

### BR03 - Data Persists with Daily Keys:
- ✓ localStorage uses format `garden-of-life-data-YYYY-MM-DD`
- ✓ Each day has separate storage key
- ✓ Data includes habits, garden, and streak

### BR04 - Auto-save on State Changes:
- ✓ Each habit click immediately saves to localStorage
- ✓ No manual save button needed
- ✓ State syncs automatically via useEffect

### BR05 - Celebration Message Behavior:
- ✓ Appears only when all 5 habits completed
- ✓ Displays current streak count
- ✓ Can be dismissed with "Awesome!" button
- ✓ Does not re-appear after dismissal on same session

## Running Automated Tests
```bash
cd Sprint\ 1/garden-of-life
npm test
```

**Test suites:**
- `tc03.streak.test.tsx` - 6 tests for streak validation
- `tc04.persistence.test.tsx` - 6 tests for data persistence

## Tips
- Use browser DevTools to inspect localStorage in real-time
- Clear localStorage (`localStorage.clear()` in console) to reset to fresh state
- Test in both Chrome and Firefox to verify cross-browser compatibility
- Check console for any error messages during testing
- Verify no TypeScript errors in terminal during development
- Test with different screen sizes to ensure responsive design
- Try rapid clicking to verify state consistency
- Test celebration dismissal multiple times to verify state handling

