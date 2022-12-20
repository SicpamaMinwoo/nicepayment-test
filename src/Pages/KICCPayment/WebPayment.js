import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import './WebPayment.scss';

const WebPayment = () => {
    const headers = {
        'Content-type': 'application/json',
        'Charset': 'utf-8',
    };

    const navigate = useNavigate();

    const body = {
        mallId: process.env.REACT_APP_KICC_WEBPAY_MERCHANT_ID,
        payMethodTypeCode: '11',
        currency: '00',
        amount: '1000',
        clientTypeCode: '00',
        returnUrl: `${process.env.REACT_APP_PAYMENT_REDIRECT_URL}/kicc-webpay`,
        shopOrderNo: 'testItem1235',
        deviceTypeCode: 'mobile',
        langFlag: 'KOR',
        mallName: '식파마',
        orderInfo: {
            goodsTypeCode: '0',
            goodsName: 'item name',
        }
    }
    
    const callPopUp = async () => {
        const response = await axios.post(process.env.REACT_APP_KICC_WEBPAY_API, body, {headers});

        console.log(response);

        // window.open(response.data.authPageUrl);
        window.location.href = response.data.authPageUrl;
    }
    return (
        <>
            <Button className="kicc-webpay-button" onClick={() => callPopUp()}>KICC Web Pay</Button>
        </>
    );
};

export default WebPayment;
