import React, { useState } from 'react';
import '../../../../components/ui/table/table.scss'; // Ensure you have the correct styles
import { editIcon, deleteIcon } from '../../../../assets/images/icons';
import axios from '../../../../utils/axios';
import Modal from '../../../../components/ui/modal/modal';
import EditProductModal from '../edit-product/edit-product'; // Import the EditProductModal

const ProductTable = ({
  products,
  loadingProducts,
  storeId,
  onProductDeleted,
  onError,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditClick = (product) => {
    setCurrentProduct(product); // Set the current product for editing
    setModalOpen(true); // Open the modal
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?',
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `/${storeId}/products/${productId}`,
        );
        if (response.status === 200) {
          onProductDeleted(productId);
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        onError('An error occurred while deleting the product.');
      }
    }
  };

  const formatPrice = (price) => {
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return 'N/A';
    }
    const parts = numericPrice.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `₦${parts.join('.')}`;
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentProduct(null); // Reset current product when modal closes
  };

  const handleUpdateProduct = (updatedProduct) => {
    console.log('Product updated:', updatedProduct);
    // You can handle updating the products list here if needed
    setModalOpen(false);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product?.name || 'N/A'}</td>
              <td>{product?.category?.name || 'Uncategorized'}</td>
              <td>{formatPrice(product.sellingPrice)}</td>
              <td>{product?.store?.name || 'Unknown Store'}</td>
              <td>
                <div className="actions">
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEditClick(product)}
                  >
                    <img src={editIcon} alt="Edit" />
                  </div>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <img src={deleteIcon} alt="Delete" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loadingProducts && <p className="loading">Loading...</p>}
      {products.length === 0 && !loadingProducts && (
        <p className="loading">Product is not available</p>
      )}
    </>
  );
};

export default ProductTable;
