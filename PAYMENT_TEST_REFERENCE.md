# 🧪 Quick Payment Testing Reference

## 🎴 Stripe Test Cards

### ✅ Successful Payments
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
```

### ❌ Declined Cards
```
Card Declined: 4000 0000 0000 0002
Insufficient Funds: 4000 0000 0000 9995
Expired Card: 4000 0000 0000 0069
Invalid CVC: 4000 0000 0000 0127
```

### 💳 Different Card Brands
```
Visa: 4242 4242 4242 4242
Mastercard: 5555 5555 5555 4444
American Express: 3782 822463 10005 (4-digit CVC)
```

---

## 📱 M-Pesa Test Numbers

### Format Options (All Valid)
```
254712345678  ✅ (Recommended)
0712345678    ✅ (Auto-converts to 254712345678)
712345678     ✅ (Auto-converts to 254712345678)
```

### Display Format
```
Input: 0712345678
Displays as: +254 712 345 678
Sends as: 254712345678
```

### Valid Prefixes
```
2547XX XXX XXX  ✅ (Safaricom)
2541XX XXX XXX  ✅ (Airtel)
```

---

## 🔄 Testing Workflow

### 1. Simulation Mode (Default)
- No real credentials needed
- Works out of the box
- Safe for development

### 2. Test Mode (Sandbox)
- Add test API keys
- Use test cards/numbers
- No real money involved

### 3. Production Mode
- Add production keys
- Real transactions
- Real money

---

## 💰 Amount Limits

### Stripe
- Minimum: KES 1 (or 0.01 in cents)
- Maximum: No limit (depends on account)

### M-Pesa
- Minimum: KES 1
- Maximum: KES 150,000 per transaction

---

## 🎯 Quick Test Scenarios

### Test 1: Successful Card Payment
1. Select "Credit/Debit Card"
2. Enter: 4242 4242 4242 4242
3. Expiry: 12/25
4. CVC: 123
5. Name: Test User
6. Click "Pay"
7. ✅ Should succeed

### Test 2: Declined Card
1. Select "Credit/Debit Card"
2. Enter: 4000 0000 0000 0002
3. Expiry: 12/25
4. CVC: 123
5. Name: Test User
6. Click "Pay"
7. ❌ Should show "Card declined"

### Test 3: M-Pesa Payment
1. Select "M-Pesa"
2. Enter: 0712345678
3. Click "Pay with M-Pesa"
4. ✅ Should show STK Push sent
5. Wait 30 seconds
6. ✅ Auto-confirms (simulation)

---

## 🐛 Common Issues & Fixes

### Issue: "Invalid card number"
**Fix**: Check Luhn validation, use test cards above

### Issue: "Card has expired"
**Fix**: Use future date (e.g., 12/25, not 12/23)

### Issue: "Invalid phone number"
**Fix**: Use format 254XXXXXXXXX or 07XXXXXXXX

### Issue: "Payment processing failed"
**Fix**: Check browser console for errors

---

## 📊 Expected Behavior

### Simulation Mode
- ✅ Card: 90% success rate (random)
- ✅ M-Pesa: 100% success rate
- ⏱️ Processing: 2 seconds
- 🔄 Auto-redirect on success

### Real Mode
- ✅ Card: Depends on card validity
- ✅ M-Pesa: Depends on user action
- ⏱️ Processing: 3-10 seconds
- 🔄 Webhook confirms payment

---

**Pro Tip**: Always test in simulation mode first before adding real credentials!
