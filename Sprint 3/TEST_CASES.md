# Sprint 3 Test Cases - Streak Tracking & Data Persistence

## Test Case 3 (TC03): Streak Validation
**Test Objective:** Ensure that streak increases only after all goals/daily habits are completed

**Preconditions:**
- 0/5 habits are completed
- User streak is 4 days

**Steps:**
1. Check off 4/5 habit checkboxes sequentially
2. Verify that streak counter is still 4
3. Check the last (5th) habit checkbox
4. Verify that streak counter has incremented by 1

**Input Values:** 5 habits checked sequentially

**Expected Results:**
- Streak counter stays at 4 after 4/5 boxes are marked
- After 5/5 boxes are marked, streak counter increments by 1 (to 5)
- Celebration message appears with "Congratulations! You completed all your habits today!"
- New streak is saved to localStorage
- Celebration message displays current streak count

---

## Test Case 4 (TC04): Garden Data & Progress Persists After Refresh
**Test Objective:** Check that the garden, habits, and streak progress persist after page reload & reopening the app

**Preconditions:**
- User has 3/5 habits completed for the day
- Garden has 3 plants
- Current streak is 1 day

**Steps:**
1. Refresh website (F5 or Ctrl+R)
2. Wait and verify that data is the same
3. Close and reopen site in new tab/window
4. Wait and verify that data is the same

**Input Values:** None

**Expected Results:**
- Garden displays 3 plants after refresh
- Same 3 checkboxes are marked as completed
- Completion indicator shows "Habits completed: 3/5"
- Streak is still present at 1 day
- localStorage data is restored accurately
- All data persists across multiple refresh cycles

---

## Automated Test Coverage

### TC03 - Streak Validation Tests (tc03.streak.test.tsx)
- Initial streak displays as 0
- Streak does not increment until all habits completed
- Streak increments by 1 when all 5 habits completed
- Celebration message appears with correct streak count
- Streak saves to localStorage
- Celebration message can be dismissed

### TC04 - Persistence Tests (tc04.persistence.test.tsx)
- Habit completion persists after unmount/remount
- Garden plants persist after unmount/remount
- Completion indicator persists after unmount/remount
- Streak persists after unmount/remount
- All data restores accurately from localStorage
- Multiple refresh cycles maintain data integrity

---

## Manual Testing Steps:

### To test Streak Validation (TC03):
1. Open the Garden of Life app
2. Start with 0 habits completed
3. Click 4 out of 5 habit checkboxes
4. Observe streak counter - should remain at 0
5. Click the 5th and final habit checkbox
6. Observe celebration modal appears
7. Verify streak counter increments by 1
8. Click "Awesome!" to dismiss celebration

### To test Data Persistence (TC04):
1. Open the Garden of Life app
2. Complete 3 out of 5 habits (add 3 plants to garden)
3. Note the current state (3/5 completed, 3 plants, streak value)
4. Press F5 to refresh the page
5. Verify all data matches (checkboxes, plants, streak)
6. Close the browser tab completely
7. Reopen the app in a new tab
8. Verify all data still persists correctly

### Example scenarios to test:
- Scenario 1: Complete all 5 habits, verify streak = 1, refresh page, verify streak still = 1
- Scenario 2: Complete 2 habits, refresh, complete 3 more, verify celebration appears
- Scenario 3: Complete all habits multiple days in a row, verify streak increments correctly across sessions

