# Payment Integration Guide - Shop JR

## Overview
This guide explains how to set up and use the payment gateways in Shop JR.

---

## 🎯 Current Status

### ✅ Card Payment (Stripe)
- **Status**: Enhanced & Production Ready
- **Features**:
  - Luhn algorithm card validation
  - Automatic card brand detection (Visa, Mastercard, Amex)
  - Enhanced expiry date validation
  - CVC validation (3 digits for most cards, 4 for Amex)
  - Real Stripe integration support
  - Fallback to simulation mode for testing

### ✅ M-Pesa (Kenya)
- **Status**: Enhanced & Production Ready
- **Features**:
  - Improved phone number validation
  - Automatic formatting (254XXXXXXXXX)
  - STK Push integration
  - Real Safaricom API support
  - Fallback to simulation mode for testing
  - Amount validation (KES 1 - 150,000)

---

## 🔧 Setup Instructions

### 1. Stripe Card Payment Setup

#### Get Stripe API Keys:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or sign in
3. Navigate to **Developers** → **API Keys**
4. Copy your **Publishable Key** and **Secret Key**

#### Configure Environment Variables:
```env
# .env.local
STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_51xxxxxxxxxxxxx
```

#### Install Stripe SDK (if using real integration):
```bash
npm install stripe
```

#### Test Cards (Stripe Test Mode):
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Insufficient Funds**: 4000 0000 0000 9995
- **Expired Card**: 4000 0000 0000 0069
- Use any future expiry date (e.g., 12/25)
- Use any 3-digit CVC (e.g., 123)

---

### 2. M-Pesa Setup

#### Get M-Pesa Credentials:
1. Go to [Safaricom Daraja Portal](https://developer.safaricom.co.ke/)
2. Create an account and log in
3. Create a new app
4. Get your credentials:
   - Consumer Key
   - Consumer Secret
   - Business Short Code (Paybill/Till Number)
   - Passkey

#### Configure Environment Variables:
```env
# .env.local
MPESA_CONSUMER_KEY=your_consumer_key_from_safaricom
MPESA_CONSUMER_SECRET=your_consumer_secret_from_safaricom
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=your_passkey_from_safaricom
MPESA_CALLBACK_URL=https://yourdomain.com/api/payment/mpesa/callback
MPESA_ENVIRONMENT=sandbox  # or 'production'
```

#### Test Phone Numbers (Sandbox):
- Use format: 254XXXXXXXXX
- Example: 254712345678
- Must start with 2547XX or 2541XX

#### Production Checklist:
- [ ] Complete Safaricom KYC verification
- [ ] Get production credentials
- [ ] Set up SSL certificate for callback URL
- [ ] Test with real phone numbers
- [ ] Set MPESA_ENVIRONMENT=production

---

## 🧪 Testing Without Real Credentials

Both payment methods automatically fall back to **simulation mode** when real credentials are not configured:

### Stripe Simulation:
- Works without real API keys
- 90% success rate (random)
- 2-second processing delay
- Returns simulated payment intent

### M-Pesa Simulation:
- Works without real credentials
- Always succeeds
- 2-second processing delay
- Auto-confirms after 30 seconds

---

## 📝 Implementation Details

### Card Payment Enhancements:
1. **Luhn Algorithm Validation**: Validates card numbers mathematically
2. **Card Brand Detection**: Automatically detects Visa, Mastercard, Amex
3. **Smart CVC Validation**: 3 digits for most cards, 4 for Amex
4. **Expiry Validation**: Checks if card is expired
5. **Real-time Formatting**: Auto-formats card number with spaces

### M-Pesa Enhancements:
1. **Phone Number Validation**: Ensures valid Kenyan format
2. **Auto-formatting**: Converts 07XX to 254XXX automatically
3. **Display Formatting**: Shows as +254 XXX XXX XXX
4. **Amount Limits**: Validates KES 1 - 150,000 range
5. **Error Handling**: Clear error messages for users

---

## 🚀 Usage

### For Development:
1. Leave default placeholder values in `.env.local`
2. System automatically uses simulation mode
3. Test all payment flows without real money

### For Production:
1. Add real API keys to `.env.local`
2. System automatically switches to real payment processing
3. Test thoroughly in sandbox/test mode first
4. Switch to production credentials when ready

---

## 🔒 Security Best Practices

1. **Never commit** `.env.local` to version control
2. **Use environment variables** for all sensitive data
3. **Enable HTTPS** in production
4. **Validate all inputs** on both client and server
5. **Log transactions** for audit trail
6. **Implement rate limiting** to prevent abuse
7. **Use webhook signatures** to verify callbacks

---

## 📊 Payment Flow

### Card Payment:
1. User enters card details
2. Frontend validates format
3. API validates with Luhn algorithm
4. Stripe processes payment (or simulation)
5. Success → Redirect to order success page
6. Failure → Show error message

### M-Pesa Payment:
1. User enters phone number
2. Frontend validates format
3. API initiates STK Push
4. User receives prompt on phone
5. User enters M-Pesa PIN
6. Callback confirms payment
7. Success → Redirect to order success page

---

## 🐛 Troubleshooting

### Stripe Issues:
- **"Invalid API Key"**: Check STRIPE_SECRET_KEY format
- **"Card Declined"**: Use test cards from Stripe docs
- **"Processing Error"**: Check server logs for details

### M-Pesa Issues:
- **"Invalid Phone Number"**: Must be 254XXXXXXXXX format
- **"STK Push Failed"**: Check M-Pesa credentials
- **"Timeout"**: User didn't complete payment on phone
- **"Insufficient Funds"**: User's M-Pesa balance too low

---

## 📞 Support

### Stripe Support:
- Documentation: https://stripe.com/docs
- Support: https://support.stripe.com/

### M-Pesa Support:
- Documentation: https://developer.safaricom.co.ke/docs
- Email: apisupport@safaricom.co.ke
- Phone: +254 711 082 300

---

## ✅ Next Steps

1. **Test in simulation mode** to verify flows
2. **Get real credentials** from Stripe and Safaricom
3. **Test in sandbox/test mode** with real APIs
4. **Implement webhook handlers** for payment confirmations
5. **Add database logging** for transactions
6. **Set up email notifications** for successful payments
7. **Deploy to production** with real credentials

---

**Last Updated**: January 2025
**Version**: 2.0
