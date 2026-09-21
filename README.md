# 🏆 Kreedum Ecommerce Backend

Production-ready REST API backend powering the **Kreedum Sports Ecommerce Platform**. This backend provides authentication, product catalog, search, wishlist, shopping cart, address lookup, checkout, and order management APIs built with **Node.js, Express.js, MongoDB, and Mongoose**.

> Designed for the upcoming React + Vite + Tailwind frontend and scalable admin panel.

---

## 🚀 Project Overview

Kreedum Ecommerce Backend is a modular REST API built for an end-to-end sports ecommerce platform. It supports customer authentication, product discovery, cart management, order placement, and location-aware checkout using Indian pincode lookup.

**Current Status:** Backend Phase 3 Completed ✅

---

## ✨ Features

### 🛍️ Ecommerce Core

* Product Catalog API
* Categories API
* Brands API
* Homepage API
* Product Search API
* Product Filters & Sorting

### 👤 Customer Module

* User Registration & Login (JWT Authentication)
* User Profile APIs
* Wishlist Management
* Shopping Cart Management

### 📦 Checkout & Orders

* Address Lookup by Indian Pincode
* Automatic City/State/District Detection
* Checkout Service (Cart → Order Conversion)
* Order Management APIs
* Order Tracking Timeline
* Order Cancellation

### 📚 API Documentation

* Swagger / OpenAPI Documentation
* JWT Protected Endpoints
* Ready-to-use Swagger Test Collection

### 🗄️ Database

* MongoDB Atlas
* Mongoose Models
* Optimized MongoDB Indexes
* Text Search Indexes

---

## 🧱 Tech Stack

| Technology        | Usage                               |
| ----------------- | ----------------------------------- |
| Node.js           | Backend Runtime                     |
| Express.js        | REST API Framework                  |
| MongoDB Atlas     | Database                            |
| Mongoose          | ODM                                 |
| JWT               | Authentication                      |
| Swagger (OpenAPI) | API Documentation                   |
| Dotenv            | Environment Configuration           |
| Axios             | External API Calls (Pincode Lookup) |

---

## 📁 Project Structure

```text
src/
├── config/                 # Database, Swagger, Environment
├── controllers/            # Request Controllers
├── middleware/             # Authentication Middleware
├── migration/              # MongoDB Index Migration
├── models/                 # Mongoose Models
├── routes/                 # API Routes
├── services/               # Business Logic
├── utils/                  # Helper Utilities
└── app.js                  # Express Application
```

---

## 📡 API Modules

### Products

* Get Products
* Product Details
* Featured Products
* Best Sellers
* New Arrivals
* Related Products

### Categories

* Department Categories
* Parent Categories
* Child Categories

### Brands

* Brand Listing
* Brand Products

### Search

* Keyword Search
* Category Search
* Brand Search
* Suggestions
* Filters

### Homepage

* Hero Products
* Featured Categories
* Featured Brands
* Best Sellers
* New Arrivals

### Authentication

* Register
* Login
* Get Current User
* Update Profile
* JWT Authorization

### Wishlist

* Add to Wishlist
* Remove from Wishlist
* Get Wishlist
* Wishlist Count

### Cart

* Add Item
* Update Quantity
* Remove Item
* Get Cart
* Cart Summary

### Address

* Pincode Lookup API
* Automatic City/State Detection
* Locality Suggestions

### Orders

* Place Order
* Get My Orders
* Order Details
* Cancel Order
* Order Tracking Timeline

---

## 📘 Swagger API Documentation

After running the server, Swagger documentation is available at:

```text
http://localhost:5000/api/docs
```

Swagger includes documentation and request/response examples for every API endpoint.

---

## 🧪 QA Status

Every major module has been manually tested through Swagger.

| Module             | QA Status        |
| ------------------ | ---------------- |
| Products API       | ✅ Passed         |
| Categories API     | ✅ Passed         |
| Brands API         | ✅ Passed         |
| Search API         | ✅ Passed         |
| Homepage API       | ✅ Passed         |
| Authentication API | ✅ Passed         |
| Wishlist API       | ✅ Passed         |
| Cart API           | ✅ Passed         |
| Address API        | ✅ Passed (8/8)   |
| Orders API         | ✅ Passed (24/24) |

**Total Swagger QA Completed:** 80+ manual test cases.

---

## ⚡ Installation

### Clone Repository

```bash
git clone https://github.com/potterheadvibhor/kreedum-ecommerce.git
cd kreedum-ecommerce
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### Run Development Server

```bash
npm run dev
```

### Create / Verify MongoDB Indexes

```bash
npm run migrate:indexes
```

---

## 🌍 Current Backend Progress

### ✅ Completed

* Product Catalog
* Categories
* Brands
* Search
* Homepage APIs
* Authentication
* Wishlist
* Cart
* Address Lookup (Pincode)
* Checkout & Orders
* Swagger Documentation
* MongoDB Index Migration

### 🚧 Next Phase

Frontend development using:

* React + Vite
* Tailwind CSS
* Axios
* React Router
* Context API

Upcoming backend modules:

* Saved Addresses
* Coupons
* Razorpay Integration
* Admin Dashboard APIs
* Inventory Management
* Delivery & Shipping APIs

---

## 📌 Related Projects

| Project                           | Description                                                     |
| --------------------------------- | --------------------------------------------------------------- |
| **ms-scrapper**                   | Metro Sports supplier scraper used for product synchronization. |
| **Kreedum Frontend** *(Upcoming)* | React + Tailwind ecommerce storefront consuming this backend.   |

---

## 👨‍💻 Developer

**Vibhor Jain**

AI Associate Engineer — Kreedum Sports

Building the complete ecommerce platform for Kreedum Sports using Node.js, Express.js, MongoDB, and React.
