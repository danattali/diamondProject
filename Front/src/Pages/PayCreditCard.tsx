import React from "react";

interface PaymentFormProps {
  onSubmitOrder: (orderData: any) => void;
}

const PayCreditCard: React.FC<PaymentFormProps> = ({ onSubmitOrder }) => {
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const orderData = {}; // Collect your form data here
    onSubmitOrder(orderData); // Call the function with orderData
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* Your form fields here */}
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PayCreditCard;
