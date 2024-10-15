import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios'; // Adjust the path as necessary

const ProductSelector = ({ onSelectProduct, cart = [] }) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const storeId = localUser?.store?._id;
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchProducts, setSearchProducts] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await axios.get(`/${storeId}/products/`);
        setProducts(response.data.data); // Adjust this according to your API response
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (storeId) {
      getProducts();
    }
  }, [storeId]);

  const handleSelectProduct = (product) => {
    if (!cart.some((item) => item._id === product._id)) {
      const newProduct = { ...product, quantity: 1 };
      onSelectProduct(newProduct);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProducts.toLowerCase()),
  );

  const renderUnit = (unit) => {
    if (typeof unit === 'object' && unit !== null) {
      return unit.name || unit.shortName || JSON.stringify(unit);
    }
    return unit;
  };

  return (
    <div className="product-selector">
      <div className="search-bar">
        <input
          type="search"
          placeholder="Search products"
          value={searchProducts}
          onChange={(e) => setSearchProducts(e.target.value)}
        />
      </div>
      {loadingProducts ? (
        <p>Loading products...</p>
      ) : (
        <ul className="products">
          {filteredProducts.map((product) => {
            const isInCart = cart.some((item) => item._id === product._id);
            return (
              <li
                key={product._id}
                onClick={() => !isInCart && handleSelectProduct(product)}
                className={`product ${isInCart ? 'selected' : ''}`}
                style={{
                  cursor: isInCart ? 'not-allowed' : 'pointer',
                  opacity: isInCart ? 0.5 : 1,
                }}
              >
                {product.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductSelector;
