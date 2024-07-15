# EcomStore - Simple E-commerce Platform

EcomStore is a full-stack e-commerce application built with React, Node.js, Express, GraphQL, and PostgreSQL. It features a responsive dark-themed UI and provides essential e-commerce functionality.

## Features

- Product listing with search functionality
- Product filtering by category and price range
- Individual product detail pages
- Shopping cart functionality (add, remove, update quantity)
- Responsive design with a dark theme

## Tech Stack

- Frontend: React (created with Vite)
- Backend: Node.js with Express
- API: GraphQL with Apollo Server
- Database: PostgreSQL
- ORM: Sequelize
- State Management: React Context API

## Project Structure

```
ECOM-WEB/
├── backend/
│   ├── models/
│   │   ├── index.js
│   │   └── product.js
│   ├── schema/
│   │   └── index.js
│   ├── .env
│   ├── addMoreProducts.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.jsx
│   │   │   ├── Cart.module.css
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── ProductDetails.module.css
│   │   │   ├── ProductList.jsx
│   │   │   └── ProductList.module.css
│   │   ├── contexts/
│   │   │   └── CartContext.jsx
│   │   ├── App.jsx
│   │   ├── App.module.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── apollo-client.js
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/ecom_db
   PORT=4000
   ```
   Replace `username`, `password`, and `ecom_db` with your PostgreSQL credentials and desired database name.

4. Create the database in PostgreSQL:
   ```
   createdb ecom_db
   ```

5. Run the database migrations and seed the initial data:
   ```
   node seed
   ```

6. Start the backend server:
   ```
   npm start
   ```

The server should now be running on `http://localhost:4000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The frontend should now be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

- Browse products on the home page
- Use the search bar to find specific products
- Filter products by category and price range
- Click on a product to view its details
- Add products to the cart from the product detail page
- View and manage your cart by clicking the cart icon

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
