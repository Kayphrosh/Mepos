// EditProductModal.js
import React, { useState } from 'react';
import axios from '../../../../utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../roles/roles.scss';
import Input from '../../../../components/ui/input/Input';
const EditProductModal = ({ productData, onClose, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState(productData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const storeId = localStorage.getItem('storeId');
    try {
      const response = await axios.patch(
        `/${storeId}/products/${productData._id}`,
        updatedProduct,
      );

      onUpdate(response.data); // Notify parent component of the update
      toast.success('Product updated successfully!');

      // Optionally, close the modal after a short delay
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      toast.error('Error updating product.');
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="modal-title">
        <h3>Edit Product</h3>
        <button type="button" className="close-modal-btn" onClick={onClose}>
          X
        </button>
      </div>

      <form onSubmit={handleUpdateProduct}>
        <Input
          type="number"
          label="Selling Price"
          name="sellingPrice"
          value={updatedProduct.sellingPrice}
          onChange={handleInputChange}
          required
        />

        <Input
          type="text"
          label="sku"
          name="sku"
          value={updatedProduct.sku}
          onChange={handleInputChange}
          required
        />

        <Input
          type="text"
          label="Supplier Name"
          name="supplierName"
          value={updatedProduct.supplierName}
          onChange={handleInputChange}
          required
        />

        <button id="submit" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProductModal;
