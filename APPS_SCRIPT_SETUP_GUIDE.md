# Google Apps Script Setup Guide

## Step 1: Set Up the Web App Deployment

1. **Go to Apps Script Editor**
   - Open your Google Sheet
   - Click `Extensions` → `Apps Script`

2. **Deploy as Web App**
   - Click `Deploy` → `New Deployment`
   - Select type: `Web app`
   - Execute as: `Me (your email)`
   - Who has access: `Anyone`
   - Click `Deploy`
   - **Copy the URL** - you'll need this!

3. **Test the URL**
   - Go to the URL in browser
   - You should see: `{"status":"error","message":"No email provided"}`
   - ✅ This means it's working!

## Step 2: Get Your Web App URL

Your URL will look like:
```
https://script.google.com/macros/s/[YOUR_SCRIPT_ID]/usercontent/
```

You'll use this in your React app instead of the old one.

## Step 3: Update Your React App

Replace your Apps Script URL in [src/components/quiz/Quiz.tsx](src/components/quiz/Quiz.tsx):

**OLD:**
```typescript
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbziChHiqWxbt0SXX6xlmWNL3dKFUSfYSl2uuezu1pzc4mu13D0BesvVNUtQjRmgt8s/exec";
```

**NEW:**
```typescript
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/[YOUR_NEW_SCRIPT_ID]/usercontent/";
```

## Step 4: Set Up the Daily Email Trigger

1. **In Apps Script Editor**, go to `Triggers` (clock icon on left)
2. Click `Create new trigger`
3. Select:
   - Function: `sendEmailSequence`
   - Deployment: `Head`
   - Event source: `Time-driven`
   - Type: `Day timer`
   - Time: `9:00 AM - 10:00 AM` (pick any time)
4. Click `Create`

✅ This will now send emails automatically each day!

## Step 5: Test It

1. **Test in Apps Script Console:**
   ```
   - Click `testEmail()` function
   - Click ▶ (Run button)
   - Check Logs (Ctrl+Enter)
   ```

2. **Test from React App:**
   ```
   - Submit email in your quiz
   - Check Apps Script Logs (Ctrl+Enter)
   - Look for ✅ messages
   ```

## Troubleshooting

### "Email not sending"
- Check **Logs** in Apps Script (Ctrl+Enter)
- Look for ❌ error messages
- Make sure account has email permissions

### "No emails received"
1. Check **Spam folder**
2. Check **Promotions tab** (Gmail)
3. Run `testEmail()` function manually

### "Emails stopped after Day 1"
- Go to **Triggers** (clock icon)
- Verify `sendEmailSequence` trigger is active
- It should run once per day

### "Old URL still being used"
1. Update Quiz.tsx with new URL
2. Rebuild: `npm run build`
3. Upload dist/ to Cloudflare again

## Column Layout in Spreadsheet

Your sheet should have these columns:
```
A: Email
B: Date Added
C: Email 1 Status
D: Email 2 Status
E: Email 3 Status
F: Email 4 Status
G: Email 5 Status
H: Email 6 Status
I: Email 7 Status
```

## If Emails Still Not Sending

**Check these in order:**

1. ✅ Web App deployed? (go to Deploy → Manage deployments)
2. ✅ New URL added to React?
3. ✅ React rebuilt? (`npm run build`)
4. ✅ Dist uploaded to Cloudflare?
5. ✅ Trigger created for `sendEmailSequence`?
6. ✅ Logs show no errors? (Ctrl+Enter in Apps Script)

If still stuck:
- Run `testEmail()` manually
- Check Apps Script Logs for the exact error
- Share the error message
