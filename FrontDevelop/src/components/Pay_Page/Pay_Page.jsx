import React, { useState, useCallback } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button, Modal, InputNumber, Input} from 'antd';
import { ApplePayButton } from "react-apple-pay-button";


export function Pay_Page(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const initialOptions = {
    clientId: "test",
    currency: "AUD",
    intent: "capture",
};
  const Order_Number = '123456'
  const Order_Address = 'Porsche Center Sydney South'
  const [hours, setHours] = useState(1); 
  const [hourlyRate, setHourlyRate] = useState(3); 
  const totalCost = hours * hourlyRate;
  const onRequestApplePay = useCallback(() => /* TODO */ []);
  return (
    <>

      <Button type="primary" onClick={showModal}>
        Pay
      </Button>
      <Modal width={500} title = {Order_Address} open={isModalOpen} okText={'Process'} onOk={handleOk} onCancel={handleCancel}>
        <p style={{marginLeft:"10px"}}>Order No.{Order_Number}</p>
        <InputNumber min={1} max={20} addonAfter="Hours" value={hours} 
        onChange={(value) => setHours(value)}
        style={{marginLeft:"20px",ontSize: "22px", fontWeight: "400", width:"160px", display:'inline-block'}}/>
        <InputNumber min={1} max={20} addonAfter="A$/Hour"
        onChange={(value) => setHourlyRate(value)} 
        value={hourlyRate} style={{marginLeft:"80px", ontSize: "22px", fontWeight: "400", width:"160px", display:'inline-block'}}/>
        <p style={{marginLeft:'20px'}}>Pay by card</p>
        
        <Input placeholder='Card number' style={{backgroundColor:'#e4e4e4',marginLeft:'20px', width: '88%' }} />
        <Input placeholder='Name on card' style={{marginTop:"10px", backgroundColor:'#e4e4e4',marginLeft:'20px', width: '88%' }} />
        <Input placeholder='CVV' style={{marginTop:"10px",backgroundColor:'#e4e4e4',marginLeft:'20px', width: '40%' }} />
        <Input placeholder='Expiry                    mm/yy' 
        style={{marginTop:"10px",backgroundColor:'#e4e4e4',marginLeft:'8%', width: '40%' }} />
        <p style={{marginLeft:'20px'}}>OR</p>
        <ApplePayButton onClick={onRequestApplePay} theme="light">
      {"Subscribe with"}
    </ApplePayButton>
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons />
        </PayPalScriptProvider>
        
        <p style={{textAlign:"right", fontSize:'20px', fontWeight:"600"}}>Total Cost: {totalCost} A$</p>
      </Modal>
      
    </>
  );
};

export default Pay_Page;