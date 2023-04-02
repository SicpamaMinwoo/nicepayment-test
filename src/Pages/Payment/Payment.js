import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import './Payment.scss';
import axios from 'axios';
import { useNavigate } from 'react-router';

const RETURN_URL = "https://payment-be-project.herokuapp.com/payments";
// const RETURN_URL = "http://localhost:4001/payments?key=test";
const DIRECT_PAYMENT_TYPE = "Naver Pay";

const Payment = () => {
  const navigate = useNavigate();
    const today = new Date();
    // Kakao
    // const mid = "nickakao1m";
    // const merchantKey = "A2SY4ztPs6LPymgFl/5bbsLuINyvgKq5eOdDSHb31gdO4dfGr3O6hBxvRp9oXdat45VninNUySc7E/5UT01vKw==";
    // Naver
    // const mid = "nicnaver0m";
    // const merchantKey = "kNuUIpYvHPGcTTlmRsFddsqp6P9JoTcEcoRB1pindAwCZ0oySNuCQX5Zv483XTU5UuRiy/VYZ9BXw1BRvEUYMg==";
    // Auth
    const mid = "nictest04m";
    const merchantKey = 'b+zhZ4yOZ7FsH8pm5lhDfHZEb79tIwnjsdA0FBXh86yLc6BJeFVrZFXhAoJ3gEWgrWwN+lJMV0W4hvDdbe4Sjw==';

    let callbackUrl = new URL('https://moonlit-malasada-b6827e.netlify.app/?key=test');
    let params = new URLSearchParams(callbackUrl.search);

    params.append('countryCode', 'kr');
    params.append('orderId', '1');
    console.log(callbackUrl);
  
    useEffect(() => {
      // const script = document.createElement("script");
      // script.src = "https://web.nicepay.co.kr/v3/webstd/js/nicepay-3.0.js";
      // script.async = true;
  
      // document.body.appendChild(script);
  
      // return () => {
      //   document.body.removeChild(script);
      // }
      navigate('?key=test');
    }, []);
  
    const nicepayStart = () => {
      if(checkPlatform(window.navigator.userAgent) === "mobile"){
        document.payForm.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";
        document.payForm.acceptCharset="euc-kr";
        document.payForm.submit();
      }
      else{
        console.log("Sorry, we don't support PC environment.");
        window.goPay(document.payForm);
      }
    };

    const clickEvent = () => {
      const requestData = {
        PayMethod: 'CARD',
        GoodsName: '테스트제품',
        Amt: '1000',
        MID: mid,
        Moid: 'mnoid1234567890',
        BuyerName: 'Minwoo',
        BuyerEmail: 'test@example.com',
        BuyerTel: '01011112222',
        ReturnURL: RETURN_URL,
        NpLang: 'KO',
        GoodsCl: '1',
        TransType: '0',
        CharSet: 'utf-8',
        EdiDate: getFormatDate(today),
        SignData: getSignData(`${getFormatDate(today)}${mid}${1000}${merchantKey}`).toString(),
        DirectShowOpt: 'CARD',
        DirectEasyPay: 'E020',
        EasyPayMethod: 'E020=CARD'
      }
      let childElements = [];

      for (const property in requestData) {
          childElements.push(React.createElement('input', {key: property, type: 'hidden', name: property, value: requestData.property}));
      }
      
      const form = React.createElement('form', {name: 'payForm', action: "https://web.nicepay.co.kr/v3/v3Payment.jsp", acceptCharset: "euc-kr"}, childElements);
      ReactDOM.createRoot(document.getElementById('payment-div')).render(form);
      console.log(document.payForm);
      document.payForm.submit();
    }

    const testPayment = async () => {
      const options = {
        baseURL: 'https://web.nicepay.co.kr',
        url: '/v3/v3Payment.jsp',
        method: 'post',
        headers: {
            // 'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': 'https://localhost:4000',
            'Access-Control-Allow-Credentials': 'true',
        },
        params: {
          PayMethod: 'CARD',
          GoodsName: '테스트제품',
          Amt: '1000',
          MID: mid,
          Moid: 'mnoid1234567890',
          BuyerName: 'Minwoo',
          BuyerEmail: 'test@example.com',
          BuyerTel: '01011112222',
          ReturnURL: RETURN_URL,
          NpLang: 'KO',
          GoodsCl: '1',
          TransType: '0',
          CharSet: 'utf-8',
          EdiDate: getFormatDate(today),
          SignData: getSignData(`${getFormatDate(today)}${mid}${1000}${merchantKey}`).toString(),
          DirectShowOpt: 'CARD',
          DirectEasyPay: 'E020',
          EasyPayMethod: 'E020=CARD'
        },
      };
      const response = await axios(options);
      console.log(response);
    }

    const fetchForm = () => {
      const form = new FormData();
      form.append('PayMethod', 'CARD');
      form.append('GoodsName', '테스트제품');
      form.append('Amt', '1000');
      form.append('MID', mid);
      form.append('Moid', 'mnoid1234567890');
      form.append('BuyerName', 'Minwoo');
      form.append('BuyerEmail', 'test@example.com');
      form.append('BuyerTel', '01011112222');
      form.append('ReturnURL', RETURN_URL);
      form.append('NpLang', 'KO');
      form.append('CharSet', 'utf-8');
      form.append('GoodsCl', '1');
      form.append('TransType', '0');
      form.append('EdiDate', getFormatDate(today));
      form.append('SignData', getSignData(`${getFormatDate(today)}${mid}${1000}${merchantKey}`).toString());
      form.append('DirectShowOpt', 'CARD');
      form.append('DirectEasyPay', 'E020');
      form.append('EasyPayMethod', 'E020=CARD');

      fetch('https://web.nicepay.co.kr/v3/v3Payment.jsp', {
        method: 'post',
        body: form
      });

      // const request = new XMLHttpRequest();
      // request.open('POST', 'https://web.nicepay.co.kr/v3/v3Payment.jsp');
      // request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      // request.send(form);
    }
  
    // isMobile
    const checkPlatform = (ua) => {
      if(ua === undefined) {
        ua = window.navigator.userAgent;
      }
      
      ua = ua.toLowerCase();
      var platform = {};
      var matched = {};
      var userPlatform = "pc";
      var platform_match = /(ipad)/.exec(ua) || /(ipod)/.exec(ua) 
        || /(windows phone)/.exec(ua) || /(iphone)/.exec(ua) 
        || /(kindle)/.exec(ua) || /(silk)/.exec(ua) || /(android)/.exec(ua) 
        || /(win)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua)
        || /(cros)/.exec(ua) || /(playbook)/.exec(ua)
        || /(bb)/.exec(ua) || /(blackberry)/.exec(ua)
        || [];
      
      matched.platform = platform_match[0] || "";
      
      if(matched.platform) {
        platform[matched.platform] = true;
      }
      
      if(platform.android || platform.bb || platform.blackberry
          || platform.ipad || platform.iphone 
          || platform.ipod || platform.kindle 
          || platform.playbook || platform.silk
          || platform["windows phone"]) {
        userPlatform = "mobile";
      }
      
      if(platform.cros || platform.mac || platform.linux || platform.win) {
        userPlatform = "pc";
      }
      
      return userPlatform;
    };
  
    const SHA256 = (s) => {
  
      var chrsz = 8;
      var hexcase = 0;
  
      function safe_add(x, y) {
          var lsw = (x & 0xFFFF) + (y & 0xFFFF);
          var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return (msw << 16) | (lsw & 0xFFFF);
      }
  
      function S(X, n) {
          return (X >>> n) | (X << (32 - n));
      }
  
      function R(X, n) {
          return (X >>> n);
      }
  
      function Ch(x, y, z) {
          return ((x & y) ^ ((~x) & z));
      }
  
      function Maj(x, y, z) {
          return ((x & y) ^ (x & z) ^ (y & z));
      }
  
      function Sigma0256(x) {
          return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
      }
  
      function Sigma1256(x) {
          return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
      }
  
      function Gamma0256(x) {
          return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
      }
  
      function Gamma1256(x) {
          return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
      }
  
      function core_sha256(m, l) {
  
          var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
              0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
              0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
              0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
              0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
              0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
              0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
              0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
              0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
              0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
              0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
  
          var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB,
              0x5BE0CD19);
  
          var W = new Array(64);
          var a, b, c, d, e, f, g, h, i, j;
          var T1, T2;
  
          m[l >> 5] |= 0x80 << (24 - l % 32);
          m[((l + 64 >> 9) << 4) + 15] = l;
  
          for (var i = 0; i < m.length; i += 16) {
              a = HASH[0];
              b = HASH[1];
              c = HASH[2];
              d = HASH[3];
              e = HASH[4];
              f = HASH[5];
              g = HASH[6];
              h = HASH[7];
  
              for (var j = 0; j < 64; j++) {
                  if (j < 16) W[j] = m[j + i];
                  else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j -
                  16]);
  
                  T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                  T2 = safe_add(Sigma0256(a), Maj(a, b, c));
  
                  h = g;
                  g = f;
                  f = e;
                  e = safe_add(d, T1);
                  d = c;
                  c = b;
                  b = a;
                  a = safe_add(T1, T2);
              }
  
              HASH[0] = safe_add(a, HASH[0]);
              HASH[1] = safe_add(b, HASH[1]);
              HASH[2] = safe_add(c, HASH[2]);
              HASH[3] = safe_add(d, HASH[3]);
              HASH[4] = safe_add(e, HASH[4]);
              HASH[5] = safe_add(f, HASH[5]);
              HASH[6] = safe_add(g, HASH[6]);
              HASH[7] = safe_add(h, HASH[7]);
          }
          return HASH;
      }
  
      function str2binb(str) {
          var bin = Array();
          var mask = (1 << chrsz) - 1;
          for (var i = 0; i < str.length * chrsz; i += chrsz) {
              bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
          }
          return bin;
      }
  
      function Utf8Encode(string) {
          string = string.replace(/\r\n/g, "\n");
          var utftext = "";
  
          for (var n = 0; n < string.length; n++) {
  
              var c = string.charCodeAt(n);
  
              if (c < 128) {
                  utftext += String.fromCharCode(c);
              } else if ((c > 127) && (c < 2048)) {
                  utftext += String.fromCharCode((c >> 6) | 192);
                  utftext += String.fromCharCode((c & 63) | 128);
              } else {
                  utftext += String.fromCharCode((c >> 12) | 224);
                  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                  utftext += String.fromCharCode((c & 63) | 128);
              }
  
          }
  
          return utftext;
      }
  
      function binb2hex(binarray) {
          var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
          var str = "";
          for (var i = 0; i < binarray.length * 4; i++) {
              str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                  hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
          }
          return str;
      }
  
      s = Utf8Encode(s);
      return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
  
    }
  
    const getSignData = (str) => {
      var encrypted = SHA256(str);
      return encrypted;
    }
  
    const getFormatDate = (date) => {
      const year = date.getFullYear();
      const month = Number(1 + date.getMonth()) >= 10 ? 1 + date.getMonth() : `0${String(1 + date.getMonth())}`;
      const day = Number(date.getDate()) >= 10 ? date.getDate() : `0${String(date.getDate())}`;
      const hour = Number(date.getHours()) >= 10 ? date.getHours() : `0${String(date.getHours())}`;
      const minute = Number(date.getMinutes()) >= 10 ? date.getMinutes() : `0${String(date.getMinutes())}`;
      const second = Number(date.getSeconds()) >= 10 ? date.getSeconds() : `0${String(date.getSeconds())}`;
      return `${year}${month}${day}${hour}${minute}${second}`;
  };

  const findPrinter = () => {
    navigate('/receipt-printers');
  }
  
    return (
      <div className="Payment" id="payment-div">
        <header className="Payment-header">
          {/* <script src="https://web.nicepay.co.kr/v3/webstd/js/nicepay-3.0.js" type="text/javascript"></script> */}
          {/* <Button className="payment-button" onClick={() => nicepayStart()}>{DIRECT_PAYMENT_TYPE}</Button> */}
          <Button className="payment-button" onClick={() => nicepayStart()}>{DIRECT_PAYMENT_TYPE}</Button>
          <Button onClick={() => findPrinter()}>Receipt Print</Button>
        </header>
        {console.log(window)}
        {console.log(checkPlatform(window.navigator.userAgent))}
        {console.log(getFormatDate(today))}
        {console.log(getSignData(`${today.toString("yyyyMMddHHiiss")}${mid}${1000}${merchantKey}`).toString())}
        <form name="payForm" method="post" action={"https://web.nicepay.co.kr/v3/v3Payment.jsp"} acceptCharset="euc-kr">
          <input type="hidden" name="PayMethod" value="CARD"/>
          <input type="hidden" name="GoodsName" value="테스트제품"/>
          <input type="hidden" name="Amt" value="1000"/>
          <input type="hidden" name="MID" value={mid}/>
          <input type="hidden" name="Moid" value="mnoid1234567890"/>
          <input type="hidden" name="BuyerName" value="Minwoo Lee"/>
          <input type="hidden" name="BuyerEmail" value="test@example.com"/>
          <input type="hidden" name="BuyerTel" value="01011112222"/>
          {/* <input type="hidden" name="ReturnURL" value="http://localhost:4001/v1/payments"/> */}
          <input type="hidden" name="ReturnURL" value={RETURN_URL}/>
          <input type="hidden" name="WapUrl" value={callbackUrl}/>
          <input type="hidden" name="NpLang" value="KO"/>
          <input type="hidden" name="GoodsCl" value="1"/>
          <input type="hidden" name="TransType" value="0"/>
          <input type="hidden" name="CharSet" value="utf-8"/>
          <input type="hidden" name="EdiDate" value={getFormatDate(today)}/>
          <input type="hidden" name="SignData" value={getSignData(`${getFormatDate(today)}${mid}${1000}${merchantKey}`).toString()}/>
          <input type="hidden" name="DirectShowOpt" value="CARD"/>
          {/* <input type="hidden" name="NicepayReserved" value="DirectKakao=Y"/> */}
          {/* <input type="hidden" name="DirectEasyPay" value="E020"/>
          <input type="hidden" name="EasyPayMethod" value="E020=CARD"/> */}
        </form>
      </div>
    );
};

export default Payment;