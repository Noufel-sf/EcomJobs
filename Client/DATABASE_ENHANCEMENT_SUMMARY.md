# Database Schema Enhancement Summary

## ✅ Created Files:
1. **[DatabaseTypes.ts](saleh/src/app/lib/DatabaseTypes.ts)** - TypeScript types for all tables
2. **[add_missing_attributes.sql](Server/migrations/add_missing_attributes.sql)** - SQL migration script

---

## 📊 Missing Attributes by Table:

### 🛒 **CART**
- ❌ `user_id` - Track which user owns the cart
- ❌ `created_at`, `updated_at` - Timestamps

### 🏷️ **CLASSIFICATION** (Categories)
- ❌ `description` - Category description
- ❌ `href` - URL slug for SEO
- ❌ `created_at`, `updated_at` - Timestamps

### 🎨 **COLORS**
- ❌ `hex_code` - Actual color value (#FF5733)
- ❌ `available` - Is this color in stock
- ❌ `stock_quantity` - Inventory tracking

### 🚚 **DELIVERY_COST**
- ❌ `estimated_days` - Delivery time estimate
- ❌ `created_at`, `updated_at` - Timestamps

### 🖼️ **EXTRA_IMGS**
- ❌ `order` - Sort order for image gallery
- ❌ `alt_text` - Accessibility text

### 📦 **ORDERS** (Critical Missing Fields!)
- ❌ `user_id` - Who placed the order
- ❌ `email` - Customer email
- ❌ `address` - Street address
- ❌ `zip_code` - Postal code
- ❌ `notes` - Delivery instructions
- ❌ `payment_id` - Stripe payment intent ID
- ❌ `payment_method` - card/paypal/etc
- ❌ `payment_status` - pending/paid/failed
- ❌ `tracking_number` - Shipment tracking
- ❌ `estimated_delivery`, `delivered_at` - Delivery dates
- ❌ `canceled_at`, `cancellation_reason` - Cancellation tracking
- ❌ `created_at`, `updated_at` - Timestamps

### 🛍️ **PRODUCT** (Critical Missing Fields!)
- ❌ `sku` - Stock Keeping Unit (unique identifier)
- ❌ `stock_quantity` - Current inventory
- ❌ `discount_percentage` - Discount amount
- ❌ `original_price` - Before discount
- ❌ `weight`, `dimensions` - Shipping calculations
- ❌ `average_rating`, `num_of_reviews` - Social proof
- ❌ `view_count`, `sold_count` - Analytics
- ❌ `is_featured` - Homepage featured products
- ❌ `tags` - Searchable keywords
- ❌ `created_at`, `updated_at` - Timestamps

### 🛒 **PRODUCT_LIST**
- ❌ `price_at_time` - Price snapshot
- ❌ `product_name`, `product_img` - Product snapshot
- ❌ `created_at`, `updated_at` - Timestamps

### 👤 **SELLER** (Critical Missing Fields!)
- ❌ `phone` - Contact number
- ❌ `business_name`, `business_license`, `tax_id` - Legal info
- ❌ `address`, `city`, `state`, `zip_code` - Business location
- ❌ `is_verified`, `is_active` - Account status
- ❌ `rating`, `num_of_reviews` - Seller reputation
- ❌ `commission_rate` - Platform fee
- ❌ `payment_method`, `bank_account` - Payout info
- ❌ `last_login`, `email_verified` - Security
- ❌ `updated_at` - Timestamp

### 📏 **SIZES**
- ❌ `available`, `stock_quantity` - Inventory per size
- ❌ `size_chart` - Size category (S/M/L)

### 🗺️ **STATES**
- ❌ `country` - Country name
- ❌ `code` - State code (CA, NY, etc.)
- ❌ `is_active` - Is state enabled

### 📋 **TYPES**
- ❌ `available`, `stock_quantity` - Inventory per type
- ❌ `price_modifier` - Price adjustment for this type

---

## 🆕 Essential Missing Tables:

### 👥 **USERS** - Customer accounts
Your database only has `seller` but no regular `users` table!
```typescript
- id, email, password, name, phone
- role (BUYER/ADMIN/SELLER)
- address info
- verification status
```

### ⭐ **REVIEWS** - Product reviews
```typescript
- user_id, product_id, rating (1-5)
- comment, images
- verified_purchase flag
```

### 🔐 **TOKENS** - Refresh tokens
```typescript
- user_id, refresh_token, ip
- user_agent, expires_at
```

### ❤️ **WISHLIST** - Save for later
```typescript
- user_id, product_id
```

### 📍 **ADDRESSES** - Saved shipping addresses
```typescript
- user_id, label (Home/Work)
- full address details
- is_default flag
```

### 🔔 **NOTIFICATIONS** - User notifications
```typescript
- user_id, title, message
- type (order/promotion/system)
- is_read status
```

### 🎟️ **COUPONS** - Discount codes
```typescript
- code, discount_type, value
- validity dates
- usage limits
```

### 📜 **ORDER_HISTORY** - Track order status changes
```typescript
- order_id, status, note
- changed_by (who made the change)
- timestamp
```

---

## 🚀 How to Apply:

### Option 1: Run SQL Migration (Recommended)
```bash
cd Server
psql your_database_name < migrations/add_missing_attributes.sql
```

### Option 2: Manual via Database Client
1. Open Database Client extension
2. Connect to your PostgreSQL database
3. Copy SQL from `add_missing_attributes.sql`
4. Execute in SQL terminal

### Option 3: Prisma Schema (Better Long-term)
Update your Prisma schema to match the enhanced database structure, then:
```bash
npx prisma migrate dev --name add_missing_attributes
```

---

## ⚠️ Critical Issues to Fix:

1. **No USER table** - You can't have orders without customers!
2. **ORDERS missing payment info** - Can't process payments
3. **PRODUCT missing inventory** - Can't track stock
4. **No REVIEWS** - Can't build trust
5. **CART missing user_id** - Can't associate cart with users

---

## 💡 Priority Order:

### 🔴 **URGENT** (Do First):
1. Create `users` table
2. Add `user_id` to `cart` and `orders`
3. Add payment fields to `orders`
4. Add inventory to `product`

### 🟡 **IMPORTANT** (Do Soon):
5. Create `reviews` table
6. Create `tokens` table
7. Add timestamps to all tables
8. Create `addresses` table

### 🟢 **NICE TO HAVE** (Do Later):
9. Create `wishlist` table
10. Create `coupons` table
11. Create `notifications` table
12. Create `order_history` table

---

## 📝 Next Steps:

1. Review the TypeScript types in `DatabaseTypes.ts`
2. Review the SQL migration in `add_missing_attributes.sql`
3. Backup your current database
4. Run the migration script
5. Update your backend API to use new fields
6. Update your frontend to use the TypeScript types

Need help with any specific table or migration? Let me know!
