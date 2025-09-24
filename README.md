# LV_Dev

## Tech stack (recommended)
- **Frontend:** Next.js (React) + TypeScript — SSR/SSG for product pages, great SEO & performance  
  - State: **Redux Toolkit** or **Zustand** (cart + auth)  
  - UI: Tailwind CSS + Headless UI (or shadcn/ui)  
  - Bundler: Next.js built-in (Vite if you prefer CRA/Vite app)  
- **Backend (API):** Node.js + Express (TypeScript) — RESTful API (or GraphQL later)  
- **DB:** MongoDB (Atlas) — flexible product schemas, horizontal scale  
- **Cache / Session / PubSub:** Redis — cache product pages, sessions, rate-limit, job queue  
- **Search / Autocomplete:** Algolia or Elasticsearch (Algolia easiest to integrate for instant search)  
- **Payments:** Stripe (or Razorpay if India-focused) + webhook handlers  
- **File storage (images):** AWS S3 or Cloudinary (Cloudinary adds transformations)  
- **Auth:** JWT access + refresh tokens; bcrypt for password hashing; OAuth 2.0 social logins optional  
- **Queue / Background jobs:** BullMQ (Redis) for order emails, inventory updates, sync tasks  
- **Deployment:** Docker, deploy to AWS ECS / EKS, or Vercel (Next.js frontend) + Heroku / Render / DigitalOcean for API. CI: GitHub Actions.  
- **Monitoring:** Sentry (errors), Prometheus + Grafana or Datadog (metrics), Log aggregation (ELK / LogDNA)  
- **Observability:** OpenTelemetry traces for performance hotspots

---

## High-level architecture overview
1. **Next.js frontend** (SSR/SSG for product pages, CSR for cart/checkout flows) communicating with
2. **Express REST API** (JSON) for protected operations (orders, payments, user profile, admin)  
3. **MongoDB** as primary store; **Redis** for caching and sessions; **Algolia/ES** for search  
4. **Stripe** for online payments + webhook validation  
5. **Worker process** (BullMQ) for sending emails, post-order processing, inventory tasks  
6. **CDN** (CloudFront / Netlify / Vercel) + S3/Cloudinary for assets

---

## Frontend folder structure (Next.js + TypeScript)
```
/frontend
├─ /app or /pages (Next.js pages/app-router)
├─ /components
│   ├─ ui/ (buttons, inputs, cards)
│   ├─ product/ (ProductCard, ProductGallery)
│   └─ cart/ (CartDrawer, CartItem)
├─ /features
│   ├─ auth/ (hooks, slices)
│   ├─ cart/ (RTK slice, hooks)
│   └─ checkout/
├─ /lib
│   ├─ api.ts (axios instance)
│   ├─ stripe.ts (checkout helpers)
│   └─ analytics.ts
├─ /hooks
├─ /services
│   └─ productService.ts (fetching + caching wrappers)
├─ /styles (tailwind config)
├─ /public (static assets)
├─ /types (TS interfaces)
├─ /pages (if using pages-router)
├─ next.config.js
├─ package.json
└─ tsconfig.json
```

---

## Backend folder structure (Express + TypeScript)
```
/backend
├─ src
│  ├─ controllers/
│  │   ├─ auth.controller.ts
│  │   ├─ product.controller.ts
│  │   ├─ cart.controller.ts
│  │   ├─ order.controller.ts
│  │   └─ admin.controller.ts
│  ├─ routes/
│  │   ├─ auth.routes.ts
│  │   ├─ product.routes.ts
│  │   ├─ cart.routes.ts
│  │   └─ order.routes.ts
│  ├─ models/
│  │   ├─ User.ts
│  │   ├─ Product.ts
│  │   ├─ Category.ts
│  │   ├─ Order.ts
│  │   └─ Cart.ts (optional)
│  ├─ services/
│  │   ├─ payment.service.ts
│  │   ├─ search.service.ts
│  │   └─ email.service.ts
│  ├─ middlewares/
│  │   ├─ auth.ts
│  │   ├─ errorHandler.ts
│  │   └─ rateLimiter.ts
│  ├─ jobs/ (BullMQ processors)
│  ├─ utils/
│  ├─ config/
│  └─ index.ts (server bootstrap)
├─ Dockerfile
├─ package.json
└─ tsconfig.json
```

---

## Core data schemas

### User
```ts
{
  _id,
  name: string,
  email: string,
  passwordHash: string,
  roles: ['user'|'admin'|'seller'],
  addresses: [{ label, line1, city, state, postal, country, phone }],
  wishlist: [productId],
  createdAt, updatedAt
}
```

### Product
```ts
{
  _id,
  title: string,
  slug: string, // unique, used in URL
  description: string,
  shortDescription?: string,
  sku?: string,
  price: { amount: number, currency: 'INR'|'USD' },
  stock: number,
  images: [url],
  categories: [categoryId],
  attributes: [{ key, value }], // size/color/etc
  variants?: [{ sku, attributes, price, stock, images }],
  rating: number,
  reviewCount: number,
  tags: [string],
  metadata: {},
  createdAt, updatedAt
}
```

### Order
```ts
{
  _id,
  userId,
  items: [{ productId, variantId?, priceAtPurchase, qty }],
  subtotal,
  shipping: { method, cost },
  tax,
  total,
  status: 'pending'|'paid'|'processing'|'shipped'|'delivered'|'cancelled'|'refunded',
  shippingAddress,
  payment: { provider: 'stripe', id, status },
  trackingNumber?,
  createdAt, updatedAt
}
```

### Cart (optional server-side)
```ts
{
  userId?,
  items: [{ productId, variantId?, qty }],
  updatedAt
}
```

### Review
```ts
{
  userId, productId, rating, title, body, createdAt
}
```

---

## Key REST API endpoints
```
Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me

Products & Catalog
GET  /api/products?category=&q=&sort=&page=
GET  /api/products/:id
GET  /api/products/slug/:slug
GET  /api/categories
GET  /api/best-sellers
GET  /api/recommendations (personalized)

Cart
GET  /api/cart (auth)
POST /api/cart (add/update)
DELETE /api/cart/:itemId

Checkout / Orders
POST /api/checkout/create-intent
POST /api/orders
GET  /api/orders/:id
GET  /api/orders (user)
POST /api/webhooks/stripe

Admin
GET  /api/admin/products
POST /api/admin/product
PUT  /api/admin/product/:id
DELETE /api/admin/product/:id
PUT  /api/admin/order/:id/status
```

---

## Payment flow (Stripe)
1. Client calls `/api/checkout/create-intent` with cart details.  
2. Server validates cart, reserves stock.  
3. Server creates a Stripe PaymentIntent or Checkout Session and returns info.  
4. Client completes payment.  
5. Stripe sends webhook to `/api/webhooks/stripe`.  
6. On success, mark order paid, decrement stock, enqueue email job.

---

## Search & discovery
- MongoDB text search for small catalogs.  
- Algolia or Elasticsearch for large catalogs.  
- Sync products on update via worker.  
- Support facets (category, price range, brand).

---

## Caching & performance
- **CDN** for static assets.  
- Cache product page HTML with ISR.  
- Redis to cache hot product metadata.  
- Response caching headers.  
- Use Cloudinary for images.

---

## Scalability & data concerns
- Separate frontend hosting.  
- MongoDB read replicas.  
- Redis for ephemeral state.  
- Background workers for heavy tasks.  
- Shard MongoDB when scaling.

---

## Security checklist
- bcrypt password hashing.  
- HTTPS everywhere.  
- JWT with refresh tokens.  
- Rate limiting with Redis.  
- CSRF protection.  
- Validate file uploads.  
- Sign & verify payment webhooks.  
- Least privilege DB creds.

---

## Dev & CI/CD
- Docker Compose for local dev.  
- GitHub Actions: lint, tests, build, deploy.  
- Store secrets securely.

---

## Testing strategy
- Unit: Jest + RTL.  
- Integration: Jest + supertest.  
- E2E: Playwright or Cypress.  
- Load testing: k6 or Artillery.

---

## Observability & logging
- Structured logs.  
- Sentry for errors.  
- Metrics for latency & DB.  
- Traces with OpenTelemetry.

---

## Useful libraries
- **Backend:** express, mongoose, typescript, class-validator, jsonwebtoken, bcrypt, stripe, bullmq, ioredis, helmet, cors, winston/pino  
- **Frontend:** next, react, typescript, redux-toolkit, axios, react-query, tailwindcss, stripe-js, @stripe/stripe-js

---

## Example Mongoose Product model
```ts
import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  slug: { type: String, required: true, index: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [String],
}, { timestamps: true });

export default model<IProduct>('Product', productSchema);
```

## Simple Express route
```ts
import express from 'express';
import Product from '../models/Product';
const router = express.Router();

router.get('/slug/:slug', async (req, res, next) => {
  try {
    const p = await Product.findOne({ slug: req.params.slug }).lean();
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { next(err); }
});

export default router;
```

## Next.js product page
```ts
export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_URL}/api/products`);
  const products = await res.json();
  return { paths: products.map(p => ({ params: { slug: p.slug } })), fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.API_URL}/api/products/slug/${params.slug}`);
  const product = await res.json();
  return { props: { product }, revalidate: 60 };
}
```

---

## Admin & business features
- Role-based admin dashboards.  
- Promotions & coupons.  
- Multi-warehouse inventory.  
- Returns & refunds workflow.  
- Tax calculations.  
- Multi-currency support.

---

## MVP checklist
- Product listing & detail pages.  
- Cart + checkout flow.  
- Payment integration.  
- User accounts & order history.  
- Admin CRUD.  
- Image hosting + CDN.  
- Basic search.  
- Monitoring & error tracking.
