# 🛒 Next.js & Sanity CMS eCommerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Sanity CMS](https://img.shields.io/badge/Sanity-v3-F03E2F?style=for-the-badge&logo=sanity)](https://www.sanity.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Accessibility](https://img.shields.io/badge/WCAG_2.2-AA_Compliant-green?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Deployment](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://nextjs-design-hackathon.vercel.app/)

> **A production-ready, feature-complete, accessible, and high-performance eCommerce web application built with Next.js 15 App Router, React 19, TypeScript, and Sanity CMS.**

---

## 🌟 Live Demo

🌐 **Live Website:** [https://nextjs-design-hackathon.vercel.app/](https://nextjs-design-hackathon.vercel.app/)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Standards](#-architecture--standards)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Data Import & Sanity Studio](#-data-import--sanity-studio)
- [Available Scripts](#-available-scripts)
- [Accessibility & SEO](#-accessibility--seo)
- [Deployment](#-deployment)
- [License & Acknowledgments](#-license--acknowledgments)

---

## 📌 Overview

This project is an end-to-end implementation of a modern eCommerce platform, engineered from a Figma design hackathon specification into a production-grade application.

Driven by a strict **Project Constitution**, the application places performance, accessibility (WCAG 2.2 AA), data integrity, and maintainable architecture at the forefront. Sanity CMS serves as the authoritative headless backend for real-time catalog management, blogs, and product categories.

---

## ✨ Key Features

### 🛍️ Dynamic Product Discovery & Catalog
* **Dynamic Shop Page**: Browse the catalog with real-time server and client-side data fetching powered by Sanity GROQ queries.
* **Advanced Filters & Sorting**: Filter by category, price range, stock availability, and sort by price (low to high / high to low) or popularity.
* **Product Search**: Fast, responsive search page (`/search`) querying live product indexes.
* **Rich Product Detail Pages**: Image gallery with zoom preview (`ImageGallery.tsx`), price breakdown, tag lists, quantity selector, and related products carousel.

### 💳 Cart, Wishlist & Comparison Engine
* **Interactive Cart & Slide-Over Sidebar**: Real-time cart state management (`CartContext.js`) with persistent storage, item quantity adjustments, and slide-over mini-cart UI without leaving the current page.
* **Wishlist Suite**: Save items for later (`/wishlist`) with instant sync across sessions.
* **Product Comparison Matrix**: Compare products side-by-side on key attributes, dimensions, materials, and warranty (`/comparison`).

### 📦 Checkout, Shipping & Order Management
* **Multi-Step Checkout**: Billing info validation, shipping address selection using `country-state-city` integration, and order summary calculations.
* **Order Tracking & Confirmation**: Real-time order placement (`/checkout`), receipt generation, and order detail view (`/orders`).
* **Payment Flow**: Structured payment handling (`/payment`, `/return`).

### 📰 Content Management & Blog
* **Embedded Sanity Studio**: Admin dashboard accessible directly at `/studio` for live content authoring.
* **Blog System**: Dynamic articles (`/blog`) with rich content blocks, tags, and author metadata.
* **Company & Support Pages**: About us (`/about`), Contact with form validation (`/contact`), and Privacy policy (`/privacy`).

---

## 🏛️ Architecture & Standards

Built adhering strictly to the **Project Constitution** (`specs/constitution.md`):

1. **Functionality & Data Integrity**:
   - Cart calculations, stock validation, and price synchronization are strictly managed using stable unique product IDs (`_id`).
   - Every asynchronous operation includes explicit loading skeletons, empty states, and error fallbacks.
2. **Accessibility First (WCAG 2.2 AA)**:
   - Full keyboard navigation with visible focus rings (`SkipToContent.tsx`).
   - Semantic HTML5 structure with ARIA labels and alt text for all visual assets.
3. **Performance Optimization**:
   - Next.js App Router with Server Components used by default.
   - Next.js `<Image />` optimization with dynamic blur placeholders.
   - Zero layout shifts (CLS) and minimal client-side JavaScript.

---

## 🛠️ Tech Stack

| Domain | Technology / Library | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) | App Router, Server Components, Route Handlers |
| **UI Library** | [React 19](https://react.dev/) | Functional Components & Hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end type safety |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + Styled Components | Utility-first styling & modular CSS |
| **CMS & Backend** | [Sanity v3](https://www.sanity.io/) (`@sanity/client`, `next-sanity`) | Headless CMS & GROQ queries |
| **Icons & Media** | Lucide React / Custom SVGs | Modern lightweight icons |
| **State Management** | React Context API | `CartContext`, Wishlist & Notification Contexts |
| **Form Data** | `country-state-city`, `country-list` | Regional address and shipping dropdowns |
| **Deployment** | [Vercel](https://vercel.com/) | Edge deployment with automatic CI/CD |

---

## 📁 Project Structure

```text
nextjs-design-hackathon/
├── app/                        # Next.js 15 App Router
│   ├── about/                  # About page
│   ├── api/                    # API Route handlers
│   ├── blog/                   # Blog page and post details
│   ├── cart/                   # Cart page
│   ├── checkout/               # Checkout & order processing
│   ├── comparison/             # Product comparison matrix
│   ├── contact/                # Contact page with form validation
│   ├── orders/                 # Order confirmation & history
│   ├── payment/                # Payment gateway integration page
│   ├── privacy/                # Privacy policy page
│   ├── profile/                # User profile page
│   ├── search/                 # Product search page
│   ├── shop/                   # Product catalog & [id] detail page
│   ├── studio/                 # Embedded Sanity Studio route (`/studio`)
│   ├── wishlist/               # Saved wishlist page
│   ├── components/             # Reusable UI Components
│   │   ├── Banner.tsx
│   │   ├── Footer.tsx
│   │   ├── Guarantees.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pagination.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductFilters.tsx
│   │   ├── ProductSort.tsx
│   │   ├── PromotionalBanner.tsx
│   │   └── QuantitySelector.tsx
│   ├── CartContext.js          # Cart state provider & local storage sync
│   ├── globals.css             # Tailwind imports & global design system
│   └── layout.tsx              # Root layout with providers & navigation
├── sanity/                     # Sanity CMS Configuration
│   ├── lib/                    # Sanity client & image building helpers
│   ├── schemaTypes/            # Sanity Schemas (product, category, blog, order)
│   ├── env.ts                  # Environment variable configuration
│   └── sanity.config.ts        # Sanity Studio configuration
├── script/                     # Data Migration & Utilities
│   └── importData.js           # Sanity bulk data import script
├── public/                     # Static assets & image media
├── next.config.ts              # Next.js setup & remote domain configs
├── tailwind.config.ts          # Tailwind theme customizations
└── package.json                # Dependencies & scripts
```

---


## 📄 License & Acknowledgments

* **Design**: Hackathon UI/UX Figma Design.
* **Platform**: Built for the Next.js Design Hackathon initiative.
* **Developer**: [Mariyam Asif](https://github.com/Mariyam-Asif)

---

<div align="center">
  <sub>Built with ❤️ using Next.js, React 19, TypeScript, and Sanity CMS.</sub>
</div>
