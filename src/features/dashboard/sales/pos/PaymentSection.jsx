import React, { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PaymentSection = ({
  totalAmount,
  onSuspendSale,
  cart,
  selectedCustomer,
  paymentMethod,
  transactionId,
  clearCart,
}) => {
  const [cashAmount, setCashAmount] = useState(0);
  const [posAmount, setPosAmount] = useState(0);
  const [bankTransferAmount, setBankTransferAmount] = useState(0);
  const [change, setChange] = useState(0);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const totalPaid =
      Number(cashAmount) + Number(posAmount) + Number(bankTransferAmount);
    setChange(
      totalPaid > totalAmount ? (totalPaid - totalAmount).toFixed(2) : 0,
    );
  }, [cashAmount, posAmount, bankTransferAmount, totalAmount]);

  const paymentMethods = [
    { id: 'cash', label: 'Cash', amount: cashAmount, setAmount: setCashAmount },
    { id: 'pos', label: 'POS', amount: posAmount, setAmount: setPosAmount },
    {
      id: 'bankTransfer',
      label: 'Bank Transfer',
      amount: bankTransferAmount,
      setAmount: setBankTransferAmount,
      customer: customer,
      setCustomer: setCustomer,
    },
  ];

  const handlePaymentMethodChange = (method) => {
    paymentMethods.forEach(({ setAmount }) => setAmount(0)); // Reset all amounts
    method.setAmount(totalAmount); // Set the selected method's amount to total
  };

  const fetchTransactionId = async (completedInvoiceId) => {
    try {
      // Get storeId from localStorage
      const storeId = localStorage.getItem('storeId');

      if (!storeId) {
        throw new Error('Store ID is not found in localStorage.');
      }

      // Make the GET request to fetch the transaction data
      const response = await axios.get(`/${storeId}/transactions`);

      // Log the full response to inspect its structure
      console.log('Full API Response:', response.data);

      // Search for the transaction with the matching invoiceId
      const transaction = response.data.data.find(
        (txn) => txn.invoiceId === completedInvoiceId,
      );

      // If transaction is not found, throw an error
      if (!transaction) {
        throw new Error(
          `Transaction with invoiceId ${completedInvoiceId} not found.`,
        );
      }

      const transactionId = transaction._id;
      console.log('Transaction ID:', transactionId);
      return transactionId;
    } catch (error) {
      console.error('Error fetching transaction ID:', error.message);
      return null;
    }
  };
  const handleCompleteSaleAndPrintReceipt = async () => {
    try {
      const fetchedTransactionId =
        transactionId || (await fetchTransactionId());

      if (!fetchedTransactionId) {
        throw new Error('Transaction ID not found.');
      }

      const storeId = localStorage.getItem('storeId');

      const response = await axios.get(
        `/${storeId}/transactions/${fetchedTransactionId}/receipt`,
      );

      // Log the full response to check its structure
      console.log('API Response:', response.data);

      if (response.status === 200) {
        // Ensure that response.data has the expected structure
        if (!response.data.items) {
          throw new Error('No items found in the response data.');
        }

        const transactionData = {
          transactionId: fetchedTransactionId,
          date: new Date().toISOString(),
          items: response.data.items,
          totalAmount: response.data.totalAmount,
          paymentMethod: response.data.paymentMethod,
        };

        handlePrintReceipt(transactionData);
      } else {
        console.error(`Server Error: ${response.status}`, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // const handlePrintReceipt = async () => {
  //   if (!transactionId) {
  //     alert('No completed transaction to print a receipt for.');
  //     return;
  //   }

  //   try {
  //     const storeId = localStorage.getItem('storeId');
  //     const response = await axios.get(
  //       `/${storeId}/transactions/${transactionId}/receipt`, // Use TransactionId here
  //     );

  //     if (response.status === 200) {
  //       console.log('Receipt printed successfully:', response.data);
  //       alert('Receipt printed successfully!');
  //     } else {
  //       console.error('Error printing receipt:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error printing receipt:', error.message);
  //   }
  // };
  const handlePrintReceipt = async () => {
    if (!transactionId) {
      alert('No completed transaction to print a receipt for.');
      return;
    }

    try {
      const storeId = localStorage.getItem('storeId');
      const response = await axios.get(
        `/${storeId}/transactions/${transactionId}/receipt`,
        { responseType: 'text' },
      );

      if (response.status === 200 && response.data) {
        console.log('Receipt HTML fetched successfully');
        generatePDF(response.data);
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Error fetching receipt data:', error.message);
      alert('Failed to generate receipt. Please try again later.');
    }
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCompleteSaleAndPrint = async () => {
    setIsProcessing(true);
    try {
      // Step 1: Complete the sale
      const completedTransactionId = await completeSale();

      // Step 2: Generate and print the receipt
      if (completedTransactionId) {
        await generateAndPrintReceipt(completedTransactionId);
      }

      // Step 3: Clear the cart
      clearCart();

      alert('Sale completed successfully and receipt printed!');
    } catch (error) {
      console.error('Error in completing sale and printing:', error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const completeSale = async () => {
    const storeId = localStorage.getItem('storeId');
    const transactionData = {
      transactionItems: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      paymentMethod,
      status: 'completed',
      amount: totalAmount,
      customer: selectedCustomer ? selectedCustomer._id : undefined,
    };

    try {
      const response = await axios.post(
        `/${storeId}/transactions/`,
        transactionData,
      );
      if (response.data && response.data.data && response.data.data._id) {
        return response.data.data._id;
      } else {
        throw new Error('Invalid response from server when completing sale');
      }
    } catch (error) {
      console.error('Error completing sale:', error);
      throw new Error('Failed to complete sale. Please try again.');
    }
  };

  const generateAndPrintReceipt = async (completedTransactionId) => {
    const storeId = localStorage.getItem('storeId');
    try {
      const response = await axios.get(
        `/${storeId}/transactions/${completedTransactionId}/receipt`,
        { responseType: 'text' },
      );

      if (response.status === 200 && response.data) {
        console.log('Receipt HTML fetched successfully');
        await generatePDF(response.data, completedTransactionId);
      } else {
        throw new Error('Invalid response data when fetching receipt');
      }
    } catch (error) {
      console.error('Error fetching receipt:', error);
      throw new Error(
        'Failed to generate receipt. The sale was completed, but receipt printing failed.',
      );
    }
  };

  const generatePDF = (receiptHTML, completedTransactionId) => {
    return new Promise((resolve, reject) => {
      if (
        typeof receiptHTML !== 'string' ||
        !receiptHTML.trim().startsWith('<!DOCTYPE html>')
      ) {
        console.error('Invalid receipt HTML:', receiptHTML);
        reject(new Error('Invalid receipt data. Unable to generate PDF.'));
        return;
      }

      const element = document.createElement('div');
      element.innerHTML = receiptHTML;
      document.body.appendChild(element);

      html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');

          // Create PDF with 80mm x 80mm dimensions (converted to inches)
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: [3.15, 3.15], // 80mm x 80mm in inches
          });

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 0;

          pdf.addImage(
            imgData,
            'PNG',
            imgX,
            imgY,
            imgWidth * ratio,
            imgHeight * ratio,
          );
          pdf.save(`receipt_${completedTransactionId || 'unknown'}.pdf`);

          document.body.removeChild(element);
          resolve();
        })
        .catch(reject);
    });
  };

  return (
    <div className="payment-section pos-section">
      <div className="payment-text">
        <h4>Payment</h4>
        <div className="total">
          <h5>Total Amount:</h5>
          <p>₦{totalAmount.toFixed(2)}</p>
        </div>
      </div>
      <h5>Payment Method</h5>
      <div className="payment-methods">
        {paymentMethods.map(({ id, label, amount, setAmount }) => (
          <div key={id} className="payment-method">
            <div className="payment-option">
              <input
                type="radio"
                id={id}
                name="paymentMethod"
                checked={amount > 0}
                onChange={() =>
                  handlePaymentMethodChange({ id, label, amount, setAmount })
                }
              />
              <label htmlFor={id}>{label}</label>
            </div>
            <div className="amount">₦{amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="change-amount">
        <label>Change:</label>
        <span>₦{change.toFixed(2)}</span>
      </div>
      <div className="payment-actions">
        <button
          onClick={onSuspendSale}
          className="pay-button"
          disabled={isProcessing}
        >
          Suspend Sale
        </button>
        <button
          onClick={handleCompleteSaleAndPrint}
          className="pay-button"
          disabled={isProcessing || cart.length === 0}
        >
          {isProcessing ? 'Processing...' : 'Complete Sale & Print Receipt'}
        </button>
      </div>
    </div>
  );
};

export default PaymentSection;
