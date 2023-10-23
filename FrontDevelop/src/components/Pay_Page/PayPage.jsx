import React, { useState, useCallback } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button, Modal, InputNumber, Input } from "antd";

export function PayPage(props) {
  const { hours, rate } = props;
  const totalCost = hours * rate;
  const initialOptions = {
    clientId: "test",
    currency: "AUD",
    intent: "capture",
  };

  return (
    <>
      <InputNumber
        readOnly
        min={1}
        max={20}
        addonAfter="Hours"
        value={hours}
        style={{
          marginLeft: "20px",
          ontSize: "22px",
          fontWeight: "400",
          width: "160px",
          display: "inline-block",
        }}
      />
      <InputNumber
        min={1}
        max={20}
        addonAfter="AUD/Hour"
        value={rate}
        readOnly
        style={{
          marginLeft: "80px",
          ontSize: "22px",
          fontWeight: "400",
          width: "160px",
          display: "inline-block",
        }}
      />
      <p style={{ textAlign: "right", fontSize: "20px", fontWeight: "600" }}>
        Total Cost: AUD {totalCost}
      </p>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>Pay by card</p>

      <Input
        placeholder="Card number"
        style={{
          backgroundColor: "#e4e4e4",
          marginLeft: "20px",
          width: "88%",
        }}
      />
      <Input
        placeholder="Name on card"
        style={{
          marginTop: "10px",
          backgroundColor: "#e4e4e4",
          marginLeft: "20px",
          width: "88%",
        }}
      />
      <Input
        placeholder="CVV"
        style={{
          marginTop: "10px",
          backgroundColor: "#e4e4e4",
          marginLeft: "20px",
          width: "40%",
        }}
      />
      <Input
        placeholder="Expiry                    mm/yy"
        style={{
          marginTop: "10px",
          backgroundColor: "#e4e4e4",
          marginLeft: "8%",
          width: "40%",
        }}
      />
      <p style={{ textAlign: "center", fontWeight: "bold" }}>OR</p>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons />
      </PayPalScriptProvider>
    </>
  );
}

export default PayPage;
