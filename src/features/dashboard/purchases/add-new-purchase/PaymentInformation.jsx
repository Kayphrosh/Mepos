import React from "react";
import Input from "../../../../components/ui/input/Input";
import SelectOption from "../../../../components/ui/select/select";
import Button from "../../../../components/ui/button/Button";

const PaymentInformation = ({
  register,
  errors,
  setActiveTab,
  savingProduct,
  watch,
  setValue,
}) => {
  const paymentAccountOptions = [
    { name: "Moniepoint", _id: "1" },
    { name: "GTB", _id: "2" },
    { name: "Access bank", _id: "3" },
  ];

  const paymentMethodOptions = [
    { name: "Cash", _id: "1" },
    { name: "Cheque", _id: "2" },
    { name: "Bank transfer", _id: "3" },
  ];
  return (
    <div className="payment-info">
      <div>
        <Input
          label="Purchase Amount"
          name="purchaseAmount"
          required={true}
          type="number"
          placeholder="0.00"
          register={register("purchaseAmount", {
            required: "Purchase Amount is required",
          })}
          error={errors.purchaseAmount}
        />
      </div>
      <div>
        <SelectOption
          label="Payment Account"
          required={true}
          placeholder="Select Account"
          value={watch("paymentAccount")}
          name="paymentAccount"
          options={paymentAccountOptions}
          setValue={setValue}
          error={errors.paymentAccount}
          errorMessage="Select a Payment Account"
          register={register}
        />
      </div>
      <div>
        <Input
          label="Payment Date"
          name="paymentDate"
          required={true}
          type="date"
          placeholder="DD/MM/YYYY"
          register={register("paymentDate", {
            required: "Purchase Amount is required",
          })}
          error={errors.paymentDate}
        />
      </div>
      <div>
        <SelectOption
          label="Payment Method"
          required={true}
          placeholder="Select payment method"
          value={watch("paymentMethod")}
          name="paymentMethod"
          options={paymentMethodOptions}
          setValue={setValue}
          error={errors.paymentMethod}
          errorMessage="Select a Payment Method"
          register={register}
        />
      </div>
      <div>
        <Input
          label="Note"
          name="note"
          type="text"
          maxLength={100}
          placeholder="Less than 100 words"
          register={register("note")}
        />
      </div>
      <div className="cta">
        <button className="cancel" onClick={() => setActiveTab(2)}>
          Cancel
        </button>
        <Button
          type="submit"
          //   onClick={() => setActiveTab(2)}
          className="submit-payment-info"
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default PaymentInformation;
