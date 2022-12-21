import React from 'react';
import { Button } from 'react-bootstrap';
import './NaverPayment.scss';

const NaverPayment = () => {

    const submitForm = () => {
        document['kicc-naver-form'].submit();
    }

    return (
        <>
            <Button className="kicc-naver-button" onClick={() => submitForm()}>KICC Naver Pay</Button>
            <form name="kicc-naver-form" method="post" action={"https://testsp.easypay.co.kr/ep8/spay/npay/DirectNaverPayReqAction.do"} acceptCharset="euc-kr">
                <input type="hidden" name="mall_id" value={process.env.REACT_APP_KICC_WEBPAY_MERCHANT_ID}/>
                <input type="hidden" name="mall_nm" value="sicpama"/>
                <input type="hidden" name="pay_type" value="11"/>
                <input type="hidden" name="order_no" value="test123457"/>
                <input type="hidden" name="product_nm" value="test item"/>
                <input type="hidden" name="product_amt" value={'1000'}/>
                <input type="hidden" name="return_url" value={`${process.env.REACT_APP_PAYMENT_REDIRECT_URL}/kicc-naver`}/>
                <input type="hidden" name="charset" value="EUC-KR"/>
                <input type="hidden" name="usedcard_code" value=""/>
                <input type="hidden" name="quota" value="00"/>
                <input type="hidden" name="set_point_card_yn" value=""/>
                <input type="hidden" name="noinst_flag" value=""/>
                <input type="hidden" name="noinst_term" value=""/>
                <input type="hidden" name="app_scheme" value=""/>
                <input type="hidden" name="window_type" value="iframe"/>
            </form>
        </>
    )
};

export default NaverPayment;
