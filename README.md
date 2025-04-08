# E-commerce Store Webbuy – React + Redux Toolkit + Shopify

## Description

A modern e-commerce web application built with **React**, powered by **Redux Toolkit** for state management, and integrated with **Shopify** (Buy SDK + REST API).

## Features

- Browse products with image gallery and descriptions
- Select product variants (color / size)
- Add products to cart
- Add products to favorites
- Sync with Shopify REST API
- Smart button styling (active, disabled, hover, etc.)

---

## Technologies

- **React** – front-end UI
- **Redux Toolkit** – state management
- **Shopify Buy SDK** – product and cart management
- **Shopify REST API** – extra product data
- **React Router** – routing between pages
- **CSS Modules** – scoped component styling

---

## Requirements

- **Node.js** v18+
- **Yarn** v1.22+

---

## ⚙️ Installation & Setup

1. **Clone the repository**

```zsh
git clone https://github.com/tatesli/webbuy-shopify-integration.git
cd shopify-store
```

2. **Install dependencies** using Yarn:

```bash
yarn install
```

3. **Create a `.env` file** in the root directory and add your Shopify credentials:

```plaintext
REACT_APP_SHOPIFY_ACCESS_TOKEN = your_shopify_api_key
REACT_APP_SHOPIFY_DOMAIN = your_shopify_domain
```

4. **Start the development server**:

   ```zsh
   yarn start
   ```

   This will run the app locally at `http://localhost:3000`.
