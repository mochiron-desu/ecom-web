import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';

const GET_PRODUCTS = gql`
  query FilterProducts($category: String, $minPrice: Float, $maxPrice: Float) {
    filterProducts(category: $category, minPrice: $minPrice, maxPrice: $maxPrice) {
      id
      name
      price
      category
    }
  }
`;

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      category: category || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredProducts = data.filterProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.productList}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.categorySelect}
        >
          <option value="">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Meat">Meat</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Pantry">Pantry</option>
          <option value="Seafood">Seafood</option>
          <option value="Grains">Grains</option>
          <option value="Snacks">Snacks</option>
          <option value="Dairy Alternatives">Dairy Alternatives</option>
          <option value="Beverages">Beverages</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className={styles.priceInput}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={styles.priceInput}
        />
      </div>
      <div className={styles.grid}>
        {filteredProducts.map(({ id, name, price, category }) => (
          <Link to={`/product/${id}`} key={id} className={styles.product}>
            <h3>{name}</h3>
            <p>${price.toFixed(2)}</p>
            <span className={styles.category}>{category}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;