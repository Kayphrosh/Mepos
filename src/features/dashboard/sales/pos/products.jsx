import axios from "../../../../utils/axios";

export const fetchProducts = async () => {
const storeId = localStorage.getItem('storeId');
if (!storeId) {
  console.error('storeId is not available in localStorage');
  return [];
}
try {
  const response = await axios.get(
    `http://localhost:3000/${storeId}/products/`,
  );
  return response.data.map((product) => ({
    id: product._id,
    name: product.name,
    price: product.sellingPrice,
    unit: product.unit,
  }));
} catch (error) {
  console.error('Error fetching products:', error.message); // Log the error message
  if (error.response) {
    console.error('Response data:', error.response.data); // Response from server
    console.error('Response status:', error.response.status); // Status code
  } else if (error.request) {
    console.error('No response received:', error.request); // No response from server
  } else {
    console.error('Error setting up request:', error.message); // Other errors
  }
  return [];
}
};
