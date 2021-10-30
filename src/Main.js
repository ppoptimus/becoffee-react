import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faShoppingBasket } from '@fortawesome/free-solid-svg-icons'

const Footer = lazy(() => import('./Footer'))

export default function Main() {
 
  return (
    <>
      <div className='container center'>
        <div className='row col-12 my-3'>
          <h1 className='fw-bold'>Brand BeEasy Thailand ผลิตภัณฑ์ควบคุมน้ำหนัก</h1>
          <img src='img/becoffeebanner.jpg' className='img-fluid' width={1080} alt='เครื่องดื่มลดน้ำหนัก' />
        </div>
        <div className='row col-12 my-3'>
          <img src='img/bcoffeebig.webp' className='img-fluid col-lg-6 col-sm-12' alt='เครื่องดื่มลดน้ำหนัก' />
          <img src='img/b3.webp' className='img-fluid col-lg-6 col-sm-12' alt='เครื่องดื่มลดน้ำหนัก' />
        </div>
        <div className='row justify-content-center align-items-center my-3 p-2'>
          <Link to='/Orders' className='btn btn-lg btn-warning w-100 p-3 fs-4'>
            <FontAwesomeIcon icon={faCartArrowDown} />
            &nbsp; สั่งสินค้าทันที
          </Link>
        </div>
        <div className='row justify-content-center align-items-center my-4'>
          <h1 className='fw-bold'>มีบริการจัดส่งแบบเก็บเงินปลายทาง</h1>
          <img src='img/Kerry.webp' className='img-fluid col-4' alt='เครื่องดื่มลดน้ำหนัก' />
          <img src='img/flashexpress.webp' className='img-fluid col-4' alt='เครื่องดื่มลดน้ำหนัก' />
          <img src='img/JTExpress.webp' className='img-fluid col-4' alt='เครื่องดื่มลดน้ำหนัก' />
        </div>
        <div className='justify-content-center align-items-center col-12 my-3'>
          <div className='row'>
            <img src='img/becoffee02_700x700.jpg' className='img-fluid col-lg-6 col-sm-12' alt='เครื่องดื่มลดน้ำหนัก' />
            <img src='img/becoffee01.jpg' className='img-fluid col-lg-6 col-sm-12' alt='เครื่องดื่มลดน้ำหนัก' />
          </div>
          <div className='row'>
            <img src='img/becoffee03_700x700.jpg' className='img-fluid col-lg-6 col-sm-12' alt='เครื่องดื่มลดน้ำหนัก' />
            <img src='img/bcoffee2.webp' className='img-fluid col-lg-6 col-sm-12' alt='เครื่องดื่มลดน้ำหนัก' />
          </div>
        </div>
        <div className='row justify-content-center align-items-center my-3 p-2'>
          <a href='https://lin.ee/IF1fsrh'>
            <button className='btn btn-lg btn-success w-100 p-3 fs-4'>&nbsp; สั่งสินค้าผ่านไลน์@</button>
          </a>
        </div>
        <div className='row justify-content-center align-items-center col-12 my-4'>
          <h1>รีวิวจากลูกค้า</h1>
          <img src='img/review1.jpg' className='img-fluid col-lg-6 col-sm-12' width='50%' height='auto' alt='เครื่องดื่มลดน้ำหนัก' />
          <img src='img/review2.jpg' className='img-fluid col-lg-6 col-sm-12' width='50%' height='auto' alt='เครื่องดื่มลดน้ำหนัก' />
          <div className='float-right my-3'>
            <a href='https://www.facebook.com/nangbbeasycoffee'>
              <span className='btn btn-dark h6 fw-bold'>ดูรีวิวเพิ่มเติม &gt;&gt;</span>
            </a>
          </div>
          <img src='img/promote1.jpg' className='img-fluid col-12 mt-2' width='50%' height='auto' alt='เครื่องดื่มลดน้ำหนัก' />
        </div>
      </div>
      <Footer/>
      <div className='container fixed-bottom flex mb-2'>
        <div className='row justify-content-center col-12'>
          <div className='col-8'>
            <Link to='/Orders'>
              <button className='btn btn-lg btn-warning bg-gradient py-3 mx-1 btnfixed w-100'>
                <FontAwesomeIcon icon={faShoppingBasket} />
                &nbsp;สั่งซื้อสินค้า
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
