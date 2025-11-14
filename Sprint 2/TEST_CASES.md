# Sprint 2 Test Cases - Garden Decay (UC02)

## Test Case 1: First Time User (E01)
**Steps:**
1. Clear localStorage (browser dev tools)
2. Open application
3. Verify "Checking decay..." appears briefly
4. Verify garden starts empty
5. Verify no decay message shown

**Expected:** App initializes with 0 plants, current date saved as last login

---

## Test Case 2: Same Day Login (A01)
**Steps:**
1. Open app and complete some habits
2. Close and reopen app on same calendar day
3. Verify habit states persist
4. Verify plant count unchanged
5. Verify no decay message

**Expected:** No decay applied, existing state maintained

---

## Test Case 3: One Day Missed (Basic Path)
**Steps:**
1. Open app, check 3 habits (3 plants)
2. Use dev tools to change lastLogin date to yesterday
3. Refresh app
4. Verify "Checking decay..." appears
5. Verify decay notification shows
6. Verify plants reduced by 1 (should have 2 plants)
7. Verify all habits unchecked
8. Verify streak reset message

**Expected:** Lost 1 plant, habits reset, decay message displayed

---

## Test Case 4: Multiple Days Missed (Basic Path)
**Steps:**
1. Set up garden with 5 plants
2. Change lastLogin to 3 days ago
3. Refresh app
4. Verify 3 plants removed (BR02: 1 per day)
5. Verify 2 plants remain
6. Verify "Streak lost" message
7. Verify last check-in date shown correctly

**Expected:** Plants = 5 - 3 = 2 plants

---

## Test Case 5: More Days Missed Than Plants (A02)
**Steps:**
1. Set up garden with 2 plants
2. Change lastLogin to 5 days ago
3. Refresh app
4. Verify garden shows 0 plants (BR03: minimum state maintained)
5. Verify "Start fresh today!" message
6. Verify habits all unchecked

**Expected:** Garden at minimum state (0 plants), not negative

---

## Test Case 6: Dismiss Decay Message
**Steps:**
1. Trigger decay (any missed days scenario)
2. Click "Got it!" button on decay notification
3. Verify notification disappears
4. Verify app remains functional
5. Verify wilted garden indicator gone after dismissal

**Expected:** Message closes, app continues normally

---

## Manual Testing Steps:

### To simulate missed days:
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Find localStorage
4. Edit "garden-of-life-last-login" to past date (format: YYYY-MM-DD)
5. Refresh page

### Example dates to test:
- Same day: Use today's date
- 1 day ago: Yesterday's date
- 3 days ago: Three days in the past
- 10 days ago: Ten days in the past

