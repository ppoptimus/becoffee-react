import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Test() {
  let history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    history.push("/generate")
  }
  return (
    <div>
      <div className='text-end my-1'>
        <button className='btn btn-warning py-lg-3 px-lg-5 px-md-4 px-sm-1 w-100' data-bs-toggle='modal' data-bs-target='#confirmOrder'>
          ตรวจสอบคำสั่งซื้อ
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='modal fade' id='confirmOrder' tabIndex={-1} aria-labelledby='exampleModalLabel' aria-hidden='true'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
                <p></p>
                <p></p>
                <div>
                  <p>ชื่อผู้ซื้อ : </p>
                  <p>เบอร์โทร : </p>
                  <p>ที่อยู่จัดส่ง : </p>
                  <p>ยอดสุทธิ : </p>
                  <p>วิธีการชำระเงิน : </p>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                  แก้ไข
                </button>
                <button type='submit' className='btn btn-success' style={{ backgroundColor: '#1b8c2e' }} onClick={handleSubmit}>
                  ยืนยันคำสั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
