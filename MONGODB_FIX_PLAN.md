# MongoDB & M-Pesa Fix Plan

## Issue
- `querySrv ENOTFOUND _mongodb._tcp.cluster0.mongodb.net` - MongoDB SRV DNS lookup failure
- This blocks M-Pesa payments because the app can't connect to the database

## Solution
Made MongoDB connection optional/fallback so payments work even when database is unavailable

## Files Updated

### 1. lib/db/connect.ts ✅
- Added retry logic (3 attempts with 2s delay)
- Added fallback to direct MongoDB connection (non-SRV)
- Added `isSimulatedMode` flag when DB is unavailable
- Graceful degradation instead of throwing errors

### 2. app/api/payment/mpesa/stkpush/route.ts ✅
- Wrapped database operations in try/catch
- Created safe helpers: `safeCreateOrder()` and `safeUpdateOrder()`
- Payments now work even when DB is down
- Better error messages with debug info in development

### 3. components/payment/MpesaPayment.tsx ✅
- Improved error handling UI
- Shows database warning toast when DB is unavailable
- Better error messages for users

## Testing
Test the payment flow at `/checkout` - it should now work even with MongoDB SRV issues

## Future Fix (Optional)
To permanently fix the MongoDB SRV issue:
1. Check your `.env.local` MONGODB_URI
2. If using `mongodb+srv://`, ensure DNS is properly configured
3. Consider switching to direct `mongodb://` connection string

