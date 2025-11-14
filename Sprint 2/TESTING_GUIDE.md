# Quick Testing Guide - Garden Decay

## Setup
1. Navigate to: `Sprint 1/garden-of-life/`
2. Run: `npm run dev`
3. Open: http://localhost:5173 (or shown URL)

## Test Scenario 1: Normal Flow
1. Open app (first time)
2. Check 5 habits → See 5 plants grow
3. Close browser tab
4. Reopen same day → Plants still there ✓

## Test Scenario 2: Simulate One Missed Day
1. Open app and grow 3 plants
2. Open DevTools (F12 or right-click > Inspect)
3. Go to: **Application** tab → **Local Storage** → your site
4. Find key: `garden-of-life-last-login`
5. Double-click the value
6. Change date to yesterday (e.g., if today is 2025-11-14, change to 2025-11-13)
7. Refresh page (F5)

**Expected Result:**
- See "⚠️ Checking decay..." message
- Decay notification appears showing:
  - Today's date
  - "Streak lost"
  - Last check-in date
  - "Start fresh today! 💪"
- Plants reduced by 1 (3 → 2)
- Habits all unchecked

## Test Scenario 3: Multiple Missed Days
Same as above, but change date to 4 days ago.
- If had 5 plants → now 1 plant
- If had 3 plants → now 0 plants (minimum state maintained)

## Test Scenario 4: Extreme Case
1. Grow 2 plants
2. Change last login to 10 days ago
3. Refresh

**Expected:**
- Garden shows 0 plants (not negative!)
- Message says "Start fresh today!"
- Still shows last check-in date
- Can start growing new plants immediately

## Verify Business Rules

### BR01 - Day is "missed" when date changes:
- ✓ Same day login = no decay
- ✓ Different day login = decay applied

### BR02 - One plant per missed day:
- ✓ 1 day = -1 plant
- ✓ 3 days = -3 plants
- ✓ 5 days = -5 plants

### BR03 - Minimum state maintained:
- ✓ Plants never go below 0
- ✓ Can always start fresh

## Tips
- Use yesterday's date for simple testing
- Format must be: YYYY-MM-DD
- Browser must be refreshed to trigger decay check
- Click "Got it!" to dismiss decay message
- Check console for any errors (F12 > Console tab)

