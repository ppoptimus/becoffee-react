import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Orders() {
    let [coffeeCount, setCoffeeCount] = useState(0);
    let [cocoCount, setCocoCount] = useState(0);
    let [totalCoffee, setTotalCoffee] = useState(0);
    let [totalCoco, setTotalCoco] = useState(0);
    let [netPrice, setNetPrice] = useState(0);

    let [pCoffee, setpCoffee] = useState('');
    let [pCoco, setpCoco] = useState('');

    let [customerName, setCustomerName] = useState('');
    let [customerPhone, setCustomerPhone] = useState('');
    let [customerAddress, setCustomerAddress] = useState('');
    let [customerRemark, setCustomerRemark] = useState('');

    let [isShowDetail, setIsShowDetail] = useState(false);
    let [isValid, setIsValid] = useState('*');

    const onCoffeeChange = (e) => {
      setCoffeeCount(e.target.value);
    };

    const onCocoChange = (e) => {
      setCocoCount(e.target.value);
    };

    const onNameChange = (e) => {
      setCustomerName(e.target.value);
    };
    const onPhoneChange = (e) => {
      setCustomerPhone(e.target.value);
    };
    const onAddressChange = (e) => {
      setCustomerAddress(e.target.value);
    };
    const onRemarkChange = (e) => {
      setCustomerRemark(e.target.value);
    };

    const confirming = () => {
      setpCoffee(coffeeCount > 0 ? `กาแฟ B Easy Coffee : ${coffeeCount} ชิ้น = ${totalCoffee}` : '');
      setpCoco(cocoCount > 0 ? `โกโก้ B Easy Cocoa : ${cocoCount} ชิ้น = ${totalCoco}` : '');
    };
    useEffect(() => {
      setTotalCoffee(250 * coffeeCount);
      setTotalCoco(290 * cocoCount);
      setNetPrice(totalCoffee + totalCoco);
      setIsShowDetail(netPrice > 0 ? true : false);
      setIsValid(customerName && customerName && customerAddress !== '' ? '' : '*');
    },[coffeeCount, cocoCount, totalCoffee, totalCoco, netPrice, customerName, customerAddress]);

    const postOrders = () => {
      const today = new Date();
      const orderId =
        today.getUTCFullYear() + '' + (today.getUTCMonth() + 1) + '' + today.getUTCDate() + '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds() + '' + today.getMilliseconds();

      const obj = {
        เลขที่คำสั่งซื้อ: orderId,
        จำนวนกาแฟ: coffeeCount,
        จำนวนโกโก้: cocoCount,
        ชื่อลูกค้า: customerName,
        เบอร์โทร: customerPhone,
        ที่อยู่: customerAddress,
        หมายเหตุ: customerRemark,
        วันที่: today.toLocaleString('en-GB'),
      };

      axios
        .post('https://sheet.best/api/sheets/aac31169-7e2d-4830-aa19-2129ce0398f8', obj, {
          headers: {
            'X-Api-Key': 'yTybP!CMopZ-tzEKR@4NnfywGvnazlscqW52ZD0DVnIySwT-Ptx3Kw2DCEI@pwPQ',
          },
        })
        .then((res) => {
          console.log(res);
        });
    };
  return (
    <div>
      <style jsx>
        {`
          .center {
            text-align: -webkit-center;
          }
          .accordion-button:not(.collapsed) {
            background-color: #083440;
          }
        `}
      </style>
      <table className='table table-hover text-center'>
        <thead>
          <tr style={{ fontSize: '2.2vw' }}>
            <th className='col-4'>สินค้า</th>
            <th className='col-2'>ราคาต่อชิ้น</th>
            <th className='col-3'>จำนวนสินค้า</th>
            <th className='col-3'>ราคารวม</th>
          </tr>
        </thead>
        <tbody className='align-middle'>
          <tr className='table-dark center'>
            <td className='col-4'>
              <img src='/img/coffee1.jpg' className='img-fluid' width={300} alt='easy coffee'></img>
            </td>
            <td className='col-2'>250.00</td>
            <td className='col-3'>
              <input id='coffeequantity' type='number' className='form-control text-end fs-5' placeholder='0' onChange={onCoffeeChange} value={coffeeCount}></input>
            </td>
            <td className='col-3'>
              <label id='coffeeprice' className='text-success fs-5 fw-bold'>
                {formatting(totalCoffee)}
              </label>
            </td>
          </tr>

          <tr className='table-dark center'>
            <td className='col-4'>
              <img src='/img/coco1.jpg' className='img-fluid' width={300} alt='easy coffee'></img>
            </td>
            <td className='col-2'>290.00</td>
            <td className='col-3'>
              <input id='cocoquantity' type='number' className='form-control text-end fs-5' placeholder='0' onChange={onCocoChange} value={cocoCount}></input>
            </td>
            <td className='col-3'>
              <label id='coffeeprice' className='text-success fs-5 fw-bold'>
                {formatting(totalCoco)}
              </label>
            </td>
          </tr>
          <tr className='table-success fs-lg-4 fs-sm-5 fw-bold'>
            <td></td>

            <td colSpan='2'>ราคาสุทธิ</td>
            <td>{formatting(netPrice)}</td>
          </tr>
        </tbody>
      </table>

      <div className='accordion' id='accordionExample'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingOne'>
            <button className='accordion-button collapsed fw-bold' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='false' aria-controls='collapseOne'>
              {isValid} กรอกที่อยู่ในการจัดส่ง
            </button>
          </h2>
          <div id='collapseOne' className='accordion-collapse collapse' aria-labelledby='headingOne' data-bs-parent='#accordionExample' style={{}}>
            <div className='form-group mt-1'>
              <small className='form-text text-muted'>ช่องทางการติดต่อ</small>
              <input type='text' maxLength='100' className='form-control' placeholder='ชื่อ - นามสกุล' onChange={onNameChange} value={customerName} />
              <input type='tel' maxLength='10' required className='form-control' placeholder='หมายเลขโทรศัพท์' onChange={onPhoneChange} value={customerPhone} />

              <br />
              <small className='form-text text-muted'>ที่อยู่</small>
              <textarea type='text' maxLength='255' className='form-control' placeholder='ที่อยู่จัดส่ง' row='2' onChange={onAddressChange} value={customerAddress} />
              <small className='form-text text-muted'>หมายเหตุ</small>
              <textarea type='text' maxLength='255' className='form-control' placeholder='หมายเหตุ' row='2' onChange={onRemarkChange} value={customerRemark} />
            </div>
            <div className='form-check mt-2'>
              <label className='form-check-label'>
                <input type='radio' className='form-check-input' name='optionsRadios' id='optionsRadios1' defaultValue='option1' />
                ชำระเงินปลายทาง
              </label>
            </div>
            <div className='form-check'>
              <label className='form-check-label'>
                <input type='radio' className='form-check-input' name='optionsRadios' id='optionsRadios2' defaultValue='option2' defaultChecked />
                ชำระเงินทันที
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className='text-end mt-1'>
        <button className='btn btn-warning py-lg-3 px-lg-5 px-md-4 px-sm-1 w-50' data-bs-toggle='modal' data-bs-target='#confirmOrder' onClick={confirming}>
          ตรวจสอบคำสั่งซื้อ
        </button>
      </div>

      <div className='modal fade' id='confirmOrder' tabIndex={-1} aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                กรุณาตรวจสอบคำสั่งซื้อ
              </h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div className='modal-body'>
              <p>{pCoffee}</p>
              <p>{pCoco}</p>
              {isShowDetail && (
                <div>
                  <p>ชื่อผู้ซื้อ : {customerName}</p>
                  <p>เบอร์โทร : {customerPhone}</p>
                  <p>ที่อยู่จัดส่ง : {customerAddress}</p>
                  <p>หมายเหตุ : {customerRemark}</p>
                  <p className='h2 text-center'>ที่ต้องจ่าย = {formatting(netPrice)}</p>
                </div>
              )}
            </div>
            <div className='modal-footer'>
              {}
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                แก้ไข
              </button>
              <button type='button' className='btn btn-success' style={{ backgroundColor: '#1b8c2e' }} onClick={postOrders}>
                ยืนยันคำสั่งซื้อ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const formatting = (x) => {
  return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};