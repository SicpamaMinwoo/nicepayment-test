import React from 'react';
import './SamsungPayment.scss';
import { Button } from 'react-bootstrap';

const SamsungPayment = () => {

    const submitForm = () => {
        document['kicc-samsung-form'].submit();
    };

    return (
        <>
            <Button className="kicc-samsung-button" onClick={() => submitForm()}>KICC Samsung Pay</Button>
            <form name="kicc-samsung-form" method="post" action={"https://testsp.easypay.co.kr/ep8/spay/smp/v2/DirectSmpCertReqAction.do"} acceptCharset="euc-kr">
                <input type="hidden" name="sp_mall_id" value={process.env.REACT_APP_KICC_WEBPAY_MERCHANT_ID}/>
                <input type="hidden" name="sp_order_no" value="samsung1234"/>
                <input type="hidden" name="sp_return_url" value={`${process.env.REACT_APP_PAYMENT_REDIRECT_URL}/kicc-samsung`}/>
                <input type="hidden" name="sp_charset" value={'EUC-KR'}/>
                <input type="hidden" name="sp_smp_version" value="2"/>
                <input type="hidden" name="order_amount" value="1000"/>
                <input type="hidden" name="order_product" value="samsung test item"/>
            </form>
        </>
    )
};

export default SamsungPayment;
