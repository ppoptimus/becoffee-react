import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark p-0'>
        <div className='container-fluid'>
          <Link className='nav-link' to='/'>
            <img src='/img/logo.webp' className='img-fluid' width={120} alt='กาแฟควบคุมน้ำหนัก' />
          </Link>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarColor01' aria-controls='navbarColor01' aria-expanded='false'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarColor01'>
            <ul className='navbar-nav me-auto nav-pills'>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  หน้าหลัก
                </Link>
              </li>
              <li className='nav-item'>
                <a href='https://lin.ee/IF1fsrh' target='_blank' rel="noreferrer" className='nav-link'>
                  ติดต่อเรา
                </a>
              </li>
            </ul>
            <form className='d-flex'>
              <Link className='nav-link' to='/Orders'>
                <div className='btn btn-primary my-2 my-sm-0 btn-lg' type='button'>
                <FontAwesomeIcon icon={faCartPlus} />&nbsp; สั่งซื้อสินค้า
                </div>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}
