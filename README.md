# Shop JR - E-Commerce Platform

A fully responsive, full-stack e-commerce platform for sneakers and streetwear, architecturally modeled after Kicks Kenya with a strict White, Black, and Red theme.

## 🚀 Features

### Core E-Commerce Features
- **Product Catalog**: Browse sneakers and streetwear with filtering and search
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout Process**: Complete order flow with customer information
- **Order Management**: Order tracking and success confirmation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Payment Gateway Integration (Primary Focus)
- **M-Pesa (Lipa na M-Pesa)**: Kenya-specific mobile money payments with STK Push
- **Stripe Card Payments**: Credit/debit card processing with secure forms
- **PayPal Integration**: International payment processing with PayPal SDK

### Design System
- **Color Palette**: Strict White (#FFFFFF), Black (#000000), Red (#FF0000)
- **Typography**: Inter and Montserrat fonts
- **Components**: Reusable UI components with consistent styling
- **Animations**: Smooth transitions and hover effects

## 🛠 Technology Stack

- **Frontend**: Next.js 14 (React) with TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **Backend**: Next.js API Routes
- **State Management**: Zustand for cart state
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Payment SDKs**: Stripe, PayPal JavaScript SDK
- **Development**: ESLint, PostCSS, Autoprefixer

## 📁 Project Structure

```
shop-jr/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── payment/              # Payment processing APIs
│   │   │   ├── mpesa/            # M-Pesa integration
│   │   │   ├── stripe/           # Stripe integration
│   │   │   └── paypal/           # PayPal integration
│   ├── checkout/                 # Checkout pages
│   ├── order/                    # Order management
│   ├── cart/                     # Shopping cart
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── providers.tsx             # App providers
├── components/
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx            # Navigation header
│   │   └── Footer.tsx            # Site footer
│   ├── home/                     # Homepage components
│   │   ├── HeroSection.tsx       # Hero banner
│   │   ├── FeaturedCollections.tsx
│   │   ├── CultureSection.tsx    # Community section
│   │   └── NewsletterSignup.tsx
│   ├── product/                  # Product components
│   │   ├── ProductGrid.tsx       # Product listing
│   │   └── ProductCard.tsx       # Individual product cards
│   ├── payment/                  # Payment components
│   │   ├── MpesaPayment.tsx      # M-Pesa payment form
│   │   ├── CardPayment.tsx       # Stripe card form
│   │   └── PayPalPayment.tsx     # PayPal integration
│   └── ui/                       # UI components
│       └── Button.tsx            # Button component
├── lib/
│   ├── store/
│   │   └── cart.ts               # Cart state management
│   └── utils/
│       └── cn.ts                 # Utility functions
├── types/
│   └── index.ts                  # TypeScript definitions
├── .env.local                    # Environment variables
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── next.config.js                # Next.js configuration
```

## 💳 Payment Gateway Implementation

### M-Pesa (Kenya)
- **STK Push Simulation**: Mimics Safaricom Daraja API
- **Phone Validation**: Kenya format (+254 or 07XX)
- **Security**: Environment variables for credentials
- **Callbacks**: Webhook handling for transaction confirmation

### Stripe Cards
- **Card Processing**: Secure payment form
- **Validation**: Card number, expiry, CVC validation
- **Security**: 256-bit SSL encryption
- **Brands**: Visa, Mastercard, American Express support

### PayPal
- **SDK Integration**: JavaScript SDK for seamless checkout
- **Order Management**: Create and capture orders
- **International**: USD support with currency conversion
- **Buyer Protection**: PayPal's fraud protection

## 🎨 Design System

### Color Usage
- **Background**: Pure White (#FFFFFF) for main areas
- **Text/UI**: Pure Black (#000000) for readability
- **Accent/Actions**: Vibrant Red (#FF0000) for CTAs and highlights

### Typography
- **Headers**: Montserrat font family
- **Body**: Inter font family
- **Hierarchy**: Clear font size and weight system

### Components
- **Buttons**: Primary (red), Secondary (outlined), Outline variants
- **Cards**: Clean white backgrounds with black borders
- **Forms**: Consistent input styling with focus states
- **Navigation**: Sticky header with cart badge

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables
```env
# Database
MONGODB_URI=mongodb://localhost:27017/shop-jr

# Payment Gateways
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
MPESA_PASSKEY=your_mpesa_passkey

# Application
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 🧪 Testing Payment Gateways

### M-Pesa Testing
- Use Kenya phone numbers: +2547XX XXX XXX or 07XX XXX XXX
- Simulates STK Push with 30-second delay
- Payment confirmation via callback simulation

### Stripe Testing
- Use test card numbers: 4242 4242 4242 4242
- Any future expiry date, any 3-digit CVC
- Simulates payment processing with success/failure scenarios

### PayPal Testing
- PayPal sandbox account required
- Uses test environment by default
- Simulates order creation and capture flow

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailwind's responsive breakpoints
- **Touch Friendly**: Appropriate button sizes and spacing
- **Performance**: Optimized images and lazy loading

## 🔒 Security Features

- **Payment Security**: PCI DSS compliant payment processing
- **Data Protection**: No sensitive payment data stored locally
- **SSL Encryption**: All transactions encrypted in transit
- **Input Validation**: Client and server-side validation
- **Environment Variables**: Secure credential management

## 🎯 Key Pages

- **Homepage (`/`)**: Hero section, featured products, culture content
- **Shop (`/shop`)**: Product listing with filtering
- **Product Detail (`/product/[slug]`)**: Detailed product view
- **Cart (`/cart`)**: Shopping cart management
- **Checkout (`/checkout`)**: Payment processing with 3 gateways
- **Order Success (`/order/success`)**: Order confirmation

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting (recommended)
- Consistent component patterns

## 📊 Performance

- **Server-Side Rendering**: SEO optimized with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Optimization**: Code splitting and lazy loading
- **Caching**: API response caching strategies

## 🌍 Deployment

The application is ready for deployment on:
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site hosting with serverless functions
- **AWS**: EC2, Lambda, or Amplify
- **Docker**: Containerized deployment

## 📝 License

This project is for educational and demonstration purposes. Please ensure proper licensing for production use.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support:
- Email: support@shopjr.com
- Phone: +254 700 000 000
- Documentation: This README and inline code comments

---

**Shop JR** - Premium Sneakers & Streetwear E-Commerce Platform
