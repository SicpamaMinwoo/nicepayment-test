import React from 'react';
import { Button } from 'react-bootstrap';
import './KakaoPayment.scss';
import axios from 'axios';

const KakaoPayment = () => {
    const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
        'Charset': 'euc-kr',
    };

    const body = {
        mall_id: process.env.REACT_APP_KICC_WEBPAY_MERCHANT_ID,
        mall_nm: 'sicpama',
        order_no: 'test123456',
        product_nm: 'test item',
        product_amt: '1000',
        return_url: `${process.env.REACT_APP_PAYMENT_REDIRECT_URL}/kicc-kakao`,
        charset: 'EUC-KR',
        usedcard_code: '',
        quota: '00',
        noinst_flag: '',
        noinst_term: '',
        app_scheme: '',
        window_type: 'iframe',
        service_call: '',
    };

    const callPopUp = async () => {
        const response = await axios.post(
            'https://testsp.easypay.co.kr/ep8/spay/kko/DirectKakaoPayReqAction.do',
            body,
            {headers});
    };

    const submitForm = () => {
        document['kicc-form'].submit();
    }

    return (
        <>
            <Button className="kicc-kakao-button" onClick={() => submitForm()}>KICC Kakao Pay</Button>
            <form name="kicc-form" method="post" action={"https://testsp.easypay.co.kr/ep8/spay/kko/DirectKakaoPayReqAction.do"} acceptCharset="euc-kr">
                <input type="hidden" name="mall_id" value={process.env.REACT_APP_KICC_WEBPAY_MERCHANT_ID}/>
                <input type="hidden" name="mall_nm" value="sicpama"/>
                <input type="hidden" name="order_no" value="test123456"/>
                <input type="hidden" name="product_nm" value="test item"/>
                <input type="hidden" name="product_amt" value={'1000'}/>
                <input type="hidden" name="return_url" value={`${process.env.REACT_APP_PAYMENT_REDIRECT_URL}/kicc-kakao`}/>
                <input type="hidden" name="charset" value="EUC-KR"/>
                <input type="hidden" name="usedcard_code" value=""/>
                <input type="hidden" name="quota" value="00"/>
                <input type="hidden" name="noinst_flag" value=""/>
                <input type="hidden" name="noinst_term" value=""/>
                <input type="hidden" name="app_scheme" value=""/>
                <input type="hidden" name="window_type" value="iframe"/>
                <input type="hidden" name="service_call" value={''}/>
            </form>
        </>
    )
};

export default KakaoPayment;
