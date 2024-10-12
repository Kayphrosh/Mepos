import React, { useState, useEffect, useRef } from 'react';
// import './_ProductSelector.scss';

const ProductSelector = ({ products, onAddToCart }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search input
  const dropdownRef = useRef(null);

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
    const selectedProduct = products.find((product) => product.id === productId);

    if (selectedProduct) {
      onAddToCart({
        ...selectedProduct,
        quantity,
      });
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);

    // Update the cart immediately when quantity changes
    if (selectedProductId) {
      const selectedProduct = products.find((product) => product.id === selectedProductId);
      if (selectedProduct) {
        onAddToCart({
          ...selectedProduct,
          quantity: newQuantity,
        });
      }
    }
  };

  useEffect(() => {
    // Automatically open the dropdown when the page loads
    setIsDropdownOpen(true);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Filter the products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-selector pos-section" ref={dropdownRef}>
      <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
        <div className='dropdown-flex'>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
          />
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            All {/* Always display 'All' as button text */}
          </button>
        </div>

        {isDropdownOpen && (
          <ul className="dropdown-menu">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <li key={product.id} onClick={() => handleProductSelect(product.id)}>
                  {product.name}
                </li>
              ))
            ) : (
              <li>No products found</li> // Show this when no matching products are found
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductSelector;
